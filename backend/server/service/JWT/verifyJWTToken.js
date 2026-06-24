// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

class TokenVerifier {
  // Проверка Access токена
  static verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRETKEYACCESS);
      return { valid: true, decoded };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return { valid: false, error: "Token expired" };
      }
      if (error.name === "JsonWebTokenError") {
        return { valid: false, error: "Invalid token" };
      }
      return { valid: false, error: error.message };
    }
  }

  // Проверка Refresh токена
  static verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTSECRETKEYREFRESH);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  // Middleware для защиты маршрутов
  static protect() {
    return (req, res, next) => {
      // Получаем токен из заголовка Authorization
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Доступ запрещен. Токен верификации не подлиный",
        });
      }

      const token = authHeader.split(" ")[1];
      const verification = this.verifyAccessToken(token);

      if (!verification.valid) {
        return res.status(403).json({
          success: false,
          message: "Недействительный или просроченный токен",
          error: verification.error,
        });
      }
      // Добавляем данные пользователя в запрос
      req.user = verification.decoded;

      next();
    };
  }
}

module.exports = TokenVerifier;
