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
  ```JSON
    {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTUxMTA2NDQsImV4cCI6MTcxNTExMDk0NH0.3t4YuNxqyaQnpT5EmNpeRVBr3k-cqmMei95W-VZ1Ksk",
  "user": {
    "full_name": "mohamed osama mohamed",
    "national_id": "30203131500",
    "isActive": true,
    "email": "mohamed00@gmail.com",
    "role": "admin"
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
        "_id": "662d47d293a19d508e722560",
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
## *Second role teacher* 

