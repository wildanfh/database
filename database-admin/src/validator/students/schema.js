const Joi = require("joi");

const studentPayloadSchema = Joi.object({
  id_kelas: Joi.string().required(),
  nama: Joi.string().required(),
  jenis_kelamin: Joi.string().required(),
  tempat_lahir: Joi.string().required(),
  tanggal_lahir: Joi.string().required(),
  sekolah_asal: Joi.string().required(),
  alamat: Joi.string().required(),
  no_hp: Joi.string().required(),
});

module.exports = { studentPayloadSchema };