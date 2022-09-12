const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require("../../api/exceptions/InvariantError");
const NotFoundError = require("../../api/exceptions/NotFoundError");
const AuthorizationError = require("../../api/exceptions/AuthorizationError");
const { mapDBToModel } = require('../../utils');

class FinancesServices {
  constructor(service) {
    this._pool = new Pool();
    this._service = service;
  }

  async addFinance({ bulan, id, tgl, jumlah }) {
    const query = {
      text: "INSERT INTO finances VALUES($1, $2, $3, $4) RETURNING id_siswa",
      values: [bulan, id, tgl, jumlah],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id_siswa) {
      throw new InvariantError("Detail pembayaran gagal ditambahkan");
    }

    return result.rows[0].id_siswa;
  }

  async getFinanceById(id) {
    const query = {
      text: "SELECT * FROM finances WHERE id_siswa = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Detail Pembayaran gagal ditemukan');
    }

    return result.rows;
  }
};

module.exports = FinancesServices;