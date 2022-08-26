/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('classes', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    nama_kls: {
      type: 'TEXT',
      notNull: true,
    },
    id_guru: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('classes');
};
