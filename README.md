# Minimalistic Stateless Microservice

[![Coverage Status](https://coveralls.io/repos/github/devdbrandy/minimalistic-microservice/badge.svg?branch=master)](https://coveralls.io/github/devdbrandy/minimalistic-microservice?branch=master)
![Docker Image CI](https://github.com/devdbrandy/minimalistic-microservice/workflows/Docker%20Image%20CI/badge.svg?branch=master)
![Node.js CI](https://github.com/devdbrandy/minimalistic-microservice/workflows/Node.js%20CI/badge.svg?branch=master)

## Overview

A simple minimalistic stateless microservice built with Node.js and Express.js, with showcasing three major functionalities:

1. Authentication
2. JSON patching
3. Image Thumbnail Generation

<!-- TOC depthFrom:2 -->

- [Overview](#overview)
- [1. :rocket: Getting Started](#1-rocket-getting-started)
  - [1.1 Prerequisites](#11-prerequisites)
  - [1.2. Run locally](#12-run-locally)
  - [1.3. Test Locally](#13-test-locally)
  - [1.4. Running Test](#14-running-test)
- [2. :lock: Authentication](#2-lock-authentication)
- [3. :bookmark: API Versioning](#3-bookmark-api-versioning)
- [3. :green_heart: HTTP Response Codes](#3-green_heart-http-response-codes)
- [4. :bookmark: Resources](#4-bookmark-resources)
  - [4.1. Authentication](#41-authentication)
  - [4.2. API Routes](#42-api-routes)
- [5. :pencil: License](#5-pencil-license)

<!-- /TOC -->

## 1. :rocket: Getting Started

### 1.1 Prerequisites

To get started, ensure that you have [NodeJS](https://nodejs.org/en/download/) installed on your local machine:

### 1.2. Run locally

- Clone repository or clone your own fork

  ```bash
  git clone https://github.com/devdbrandy/minimalistic-microservice.git
  ```

- Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.
  NB: After creating `.env` file, ensure that you set `APP_PKEY` to any secret phrase you want.
- Install dependencies by running `npm i` or `npm install` on your terminal.
- Two npm scripts are availiable to spin up the app server:
  - `npm run start` spin up the server without watching for any file changes
  - `npm run serve` watches for any file changes and reloads the server

### 1.3. Test Locally

To test or consume api locally, you can make use of [_Postman_](https://www.getpostman.com) or [_Insomnia_](https://insomnia.rest/download/)

### 1.4. Running Test

Test specs are implemented using [_mocha_](https://mochajs.org) + [_chai_](https://chiajs.com) + [_sinon_](https://sinonjs.org).

Two npm scripts are available to run the test suite:

1. `npm t` or `npm test` - Performs a single full test suite run, including instanbul code coverage reporting. Summary coverage reports are written to stdout, and detailed HTML reports are available in `/coverage/index.html`
2. `npm run test:watch` - This watches for any file changes and runs the full test suite.

## 2. :lock: Authentication

Access to restricted API endpoints requires an access token. To obtain your access token, make a request along with any dummy `username` and `password` credentials to `/login`.

**Sample Response:**

```http
POST http://localhost:3000/login
HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "...",
}
```

## 3. :bookmark: API Versioning

The second part of the URI specifies the API version you wish to access in the format `v{version_number}`.
For example, version 1 of the API (most current) is accessible via:

```http
  http://localhost:3000/api/v1
```

## 3. :green_heart: HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

## 4. :bookmark: Resources

### 4.1. Authentication

| URI                                            | HTTP Method | Description   |
| ---------------------------------------------- | :---------: | ------------- |
| [<code>**/login**</code>](/docs/POST_login.md) |   `POST`    | Account login |

### 4.2. API Routes

| URI                                                           | HTTP Method | Description              |
| ------------------------------------------------------------- | :---------: | ------------------------ |
| [<code>**/api/v1/thumbnail**</code>](/docs/POST_thumbnail.md) |   `POST`    | Generate image thumbnail |
| [<code>**/api/v1/jsonpatch**</code>](/docs/POST_jsonpatch.md) |   `POST`    | Generate json patch      |

## 5. :pencil: License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
