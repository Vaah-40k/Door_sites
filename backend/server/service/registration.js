const { User } = require("../bd/indexdb");
const bcryptjs = require("bcryptjs");
const createJWTToken = require("./JWT/createJWTToken");

module.exports = async function createUser(body) {
  // 1. Валидация
  const rules = {
    fioValidation: /^[А-Яа-яёЁ\s]+$/,
    emailValidation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneValidation: /^(7|8)\d{10}$/,
    passwordValidation:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  };
  if (
    !rules.fioValidation.test(body.first_name) ||
    !rules.fioValidation.test(body.last_name) ||
    !rules.fioValidation.test(body.midlle_name)
  ) {
    throw new Error("ФИО должно содержать только русские буквы и пробелы");
  }

  if (!rules.emailValidation.test(body.email)) {
    throw new Error("Некорректный email");
  }

  const existingUser = await User.findOne({ where: { email: body.email } });
  if (existingUser) {
    throw new Error("Пользователь с такой почтой уже существует");
  }

  const cleanPhone = body.phone.replace(/\D/g, "");
  if (!rules.phoneValidation.test(cleanPhone)) {
    throw new Error("Некорректный номер телефона (10 цифр после 7 или 8)");
  }

  if (body.password_one !== body.password_two) {
    throw new Error("Пароли не совпадают");
  }

  if (!rules.passwordValidation.test(body.password_one)) {
    throw new Error(
      "Пароль должен быть не менее 8 символов, содержать латиницу, цифру и спецсимвол",
    );
  }

  // 2. Хеширование и создание пользователя
  const passwordHash = await bcryptjs.hash(body.password_one, 12);

  const newUser = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    midlle_name: body.midlle_name || null,
    email: body.email,
    phone: cleanPhone,
    password: passwordHash,
  });

  // 3. Генерация токенов
  const tokenPayload = {
    id_user: newUser.id_user,
  };
  const tokens = createJWTToken(tokenPayload);

  return {
    success: true,
    id_user: newUser.id_user,
    accessToken: tokens.tokenJWTAccess,
    refreshToken: tokens.tokenJWTRefresh,
  };
};
