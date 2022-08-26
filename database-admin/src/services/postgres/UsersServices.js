const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../api/exceptions/InvariantError');
const NotFoundError = require('../../api/exceptions/NotFoundError');
const AuthorizationsError = require('../../api/exceptions/AuthorizationError')

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password }) {
    await this.verifyNewUsername(username);

    const id = `user_${nanoid(8)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3) RETURNING id',
      values: [id, username, hashedPassword],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    }

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan');
    }
  }

  async getUsersHandler() {
    const result = await this._pool.query('SELECT * FROM users');

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows;
  }

  async getUserById(userId) {
    const query = {
      text:  'SELECT * FROM users WHERE id = $1',
      values: [userId],
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteUserById(userId) {
    const query = {
      text: 'DELETE FROM users WHERE id = $1 RETURNING id',
      values: [userId],
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyUsernameAndPassword({ username, password }) {
    const query = {
      text: 'SELECT * FROM users WHERE username LIKE $1',
      values: [`%${username}%`],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthorizationsError('Username salah');
    }

    const { usernameDb, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthorizationsError('Password salah');
    }

    return usernameDb;
  }
}

module.exports = UsersService;