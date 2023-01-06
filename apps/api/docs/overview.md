# Overview

The API is written in TypeScript using NestJS. The entry point to the application is `main.ts` which calls a function to bootstrap our application. To start the application in development mode, you can invoke the command `yarn dev`. This command will watch your files, automatically recompiling and reloading the server.

The application consists of a collection of modules, which contain one or more of the following components.

## Controllers

Controllers are responsible for handling incoming requests and returning responses to the client. 