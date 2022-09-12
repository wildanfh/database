const Joi = require("joi");

const financePayloadSchema = Joi.object({
  bulan: Joi.string().required(),
  id: Joi.string().required(),
  tgl: Joi.string().required(),
  jumlah: Joi.string().required(),
});

module.exports = { financePayloadSchema };