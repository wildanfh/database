const ClientError = require("../exceptions/ClientError");

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
    this.verifyUsernameAndPasswordHandler = this.verifyUsernameAndPasswordHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const { username, password } = request.payload;

      const userId = await this._service.addUser({ username, password });

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getUsersHandler() {
    const users = await this._service.getUsers();

    return {
      status: 'success',
      data: {
        users,
      }
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const user = await this._service.getUserById(id);

      return {
        status: 'success',
        data: {
          user,
        }
      };
    } catch(error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteUserByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const userId = await this._service.deleteUserById(id);

      return {
        status: 'success',
        data: {
          userId,
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami',
    });
    response.code(500);
    console.error(error);
    return response;
    }
  }

  async verifyUsernameAndPasswordHandler(request, h) {
    try {
      const { username = '', password } = request.params;
      const users = await this._service.verifyUsernameAndPassword({ username, password });
      const response = h.response({
        status: 'success',
        data: {
          users,
        }
      })
      .state('cookie', {account: username});
      return response;
      // return {
      //   status: 'success',
      //   data: {
      //     users,
      //   }
      // }
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
  
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UsersHandler;