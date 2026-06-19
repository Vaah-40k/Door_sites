const path = require("path");
const bcryptjs = require("bcryptjs");
const { User } = require("../bd/indexdb");
const createJWTToken = require("./JWT/createJWTToken");

module.exports = async function authorizeUser(email, password) {
  // Найти пользователя по email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Пользователь с таким email не найден");
  }

  // Проверить пароль
  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }

  // Подготовить данные для токена (без чувствительной информации)
  const tokenPayload = {
    id_user: user.id_user,
    role: user.role || "user",
  };

  const tokens = createJWTToken(tokenPayload);

  return {
    id_user: user.id_user,
    accessToken: tokens.tokenJWTAccess,
    refreshToken: tokens.tokenJWTRefresh,
  };
};
