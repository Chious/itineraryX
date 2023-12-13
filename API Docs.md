# itineraryX API Document

edit by YU-HAO CHEN in Taipei

[gitHub](https://github.com/xrchitron/itineraryX) | [Linkedin](https://www.notion.so/7f62795e3f5e4952a28bf9eb4fa2452e?pvs=21) | [email](mailto:yuhaochen1124@gmail.com)
Note: All response and request time (except created_at and updated_at) follow from ISO Format, for more info, please reference: [this link](https://www.w3schools.com/js/js_date_formats.asp)

## System Architecture

![system_architecture_diagram.jpg](/src/images/docs/system_architecture_diagram.jpg)

## ERD (Entity Relationship Diagram) of this project

![itineraryX_ERD.jpg](/src/images/docs/itineraryX_ERD.jpg)

# User

## POST /api/v1/users/login (User login)

User is able to login.

### Request Body

| Params   | Required | Type   | Description     |
| -------- | -------- | ------ | --------------- |
| email    | Required | string | user’s email    |
| password | Required | string | user’s password |

### Response

Success | code : 200

- The token (JSON Web Token) should be stored in the header as the authentication and sent with every request except for signup and login.

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJvb3RfdGVzdCIsImVtYWlsIjoidXNlcjAxQGV4YW1wbGUuY29tIiwiYXZhdGFyIjoidXNlcnMvdXNlcjAxQGV4YW1wbGUuY29tLzI1YWI2ZjNmZDViMDlkNDg1NmI0MjFkMGRhMDE1NGI2ZDg5MTAzMGIzMmYzNmE0YzY1YTJiOTJiMWVhNjNhODIiLCJjcmVhdGVkQXQiOiIyMDIzLTEwLTI3VDA3OjQ0OjU4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTA1VDAzOjIwOjQ4LjAwMFoiLCJpYXQiOjE2OTkyNjA3NDQsImV4cCI6MTcwMTg1Mjc0NH0.peOGT95nRbNB3jGAkiQnfdVqyxlq3L8wl9ZNz9iuIHk",
    "user": {
      "id": 1,
      "name": "test_name",
      "email": "user01@example.com",
      "avatar": null,
      "createdAt": "2023-10-27T07:44:58.000Z",
      "updatedAt": "2023-11-05T03:20:48.000Z"
    }
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "Error: Haven't registered yet!"
}
```

Failure Response | code : 403

```json
{
  "status": "error",
  "message": "Error: Password incorrect!"
}
```

## POST /api/v1/users/signup (User signup)

User sign up.

### Request Body

| Params        | Required | Type   | Description         |
| ------------- | -------- | ------ | ------------------- |
| name          |          | string | User’s name         |
| email         | Required | string | User’s email        |
| password      | Required | string | User’s password     |
| passwordCheck | Required | string | retype the password |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 8,
    "name": "user11",
    "email": "user11@example.com",
    "updatedAt": "2023-11-06T09:14:02.474Z",
    "createdAt": "2023-11-06T09:14:02.474Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Password do not match!"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: Email already exist"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: User name already exist"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Create user failed!"
}
```

## GET /api/v1/users/:userId (Get user’s info)

Get user’s info.

Note: authentication is required.

### **Path Variables**

| Params | Required | Type | Description |
| ------ | -------- | ---- | ----------- |
| userId | Required | int  | User’s id   |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 2,
      "name": "user02test",
      "avatar": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user02%40example.com/b54d1c6577453c1c40b0703e69eb7c3736fa9ce05df2ab6639bdfdd8413bdeca?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T070400Z&X-Amz-Expires=3600&X-Amz-Signature=cbf12ce4b35aab38b02354d39802a37cfd846fa1b99097af7c953de37d8f38f1&X-Amz-SignedHeaders=host&x-id=GetObject",
      "Followers": [
        {
          "id": 1,
          "name": "root_new",
          "avatar": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user01%40example.com/a99e24df3d8c81a3bf418a11357116eaac22a5f1a79159ac527e4169204bb0bc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T070400Z&X-Amz-Expires=3600&X-Amz-Signature=da2fdddba4984396283e887c97e2e3c873aa1c67fb7e78b120a98f3f94cef982&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
      ],
      "Followings": [
        {
          "id": 1,
          "name": "root_new",
          "avatar": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user01%40example.com/a99e24df3d8c81a3bf418a11357116eaac22a5f1a79159ac527e4169204bb0bc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T070400Z&X-Amz-Expires=3600&X-Amz-Signature=da2fdddba4984396283e887c97e2e3c873aa1c67fb7e78b120a98f3f94cef982&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
          "id": 3,
          "name": "user03",
          "avatar": null
        },
        {
          "id": 4,
          "name": "user04",
          "avatar": null
        },
        {
          "id": 5,
          "name": "user05",
          "avatar": null
        }
      ]
    }
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User didn't exist!"
}
```

## GET /api/v1/users/itineraryId (Get Participated Itineraries’ id)

Get Participated Itineraries’ id .

Note: authentication is required.

### Parameters

n/a

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "itineraryId": [1, 7, 8, 9, 10, 11]
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing user id"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: No result found"
}
```

