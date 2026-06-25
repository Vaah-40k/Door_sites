const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "..", "..", ".env"),
});
//sadadasdadasdsdasdad
app.use(cors());

const registration = require("./service/registration");
const authorizeUser = require("./service/autarization"); // исправлено имя
const TokenVerifier = require("./service/JWT/verifyJWTToken");
const RefreshTokenService = require("./service/JWT/updateToken"); // добавлен импорт

const {
  messageUser,
  testCard,
  basket,
  Cards,
  User,
  application,
} = require("./bd/indexdb");
const { where } = require("sequelize");

const pathToMainFile = path.join(__dirname, "..", "front", "index.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(pathToMainFile);
});

// Регистрация
app.post("/registration", async (req, res) => {
  try {
    const result = await registration(req.body);
    res.status(201).json({
      success: true,
      message: "Пользователь успешно создан",
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Ошибка регистрации",
      textMessageError: error.message,
    });
  }
});
// Авторизация
app.post("/authorization", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email и пароль обязательны" });
    }
    const result = await authorizeUser(email, password);
    res.json({
      success: true,
      message: "Авторизация успешна",
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Защищённый маршрут профиля
app.post("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id_user } = jwt.decode(token);
    const { first_name, last_name, midlle_name, email, phone } =
      await User.findByPk(id_user);
    res.status(200).json({
      first_name,
      last_name,
      midlle_name,
      email,
      phone,
      seccess: true,
    });
  } catch (err) {
    res.status(500).json({
      seccess: false,
      message: `Ошибка нахождения пользователя в БД, текст ошибки - ${err}`,
    });
  }
});

app.put("/update-profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id_user } = jwt.decode(token);
    const user = await User.findByPk(id_user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Такого пользователя нет БД", seccess: false });
    }
    const { first_name, last_name, midlle_name, email, phone } = req.body;
    const [updateData] = await User.update(
      {
        first_name,
        last_name,
        midlle_name,
        email,
        phone,
      },
      {
        where: {
          id_user,
        },
      },
    );
    res.status(200).json({
      success: true,
      first_name,
      last_name,
      midlle_name,
      email,
      phone,
    });
  } catch (err) {
    res.status(500).json({
      seccess: false,
      message: `Ошибка нахождения пользователя в БД, текст ошибки - ${err}`,
    });
  }
});

// Обновление токенов
app.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Refresh token обязателен" });
    }
    const newTokens = await RefreshTokenService.refreshTokens(refreshToken);
    res.json({ success: true, ...newTokens });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
});

app.post(
  "/send-message-user-to-administrator",
  // TokenVerifier.protect(),
  (req, res) => {
    const userID = jwt.decode(
      req.headers.authorization.split(" ")[1],
      process.env.JWTSECRETKEYACCESS,
    ).id_user;
    console.log(userID);
    try {
      messageUser.create({
        ID_User: userID,
        message: req.body.textUser,
        status: "непрочитан",
      });
      console.log("Пользователь написал новое сообщение ");
      res.status(200).json({
        success: true,
        status: "unread",
        message: "Пользователь написал новое сообщение",
      });
    } catch (err) {
      res.status(403).json({ success: false, message: err });
    }
  },
);

app.get("/show-all-message-user", async (req, res) => {
  try {
    const userID = jwt.decode(
      req.headers.authorization.split(" ")[1],
      process.env.JWTSECRETKEYACCESS,
    ).id_user;

    const allMessageSequelize = await messageUser.findAll({
      where: {
        ID_User: userID,
      },
    });
    const allMessage = allMessageSequelize.map((dataValues) =>
      dataValues.get({ plain: true }),
    );
    const data = JSON.stringify(allMessage);

    res.status(200).json({
      seccess: true,
      message: "Выведенны сообщения пользователя",
      allMessage,
    });
  } catch (err) {
    console.log("Произошла ошибка отображения сообщений пользоватлей - ", err);
    res.status(403).json({
      seccess: false,
      message: "Произошла ошибка отображения сообщений пользоватлей - ",
      err,
    });
  }
});

// КАТАЛОГ
app.get("/show_cards", async (req, res) => {
  try {
    const respone = await Cards.findAll();
    const data = respone.map((item) => item.dataValues);
    res.status(200).json({ data, seccess: true });
  } catch (err) {
    console.log("Ошибка отображения каталога");
    res.status(403).json({ err: err, seccess: false });
  }
});
// ========== КОРЗИНА ==========

