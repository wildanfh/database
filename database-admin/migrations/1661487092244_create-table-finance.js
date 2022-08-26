/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('finance', {
    id_siswa: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    tgl_bayar: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    jumlah: {
      
    }

  });
};

exports.down = pgm => {};
