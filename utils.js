const users = require("./users");
const resolveUserRoles = (user) => {
  const userWithRole = users.find((u) => u.id === user.id);
  return userWithRole.role;
}

module.exports = {
  resolveUserRoles
}
