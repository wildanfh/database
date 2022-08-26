require('dotenv').config();

const Hapi = require('@hapi/hapi');

// students
const students = require('./api/students');
const StudentsService = require('./services/postgres/StudentsService');
const StudentsValidator = require('./validator/students');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersServices');
const UsersValidator = require('./validator/users');

const init = async () => {
  const usersService = new UsersService();
  const studentsService = new StudentsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: students,
      options: {
        service: studentsService,
        validator: StudentsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();