// Добавление товара в корзину (авторизованный пользователь)
app.post("/basket/add", TokenVerifier.protect(), async (req, res) => {
  try {
    const userId = req.user.id_user; // из токена
    const { id_tovar, quantity = 1 } = req.body;
    if (!id_tovar) {
      return res
        .status(400)
        .json({ success: false, message: "ID товара обязателен" });
    }

    // Получаем цену товара из каталога
    const product = await Cards.findByPk(id_tovar);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден" });
    }
    const price = product.price;
    const full_price = price * quantity;

    // Ищем, есть ли уже этот товар в корзине пользователя
    const existingItem = await basket.findOne({
      where: { id_user: userId, Id_tovar: id_tovar },
    });

    if (existingItem) {
      // Обновляем количество и полную стоимость
      const newQuantity = existingItem.quantity + quantity;
      const newFullPrice = price * newQuantity;
      await existingItem.update({
        quantity: newQuantity,
        full_price: newFullPrice,
      });
      res.json({
        success: true,
        message: "Количество товара обновлено",
        item: existingItem,
      });
    } else {
      // Создаём новую запись
      const newItem = await basket.create({
        id_user: userId,
        Id_tovar: id_tovar,
        quantity: quantity,
        full_price: full_price,
        selected: 0,
      });
      res.status(201).json({
        success: true,
        message: "Товар добавлен в корзину",
        item: newItem,
      });
    }
  } catch (error) {
    console.error("Ошибка добавления в корзину:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Получение корзины пользователя (с деталями товаров)
app.get("/basket", TokenVerifier.protect(), async (req, res) => {
  try {
    const userId = req.user.id_user;
    const cartItems = await basket.findAll({ where: { id_user: userId } });

    // Для каждого элемента корзины подгружаем данные товара
    const itemsWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Cards.findByPk(item.Id_tovar);
        return {
          id_basket: item.id_basket,
          quantity: item.quantity,
          full_price: item.full_price,
          id_tovar: item.Id_tovar,
          src_img: product.src_img,
          title: product.title,
          price: product.price,
          size: product.size,
          alt: product.alt,
          selected: item.selected,
        };
      }),
    );

    res.json({ success: true, basket: itemsWithDetails });
  } catch (error) {
    console.error("Ошибка получения корзины:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Удаление товара из корзины (по id_basket)
app.delete("/basket/:id", TokenVerifier.protect(), async (req, res) => {
  try {
    const userId = req.user.id_user;
    const basketId = req.params.id;

    const item = await basket.findOne({
      where: { id_basket: basketId, id_user: userId },
    });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден в корзине" });
    }
    await item.destroy();
    res.json({ success: true, message: "Товар удалён из корзины" });
  } catch (error) {
    console.error("Ошибка удаления из корзины:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Обновление количества товара в корзине (опционально)
app.patch("/basket/:id", TokenVerifier.protect(), async (req, res) => {
  try {
    const userId = req.user.id_user;
    const basketId = req.params.id;

    const { quantity, selected } = req.body;

    const item = await basket.findOne({
      where: { id_basket: basketId, id_user: userId },
    });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден в корзине" });
    }

    const product = await Cards.findByPk(item.Id_tovar);
    const newFullPrice = product.price * quantity;

    await item.update({ quantity, full_price: newFullPrice, selected });
    res.json({
      success: true,
      message: "Количество обновлено",
      item,
      selected,
    });
  } catch (error) {
    console.error("Ошибка обновления количества:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Массовое удаление товаров из корзины
app.post("/remove-basket-many", async (req, res) => {
  try {
    const { idBaskets } = req.body;
    if (!idBaskets || !Array.isArray(idBaskets) || idBaskets.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Некорректный список ID" });
    }

    // Удаляем все записи, id которых есть в массиве
    const deletedCount = await basket.destroy({
      where: {
        id_basket: idBaskets,
      },
    });

    res.json({ success: true, deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// ========== ЗАКАЗЫ ==========
// создаёт заказ из корзины
app.post("/application-create", TokenVerifier.protect(), async (req, res) => {
  try {
    const items = req.body.items;

    items.map(async (item) => {
      const { id_user, Id_tovar } = await basket.findByPk(item.id_basket);
      delete item.id_basket;
      delete item.selected;
      const { quantity, price, full_price, title, size, src_img } = item;
      const lastIDApplication = await application.findOne({
        order: [["id_application", "DESC"]],
      });
      const id_group_application =
        lastIDApplication.dataValues.id_group_application + 1;
      const createApplication = await application.create({
        Id_tovar,
        id_user,
        quantity,
        price,
        full_price,
        id_group_application,
        title,
        size,
        src_img,
        status: "в Обработке",
      });
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log("Ошибка добавления товара в корзину ", err);
    res.status(500).json({ success: false });
  }
});
// показывает имеющиеся заказы
app.get("/application-show", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const idUser = jwt.decode(token);
    const respone = await application.findAll({
      where: {
        id_user: idUser.id_user,
      },
    });
    const data = respone.map((item) => {
      return item.dataValues;
    });

    res.status(200).json({ success: true, data });
  } catch (err) {
    {
      console.log("У клиента нет покупок");
      res
        .status(500)
        .json({ seccess: false, message: "У клиента нет покупок", err });
    }
  }
});

app.delete("/application-destroy/:id_application", async (req, res) => {
  try {
    const idApplication = req.params.id_application;
    const applicationDestoy = await application.destroy({
      where: {
        id_group_application: idApplication,
      },
    });

    res.status(200).json({ seccess: true });
  } catch (err) {
    res.status(500).json({
      seccess: false,
      message: "Произошла ошибка отмены заказов -",
      err,
    });
  }
});

// Выход
app.post("/logout", (req, res) => {
  res.json({ success: true, message: "Выход выполнен" });
});

const PORT = process.env.PORT || 3000;

const server = app
  .listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error("Ошибка: порт уже используется");
    } else {
      console.error("Ошибка при запуске сервера:", err);
    }
  });
