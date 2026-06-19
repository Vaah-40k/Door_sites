-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 08 2026 г., 17:13
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `door_site`
--

-- --------------------------------------------------------

--
-- Структура таблицы `administrators`
--

CREATE TABLE `administrators` (
  `ID_administrator` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `administrators`
--

INSERT INTO `administrators` (`ID_administrator`, `email`, `password`, `role`) VALUES
(1, 'eldarsibrimov18@gmail.com', '$2b$12$QfEfh4mMqVohnpE658716.q8ksBmQtzh4Ha1brhOznA1r6dfy8weS', 'administrator');

-- --------------------------------------------------------

--
-- Структура таблицы `all_door`
--

CREATE TABLE `all_door` (
  `id_door` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `width` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `thickness` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `basket`
--

CREATE TABLE `basket` (
  `id_basket` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `Id_tovar` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `full_price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `basket`
--

INSERT INTO `basket` (`id_basket`, `id_user`, `Id_tovar`, `quantity`, `full_price`, `createdAt`, `updatedAt`) VALUES
(2, 226, 4, 1, 333, '2026-05-28 22:49:13', '2026-05-28 22:49:13');

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE `cards` (
  `ID_cards` int(255) NOT NULL,
  `src_img` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `cards`
--

INSERT INTO `cards` (`ID_cards`, `src_img`, `title`, `price`, `size`, `alt`, `createdAt`, `updatedAt`) VALUES
(1, 'asdasd', 'qweqweq', 123213, '100x200', '', '0000-00-00 00:00:00.000000', '0000-00-00 00:00:00.000000'),
(2, '/img/doors/eco_veneer_white.jpg', 'Межкомнатная дверь Экошпон белая', 4500, '600x2000', 'Белая дверь из экошпона', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(3, '/img/doors/steel_entry_gray.jpg', 'Входная стальная дверь серая', 22500, '860x2050', 'Серая стальная входная дверь', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(4, '/img/doors/glass_oak.jpg', 'Дверь с остеклением Дуб', 8900, '700x2000', 'Межкомнатная дверь со вставкой из матового стекла', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(5, '/img/doors/laminate_walnut.jpg', 'Ламинированная дверь Орех', 3700, '800x2000', 'Дверь с ламинированным покрытием цвет орех', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(6, '/img/doors/accordion_white.jpg', 'Дверь-гармошка белая', 2100, '1000x2000', 'Складная дверь-гармошка для гардеробной', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(7, '/img/doors/solid_pine.jpg', 'Дверь из массива сосны', 15900, '700x2000', 'Цельная деревянная дверь из сосны', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(8, '/img/doors/double_glass.jpg', 'Двупольная дверь с остеклением', 27500, '1200x2100', 'Двустворчатая дверь для гостиной', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(9, '/img/doors/veneer_wenge.jpg', 'Шпонированная дверь Венге', 12100, '800x2000', 'Дверь из натурального шпона цвета венге', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(10, '/img/doors/fireproof_steel.jpg', 'Противопожарная дверца', 34200, '800x2000', 'Металлическая огнестойкая дверь', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(11, '/img/doors/pvc_white.jpg', 'ПВХ-дверь белая глянец', 5100, '600x2000', 'Влагостойкая дверь из ПВХ', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(12, '/img/doors/rustic_walnut.jpg', 'Дверь Рустик Орех', 18700, '900x2000', 'Дверь в деревенском стиле', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(13, '/img/doors/almond_eco.jpg', 'Экошпон Миндаль', 4300, '700x2000', 'Светлая дверь цвета миндаль', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(14, '/img/doors/black_metal_entry.jpg', 'Входная дверь чёрная', 31200, '860x2050', 'Черная металлическая дверь с терморазрывом', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(15, '/img/doors/white_glass_insert.jpg', 'Белая дверь со стеклом', 6700, '800x2000', 'Белая дверь с вертикальной стекловставкой', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(16, '/img/doors/stable_eco_beige.jpg', 'Дверь Стабильный эко беж', 3950, '600x2000', 'Бежевая дверь из экопластика', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(17, '/img/doors/loft_metal.jpg', 'Дверь Лофт металл', 28900, '1000x2100', 'Интерьерная дверь в стиле лофт', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(18, '/img/doors/oak_honey.jpg', 'Дуб мёд шпонированная', 13200, '800x2000', 'Дверь цвета медовый дуб', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(19, '/img/doors/wardrobe_sliding.jpg', 'Раздвижная дверь-купе', 10400, '1200x2000', 'Алюминиевая раздвижная система', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(20, '/img/doors/bamboo_eco.jpg', 'Экошпон Бамбук', 4800, '700x2000', 'Зеленоватая дверь под бамбук', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824'),
(21, '/img/doors/classic_white_panel.jpg', 'Классическая филенчатая белая', 7900, '800x2000', 'Филенчатая дверь из МДФ', '2026-05-29 12:36:13.215824', '2026-05-29 12:36:13.215824');

-- --------------------------------------------------------

--
-- Структура таблицы `messageuser`
--

CREATE TABLE `messageuser` (
  `ID_message` int(255) NOT NULL,
  `ID_User` int(255) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `messageuser`
--

INSERT INTO `messageuser` (`ID_message`, `ID_User`, `message`, `status`, `createdAt`, `updatedAt`) VALUES
(37, 240, '213', 'unread', '2026-05-25 12:53:56', '2026-05-25 12:53:56'),
(38, 240, '321', 'unread', '2026-05-25 12:54:02', '2026-05-25 12:54:02'),
(39, 240, '123', 'unread', '2026-05-25 12:54:05', '2026-05-25 12:54:05'),
(40, 241, 'asdasd', 'unread', '2026-05-25 13:18:10', '2026-05-25 13:18:10');

-- --------------------------------------------------------

--
-- Структура таблицы `order_door`
--

CREATE TABLE `order_door` (
  `id_order` int(255) NOT NULL,
  `id_door` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `trek_number` varchar(255) NOT NULL,
  `pick_up_point` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `test_card_tovara`
--

CREATE TABLE `test_card_tovara` (
  `ID_card` int(255) NOT NULL,
  `descriprion_primary` varchar(255) NOT NULL,
  `description_secundus` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `test_card_tovara`
--

INSERT INTO `test_card_tovara` (`ID_card`, `descriprion_primary`, `description_secundus`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'хуй', 'хуй дважды', 123, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'хуй', 'хуй дважды', 312, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'хуй', 'хуй дважды', 222, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'хуй', 'хуй дважды', 333, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `midlle_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`first_name`, `last_name`, `midlle_name`, `email`, `password`, `phone`, `createdAt`, `updatedAt`, `id_user`) VALUES
('Эдуард', 'Эдуард', 'Антонович', 'eldarasdasdsibrimov18@gmail.com', '$2b$12$C3lToHyLINwCnuf2/QfjJ.BNkibh3dO94g8aaVVAiHT5BLmY.m98q', '78412545855', '2026-05-24 23:26:38', '2026-05-24 23:26:38', 225),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimov18@gmail.com', '$2b$12$bebF3aF4OjFXI3eHWO/teu.Ms4Z7SwrTLosjmBMzhE/Kvl6THo4eq', '82542522222', '2026-05-25 00:45:26', '2026-05-25 00:45:26', 226),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsisbrimov18@gmail.com', '$2b$12$ocgwP5Zl8PuA2/t8g0t94.sd.YSjlrWR4paz.XLURL7jeekYBZuFK', '78412545855', '2026-05-25 00:47:17', '2026-05-25 00:47:17', 227),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsasdibrimov18@gmail.com', '$2b$12$N2wDxMeeZ1k4F6hxGQTWyuQmrlvgHYuGFXmD/Aglut9AWeja1e5D6', '78412545855', '2026-05-25 00:47:54', '2026-05-25 00:47:54', 228),
('Эдуард', 'Эдуард', 'Антонович', 'elsddarsibrimov18@gmail.com', '$2b$12$cfXPIG5I4aLHRSpShgjdEuWOjRydVTlZy71Bwh.grL5nh9PB1T3le', '82542522222', '2026-05-25 00:48:45', '2026-05-25 00:48:45', 229),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimasdasdov18@gmail.com', '$2b$12$QfEfh4mMqVohnpE658716.q8ksBmQtzh4Ha1brhOznA1r6dfy8weS', '78412545855', '2026-05-25 00:51:23', '2026-05-25 00:51:23', 230),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibasdrimov18@gmail.com', '$2b$12$UIfL27mivsx30i0qBs8Edu5Bkd9CsQp7R6stLHz9XDnswYTQObPhq', '78412545855', '2026-05-25 01:57:09', '2026-05-25 01:57:09', 231),
('Эдуард', 'Эдуард', 'Антонович', 'eadasdsdldarsibrimov18@gmail.com', '$2b$12$fVvgsCveLL.6ugEfGhkAd.o25amANFuTKwTuAhBYonGYwtfxYbiHC', '78412545855', '2026-05-25 02:25:59', '2026-05-25 02:25:59', 232),
('Эдуард', 'Эдуард', 'Антонович', 'ASDASDeldarsibrimov18@gmail.com', '$2b$12$MI4QfvC5MYi2dXt5A3qiOOcZt/FTPhfTJWWzt0OOFW1J7JOaYCidC', '82542522222', '2026-05-25 02:30:10', '2026-05-25 02:30:10', 233),
('Эдуард', 'Эдуард', 'Антонович', 'eldASDarsibrimov18@gmail.com', '$2b$12$ER.BbQDA9nq1lJaQ1csb0OW5TY5a5CeEJiAWpt5WvgUUQcZXZrrr6', '78412545855', '2026-05-25 02:30:38', '2026-05-25 02:30:38', 234),
('Эдуард', 'Эдуард', 'Антонович', 'asdaasdasdsdeldarsibrimov18@gmail.com', '$2b$12$Pr2TkvLjF1XB1rvR3uYTJeFK284RvwJVcgwq2XOI2OaPk1YwjshlO', '82542522222', '2026-05-25 02:35:44', '2026-05-25 02:35:44', 235),
('Эдуард', 'Эдуард', 'Антонович', 'asdsdadsibrimov18@gmail.com', '$2b$12$WIv3d0oXjkoGvEx81hqM4.HaVVeV0T9JAACUGgvPcdE9l.DYMnYXC', '78412545855', '2026-05-25 02:36:44', '2026-05-25 02:36:44', 236),
('Эдуард', 'Эдуард', 'Антонович', 'elasdasdasddarsibrimov18@gmail.com', '$2b$12$x2/5lT2MfQW2Tzhxu6BJbuPGbc1lMSmTlrk.VlyGU5pgd1fdgQuZy', '78412545855', '2026-05-25 02:38:40', '2026-05-25 02:38:40', 237),
('Эдуард', 'Эдуард', 'Антонович', 'asdasddarsibrimov18@gmail.com', '$2b$12$h9HWEsknNcEWFHD4b5CZjuEsdlAXNMZOyQwBngfSRWN67QqYhOnrK', '78412545855', '2026-05-25 03:40:37', '2026-05-25 03:40:37', 238),
('Эдуард', 'Эдуард', 'Антонович', 'eldarssadibrimov18@gmail.com', '$2b$12$mK/LBPOtupICiNUXjy5E6eo28YgY7380AXfsPebbp2aatR.slug/y', '78412545855', '2026-05-25 12:19:51', '2026-05-25 12:19:51', 239),
('Эдуард', 'Эдуард', 'Антонович', 'eldarasdasdasibrimov18@gmail.com', '$2b$12$e3Re2oU9.9aWztFgD0SjJ.UkCoaCnetq3A9EfzsvxOpkAwvbS8Nn6', '78412545855', '2026-05-25 12:53:53', '2026-05-25 12:53:53', 240),
('Эдуард', 'Эдуард', 'Антонович', 'easdasdldarsibrimov18@gmail.com', '$2b$12$he6X0sv0cXOwFKWcDc51t.4Jp8TAS6afXD/WozdSRCNMDGPOrcNNu', '78584584565', '2026-05-25 13:18:08', '2026-05-25 13:18:08', 241),
('Кира', 'Лескова', 'сергеевна', 'kiraleskova2@gmail.com', '$2b$12$iBXqjruzfceih7Pmzc/aveEu.5gzBMX4HDqDpzXUA4QjOrSMsYmk.', '78888888888', '2026-05-29 00:46:23', '2026-05-29 00:46:23', 242),
('Кира', 'Лескова', 'ысфысоцс', 'leskovakira00@mail.ru', '$2b$12$CT0w5dTlH.sLZfXrX2T1ieQDY3fJ5zAex58B0k2LyA3pUWU2Knb22', '78888888888', '2026-05-29 09:33:02', '2026-05-29 09:33:02', 243),
('Кира', 'Лескова', 'сергеевна', 'sjdhasjsfsg18@gmail.com', '$2b$12$q/lHJl/bcHMUSaVrx5opqOvKrCpYF3M9KC9JkRR03skTb4B6FrRHy', '78888888888', '2026-06-08 12:27:07', '2026-06-08 12:27:07', 244);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`ID_administrator`);

