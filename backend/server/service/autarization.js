const path = require("path");
const bcryptjs = require("bcryptjs");
const { User, administrator } = require("../bd/indexdb");
const createJWTToken = require("./JWT/createJWTToken");

module.exports = async function authorizeUser(email, password) {
  // Ищем пользователя
  let user = await User.findOne({ where: { email } });
  let isAdmin = false;

  if (!user) {
    // Если пользователь не найден, ищем администратора
    const admin = await administrator.findOne({ where: { email } });
    if (!admin) {
      throw new Error("Пользователь с таким email не найден");
    }
    // Проверяем пароль администратора
    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Неверный пароль");
    }
    user = admin; // используем объект администратора
    isAdmin = true;
  } else {
    // Проверяем пароль обычного пользователя
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Неверный пароль");
    }
  }

  // Подготавливаем данные для токена
  const tokenPayload = {
    id_user: user.id_user || user.ID_administrator, // у администратора поле ID_administrator
    role: isAdmin ? "administrator" : "user",
  };

  const tokens = createJWTToken(tokenPayload);

  return {
    id_user: tokenPayload.id_user,
    accessToken: tokens.tokenJWTAccess,
    refreshToken: tokens.tokenJWTRefresh,
    role: tokenPayload.role, // возвращаем роль для клиента (опционально)
  };
};
