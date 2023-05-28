# Nodejs Expressjs MongoDB - API Project Structure

A ready-to-use boilerplate for REST API Development with Node.js, Express, and MongoDB

## Getting started

This is a basic API skeleton written in JavaScript. Very useful to building a RESTful web APIs for your front-end platforms like Android, iOS or JavaScript frameworks (Angular, Reactjs, etc).

This project will run on **NodeJs** using **MongoDB** as database. I had tried to maintain the code structure easy as any beginner can also adopt the flow and start building an API. Project is open for suggestions, Bug reports and pull requests.

## Features

- Basic Authentication (Register/Login with hashed password)
- Account confirmation with 4 (Changeable) digit OTP.
- Email helper ready just import and use.
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
- Pre-defined response structures with proper status codes.
- Included CORS.
- **Book** example with **CRUD** operations.
- Validations added.
- Included API collection for Postman.
- Light-weight project.
- Test cases with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
- Included CI (Continuous Integration) with [Travis CI](https://travis-ci.org).
- Linting with [Tslint](https://palantir.github.io/tslint/).


## Software Requirements
- Node.js **>=18**
- MongoDB **7+**


## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/luuthuong/mern-app.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject/backend
npm install
```


1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.


## Project structure

```sh
.
├── src
    ├── config
    |   ├── common-routes.config.ts
    |   └── token.config.ts
    └── controllers
    |   ├── auth.controller.ts
    |   └── basket.controller.ts
    └── database
    |   ├── schemas
    |   |   ├── basket.schema.ts
    |   |   ├── user.schema.ts
    |   |   └──  index.ts
    |   └── types
    |       ├── basket.type.ts
    |       ├── user.type.ts
    |       └── index.ts
    ...
```

