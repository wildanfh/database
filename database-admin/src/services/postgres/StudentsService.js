const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../api/exceptions/InvariantError");
const NotFoundError = require("../../api/exceptions/NotFoundError");
const AuthorizationError = require("../../api/exceptions/AuthorizationError");
const { mapDBToModel } = require('../../utils');

class StudentsService {
  constructor() {
    this._pool = new Pool();
  }

  async addStudent({ id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp }) {
    const id = `stud_${nanoid(8)}`;

    const query = {
      text: "INSERT INTO students VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_siswa",
      values: [id, id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp],
    }

    const result = await this._pool.query(query);
    if(!result.rows[0].id_siswa) {
      throw new InvariantError("Data murid gagal ditambahkan");
    }

    return result.rows[0].id_siswa;
  }

  async getStudents() {
    const query = "SELECT * FROM students";
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModel);
  }

  async getStudentById(id) {
    const query = {
      text: "SELECT * FROM students WHERE id_siswa = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Data murid tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editStudentById(id, { id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp }) {
    const query = {
      text: "UPDATE students SET id_kelas = $1, nama = $2, jenis_kelamin = $3, tempat_lahir = $4, tanggal_lahir = $5, sekolah_asal = $6, alamat = $7, no_hp = $8 WHERE id_siswa = $9 RETURNING id_siswa",
      values: [id_kelas, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, sekolah_asal, alamat, no_hp, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui data siswa. Id tidak ditemukan');
    }
  }

  async deleteStudentById(id) {
    const query = {
      text: 'DELETE FROM students WHERE id_siswa = $1 RETURNING id_siswa',
      values: [id],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new NotFoundError('Data siswa gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = StudentsService;
