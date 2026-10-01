const userRepository = require("./user.repository");

const userService = {
  getUsers() {
    return userRepository.findAll();
  },

  getUserById(id) {
    return userRepository.findById(id).select("-password");
  },
};

module.exports = userService;
