# welcome to Edu Platfrom 👋
## auth routes 
### *register* : *POST* /api/v1/auth/register
  you should give me data as below in json format
  #### STUDENT 
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
  #### TEACHER
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
### *login* : *POST* /api/v1/auth/login

### the request should json and contain :

  ```JSON
  {
  "username": "30203131500",
  "password":"12345678"
  }
   ```


#### *auth response*:
1- if Student : 
  ```JSON
    {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTUxMTY3MDAsImV4cCI6MTcxNTExNzAwMH0._3GcawZJjr22e58yx7gVHUBI97U_Ou7nqOD8_VYuDlU",
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
        "_id": "662d47f693a19d508e722564",
        "subject_name": "Introduction to Machine Learning"
      },
      {
        "_id": "662d480193a19d508e722566",
        "subject_name": "Introduction to Vision and Robotics"
      }
    ]
  }
}
  ```
2- if teacher:
```Json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTUxMTg0ODksImV4cCI6MTcxNTExODc4OX0.Vmob5PpSWBaybKtrAq6m2wA52KES-qjy1RiiFcsoV7Q",
  "user": {
    "user_id": "663a8c328a51b7b89affa762",
    "full_name": "osama mohamed",
    "national_id": "30103131500559",
    "isActive": true,
    "email": "osama.teacher@gmail.com",
    "role": "teacher",
    "subjects": [
      {
        "_id": "662d47d293a19d508e722560",
        "subject_name": "Statistics",
        "level": 1
      }
    ]
  }
}

```

## *you can navigate to admin, teacher or student pages based on role provided in response*
##
## *Fisrt role admin* 
### fetching data : /api/v1/admin
1- /get-subjects : *GET*
 ```JSON
[
    {
        "subject_id": "662d47cc93a19d508e72255e",
        "subject_name": "English Language",
        "level": 1,
        "teacher_name": null,
        "teacher_id": null
    },
    {
        "subject_id": "662d47d293a19d508e722560",
        "subject_name": "Statistics",
        "level": 1,
        "teacher_name": null,
        "teacher_id": null
    }
]


 ```
2- /get-students : *GET*
```Json
[
  {
    "student_id": "663a8b974b15ad15d26b39e7",
    "full_name": "mohamed osama",
    "email": "m.osama@gmail.com",
    "isActive": true,
    "level": 1
  },
  {
    "_id": "663a8bb04b15ad15d26b39ea",
    "full_name": "amr osama",
    "email": "a.osama@gmail.com",
    "isActive": true,
    "level": 2
  }
]
```
3- /get-teachers: *GET*
```JSON
[
  {
    "_id": "663a8c328a51b7b89affa762",
    "full_name": "osama mohamed",
    "email": "osama.teacher@gmail.com",
    "isActive": true
  },
  {
    "_id": "663a90accc0bf491cbd22c8b",
    "full_name": "seif mohamed",
    "email": "seif.teacher@gmail.com",
    "isActive": true
  }
]
```
### control accounts activation : *POST* /api/v1/admin/account-activate
request should be post with json format:

```JSON
{
"user_id":"66288a5104804e0fcd032dda"
"active_value":true
}
```
### Subjects control : *POST* /api/v1/admin
1- /add-subject: *PSOT*
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
  "teacher_id": "663a8c328a51b7b89affa762"
}
```
2- /update-subject-teacher: *POST*
```Json
{
  "teacher_id":"663096ccea3e112a0411f6e5",
  "subject_id": "662d47cc93a19d508e72255e"
}
```


3- /del-user: *DELETE*
```Json
{
  "user_id" : "663096ccea3e112a0411f6e5"
}
```

4- /del-subject: *DELETE*
```Json
{
  "subject_id":"662d47cc93a19d508e72255e"
}
```
##
### Payment Methods: /api/v1/admin/
1- /payment-info : *GET*
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
2- /add-payment: *POST*
```JSOM
{
  "level": 3,
  "amount": 700,
  "vodafoneCash":"01029872506",
  "instaPay": "mosama137"
}
```
3- /del-payment: *DELETE*
```Json
{
  "level": 1
}
```

## *Second role teacher* 

