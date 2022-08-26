const ClientError = require("../exceptions/ClientError");

class StudentsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postStudentHandler = this.postStudentHandler.bind(this);
    this.getStudentsHandler = this.getStudentsHandler.bind(this);
    this.getStudentByIdHandler = this.getStudentByIdHandler.bind(this);
    this.putStudentByIdHandler = this.putStudentByIdHandler.bind(this);
    this.deleteStudentByIdHandler = this.deleteStudentByIdHandler.bind(this);
  }

  async postStudentHandler(request, h) {
    try {
      this._validator.validateStudentPayload(request.payload);
      const { id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp } = request.payload;

      const studentId = await this._service.addStudent({ id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp });

      const response = h.response({
        status: "success",
        message: "Data murid berhasil ditambahkan",
        data: {
          studentId,
        },
      });
      response.code(201);
      return response
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

  async getStudentsHandler() {
    const students = await this._service.getStudents();

    return {
      status: "success",
      data: {
        students,
      },
    };
  }

  async getStudentByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const student = await this._service.getStudentById(id);

      return {
        status: "success",
        data: {
          student,
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

  async putStudentByIdHandler(request, h) {
    try {
      this._validator.validateStudentPayload(request.payload);
      const { id } = request.params;

      await this._service.editStudentById(id, request.payload);

      return {
        status: "success",
        message: "Data murid berhasil diperbarui",
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

  async deleteStudentByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteStudentById(id);

      return {
        status: "success",
        message: "Data murid berhasil dihapus",
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

module.exports = StudentsHandler;