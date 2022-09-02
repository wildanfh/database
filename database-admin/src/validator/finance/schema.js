const Joi = require("joi");

const financePayloadSchema = Joi.object({
  id: Joi.string().required(),
  tgl: Joi.string().required(),
  jumlah: Joi.string().required(),
});

module.exports = { financePayloadSchema };