## PUT /api/v1/users/ (Update user’s info)

Update user’s info.

Regarding avatar parameters, the form enctype should be set to 'multipart/form-data'.

Note: authentication is required.

### Request Body

| Params | Required | Type   | Description   |
| ------ | -------- | ------ | ------------- |
| name   | Required | string | User’s name   |
| avatar |          | file   | User’s avatar |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 2,
      "name": "user02test",
      "email": "user02@example.com",
      "avatar": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user02%40example.com/ddd0eb59e3c569dc75980fafc4ac600763f7ae891c8e4fc6ea6ba8af2010c8e0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T072041Z&X-Amz-Expires=3600&X-Amz-Signature=002f043a1f99387b76eb39e57800f24e3a8848ecc649658fb97903144508af84&X-Amz-SignedHeaders=host&x-id=GetObject",
      "createdAt": "2023-10-27T07:44:58.000Z",
      "updatedAt": "2023-11-17T07:20:41.920Z"
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: User name is required!"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User didn't exist!"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: User name already exist"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Update user failed!"
}
```

## POST /api/v1/users/followings (Add following user to user’s following list)

Add following user to user’s following list.

Note: authentication is required.

### Parameters

| Params | Required | Type | Description   |
| ------ | -------- | ---- | ------------- |
| userId | Required | int  | restaurant ID |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "followerId": 1,
    "followingId": "5",
    "updatedAt": "2023-11-06T15:04:30.100Z",
    "createdAt": "2023-11-06T15:04:30.100Z"
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User didn't exist!"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: You are already following this user!"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Add following failed!"
}
```

## DELETE /api/v1/users/followings (Remove following user to user’s following list)

Remove following user to user’s following list.

Note: authentication is required.

### Parameters

| Params | Required | Type | Description |
| ------ | -------- | ---- | ----------- |
| userId | Required | int  | user ID     |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "followerId": 1,
    "followingId": 5,
    "createdAt": "2023-11-06T15:04:30.000Z",
    "updatedAt": "2023-11-06T15:04:30.000Z"
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: You haven't followed this user!"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Delete followship failed!"
}
```

## POST /api/v1/users/forgetPassword (Get reset password email and url)

Get reset password email and url.

the structure of the link is the client URL/reset-password/:token, which is necessary to pass into the patch forgetPassword and is gong to expire in 1 hour.

### Request Body

| Params | Required | Type   | Description  |
| ------ | -------- | ------ | ------------ |
| email  | Required | string | user’s email |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "link": "http://localhost:3000/reset-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTcwMTQxMTQ0MCwiZXhwIjoxNzAxNDE1MDQwfQ.EPDL3nJHedfBr9o6PsgjAJuwcFSQnNL5yxTVB7yopfY"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing email"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User not found"
}
```

## PATCH /api/v1/users/forgetPassword (Reset password)

Reset password.

### Request Body

| Params        | Required | Type   | Description                              |
| ------------- | -------- | ------ | ---------------------------------------- |
| token         | Required | string | temporary token from post forgetPassword |
| password      | Required | string | new password                             |
| passwordCheck | Required | string | retype password                          |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 13,
    "name": "itineraryX",
    "email": "itineraryxOnline@gmail.com",
    "avatar": null
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing token"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Password do not match!"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Token is invalid or expired"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Reset password failed!"
}
```

## POST /api/v1/users/token (Check token Validation)

Check token Validation.

### Request Body

| Params | Required | Type   | Description                              |
| ------ | -------- | ------ | ---------------------------------------- |
| token  | Required | string | temporary token from post forgetPassword |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "name": "test_name",
    "email": "user01@example.com",
    "avatar": null
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing token"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Token is invalid or expired"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User not found"
}
```

## GET /api/v1/users/notifications (Get latest 10 notifications)

Get latest 10 notifications.

Note: authentication is required.

### Request Params

