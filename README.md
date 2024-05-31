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

### 2. Get Teachers:  _GET_ /api/v1/admin/teachers

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

----------


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

 1. Adding _POST_ /api/v1/admin/course

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

 2. update subject's teacher: _POST_ /api/v1/admin/course

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
-----

## Payment Page:

### 1. payment information : _GET_ /api/v1/admin/payments

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

#### 2. Add payment:

_POST_ /api/v1/admin/payment

```JSON
{
  "level": 3,
  "amount": 700,
  "vodafoneCash":"01029872506",
  "instaPay": "mosama137"
}
```

#### 3. Delete payment:

_DELETE_ /api/v1/admin/payment

```Json
{
  "level": 1
}
```

## _Second role teacher_
