const InvariantError = require("../../api/exceptions/InvariantError");
const { studentPayloadSchema } = require('./schema');

const studentValidator = {
  validateStudentPayload: (payload) => {
    const validationResult = studentPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = studentValidator;