n/a

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": [
    {
      "id": 2,
      "message": "test message2",
      "isRead": false,
      "redirectUrl": "http://localhost:3000",
      "Sender": {
        "id": 2,
        "name": "user02test"
      }
    },
    {
      "id": 1,
      "message": "test message1",
      "isRead": false,
      "redirectUrl": "http://localhost:3000",
      "Sender": {
        "id": 2,
        "name": "user02test"
      }
    }
  ]
}
```

Success | code : 200

if there is no notification at all, the response would be like this

```json
{
  "status": "success",
  "data": []
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

## POST /api/v1/users/notifications (Send notification to user)

Send notification to user.

Note: authentication is required.

### Request Body

| Params      | Required | Type   | Description         |
| ----------- | -------- | ------ | ------------------- |
| receiverId  | Required | int    | receiver id         |
| senderId    | Required | int    | sender id           |
| message     | Required | string | message content     |
| redirectUrl | Required | string | the url to redirect |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "receiverId": 1,
    "senderId": 2,
    "message": "test message2",
    "redirectUrl": "http://localhost:3000",
    "updatedAt": "2023-12-06T07:02:34.570Z",
    "createdAt": "2023-12-06T07:02:34.570Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing user id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing sender id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing message"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing redirect url"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Post notification failed!"
}
```

## PATCH /api/v1/users/notifications (Update notification is read or not)

Update notification is read or not.

Note: authentication is required.

### Request Body

| Params         | Required | Type | Description     |
| -------------- | -------- | ---- | --------------- |
| notificationId | Required | int  | notification id |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "receiverId": 1,
    "senderId": 2,
    "message": "test message2",
    "isRead": true,
    "redirectUrl": "http://localhost:3000"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing notification id"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Notification not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Update notification failed!"
}
```

# Chat

## GET /api/v1/chats/:itineraryId (Get content in the chatroom)

Get content in the chatroom.

Note: in order for a request to be considered valid, the user must be one of the participants.

Note: authentication is required.

### **Path Variables**

| Params      | Required | Type | Description  |
| ----------- | -------- | ---- | ------------ |
| itineraryId | Required | int  | Itinerary id |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "user": "user02",
      "avatar": null,
      "message": "first message",
      "time": "2023-11-08T07:24:13Z"
    },
    {
      "id": 2,
      "user": "user03",
      "avatar": null,
      "message": "second message",
      "time": "2023-11-08T07:24:58Z"
    },
    {
      "id": 3,
      "user": "user02",
      "avatar": null,
      "message": "third message",
      "time": "2023-11-08T07:26:16Z"
    },
    {
      "id": 4,
      "user": "user01",
      "avatar": null,
      "message": "fourth message",
      "time": "2023-11-08T07:33:30Z"
    }
  ]
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 403

```json
{
  "status": "error",
  "message": "Error: User not in itinerary, permission denied"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Chats not found"
}
```

## POST /api/v1/chats/ (Add chat content into chatroom)

Add chat content into chatroom

If message content is image, the form enctype should be set to 'multipart/form-data'.

Note: authentication is required.

### Request Body

| Params      | Required | Type          | Description                       |
| ----------- | -------- | ------------- | --------------------------------- |
| itineraryId | Required | int           | itineraryId                       |
| userId      | Required | int           | sender’s user id                  |
| message     | Required | string / file | message content                   |
| isImage     |          | boolean       | check the type of message content |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 4,
    "user": "user01",
    "avatar": null,
    "message": "first message",
    "time": "2023-11-08T07:33:30Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Empty message"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing image file"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 403

```json
{
  "status": "error",
  "message": "Error: User not in itinerary, permission denied"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Message is image but file not uploaded successfully"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Chat not created successfully"
}
```

# Itinerary

## GET /api/v1/itineraries/:itineraryId (Get specific itinerary info)

Get specific itinerary info.

Note: authentication is required.

### **Path Variables**

| Params      | Required | Type | Description  |
| ----------- | -------- | ---- | ------------ |
| itineraryId | Required | int  | Itinerary id |

### Response

Success | code : 200

holderId: ID of the person who created this itinerary

title: Itinerary title

image: Image of the itinerary

