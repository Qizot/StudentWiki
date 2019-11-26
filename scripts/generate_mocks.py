from random import randint
import random
import uuid
from faker import Faker
import json

fake = Faker()
students = []
teachers = []

def random_rating():
    return randint(1,5)

def parse_name(name):
    parts = name.split()
    if len(parts) == 3:
        return parts[1:]
    return parts

def random_student():
    id = str(uuid.uuid4())
    name = fake.name()
    print(name)
    firstname, lastname = parse_name(name)
    email = f"{firstname}.{lastname}@gmail.com"
    return {
        "id": id, 
        "firstname": firstname, 
        "lastname": lastname, 
        "email": email
    }


def random_comment():
    studentId = random.choice(students)['id']
    content = fake.text()[:100]
    rating = random_rating()
    return {
        "content": content,
        "rating": rating,
        "studentId": studentId 
    }

def random_comment_category(category):
    comment_count = randint(1,5)

    categories = ["Knowledge", "Passion", "Charisma"]
    comments = [random_comment() for _ in range(comment_count)]

    return {"category": categories[category], "comments": comments}

def random_teacher_card(name):
    phone = str(randint(100000000, 999999999))
    email = "_".join(name.split()) + "@gmail.com"
    homePage = "https://" + "".join(name.split()) + ".com"

    return {
        "phone": phone, 
        "email": email, 
        "homePage": homePage
    }

def random_teacher():
    id = str(uuid.uuid4())
    name = fake.name()
    degree = random.choice(["Professor", "Master", "Nobody"])
    image = "https://dailyutahchronicle.com/wp-content/uploads/2017/10/professorrating-900x598.jpg"

    return {
        "id": id, 
        "name": name, 
        "degree": degree, 
        "image": image, 
        "teacherCard": random_teacher_card(name)
    }


def random_course_teacher():
    teacher = random.choice(teachers)

    commentCategories = [random_comment_category(i) for i in range(3)]

    return {"teacher": teacher, "commentCategories": commentCategories}


def random_course_rating():
    rating = random_rating()
    studentId = random.choice(students)["id"]
    return {"rating": rating, "studentId": studentId}

def random_course():
    id = str(uuid.uuid4())
    name = random.choice([
        'fizyka 1',
        'fizyka 2',
        'analiza 1',
        'analiza 2',
        'WDAI',
        'PO',
        'AI',
        'KI',
        'UX',
        'CSS',
        'JS',
        "SysOpy",
        "DevOps",
        "Infra",
        "WDAI 2",
        "WDI+",
        "ASD"
    ])
    image = "https://www.informatyka.agh.edu.pl/static/img/cooperation_tile.jpg"
    description = fake.text()[:200]
    courseTeachers = [random_course_teacher() for _ in range(randint(1,3))]
    ects = randint(2,10)
    semester = randint(1,10)
    courseForm = random.choice([
        "Lecture",
        "Project",
        "Lab",
        "Excercise" 
    ])
    maxStudents = randint(20, 100)
    ratings = [random_course_rating() for _ in range(randint(1, len(students)))]
    enrolledStudents = list(map(lambda x: x["studentId"], ratings))

    return {
        "id": id,
        "name": name,
        "image": image,
        "description": description,
        "courseTeachers": courseTeachers,
        "ects": ects,
        "semester": semester,
        "courseForm": courseForm,
        "maxStudents": maxStudents,
        "ratings": ratings,
        "enrolledStudents": enrolledStudents
    }

students = [random_student() for _ in range(randint(20, 40))]
teachers = [random_teacher() for _ in range(randint(5, 10))]

courses = [random_course() for _ in range(randint(10, 20))]

with open("students.json", "w") as f:
    json.dump(students, f, indent=4)

with open("teachers.json", "w") as f:
    json.dump(teachers, f, indent=4)

with open("courses.json", "w") as f:
    json.dump(courses, f, indent=4)



