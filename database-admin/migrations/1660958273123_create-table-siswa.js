/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('students', {
    id_siswa: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    id_kelas: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    nama: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    jenis_kelamin: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    tempat_lahir: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    tanggal_lahir: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    sekolah_asal: {
      type: 'TEXT',
      notNull: true,
    },
    alamat: {
      type: 'TEXT',
      notNull: true,
    },
    no_hp: {
      type: 'VARCHAR(50)',
      notNull: true,
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('students');
};
