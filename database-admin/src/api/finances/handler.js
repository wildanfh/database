const ClientError = require("../exceptions/ClientError");

class FinancesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postFinanceHandler(request, h) {
    try {
      this._validator.validateFinancePayload(request.payload);
      const { tgl, jumlah } = request.payload;
      const financeId = await this._service.addFinance({ tgl, jumlah });

      const response = h.response({
        status: "success",
        message: "Detail pembayaran berhasil ditambahkan",
        data: {
          financeId,
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: "error",
        message: "Maaf. terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getFinanceByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const finance = await this._service.getFinanceById(id);
      return {
        status: "success",
        data: {
          finance,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: "error",
        message: "Maaf. terjadi kegagalan pada server kami.",
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = FinancesHandler;