ParticipantsUser: Those who are involved in this itinerary and their basic information

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "holderId": 1,
    "title": "newTitle",
    "image": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/itineraries/itineraryId-1/63c700007e7af13d077ca9a14a2f3dada7bf5d5541a62b1993b1195f0ecbb30f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T082443Z&X-Amz-Expires=3600&X-Amz-Signature=8f797685a04de40a053d3d9347680cc3219f0f3092afa0298886bd274cf46ef1&X-Amz-SignedHeaders=host&x-id=GetObject",
    "startTime": null,
    "endTime": null,
    "createdAt": "2023-10-27T07:49:08.000Z",
    "updatedAt": "2023-11-09T11:42:24.000Z",
    "ParticipantsUser": [
      {
        "id": 3,
        "name": "user03",
        "avatar": null
      },
      {
        "id": 6,
        "name": "user9",
        "avatar": null
      },
      {
        "id": 1,
        "name": "root_new",
        "avatar": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/users/user01%40example.com/a99e24df3d8c81a3bf418a11357116eaac22a5f1a79159ac527e4169204bb0bc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T082443Z&X-Amz-Expires=3600&X-Amz-Signature=fa1b89429dc5320837b01aa4bb68c27135e2c8bccd3693dbf2801b0cb2785eb0&X-Amz-SignedHeaders=host&x-id=GetObject"
      },
      {
        "id": 4,
        "name": "user04",
        "avatar": null
      },
      {
        "id": 5,
        "name": "user05",
        "avatar": null
      }
    ]
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itinerary not found"
}
```

## GET /api/v1/itineraries/ (Get all itinerary basic info.)

Get all itinerary basic info.

Note: authentication is required.

### Parameters

n/a

### Response

Success | code : 200

holderId: ID of the person who created this itinerary

title: Itinerary title

image: Image of the itinerary

ParticipantsUser: Those who are involved in this itinerary and their basic information

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "holderId": 1,
      "title": "newTitle",
      "image": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/itineraries/itineraryId-1/63c700007e7af13d077ca9a14a2f3dada7bf5d5541a62b1993b1195f0ecbb30f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T083638Z&X-Amz-Expires=3600&X-Amz-Signature=1c41af8c932447fb5eea3412c811f7001c89217b1499087a988d680ee5d9c366&X-Amz-SignedHeaders=host&x-id=GetObject",
      "startTime": null,
      "endTime": null,
      "createdAt": "2023-10-27T07:49:08.000Z",
      "updatedAt": "2023-11-09T11:42:24.000Z"
    },
    {
      "id": 3,
      "holderId": 1,
      "title": "test_itinerary03",
      "image": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/itineraries/itineraryId-1/b0213b593effddbddaa00ebd664ebd96d6dd14f02a314a4a5a05874b3997eedd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T083638Z&X-Amz-Expires=3600&X-Amz-Signature=14814521a3233ce5026bfee0d9795ccbebcdb80807e39e1bbc9ddb9e319a86d6&X-Amz-SignedHeaders=host&x-id=GetObject",
      "startTime": null,
      "endTime": null,
      "createdAt": "2023-11-06T09:30:30.000Z",
      "updatedAt": "2023-11-06T09:30:30.000Z"
    },
    {
      "id": 4,
      "holderId": 1,
      "title": "test_itinerary04",
      "image": null,
      "startTime": null,
      "endTime": null,
      "createdAt": "2023-11-06T10:51:32.000Z",
      "updatedAt": "2023-11-06T10:51:32.000Z"
    },
    {
      "id": 5,
      "holderId": 1,
      "title": "test_itinerary05",
      "image": null,
      "startTime": null,
      "endTime": null,
      "createdAt": "2023-11-06T10:52:26.000Z",
      "updatedAt": "2023-11-06T10:52:26.000Z"
    }
  ]
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itineraries not found"
}
```

## POST /api/v1/itineraries/ (Create new itinerary)

Create new itinerary.

Note: authentication is required.

### Request Body

