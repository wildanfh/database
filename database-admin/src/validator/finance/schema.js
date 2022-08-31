const Joi = require("joi");

const financePayloadSchema = Joi.object({
  tgl_bayar: Joi.string().required(),
  jumlah: Joi.string().required(),
});

module.exports = { financePayloadSchema };