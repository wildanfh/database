const InvariantError = require("../../api/exceptions/InvariantError");
const { financePayloadSchema } = require("./schema");

const financeValidator = {
  validateFinancePayload: (payload) => {
    const validationResult = financePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = financeValidator;