| Params    | Required | Type   | Description     |
| --------- | -------- | ------ | --------------- |
| title     | required | string | Itinerary title |
| startTime | required | date   | ISO Format      |
| endTime   | required | date   | ISO Format      |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 14,
    "holderId": 1, // user's id
    "title": "new itinerary",
    "startTime": "2023-11-08T07:26:16Z",
    "endTime": "2023-11-08T08:26:16Z",
    "updatedAt": "2023-11-21T08:31:49.268Z",
    "createdAt": "2023-11-21T08:31:49.268Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Title is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Start time is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: End time is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to create itinerary"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to create holder as participant"
}
```

## PUT /api/v1/itineraries/ (Update itinerary content)

Update itinerary content.

Note: authentication is required.

### Request Body

| Params      | Required | Type   | Description          |
| ----------- | -------- | ------ | -------------------- |
| itineraryId | required | int    | Itinerary id         |
| title       |          | string | Itinerary title      |
| image       |          | file   | Itinerary image      |
| startTime   |          | date   | itinerary start time |
| endTime     |          | date   | itinerary end time   |

### Response

Success | code : 200

Note: image url will expire in one hour

```json
{
  "status": "success",
  "data": {
    "id": 4,
    "holderId": 1,
    "title": "test itinerary",
    "image": "https://itinerary-x-upload.s3.ap-northeast-1.amazonaws.com/itineraries/itineraryId-4/40187c429578538ff0c8de45b3fb69b836b233d65f465783a7a2796e9cc80cda?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU77B7KHTQ7WYWCNK%2F20231117%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T091647Z&X-Amz-Expires=3600&X-Amz-Signature=4ed07aaf3a9986b2bcd9ac390834d6024b618a2ed8ccba94e7b7db5c37230956&X-Amz-SignedHeaders=host&x-id=GetObject",
    "startTime": "2023-11-08T07:26:16Z",
    "endTime": "2023-11-12T07:26:16Z",
    "createdAt": "2023-11-06T10:51:32.000Z",
    "updatedAt": "2023-11-17T09:16:47.237Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Title is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Start time is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: End time is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itinerary not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to update itinerary"
}
```

## DELETE /api/v1/itineraries/ (Delete itinerary)

Delete itinerary.

Note: authentication is required.

### Request Body

| Params      | Required | Type | Description  |
| ----------- | -------- | ---- | ------------ |
| itineraryId | required | int  | Itinerary id |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 11,
    "holderId": 1,
    "title": "new itinerary",
    "image": null,
    "startTime": null,
    "endTime": null,
    "createdAt": "2023-11-18T07:59:22.000Z",
    "updatedAt": "2023-11-18T07:59:22.000Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itinerary not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to delete participants"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to delete itinerary"
}
```

## POST /api/v1/itineraries/participant (Add participant in the itinerary)

Add participant in the itinerary.

Note: authentication is required.

### Request Body

| Params      | Required | Type   | Description  |
| ----------- | -------- | ------ | ------------ |
| itineraryId | required | int    | Itinerary id |
| email       | required | string | user’s email |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "itineraryId": 1,
    "participantId": 6,
    "updatedAt": "2023-11-06T11:17:35.206Z",
    "createdAt": "2023-11-06T11:17:35.206Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing email"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: User not found"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: You are already having this participant"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to add participant"
}
```

## DELETE /api/v1/itineraries/participant (Remove participant in the itinerary)

Remove participant in the itinerary.

Note: authentication is required.

### Query Params

| Params        | Required | Type | Description                |
| ------------- | -------- | ---- | -------------------------- |
| itineraryId   | required | int  | Itinerary id               |
| participantId | required | int  | user id you want to delete |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "itineraryId": 9,
    "participantId": "2"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing itinerary id"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Missing participant id"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 409

```json
{
  "status": "error",
  "message": "Error: You haven't added this user!"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to delete participant"
}
```

# Map

## GET /api/v1/maps/ (get placeId via google map api)

get placeId via google map api.

Note: authentication is required.

### Query Params

| Params  | Required | Type   | Description                  |
| ------- | -------- | ------ | ---------------------------- |
| address | Required | string | address or name of the place |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "placeId": "ChIJD2XnIY2uQjQRhmxwa7e9MHk"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Address is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Place not found"
}
```

## POST /api/v1/maps/ (Create the map info via google map api)

Create the map info via google map api & create place instance.

Note: authentication is required.

### Request Body

| Params  | Required | Type   | Description                  |
| ------- | -------- | ------ | ---------------------------- |
| placeId | Required | string | Place id from google map api |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 39,
    "name": "Draft Land",
    "placeId": "ChIJpQsd38WrQjQRhjxdDMIXkPg",
    "address": "106, Taiwan, Taipei City, Da’an District, Lane 248, Section 4, Zhongxiao E Rd, 2號1樓",
    "rating": 4.6,
    "url": "https://maps.google.com/?cid=17910841840250993798",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqE03mlVeXeg5wIh9Fpx7EaIYJoNhftvRaMrRJX4tcqUmYzs-vo2q4H0Vl0OrS7Z7nG16eIPfnKmxHBMKcDRZqaGadxR4HxUugg=s1600-w400",
    "lat": 25.0409777,
    "lng": 121.5540448,
    "intro": "Bustling destination with a cool, understated ambiance serving innovative draft cocktails.",
    "updatedAt": "2023-11-18T12:13:46.417Z",
    "createdAt": "2023-11-18T12:13:46.417Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: placeId from Google Map is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Place not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Place didn't create successfully"
}
```

## GET /api/v1/maps/random (Get a random place)

Get a random place.

### Parameters

n/a

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 47,
    "placeId": "ChIJizl1cj6pQjQR9pTlph-UU7s",
    "name": "D.g coffee",
    "address": "No. 334, Section 1, Dihua St, Datong District, Taipei City, Taiwan 103",
    "rating": 4.1,
    "image": "[https://lh3.googleusercontent.com/places/ANXAkqGVXHaa-hqsXCrITBeoKECoJ4PiGny_iQm2O_wiJOTKc81TC1IlxYv5QNfumcp1M-cYrlFouVu0dQ57N7oYO0EoCxC_Yy0B0co=s1600-w400](https://lh3.googleusercontent.com/places/ANXAkqGVXHaa-hqsXCrITBeoKECoJ4PiGny_iQm2O_wiJOTKc81TC1IlxYv5QNfumcp1M-cYrlFouVu0dQ57N7oYO0EoCxC_Yy0B0co=s1600-w400)",
    "url": "[https://maps.google.com/?cid=13498295371824469238](https://maps.google.com/?cid=13498295371824469238)",
    "lat": 25.0622,
    "lng": 121.509,
    "intro": "Bright rooms with artsy decor & wood furnishings, plus an atrium restaurant & a cafe.",
    "createdAt": "2023-11-19T09:32:32.000Z",
    "updatedAt": "2023-11-19T09:32:32.000Z"
  }
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to get random place"
}
```

