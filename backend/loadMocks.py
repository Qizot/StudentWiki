import requests
import json

DOMAIN = 'http://localhost:3000'

CREATE_COURSE = DOMAIN + '/api/courses'

ENROLL_ON_COURSE = DOMAIN + '/api/courses/{}/enroll'

RATE_COURSE = DOMAIN + '/api/courses/{}/rate'

LOGIN = DOMAIN + '/api/login'

REGISTER = DOMAIN + '/api/register'

TOKEN = ''

admin = {
    "email": "admin@gmail.com",
    "password": "admin"
}

students = {}

def get_auth_token(email, password):
    params = {
        "email": email,
        "password": password
    }

    r = requests.post(url=LOGIN, headers={'Content-Type': 'application/json'}, data=json.dumps(params))
    
    data = r.json()
    print("getting auth token", data)
    return data["token"]

def get_headers(token):
    return {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
        }


def register(student):
    student['password'] = 'password'
    r = requests.post(url=REGISTER, headers=get_headers(''), data=json.dumps(student))
    
    print("registering student", r.json())
    if r.status_code == 200:
        return get_auth_token(student['email'], student['password'])
    return None

def create_course(course):
    r = requests.post(url=CREATE_COURSE, headers=get_headers(TOKEN), data=json.dumps(course))
    print("creating coures", r.json())
    return r.json()['courseId']

def enroll_on_course(course_id, token):
    r = requests.post(url=ENROLL_ON_COURSE.format(course_id), headers=get_headers(token))
    print("enrolling", r.json())


def rate_course(course_id, token, rating):
    r = requests.post(url=RATE_COURSE.format(course_id), headers=get_headers(token), data=json.dumps({"rating": rating}))
    print("rating", r.json())

TOKEN = get_auth_token(admin['email'], admin['password'])

# register students and save theirs tokens
with open('students.json', 'rb') as fp:
    for student in json.load(fp):
        token = register(student)
        students[student['id']] = token

#create courses and enroll students to them and create ratings
with open('courses.json', 'rb') as fp:
    for course in json.load(fp):
        course_id = create_course(course)
        for student in course['enrolledStudents']:
            enroll_on_course(course_id, students[student])
        for rating in course['ratings']:
            student_id = rating['studentId']
            value = rating['rating']
            rate_course(course_id, students[student_id], value)
