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
 "email":"m.osama@gmail.com",
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
 "email":"osama.teacher@gmail.com",
 "password":"12345678"
 }
```

### 2. _Login_ :

the request should be json format

#### _POST_ /api/v1/auth/login

```JSON
{
"username": "30203131500",
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
  "email": "a.osama@gmail.com",
  "role": "student",
  "level": 2,
  "subjects": [
    {
      "_id": "66219d508e722564",
      "subject_name": "Intro to ML",
      "content": [
        {
          "title": "Lecture 1",
          "path": "/uploads/lec1"
        },
        {
          "title": "Lecture 2",
          "path": "/uploads/lec2"
        }
      ]
    },
    {
      "_id": "66219d508e722564",
      "subject_name": "Intro to DL",
      "content": [
        {
          "title": "Lecture 1",
          "path": "/uploads/lec1"
        },
        {
          "title": "Lecture 2",
          "path": "/uploads/lec2"
        }
      ]
    }
  ]
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
    "email": "osama.teacher@gmail.com",
    "role": "teacher",
    "subjects": [
      {
        "_id": "662d47d293a19d508e722560",
        "subject_name": "Statistics",
        "level": 1,
        "content": [
        {
          "title": "Lecture 1",
          "path": "/uploads/lec1"
        },
        {
          "title": "Lecture 2",
          "path": "/uploads/lec2"
        }
      ]
      }
    ]
  }
}
```

## _you can navigate to admin, teacher or student pages based on role provided in response_

## _First role admin_

### fetching data :

#### 1. _GET_ /api/v1/admin/subjects

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

#### 2. _GET_ /api/v1/admin/students

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

#### 3. _GET_ /api/v1/admin/teachers

```JSON
[
  {
    "_id": "663a8b89affa762",
    "full_name": "osama mohamed",
    "national_id": "30203131500",
    "isActive": true
  },
  {
    "_id": "663491cbd22c8b",
    "full_name": "seif mohamed",
    "national_id": "30203131500",
    "isActive": true
  }
]
```

### control accounts activation :

request should be post with json format

#### _POST_ /api/v1/admin/activation

```JSON
{
"user_id":"66288a510cd032dda"
"active_value":true
}
```

### Subjects control :

#### 1. add subject

_POST_ /api/v1/admin/subject

you can provide teacher id or not

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

#### 2. update subject's teacher:

_POST_ /api/v1/admin/subject-teacher

```Json
{
  "teacher_id":"663096ccea3e112a0411f6e5",
  "subject_id": "662d47cc93a19d508e72255e"
}
```

#### 3. Delete User:

_DELETE_ /api/v1/admin/user

```Json
{
  "user_id" : "663096ccea3e112a0411f6e5"
}
```

#### 4. Delete subject:

_DELETE_ /api/v1/admin/subject

```Json
{
  "subject_id":"662d47cc93a19d508e72255e"
}
```

##

### Payment:

#### 1. payment information :

_GET_ /api/v1/admin/payments

```Json
[
{
  "level": 1,
  "amount": 700,
  "methods":{
  "vodafoneCash":"01029872506",
  "instaPay": "mosama137"
  }
},
{
  "level": 2,
  "amount": 1000,
  "methods":{
  "vodafoneCash":"01029872506",
  "instaPay": "mosama137"
  }
}
]
```

2- /add-payment: _POST_

```JSOM
{
  "level": 3,
  "amount": 700,
  "vodafoneCash":"01029872506",
  "instaPay": "mosama137"
}
```

3- /del-payment: _DELETE_

```Json
{
  "level": 1
}
```

## _Second role teacher_
