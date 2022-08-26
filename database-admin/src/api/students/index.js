const StudentsHandler = require("./handler");
const routes = require('./routes');

module.exports = {
  name: "students",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const studentsHandler = new StudentsHandler(service, validator);
    server.route(routes(studentsHandler));
  }
}