--
-- Индексы таблицы `all_door`
--
ALTER TABLE `all_door`
  ADD PRIMARY KEY (`id_door`);

--
-- Индексы таблицы `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id_basket`);

--
-- Индексы таблицы `messageuser`
--
ALTER TABLE `messageuser`
  ADD PRIMARY KEY (`ID_message`);

--
-- Индексы таблицы `order_door`
--
ALTER TABLE `order_door`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `fk_door_site` (`id_door`),
  ADD KEY `fk_id_user` (`id_user`);

--
-- Индексы таблицы `test_card_tovara`
--
ALTER TABLE `test_card_tovara`
  ADD PRIMARY KEY (`ID_card`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `administrators`
--
ALTER TABLE `administrators`
  MODIFY `ID_administrator` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `all_door`
--
ALTER TABLE `all_door`
  MODIFY `id_door` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `basket`
--
ALTER TABLE `basket`
  MODIFY `id_basket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `messageuser`
--
ALTER TABLE `messageuser`
  MODIFY `ID_message` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `order_door`
--
ALTER TABLE `order_door`
  MODIFY `id_order` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `test_card_tovara`
--
ALTER TABLE `test_card_tovara`
  MODIFY `ID_card` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `order_door`
--
ALTER TABLE `order_door`
  ADD CONSTRAINT `fk_door_site` FOREIGN KEY (`id_door`) REFERENCES `all_door` (`id_door`),
  ADD CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
