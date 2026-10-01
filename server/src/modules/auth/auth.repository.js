const User = require("../users/user.model");

const authRepository = {
  findByEmail(email) {
    return User.findOne({ email });
  },

  createUser(data) {
    return User.create(data);
  },
};

module.exports = authRepository;
