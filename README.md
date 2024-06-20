# welcome to Edu Platform 👋

## auth routes

### 1. _register_ :

you should give me data as below in json format

#### for STUDENT

#### _POST_ /api/v1/auth/register

```JSON
 {
 "full_name": "mohamed osama",
 "national_id": "30203131500559",
 "role":"student",
 "phone":"01065623680",
 "password":"12345678",
 "level":1
 }
```

#### for TEACHER

#### _POST_ /api/v1/auth/register

```JSON
 {
 "full_name": "osama mohamed",
 "national_id": "30103131500559",
 "role":"teacher",
 "phone":"01065623680",
 "password":"12345678"
 }
```

### 2. _Login_ :

the request should be json format

#### _POST_ /api/v1/auth/login

```JSON
{
"username": "30203131500", // national id
"password":"12345678"
}
```

#### _Login response_:

#### 1. if Student :

```JSON
  {
"token": "eyJhi.eyJMMH0.Ou7nqVlU",
"user": {
  "user_id": "663a8bb04b15ad15d26b39ea",
  "full_name": "amr osama",
  "national_id": "30403131500559",
  "isActive": true,
  "role": "student",
  "level": 2
}
}
```

#### 2. if teacher:

```Json
{
  "token": "eyJhb9.eyJOX0.Vy1Ri7Q",
  "user": {
    "user_id": "663a8c89affa762",
    "full_name": "osama mohamed",
    "national_id": "30103131500559",
    "isActive": true,
    "role": "teacher"
      }
}
```

#### 3. if Admin:

```Json
{
  "token": "eyJhb9.eyJOX0.Vy1Ri7Q",
  "user": {
    "user_id": "663a8c89affa762",
    "full_name": "admin",
    "national_id": "30103131500559",
    "isActive": true,
    "role": "Admin"
      }
}
```

## _you can navigate to admin, teacher or student pages based on role provided in response_

## _First role admin_

## Member Page:

### 1. Get Students: _GET_ /api/v1/admin/students

```Json
[
  {
    "student_id": "66d15d26b39e7",
    "full_name": "mohamed osama",
    "national_id": "30203131500",
    "isActive": true,
    "level": 1
  },
  {
    "_id": "663a8bb04b15ad139ea",
    "full_name": "amr osama",
    "national_id": "30203131500",
    "isActive": true,
    "level": 2
  }
]
```

### 2. Get Teachers: _GET_ /api/v1/admin/teachers

```JSON
[
  {
    "_id": "6656236078acea5444e2ee2a",
    "national_id": "30103131500559",
    "full_name": "amr osama",
    "subjects": [
      {
        "_id": "662d47cc93a19d508e72255e",
        "subject_name": "English Language"
      },
      {
        "_id": "662e39c027db604371f6d820",
        "subject_name": "Computer Fundamentals"
      }
    ],
    "isActive": true
  },,
  {
    "_id": "663491cbd22c8b",
    "full_name": "seif mohamed",
    "national_id": "30203131500",
    "isActive": true
  }
]
```

### Modify Activation Accounts:

#### _POST_ /api/v1/admin/activation

```JSON
{
"user":"66288a510cd032dda"
"value":true
}
```

### Delete User:

#### _DELETE_ /api/v1/admin/user

```Json
{
  "user" : "663096ccea3e112a0411f6e5"
}
```

---

## Courses Page

#### 1. _GET_ /api/v1/admin/courses

```JSON
[
   {
       "subject_id": "662d508e755e",
       "subject_name": "English",
       "level": 1,
       "teacher_name": null,
       "teacher_id": null
   },
   {
       "subject_id": "66208e722560",
       "subject_name": "Statistics",
       "level": 1,
       "teacher_name": null,
       "teacher_id": null
   }
]
```

#### 2. Subjects control : Add or Update Course

1.  Adding _POST_ /api/v1/admin/course

```JSON
{
  "subject_name":"Computer Fundamentals",
  "level": 1
}
or
{
  "subject_name":"Computer Fundamentals",
  "level": 1,
  "teacher_id": "663a8c7b89affa762"
}
```

2.  update subject's teacher: _POST_ /api/v1/admin/course

```Json
adding teacher
{
  "subject_name": "Computer Fundamentals",
  "teacher_id":"663096ccea3e112a0411f6e5",
  "level": 1
}
```

or remove teacher by not sending teacher in json

```Json

{
  "subject_name": "Computer Fundamentals",
  "level": 1
}
```

#### 3. Delete Course:

_DELETE_ /api/v1/admin/course

```Json
{
  "subject_id":"662d47cc93a19d508e72255e"
}
```

---

## Payment Page:

### 1. payment Levels information : _GET_ /api/v1/admin/pay/level

```Json
[
  {
    "id": "665bc193ac30c3fe49cad982",
    "level": 2,
    "amount": 700
  },
  {
    "id": "665bc1aaac30c3fe49cae875",
    "level": 1,
    "amount": 800
  },
  {
    "id": "665bc264ac30c3fe49cb66da",
    "level": 3,
    "amount": 700
  },
  {
    "id": "665bc26cac30c3fe49cb6c77",
    "level": 4,
    "amount": 1000
  }
]
```

