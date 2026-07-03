const Sequelize = require("sequelize");
const sequelize = new Sequelize("door_site", "root", "", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

const User = require("./modules/user")(sequelize);
const AllDoor = require("./modules/all_door")(sequelize);
const OrderDoor = require("./modules/order_door")(sequelize);
const messageUser = require("./modules/message_user")(sequelize);
const testCard = require("./modules/test_card")(sequelize);
const basket = require("./modules/basket")(sequelize);
const Cards = require("./modules/cards")(sequelize);
const application = require("./modules/application")(sequelize);
const administrator = require("./modules/administrators")(sequelize);
const AdminReply = require("./modules/AdminReply")(sequelize);
module.exports = {
  User,
  AllDoor,
  OrderDoor,
  messageUser,
  testCard,
  basket,
  Cards,
  application,
  administrator,
  AdminReply,
};
