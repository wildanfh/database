const routes = (handler) => [
  {
    method: 'POST',
    path: '/students',
    handler: handler.postStudentHandler,
  },
  {
    method: 'GET',
    path: '/students',
    handler: handler.getStudentsHandler,
  },
  {
    method: 'GET',
    path: '/students/{id}',
    handler: handler.getStudentByIdHandler,
  },
  {
    method: 'PUT',
    path: '/students/{id}',
    handler: handler.putStudentByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/students/{id}',
    handler: handler.deleteStudentByIdHandler,
  },
];

module.exports = routes;