### 2. Add or edit payment level: _POST_ /api/v1/admin/pay/level

```JSON
{
  "level": 3,
  "amount": 700
}
```

### 3. Delete payment level: _DELETE_ /api/v1/admin/pay/level

```Json
{
  "level": 1
}
```

### 4. payment Methods information : _GET_ /api/v1/admin/pay/method

```Json
[
  {
    "id": "665bca3fac30c3fe49d0c594",
    "name": "instapay",
    "account": "mosama"
  },
  {
    "id": "665bca6bac30c3fe49d0e3c2",
    "name": "vodafone cash",
    "account": "01065623680"
  }
]
```

### 5. Add or edit payment Method: _POST_ /api/v1/admin/pay/method

```JSON
{
  "name":"instaPay",
  "account":"mosama"
}
```

### 6. Delete payment Method: _DELETE_ /api/v1/admin/pay/method

```Json
{
  "name": "vodafone cash"
}
```

### 7. Get Payment History: _GET_ /api/v1/admin/pay/history

```Json
[
  {
    "user_id": "66585bd8a8fb5080bd8c3313",
    "name": "muhammad Hassan",
    "national_id": "12345678901234",
    "level": 1,
    "paid_from": "osama13",
    "method": "instapay",
    "date": "2024-06-02T05:47:20.328Z"
  },
  {
    "user_id": "66585bd8a8fb5080bd8c3313",
    "name": "muhammad Hassan",
    "national_id": "12345678901234",
    "level": 1,
    "paid_from": "osama13",
    "method": "instapay",
    "date": "2024-06-02T05:47:48.829Z"
  }
]
```

### 8. Submit Payment Request: _POST_ /api/v1/admin/pay/history

```JSON
{
  "user_id":"66585bd8a8fb5080bd8c3313"
}
```

## _Second role teacher_

## Courses Page:

### 1. getCourses: _GET_ /api/v1/teacher/Courses

request by

```JSON
{
  "user_id":"6656236078acea5444e2ee2a"
}
```

response:

```JSON
[
  {
    "subject_id": "662d47cc93a19",
    "subject_name": "English Language",
    "level": 1,
    "content": [
      {
        "title": "lec1",
        "path": "/public/files/1717463024973-carbon_footprint_system_O6U[1111].pdf",
        "_id": "665e67f177ca4327da395ee4"
      }
    ]
  },
  {
    "subject_id": "662d47e193a1",
    "subject_name": "Mathematics for Computer Science",
    "level": 1,
    "content": [
      {
        "title": "lec1",
        "path": "/public/files/1717463045173-carbon_footprint_system_O6U[1111].pdf",
        "_id": "665e680577ca4327da395ee6"
      }
    ]
  }
]
```

### 2. uploadContent: _POST_ /api/v1/teacher/content

you send a form that contains :

- subject_name : this for search and add content
- title: the name of lecture
- file: you should set in form :
  `<input type="file" id="pdf" name="pdf" accept=".pdf"> `

### 3. delContent: _DELETE_ /api/v1/teacher/content

```JSON
{
  "subject_name":"English Language",
  "title":"lec1"
}
```

## Exam Page:

### 1. getExams : _GET_ /api/v1/teacher/exam

- pass the user_id of teacher to fetch the exams:

```JSON
{
  "user_id": "54d5fg4dsg45df4g"
}
```

### 2. uploadExam: _POST_ /api/v1/teacher/exam

- pass these data to create :

```JSON
{
  "teacher_id": "352d434g1dfgdf",
  "subject_id": "dgh54f5ghfg54h5f4gh",
  "title": "Sample Exam",
  "startAt": "2024-06-10T09:00:00Z",
  "duration": 90,
  "questions": [
      {
          "questionText": "What is the capital of France?",
          "options": ["London", "Paris", "Berlin", "Rome"],
          "correctOptionIndex": 1
      },
      {
          "questionText": "Who wrote 'Romeo and Juliet'?",
          "options": ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
          "correctOptionIndex": 0
      }
  ]
}

```

### 3. delExam: _DELETE_ /api/v1/teacher/exam

- pass the exam_id:

```JSON
{
  "exam_id":"ghfdjt54hj5g4"
}
```

## _Student Role_

### 1. getCourses:_GET_ /api/v1/student/courses

- first you fetch courses by level send this->

```json
{
  "level": 1
}
```

- the response is :

```json
[
  {
    "subject_id": "662d47cc93a72255e",
    "subject_name": "English Language",
    "level": 1,
    "content": [
      {
        "title": "lec1",
        "path": "/public/files/124973.pdf",
        "_id": "665e67f177ca4327da395ee4"
      }
    ]
  },
  {
    "subject_id": "662d47e193a19d562",
    "subject_name": "Mathematics for Computer Science",
    "level": 1,
    "content": [
      {
        "title": "lec1",
        "path": "/public/files/1717463.pdf",
        "_id": "665e680577ca4327da395ee6"
      }
    ]
  }
]
```

### 2.
