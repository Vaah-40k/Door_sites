const jwt = require("jsonwebtoken");

module.exports = function createJWTToken(userData) {
  const accessToken = jwt.sign(userData, process.env.JWTSECRETKEYACCESS, {
    expiresIn: "60m",
  });
  const refreshToken = jwt.sign(
    { id_user: userData.id_user },
    process.env.JWTSECRETKEYREFRESH,
    { expiresIn: "7d" },
  );
  return { tokenJWTAccess: accessToken, tokenJWTRefresh: refreshToken };
};