# Route

## GET /api/v1/routes (Get single route info)

Get single route info.

Note: authentication is required.

### Query Params

| Params        | Required | Type | Description          |
| ------------- | -------- | ---- | -------------------- |
| itineraryId   | Required | int  | itinerary id         |
| originId      | Required | int  | Origin place id      |
| destinationId | Required | int  | Destination place id |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 5,
    "transportationMode": "driving",
    "distanceText": "13.7 km",
    "distanceValue": 13655,
    "durationText": "29 mins",
    "durationValue": 1710,
    "originId": 21,
    "destinationId": 22,
    "originLatLng": {
      "lat": 25.0072,
      "lng": 121.475
    },
    "destinationLatLng": {
      "lat": 25.0273,
      "lng": 121.566
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Itinerary id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Origin id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Destination id is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Route not found"
}
```

## POST /api/v1/routes (Calculate the travel distance and time via google map api)

Calculate the travel distance and time via google map api.

Note: authentication is required.

### Request Body

| Params             | Required | Type   | Description                                                                                                             |
| ------------------ | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| itineraryId        | Required | int    | itinerary id                                                                                                            |
| transportationMode | Required | string | Transportation modes include driving, walking, bicycling, transit (which encompasses bus, subway, train, tram, and rail |
| originId           | Required | int    | Origin place id                                                                                                         |
| destinationId      | Required | int    | Destination place id                                                                                                    |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 27,
    "transportationMode": "driving",
    "distanceText": "1.2 km",
    "distanceValue": 1247,
    "durationText": "6 mins",
    "durationValue": 350,
    "originId": 12,
    "destinationId": 16,
    "originLatLng": {
      "lat": 25.0352,
      "lng": 121.567
    },
    "destinationLatLng": {
      "lat": 25.0353,
      "lng": 121.566
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Itinerary id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Transportation mode is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Origin id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Destination id is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Origin not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Destination not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: No distanceMatrix results found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Create route failed"
}
```

## PATCH /api/v1/routes (Update route info)

Update route info.

Note: authentication is required.

### Request Body

