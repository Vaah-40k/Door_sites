const { User } = require("../../bd/indexdb");
const TokenVerifier = require("./verifyJWTToken");
const createJWTToken = require("./createJWTToken");

class RefreshTokenService {
  static async refreshTokens(refreshToken) {
    // 1. Проверить refresh токен
    const verification = TokenVerifier.verifyRefreshToken(refreshToken);
    if (!verification.valid) {
      throw new Error("Недействительный refresh токен");
    }

    // 2. Получить пользователя из БД по id из токена
    const { id_user } = verification.decoded;
    const user = await User.findByPk(id_user);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    // 3. Сгенерировать новую пару токенов
    const tokenPayload = {
      id_user: user.id_user,
    };
    const newTokens = createJWTToken(tokenPayload);

    return {
      accessToken: newTokens.tokenJWTAccess,
      refreshToken: newTokens.tokenJWTRefresh,
    };
  }
}

module.exports = RefreshTokenService;
