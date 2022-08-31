/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('finances', {
    id_siswa: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    tgl_bayar: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    jumlah: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('finances');
};
