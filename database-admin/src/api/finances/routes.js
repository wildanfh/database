const routes = (handler) => [
  {
    method: 'POST',
    path: '/finances',
    handler: handler.postFinanceHandler,
  },
  {
    method: 'GET',
    path: '/finances/{id}',
    handler: handler.getFinanceByIdHandler,
  },
];

module.exports = routes;