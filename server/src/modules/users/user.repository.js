const User = require("./user.model");

const userRepository = {
  create(data) {
    return User.create(data);
  },

  findById(id) {
    return User.findById(id);
  },

  findByEmail(email) {
    return User.findOne({ email });
  },

  findAll() {
    return User.find().select("-password").sort({ createdAt: -1 });
  },
};

module.exports = userRepository;