| Params             | Required | Type   | Description                                                                                                             |
| ------------------ | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| routeId            | Required | int    | route id                                                                                                                |
| transportationMode | Required | string | Transportation modes include driving, walking, bicycling, transit (which encompasses bus, subway, train, tram, and rail |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 27,
    "transportationMode": "driving",
    "distanceText": "1.2 km",
    "distanceValue": 1247,
    "durationText": "6 mins",
    "durationValue": 350,
    "originId": 12,
    "destinationId": 16,
    "originLatLng": {
      "lat": 25.0352,
      "lng": 121.567
    },
    "destinationLatLng": {
      "lat": 25.0353,
      "lng": 121.566
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Route id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Transportation mode is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Route not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Origin not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Destination not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: No distanceMatrix results found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Update route failed"
}
```

## DELETE /api/v1/routes/:routeId (Delete route)

Delete route info.

Note: authentication is required.

### Path Variables

| Params  | Required | Type | Description |
| ------- | -------- | ---- | ----------- |
| routeId | Required | int  | route id    |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 22,
    "itineraryId": 1,
    "originId": 13,
    "destinationId": 15,
    "distanceText": "0.7 km",
    "distanceValue": 700,
    "durationText": "10 mins",
    "durationValue": 615,
    "transportationMode": "walking",
    "createdAt": "2023-11-22T12:40:18.000Z",
    "updatedAt": "2023-11-22T13:38:23.946Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Route id is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Route not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Delete route failed"
}
```

## GET /api/v1/routes/latLng (Get lat and lng info to show route with google map api)

Get lat and lng info to show route with google map api.

Note: authentication is required.

### Query Params

| Params      | Required | Type | Description                             |
| ----------- | -------- | ---- | --------------------------------------- |
| itineraryId | Required | int  | itinerary id                            |
| startDate   | Required | date | start date (format example: 2023-01-01) |
| endDate     | Required | date | end date (format example: 2023-01-03)   |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "2023-01-01": [
      {
        "lat": 25.0352,
        "lng": 121.567
      },
      {
        "lat": 25.0339,
        "lng": 121.559
      }
    ],
    "2023-01-02": [
      {
        "lat": 25.0341,
        "lng": 121.564
      },
      {
        "lat": 25.0341,
        "lng": 121.564
      }
    ],
    "2023-01-03": [
      {
        "lat": 25.0352,
        "lng": 121.567
      },
      {
        "lat": 25.0352,
        "lng": 121.567
      }
    ]
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Itinerary id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Start date is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: End date is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Place details not found"
}
```

## (REMOVED) GET /api/v1/routes/all (Get all routes)

Get all routes.

Note: authentication is required.

### Query Params

| Params      | Required | Type | Description                             |
| ----------- | -------- | ---- | --------------------------------------- |
| itineraryId | Required | int  | itinerary id                            |
| startDate   | Required | date | start date (format example: 2023-01-01) |
| endDate     | Required | date | end date (format example: 2023-01-03)   |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "2023-01-01": [
      {
        "transportationMode": "driving",
        "distanceText": "1.6 km",
        "durationText": "7 mins",
        "originId": 17,
        "destinationId": 18,
        "routeId": 4
      },
      {
        "transportationMode": "walking",
        "distanceText": "0.7 km",
        "durationText": "10 mins",
        "originId": 13,
        "destinationId": 15,
        "routeId": 23
      }
    ],
    "2023-01-02": [
      {
        "transportationMode": "driving",
        "distanceText": "13.7 km",
        "durationText": "29 mins",
        "originId": 21,
        "destinationId": 22,
        "routeId": 5
      },
      {
        "transportationMode": "driving",
        "distanceText": "1.2 km",
        "durationText": "5 mins",
        "originId": 14,
        "destinationId": 23,
        "routeId": 6
      }
    ],
    "2023-01-03": [
      {
        "transportationMode": "driving",
        "distanceText": "9.8 km",
        "durationText": "20 mins",
        "originId": 24,
        "destinationId": 25,
        "routeId": 7
      },
      {
        "transportationMode": "bus",
        "distanceText": "1.2 公里",
        "durationText": "6 分鐘",
        "originId": 12,
        "destinationId": 16,
        "routeId": 19
      }
    ]
  }
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Missing required parameters"
}
```

# Destination

## GET /api/v1/destinations/ (Get the destination info)

Get the destination info.

Note: authentication is required.

### Query Params

| Params      | Required | Type   | Description                 |
| ----------- | -------- | ------ | --------------------------- |
| itineraryId | Required | int    | Itinerary id                |
| date        | Required | string | date, ex: 2023-01-01        |
| order       |          | string | asc or desc, asc by default |

### Request Body

n/a

### Response

Success | code : 200

```json
{
    "status": "success",
    "data": [
        {
            "id": 17,
		        "itineraryId": 1,
		        "date": "2023-01-01T12:23:45Z",
		        "Place": {
		            "id": 39,
		            "name": "Draft Land",
		            "address": "106, Taiwan, Taipei City, Da’an District, Lane 248, Section 4, Zhongxiao E Rd, 2號1樓",
		            "rating": 4.6,
		            "url": "https://maps.google.com/?cid=17910841840250993798",
		            "lat": 25.041,
		            "lng": 121.554,
		            "intro": "Bustling destination with a cool, understated ambiance serving innovative draft cocktails.",
		            "image": "https://lh3.googleusercontent.com/places/ANXAkqE03mlVeXeg5wIh9Fpx7EaIYJoNhftvRaMrRJX4tcqUmYzs-vo2q4H0Vl0OrS7Z7nG16eIPfnKmxHBMKcDRZqaGadxR4HxUugg=s1600-w400"

            }
        }....
    ]
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Itinerary id is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Date is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itinerary not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Destinations not found"
}
```

