const nodemailer = require("nodemailer");
const fs = require("fs");
const { join } = require("path");
// Почту для отправки буду брать из JWT токена, сейчас пока напрямую из авторизации/регистрации
const mail = fs.readFileSync(join(__dirname, "mail.html"), "utf8");

module.exports = function sendMailer(emailUser) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Адрес SMTP сервера
    port: 587, // Порт (587 для TLS)
    secure: false, // true для порта 465
    auth: {
      user: process.env.EMAIL, // Ваш email
      pass: process.env.PASSWORD_GMAIL, // Пароль или специальный токен
    },
  });

  // 2. Формируем письмо
  const mailOptions = {
    from: `Магазин дверей --`, // От кого
    to: emailUser, // Кому
    subject: "Привет из Node.js", // Тема
    text: "Это просто текстовое сообщение", // Текстовая версия (для старых клиентов)
    html: mail, // HTML версия
  };

  // 3. Отправляем
  const sendEmail = async () => {
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log(
        `Письмо отправлено на почту ${emailUser} -, ${info.messageId1}`,
      );
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  sendEmail();
};
