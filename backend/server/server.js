const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
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
  administrator,
  AdminReply,
  historiStateApplication,
} = require("./bd/indexdb");
const { where } = require("sequelize");

const pathToMainFile = path.join(__dirname, "..", "front", "index.html");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ХРАНИЛИЩЕ

const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "public",
  "img",
  "doors",
);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { files: 4 },
});

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
    const decoded = jwt.decode(token);
    const userId = decoded.id_user;

    // Сначала ищем в таблице пользователей
    let user = await User.findByPk(userId);
    let isAdmin = false;

    if (!user) {
      // Если не найден, ищем в администраторах
      const admin = await administrator.findByPk(userId);
      if (admin) {
        user = admin;
        isAdmin = true;
      }
    }

    if (!user) {
      return res.status(404).json({
        seccess: false,
        message: "Пользователь не найден",
      });
    }

    // Формируем ответ
    // У администратора нет полей first_name, last_name и т.д., поэтому заполняем их пустыми строками
    const response = {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      midlle_name: user.midlle_name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      seccess: true,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      seccess: false,
      message: `Ошибка нахождения пользователя в БД: ${err.message}`,
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

// МОДАЛКА
// показ сообщений админу
app.get("/show-all-message-user", async (req, res) => {
  try {
    // Проверяем, что запрос от администратора (можно через токен)
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    if (decoded.role !== "administrator") {
      return res
        .status(403)
        .json({ success: false, message: "Доступ запрещён" });
    }

    // Получаем все сообщения пользователей
    const userMessages = await messageUser.findAll();
    const userData = userMessages.map((m) => ({
      ...m.dataValues,
      sender: "user",
    }));

    // Получаем все ответы администратора
    const adminReplies = await AdminReply.findAll();
    const adminData = adminReplies.map((m) => ({
      ...m.dataValues,
      sender: "admin",
    }));

    // Объединяем
    const allMessages = [...userData, ...adminData];

    // Группируем по ID_User
    const groupData = allMessages.reduce((acc, msg) => {
      const userId = msg.ID_User;
      if (!acc[userId]) acc[userId] = [];
      acc[userId].push(msg);
      return acc;
    }, {});

    // Сортируем сообщения каждого пользователя по времени (от старых к новым)
    for (const userId in groupData) {
      groupData[userId].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
    }

    res.status(200).json({
      success: true,
      message: "Все сообщения и ответы",
      groupData,
    });
  } catch (err) {
    console.error("Ошибка получения сообщений:", err);
    res.status(500).json({
      success: false,
      message: "Ошибка получения сообщений",
      error: err.message,
    });
  }
});

// отправка админом сообщений
app.post("/admin/reply", TokenVerifier.protect(), async (req, res) => {
  try {
    // Проверяем роль
    if (req.user.role !== "administrator") {
      return res
        .status(403)
        .json({ success: false, message: "Доступ запрещён" });
    }

    const { ID_User, message } = req.body;
    if (!ID_User || !message) {
      return res.status(400).json({
        success: false,
        message: "ID пользователя и текст обязательны",
      });
    }

    // Создаём ответ
    const reply = await AdminReply.create({
      ID_User,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Ответ отправлен",
      data: {
        ...reply.dataValues,
        sender: "admin",
      },
    });
  } catch (err) {
    console.error("Ошибка отправки ответа:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
// показ сообщений пользователю
app.get("/user-messages", TokenVerifier.protect(), async (req, res) => {
  try {
    const userId = req.user.id_user;

    // Сообщения пользователя
    const userMessages = await messageUser.findAll({
      where: { ID_User: userId },
    });
    const userData = userMessages.map((m) => ({
      ...m.dataValues,
      sender: "user",
    }));

    // Ответы администратора
    const adminReplies = await AdminReply.findAll({
      where: { ID_User: userId },
    });
    const adminData = adminReplies.map((m) => ({
      ...m.dataValues,
      sender: "admin",
    }));

    // Объединяем и сортируем по createdAt (старые сверху)
    const allMessages = [...userData, ...adminData];
    allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.status(200).json({
      success: true,
      messages: allMessages,
    });
  } catch (err) {
    console.error("Ошибка получения сообщений пользователя:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// КАТАЛОГ
app.get("/show_cards", async (req, res) => {
  try {
    const response = await Cards.findAll();
    const data = response.map((item) => {
      const raw = item.dataValues;
      let images = [];
      try {
        images = JSON.parse(raw.src_img);
      } catch {
        images = [raw.src_img]; // на случай, если старый формат
      }
      return { ...raw, images }; // добавляем поле images
    });
    res.status(200).json({ data, success: true });
  } catch (err) {
    console.log("Ошибка отображения каталога", err);
    res.status(403).json({ err, success: false });
  }
});

app.post(
  "/add_card",
  TokenVerifier.protect(),
  upload.array("images", 4), // максимум 4 файла
  async (req, res) => {
    try {
      if (req.user.role !== "administrator") {
        return res
          .status(403)
          .json({ success: false, message: "Доступ запрещён" });
      }

      const {
        title,
        price,
        price_opt,
        price_small_opt,
        price_mrc,
        price_rrc,
        size,
        alt,
      } = req.body;

      // Валидация
      if (!title || !price || !size || !alt) {
        return res.status(400).json({
          success: false,
          message: "Заполните все обязательные поля: title, price, size, alt",
        });
      }

      const files = req.files || [];
      if (files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Загрузите хотя бы одно изображение",
        });
      }

      // 1. Создаём запись в БД с временным src_img
      const newCard = await Cards.create({
        src_img: JSON.stringify(["/src/assets/cart2.jpg"]), // временная заглушка
        title,
        price: Number(price),
        price_opt: price_opt ? Number(price_opt) : null,
        price_small_opt: price_small_opt ? Number(price_small_opt) : null,
        price_mrc: price_mrc ? Number(price_mrc) : null,
        price_rrc: price_rrc ? Number(price_rrc) : null,
        size,
        alt,
      });

      const cardId = newCard.dataValues.ID_cards; // получаем ID
      console.log(newCard);
      // 2. Создаём папку с именем ID карточки
      const folderPath = path.join(uploadDir, String(cardId));
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // 3. Сохраняем файлы с именами 1,2,3,4
      const savedPaths = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname); // например, .jpg
        const filename = `${i + 1}${ext}`; // 1.jpg, 2.png, ...
        const filePath = path.join(folderPath, filename);
        fs.writeFileSync(filePath, file.buffer);
        savedPaths.push(`/img/doors/${cardId}/${filename}`);
      }

      // 4. Обновляем запись в БД
      await newCard.update({
        src_img: JSON.stringify(savedPaths),
      });

      res.status(201).json({
        success: true,
        message: "Товар добавлен",
        data: newCard,
      });
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

// Удаление товара – удаляем папку по ID
app.delete("/remove_card", TokenVerifier.protect(), async (req, res) => {
  const id_tovar = req.headers.id_tovar;
  if (!id_tovar) {
    return res.status(400).json({ message: "нет такого товара" });
  }

  const card = await Cards.findByPk(id_tovar);
  if (!card) {
    return res.status(404).json({ message: "Карточка не найдена" });
  }

  // Удаляем папку с ID карточки
  const folderPath = path.join(uploadDir, String(id_tovar));
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Удалена папка: ${folderPath}`);
  }

  await Cards.destroy({ where: { id_cards: id_tovar } });

  res.status(200).json({ message: "Карточка успешно удалена" });
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
      const { quantity, price, full_price, title, size, src_img, adress } =
        item;
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
        adress,
        status: "в Обработке",
      });
    });
    const lastIDApplication = await application.findOne({
      order: [["id_application", "DESC"]],
    });
    const { adress } = items;
    const id_group_application =
      lastIDApplication.dataValues.id_group_application + 1;
    const defaultHistoriStatusApplication = async () => {
      await historiStateApplication.create({
        id_group_application,
        state_fortexs_DV: "Сборка заказа на складе Фортекс ДВ (Владивосток)",
        state_flagmen_DV: "-",
        state: "Сборка",
      });

      await historiStateApplication.create({
        id_group_application,
        state_fortexs_DV: "Заказ передан транспортной компании Флагмен ДВ",
        state_flagmen_DV: "Заказ принят, отправка из Владивостока",
        state: "Отправка",
      });

      await historiStateApplication.create({
        id_group_application,
        state_fortexs_DV: "-",
        state_flagmen_DV: "Транзит через Хабаровск (промежуточный узел)",
        state: "В пути",
      });

      await historiStateApplication.create({
        id_group_application,
        state_fortexs_DV: "-",
        state_flagmen_DV: `Доставлен в ${adress} || Доставлен в пункт назначения `,
        state: "Доставлен",
      });
    };
    defaultHistoriStatusApplication();
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
app.get(
  "/show-histori-state-application/:id_group_application",
  async (req, res) => {
    try {
      const { id_group_application } = req.params;
      const data = await historiStateApplication.findAll({
        where: {
          id_group_application: id_group_application,
        },
        raw: true,
      });
      let historiApplication = [];
      const last_state = data[data.length - 1].state;
      for (let i = 0; i < data.length; ++i) {
        if (data[i].state_fortexs_DV !== "-") {
          historiApplication.push(data[i].state_fortexs_DV);
        } else if (data[i].state_flagmen_DV !== "-") {
          historiApplication.push(data[i].state_flagmen_DV);
        }
      }
      res.status(200).json({ seccess: true, last_state, historiApplication });
      co;
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "История данного заказа отсутсвует" });
    }
    res.end();
  },
);
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
