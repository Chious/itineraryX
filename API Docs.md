# API Docs

## Introduction

To use this API, you need to first obtain an Access Token from Spotify, and use
the Spotify Access Token to create an account.

Steps:
- Complete [Spotify's tutorial](https://developer.spotify.com/documentation/web-api/howtos/web-app-profile) to obtain a Spotify access token
- Create a user account by sending in your Spotify access token
- You will receive another token back from this API service, keep this token for future use

### Types of Access Tokens
- **Spotify access token**: used to access Spotify's API
- **API access token**: used to access this API service to access your categories, favorites, and shows


## Base URL

```
https://spotify-backend.alphacamp.io/
```

## Get the User Information

- HTTP method: `GET`

- Entry point: `/api/me`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Successful Response
```
{
    id: string,
    favoriteEpisodeIds: string[]
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 404: User not found

## Create an Account / Get a new API Access Token

- HTTP method: `POST`

- Entry point: `/api/users`

Use this to create an account on this API service using your Spotify Access Token, or to get a new API Access Token. You will receive an API token to use this API service.

- Request Body
```
{
    spotifyToken: string, 
}
```

`spotifyToken`: The access token you received from Spotify

- Sucessful Response
```
{
    id: string,
    favoriteEpisodeIds: string[],
    apiToken: string
}
```

`apiToken` is the token you need to access this API service.
You need to keep your Spotify access token to use Spotify's APIs.

- Error Responses
  - HTTP 403: Invalid Spotify Access Token

## Save the Episode to Favorites

- HTTP method: `POST`

- Entry point: `/api/episodes`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Request Body
```
{
    episodeId: string
}
```

- Successful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 409: User has already favorited this episode

## Remove the Episode from Favorites

- HTTP method: `DELETE`

- Entry point: `/api/episodes/<episodeId>`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Request Body
```
{}
```

- Successful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 404: Episode is not liked by the user


## Get the Categories － `/api/categories`

- HTTP method: `GET`

- Entry point: `/api/categories`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Successful Response
```
{
    categories:  [
        {
            id: string,
            name: string,
            savedShows: string[]
        },
        ...
    ]
}
```

- Response with no Data
```
{
    categories: []
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user


## Create a Category

- HTTP method: `POST`

- Entry point: `/api/categories`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Request Body
```
{
    name: string, 
}
```

- Sucessful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 409: Category with the same name already exists


## Update a Category Name

- HTTP method: `PUT`

- Entry point: `/api/categories/<categoryId>`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Request Body
```
{
    name: string, 
}
```

- Successful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 404: Category with this ID cannot be found
  - HTTP 409: Category with the same name already exists

## Delete a Category

- HTTP method: `DELETE`

- Entry point: `/api/categories/<categoryId>`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Successful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token / Category does not belong to user
  - HTTP 404: Category with this ID cannot be found

## Add a Show to a Category

- HTTP method: `POST`

- Entry point: `/api/categories/<categoryId>/shows`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Request Body
```
{
    showId: string, 
}
```

- Suceessful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 404: Category with this ID cannot be found
  - HTTP 409: Show has already been added to this category


## Remove a Show from a Category

- HTTP method: `DELETE`

- Entry point: `/api/categories/<categoryId>/shows/<showId>`

- Request Header
```
{
    Authorization: Bearer <Token>
}
```

- Successful Response
```
{
    success: true
}
```

- Error Responses
  - HTTP 403: Invalid token / Token does not belong to user
  - HTTP 404: Category or Show with this ID cannot be found