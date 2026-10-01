const userService = require("./user.service");

const userController = {
  async getUsers(req, res) {
    const users = await userService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  },

  async getUserById(req, res) {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  },
};

module.exports = userController;
