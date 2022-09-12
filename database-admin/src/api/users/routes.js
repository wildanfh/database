const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserByIdHandler,
  },
  {
    method: 'POST',
    path: '/users/{username}/{password}',
    handler: handler.verifyUsernameAndPasswordHandler,
    options: {
      state: {
        parse: true,
        failAction: 'error',
      }
    }
  }
];

module.exports = routes;