## POST /api/v1/destinations/ (Create the destination in the specific itinerary)

Create the destination with placeId and date in the specific itinerary.

Note: It is necessary to get placeId with postPlace (/api/maps) before using the following api

Note: authentication is required.

### Request Body

| Params      | Required | Type   | Description                 |
| ----------- | -------- | ------ | --------------------------- |
| itineraryId | Required | int    | Itinerary name              |
| date        | Required | string | date                        |
| placeId     | Required | int    | Place id, more info in note |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 17,
    "itineraryId": 1,
    "date": "2023-01-01T12:23:45Z",
    "Place": {
      "id": 39,
      "name": "Draft Land",
      "address": "106, Taiwan, Taipei City, Da’an District, Lane 248, Section 4, Zhongxiao E Rd, 2號1樓",
      "rating": 4.6,
      "url": "https://maps.google.com/?cid=17910841840250993798",
      "lat": 25.041,
      "lng": 121.554,
      "intro": "Bustling destination with a cool, understated ambiance serving innovative draft cocktails.",
      "image": "https://lh3.googleusercontent.com/places/ANXAkqE03mlVeXeg5wIh9Fpx7EaIYJoNhftvRaMrRJX4tcqUmYzs-vo2q4H0Vl0OrS7Z7nG16eIPfnKmxHBMKcDRZqaGadxR4HxUugg=s1600-w400"
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: ItineraryId is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Date is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: PlaceId is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Place not found"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Itinerary not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to create destination"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to get destination"
}
```

## PATCH /api/v1/destinations/ (Update destination order via date)

Update destination order via date

Note: authentication is required.

### Request Body

| Params        | Required | Type   | Description                                |
| ------------- | -------- | ------ | ------------------------------------------ |
| destinationId | Required | int    | destination id                             |
| date          | Required | string | time which plan to stay at the destination |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 17,
    "itineraryId": 1,
    "date": "2023-01-01T12:23:22Z",
    "Place": {
      "id": 39,
      "name": "Draft Land",
      "address": "106, Taiwan, Taipei City, Da’an District, Lane 248, Section 4, Zhongxiao E Rd, 2號1樓",
      "rating": 4.6,
      "url": "https://maps.google.com/?cid=17910841840250993798",
      "lat": 25.041,
      "lng": 121.554,
      "intro": "Bustling destination with a cool, understated ambiance serving innovative draft cocktails.",
      "image": "https://lh3.googleusercontent.com/places/ANXAkqE03mlVeXeg5wIh9Fpx7EaIYJoNhftvRaMrRJX4tcqUmYzs-vo2q4H0Vl0OrS7Z7nG16eIPfnKmxHBMKcDRZqaGadxR4HxUugg=s1600-w400"
    },
    "updatedAt": "2023-12-01T09:24:20.350Z"
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: DestinationId is required"
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: Date is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Destination not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to update destination"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to get destination"
}
```

## DELETE /api/v1/destinations/:destinationId (Delete specific destination via destination id)

Delete specific destination via destination id

### Path Variables

| Params        | Required | Type | Description    |
| ------------- | -------- | ---- | -------------- |
| destinationId | Required | int  | destination id |

### Response

Success | code : 200

```json
{
  "status": "success",
  "data": {
    "id": 17,
    "itineraryId": 1,
    "date": "2023-01-01T12:23:22.000Z",
    "Place": {
      "id": 39,
      "name": "Draft Land",
      "address": "106, Taiwan, Taipei City, Da’an District, Lane 248, Section 4, Zhongxiao E Rd, 2號1樓",
      "rating": 4.6,
      "url": "https://maps.google.com/?cid=17910841840250993798",
      "lat": 25.041,
      "lng": 121.554,
      "intro": "Bustling destination with a cool, understated ambiance serving innovative draft cocktails.",
      "image": "https://lh3.googleusercontent.com/places/ANXAkqE03mlVeXeg5wIh9Fpx7EaIYJoNhftvRaMrRJX4tcqUmYzs-vo2q4H0Vl0OrS7Z7nG16eIPfnKmxHBMKcDRZqaGadxR4HxUugg=s1600-w400"
    }
  }
}
```

Failure Response | code : 400

```json
{
  "status": "error",
  "message": "Error: DestinationId is required"
}
```

Failure Response | code : 401

```json
{
  "status": "error",
  "message": "unauthorized"
}
```

Failure Response | code : 404

```json
{
  "status": "error",
  "message": "Error: Destination not found"
}
```

Failure Response | code : 500

```json
{
  "status": "error",
  "message": "Error: Failed to delete destination"
}
```
