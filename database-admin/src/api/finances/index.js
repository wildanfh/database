const FinancesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "finances",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const financeHandler = new FinancesHandler(service, validator);
    server.route(routes(financeHandler));
  }
}