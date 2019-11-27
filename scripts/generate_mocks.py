from random import randint
import random
import uuid
from faker import Faker
import json

fake = Faker()
students = []

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
    ects = randint(2,10)
    semester = randint(1,10)
    courseForm = random.choice([
        "Lecture",
        "Project",
        "Lab",
        "Excercise" 
    ])
    maxStudents = randint(20, 100)
    ratings = [random_course_rating() for _ in range(randint(1, min(maxStudents, len(students))))]
    enrolledStudents = list(map(lambda x: x["studentId"], ratings))

    return {
        "id": id,
        "name": name,
        "image": image,
        "description": description,
        "ects": ects,
        "semester": semester,
        "courseForm": courseForm,
        "maxStudents": maxStudents,
        "ratings": ratings,
        "enrolledStudents": enrolledStudents
    }

students = [random_student() for _ in range(randint(20, 40))]

courses = [random_course() for _ in range(randint(10, 20))]

with open("students.json", "w") as f:
    json.dump(students, f, indent=4)

with open("courses.json", "w") as f:
    json.dump(courses, f, indent=4)



