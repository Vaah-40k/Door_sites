-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 03 2026 г., 01:57
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
-- Структура таблицы `application`
--

CREATE TABLE `application` (
  `id_application` int(255) NOT NULL,
  `id_group_application` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `Id_tovar` int(255) NOT NULL,
  `adress` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `full_price` int(255) NOT NULL,
  `price` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `src_img` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `application`
--

INSERT INTO `application` (`id_application`, `id_group_application`, `id_user`, `Id_tovar`, `adress`, `status`, `quantity`, `full_price`, `price`, `title`, `size`, `src_img`, `createdAt`, `updatedAt`) VALUES
(48, 5, 264, 6, 'хуй твой', '', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-17 06:19:34', '2026-06-17 06:19:34'),
(49, 6, 264, 6, 'хуй твой', 'в asddasdsadsdadasds', 1, 0, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-17 06:48:05', '2026-06-17 06:48:05'),
(50, 6, 264, 5, 'хуй твой', 'в asddasdsadsdadasds', 1, 0, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-17 06:48:05', '2026-06-17 06:48:05'),
(51, 6, 264, 16, 'хуй твой', 'в asddasdsadsdadasds', 1, 0, 3950, 'Дверь Стабильный эко беж', '600x2000', '/img/doors/stable_eco_beige.jpg', '2026-06-17 06:48:05', '2026-06-17 06:48:05'),
(52, 7, 265, 6, 'хуй твой', 'в Обработке', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-17 08:57:12', '2026-06-17 08:57:12'),
(53, 8, 265, 5, 'хуй твой', 'в Обработке', 1, 3700, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-17 08:57:26', '2026-06-17 08:57:26'),
(54, 8, 265, 6, 'хуй твой', 'в Обработке', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-17 08:57:26', '2026-06-17 08:57:26'),
(55, 9, 264, 5, 'хуй твой', 'в Обработке', 7, 0, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-18 08:42:01', '2026-06-18 08:42:01'),
(56, 9, 264, 6, 'хуй твой', 'в Обработке', 6, 0, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-18 08:42:01', '2026-06-18 08:42:01'),
(57, 10, 264, 6, 'хуй твой', 'в Обработке', 4, 8400, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-18 09:12:51', '2026-06-18 09:12:51'),
(58, 11, 264, 6, 'хуй твой', 'в Обработке', 21, 44100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-18 09:13:16', '2026-06-18 09:13:16'),
(64, 12, 267, 6, 'хуй твой', 'в Обработке', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-21 04:09:38', '2026-06-21 04:09:38'),
(65, 12, 267, 5, 'хуй твой', 'в Обработке', 1, 3700, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-21 04:09:38', '2026-06-21 04:09:38'),
(66, 13, 268, 5, 'хуй твой', 'в Обработке', 1, 3700, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-22 04:43:14', '2026-06-22 04:43:14'),
(68, 15, 272, 6, 'хуй твой', 'в Обработке', 8, 16800, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-24 02:17:33', '2026-06-24 02:17:33'),
(69, 16, 272, 6, 'хуй твой', 'в Обработке', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-24 02:23:30', '2026-06-24 02:23:30'),
(70, 16, 272, 5, 'хуй твой', 'в Обработке', 17, 62900, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-24 02:23:30', '2026-06-24 02:23:30'),
(73, 18, 272, 6, 'хуй твой', 'в Обработке', 2, 4200, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-24 02:25:53', '2026-06-24 02:25:53'),
(78, 20, 250, 6, 'хуй твой', 'в Обработке', 1, 2100, 2100, 'Дверь-гармошка белая', '1000x2000', '/img/doors/accordion_white.jpg', '2026-06-24 11:46:47', '2026-06-24 11:46:47'),
(79, 21, 278, 18, 'хуй твой', 'в Обработке', 1, 13200, 13200, 'Дуб мёд шпонированная', '800x2000', '/img/doors/oak_honey.jpg', '2026-06-26 09:20:07', '2026-06-26 09:20:07'),
(80, 21, 278, 5, 'хуй твой', 'в Обработке', 1, 3700, 3700, 'Ламинированная дверь Орех', '800x2000', '/img/doors/laminate_walnut.jpg', '2026-06-26 09:20:07', '2026-06-26 09:20:07');

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
  `selected` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `basket`
--

INSERT INTO `basket` (`id_basket`, `id_user`, `Id_tovar`, `quantity`, `full_price`, `selected`, `createdAt`, `updatedAt`) VALUES
(2, 226, 4, 1, 333, 0, '2026-05-28 22:49:13', '2026-05-28 22:49:13'),
(10, 246, 1, 2, 246426, 0, '2026-05-30 00:02:32', '2026-05-30 00:02:44'),
(13, 247, 1, 33, 4066029, 0, '2026-05-30 00:03:53', '2026-05-30 00:07:26'),
(16, 248, 1, 2, 246426, 0, '2026-05-30 02:48:00', '2026-05-30 02:48:10'),
(18, 249, 1, 1, 123213, 0, '2026-05-31 20:57:05', '2026-05-31 20:57:05'),
(20, 251, 1, 2, 246, 0, '2026-06-09 23:14:27', '2026-06-09 23:14:31'),
(21, 252, 1, 1, 123, 0, '2026-06-09 23:17:30', '2026-06-09 23:17:30'),
(22, 253, 1, 1, 123, 0, '2026-06-09 23:24:52', '2026-06-09 23:24:52'),
(23, 254, 1, 23, 2829, 0, '2026-06-09 23:41:01', '2026-06-10 02:21:37'),
(24, 258, 1, 3, 369, 0, '2026-06-10 03:24:44', '2026-06-10 03:24:47'),
(61, 262, 6, 1, 2100, 0, '2026-06-12 13:34:37', '2026-06-12 13:34:37'),
(95, 265, 6, 1, 2100, 0, '2026-06-17 09:11:21', '2026-06-17 09:11:21'),
(105, 264, 6, 1, 2100, 0, '2026-06-18 09:13:35', '2026-06-18 09:13:35'),
(106, 264, 5, 1, 3700, 0, '2026-06-18 09:13:46', '2026-06-18 09:13:46'),
(116, 271, 6, 3, 6300, 0, '2026-06-24 02:03:21', '2026-06-24 02:04:11'),
(135, 250, 6, 1, 2100, 0, '2026-06-24 11:47:13', '2026-06-24 11:47:13'),
(136, 250, 5, 1, 3700, 0, '2026-06-24 11:47:16', '2026-06-24 11:47:16'),
(137, 250, 16, 1, 3950, 1, '2026-06-24 11:47:18', '2026-06-24 11:47:34'),
(138, 250, 13, 1, 4300, 0, '2026-06-24 11:47:19', '2026-06-24 11:47:19'),
(139, 250, 2, 1, 4500, 0, '2026-06-24 11:47:22', '2026-06-24 11:47:22'),
(140, 250, 11, 1, 5100, 0, '2026-06-24 11:47:25', '2026-06-24 11:47:25'),
(141, 250, 20, 1, 4800, 0, '2026-06-24 11:47:28', '2026-06-24 11:47:28'),
(144, 278, 6, 1, 2100, 0, '2026-06-26 12:47:32', '2026-06-26 12:47:32'),
(145, 278, 5, 1, 3700, 1, '2026-06-26 12:47:33', '2026-06-26 12:47:38'),
(146, 278, 16, 4, 15800, 1, '2026-06-26 12:47:35', '2026-06-26 12:47:40');

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE `cards` (
  `id_cards` int(255) NOT NULL,
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

INSERT INTO `cards` (`id_cards`, `src_img`, `title`, `price`, `size`, `alt`, `createdAt`, `updatedAt`) VALUES
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
(40, 241, 'asdasd', 'unread', '2026-05-25 13:18:10', '2026-05-25 13:18:10'),
(41, 275, '12', 'непрочитан', '2026-06-25 12:43:57', '2026-06-25 12:43:57'),
(42, 275, ' Телеканалы Что посмотреть Каналы, фильмы, передачи Настроить страницу VHS-Детский VHS-Детский: телепрограмма на завтра (о канале) Меню Пн 22 июня Вт 23 июня Вчера 24 июня Сегодня 25 июня Завтра 26 июня Сб 27 июня Вс 28 июня Монстры на каникулах 05:40 Монстры на каникулах мульт  Граф Дракула для себя и своей любимой дочки построил хорошо укрытый от посторонних глаз отель, куда монстры со всего света приезжают отдохнуть от семейных забот, повседневной суеты и, конечно... людей. Но вездесущие американские туристы проникают и сюда. Муравей Антц 07:00 Муравей Антц мульт  Большой муравейник поделён на две части: там живут муравьи-рабочие и муравьи-солдаты. Рабочие трудятся с утра до ночи, а солдаты воюют с термитами под командованием властного и завистливого генерала Мэндибала. Так было всегда. Однажды в бар на танцы тайно приходит… Облачно, возможны осадки в виде фрикаделек 08:15 Облачно, возможны осадки в виде фрикаделек мульт  Главный герой мультфильма — странный ученый Флинт Локвуд, который всегда хотел изобрести что-то такое, что сделает его родной городок счастливым. И вот, у него получилось! Еды теперь хватает всем, и она просто падает с неба, создавая новые пейзажи вокруг: можно любоваться… Бесстрашные бурундуки 09:35 Бесстрашные бурундуки: 16–19 серии мульт  Приключения отважных и решительных бурундуков. Подводная братва 11:00 Подводная братва мульт  Добро пожаловать в подводный мегаполис, где живет рыбка по имени Оскар! Больше всего на свете малыш мечтает стать знаменитым. Оскар все время лезет на рожон и вытворяет безумные вещи, лишь бы обратить на себя внимание. Однажды он случайно оказывается на месте гибели… Приключения мистера Пибоди и Шермана 12:15 Приключения мистера Пибоди и Шермана мульт  Мистер Пибоди — бизнесмен, изобретатель, ученый, нобелевский лауреат, гурман, двукратный олимпийский чемпион и гений... который, кроме всего прочего, является собакой. При помощи своего самого неординарного изобретения — машины ВЕЙБЕК — мистер Пибоди и его приемный сын… Ранго 13:35 Ранго мульт  Ранго — хамелеон, живущий в террариуме и считающий себя героем, которому, к сожалению, никак не удается проявить свое бесстрашие. Но когда он внезапно оказывается в городке Грязь, у него появляется такая возможность. Ранго провозглашает себя борцом за справедливость и… Сезон охоты 15:15 Сезон охоты мульт  Выросший среди людей гризли оказывается в лесу в самый разгар охотничьего сезона. И пока хозяйка медведя ищет своего воспитанника, гризли водит дружбу с лесным оленем. Семейка Крудс 16:35 Семейка Крудс мульт  Жилище доисторической семьи уничтожило землетрясение, и теперь Крудсам придётся искать другое пристанище. А вокруг новый и опасный мир! Им на помощь приходит молодой кочевник Малой, передовые взгляды которого наталкиваются на консервативность папы Груга. Но только… Бесстрашные бурундуки 18:00 Бесстрашные бурундуки: 20–23 серии мульт  Приключения отважных и решительных бурундуков. Гадкий я 19:25 Гадкий я мульт  Стареющему суперзлодею Грю не дают покоя успехи других. Таинственному злому гению удалось украсть египетскую пирамиду, но Грю пойдет дальше — он готов похитить... Луну! Однако на его пути встает препятствие: Банк Зла отказывает ему в кредите, предпочитая более молодых и… Гадкий я-2 20:55 Гадкий я-2 мульт  В то время как бывший суперзлодей Грю приспосабливается к семейной жизни и пытается честным трудом зарабатывать в сфере бизнеса, в Арктике похищают тайные лаборатории. Антизлодейская лига решает, что она нуждается в помощи Грю и его новобранцев... Синдбад: Легенда семи морей 22:20 Синдбад: Легенда семи морей мульт  Отважный мореплаватель и искатель приключений Синдбад отправляется в опасное путешествие по царству богини Хаоса. Его цель — спасти лучшего друга и доказать свою непричастность к краже уникального сокровища — Книги Мира. Стальной гигант 23:35 Стальной гигант мульт  Неподалеку от маленького американского городка падает странный летающий объект, а спустя несколько дней местный парнишка Хогарт находит в окрестностях гигантского робота, прилетевшего на Землю из далекой галактики. Несмотря на свой грозный вид, инопланетный гость… Мадагаскар 00:55 Мадагаскар мульт  Обитатели Нью-Йоркского зоопарка — лев Алекс, зебра Марти, жираф Мелман и бегемотиха Глория — решаются на побег, поддавшись на уговоры Марти. В результате они оказываются на корабле, который держит курс на Мадагаскар. Мадагаскар-2 02:10 Мадагаскар-2 мульт  Полная опасностей жизнь на Мадагаскаре не оправдала ожидания льва Алекса, зебры Марти, жирафа Мелмана и бегемотихи Глории — друзья решают сбежать с острова. Так получается, что они оказываются в Африке, где Алекс встречает свою семью, с которой он был разлучен в детстве... Тайная жизнь домашних животных 03:30 Тайная жизнь домашних животных мульт  Что делают домашние животные, пока хозяева пропадают на работе? С тоской смотрят в окно или дремлют на коврике у двери? Как бы не так. Они ведут свою тайную жизнь. Беззаботное существование избалованного джек-рассел-терьера Макса заканчивается в тот момент, когда его… Труп невесты 04:50 Труп невесты мульт  В маленькой викторианской деревушке задумали обвенчать юных Виктора и Викторию, которые даже не видели друг друга. Родители Виктора, разбогатевшие на рыбных консервах, давно мечтают попасть в высшее общество; Виктория же происходит из семьи аристократов, не имеющих за…  Пн 22 июня Вт 23 июня Вчера 24 июня Сегодня 25 июня Завтра 26 июня Сб 27 июня Вс 28 июня Программа на неделю  Популярное Футбол. Чемпионат мира-2026. Трансляция из СШАФон Матч ТВ Матч ТВ 13:40 Футбол. Чемпионат мира-2026. Трансляция из США: Марокко — Гаити  6+ ПрестижФон СТС СТС 14:05 Престиж: 1 сезон, 1–3 серии  Сериал Россия 2024 детектив 7,5/10 16+ Курьерский особой важностиФон Звезда Звезда 14:25 Курьерский особой важности: 1–4 серии  Сериал Россия 2013 боевик 5,7/10 16+ Тайны следствияФон Россия 1 Россия 1 14:30 Тайны следствия: 1, 2 серии — \"Авария\"  Сериал Россия 2012 детектив 7,2/10 16+ Снежный папаФон Домашний Домашний 14:30 Снежный папа: 1–4 серии  Фильм Россия 2025 мелодрама 16+ ПереводчикФон Спас Спас 14:50 Переводчик: 1 серия  Фильм Россия 2013 военный 7,6/10 16+ Полный список популярного  Все каналы Популярное ЧМ по футболу Фильмы Сериалы Спорт', 'непрочитан', '2026-06-25 12:44:34', '2026-06-25 12:44:34'),
(43, 275, 'asd', 'непрочитан', '2026-06-25 13:02:07', '2026-06-25 13:02:07'),
(44, 275, '21323123', 'непрочитан', '2026-06-25 13:25:11', '2026-06-25 13:25:11'),
(45, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:05', '2026-06-25 13:26:05'),
(46, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(47, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(48, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(49, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(50, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(51, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:15', '2026-06-25 13:26:15'),
(52, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:16', '2026-06-25 13:26:16'),
(53, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:16', '2026-06-25 13:26:16'),
(54, 276, ';lkjhgfds', 'непрочитан', '2026-06-25 13:26:16', '2026-06-25 13:26:16'),
(55, 276, 'хуйца', 'непрочитан', '2026-06-25 13:49:11', '2026-06-25 13:49:11'),
(56, 276, 'фывфывф', 'непрочитан', '2026-06-25 13:49:15', '2026-06-25 13:49:15'),
(57, 276, 'фывфывфыв', 'непрочитан', '2026-06-25 13:49:16', '2026-06-25 13:49:16'),
(58, 276, 'фывфывфывфывфывфывфывывфывфыв', 'непрочитан', '2026-06-25 13:49:18', '2026-06-25 13:49:18'),
(59, 278, 'jkl;', 'непрочитан', '2026-06-26 09:20:26', '2026-06-26 09:20:26'),
(60, 278, 'фывфвфыв', 'непрочитан', '2026-06-26 10:16:41', '2026-06-26 10:16:41'),
(61, 278, 'вффыв', 'непрочитан', '2026-06-26 10:16:43', '2026-06-26 10:16:43'),
(62, 278, 'ААААААААААААААААААААААА', 'непрочитан', '2026-06-26 10:16:45', '2026-06-26 10:16:45');

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
('Эдуард', 'Эдуард', 'Эдуадович', 'eldarsibrimov19@gmail.com', '$2b$12$MWllv1R.Q52NqN/VoDSVmOpZauNeuW7QoIfiHEW5dDXequWWRIR1a', '78412545855', '2026-05-29 23:33:36', '2026-05-29 23:33:36', 244),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimov128@gmail.com', '$2b$12$LGos/HQHaGmkIgAYcbiY/OQpl64hzmmdLwUq9bGBmnWdufW8mSyeu', '82542522222', '2026-05-29 23:34:26', '2026-05-29 23:34:26', 245),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimov18123@gmail.com', '$2b$12$4qINZXw5Vz7IOrqDiCsOwua1.zJXu0WTO2ZKoI48kQ5f5S0SpfWrm', '82542522222', '2026-05-30 00:01:45', '2026-05-30 00:01:45', 246),
('Эдуард', 'Эдуард', 'Антонович', 'eldadasrsibrimov18123@gmail.com', '$2b$12$yL9v69Sh4/.tsUwhgfB3oOVyf01egpgyYxV2fFuWB.rbGe3QKELxO', '82542522222', '2026-05-30 00:03:48', '2026-05-30 00:03:48', 247),
('Эдуард', 'Эдуард', 'Антонович', 'asdasdasdasdasdads@gmail.com', '$2b$12$0PK/.Jv8yVrw3LEyYPFzIenJ80QQAUnkJR04ZUmE9oSb7ekr68Qxq', '82542522222', '2026-05-30 02:47:53', '2026-05-30 02:47:53', 248),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimovasd18123@gmail.com', '$2b$12$ZJ6XrcL7coZKXcH5Dx.3ZuEQyJedeAdWnapve/OVxLTX8nhHo9B6i', '78412545855', '2026-05-31 20:56:52', '2026-05-31 20:56:52', 249),
('Эдуард', 'Эльдар', 'Антонович', 'eldarsibrimov1812123@gmail.com', '$2b$12$8UJ8vxe1AfFnHvb2RxWZhOkwv6..mP2Kfsf7Rwgf.ZXpcGDW8ethi', '78412545855', '2026-06-09 23:06:24', '2026-06-24 09:26:12', 250),
('Эдуард', 'Эдуард', 'Антонович', '123eldarsibrimov1812123@gmail.com', '$2b$12$46giLMnqMLPtIF2TQY/rnu4tPSTimeu6L9E8iiNa19uBis4XgVIeO', '78412545855', '2026-06-09 23:14:18', '2026-06-09 23:14:18', 251),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrim123123ov1812123@gmail.com', '$2b$12$a6d74wniLPeo0Cy55c0OAOT/9kTVzly6lQGc/TmWedNPd6x8EhN4q', '78412545855', '2026-06-09 23:17:25', '2026-06-09 23:17:25', 252),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimov1812312312123@gmail.com', '$2b$12$nYSwPg5Hn1CNCrF.NJykkOawF8FQGyTfvXC.wDirI8/3jbZfigwSW', '78412545855', '2026-06-09 23:24:48', '2026-06-09 23:24:48', 253),
('Эдуард', 'Эдуард', 'Антонович', '123123eldarsibrimov1812312312123@gmail.com', '$2b$12$ZAYDFQVL6IFqASwHtkoW4.KRYnRcE8TtWbQ0yYXlIqjmJ49K5v6ze', '78412545855', '2026-06-09 23:40:56', '2026-06-09 23:40:56', 254),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibqwdasdasdasdsdmov18@gmail.com', '$2b$12$sKixD57QGnHw204oKug7euPm932bYZRzgynGecmaURNJV.8qxx3Cm', '78412545855', '2026-06-10 03:09:42', '2026-06-10 03:09:42', 255),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsasdasdasdasdibqwdasdasdasdsdmov18@gmail.com', '$2b$12$Rp8p9GgQhsXT1cjUCG9iUuZF3CrVrcGiMbkiaM6tYVrWEjXsURL0C', '78412545855', '2026-06-10 03:09:52', '2026-06-10 03:09:52', 256),
('Эдуард', 'Эдуард', 'Антонович', 'aasdibqwdasdasdasdsdmov18@gmail.com', '$2b$12$lgw8n/0evfCejuVDHFS/Gu4H/C5QME55/vsfVWDpH6u/cRwkYRGZ.', '78412545855', '2026-06-10 03:10:07', '2026-06-10 03:10:07', 257),
('Эдуардфывфыв', 'Эдуардфывфывыфв', 'фвыАнтонович', 'sdasdasdasdeldaradasdasdsadsadasdassibrimov1812123@gmail.com', '$2b$12$k1SCThWnLzUP2hHDRz9u8.ap1A.ShkY9Nt/9b17WDNeNIw7H1/lwS', '+79141553625', '2026-06-10 03:24:38', '2026-06-11 13:28:06', 258),
('Эдуард', 'Эдуард', 'Антонович', 'elddadasdsadsdarsibrimov18@gmail.com', '$2b$12$DX0AzWYfj2DkBfeP.Cm3POvFyLduuhm9nuNZmMPlVXrymezWOh8EC', '78412545855', '2026-06-10 03:56:36', '2026-06-10 03:56:36', 259),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimoasdasdasdasdv18@gmail.com', '$2b$12$Va2ERIzt/FXyMbI.ODvNZupYTCyeyKbWDo3PSHZ/tUFgMelA5Mkli', '78412545855', '2026-06-10 04:21:12', '2026-06-10 04:21:12', 260),
('Эдуард', 'Эдуард', 'Антонович', 'eldarasdadasdasibrimdadasdasdsdadasdov18@gmail.com', '$2b$12$4dqZI5l47klZOXy0rBtVJu/ucOxMwhrH1KfaESRpC8C/Y.zA.kmzm', '78412545855', '2026-06-10 04:30:48', '2026-06-10 04:30:48', 261),
('ЭльдарБлять', 'Эдуард', 'Антонович', 'asdasdasdaseldarsibrimov1812123@gmail.comsaads', '$2b$12$vRAXsBFKXUaVPhU2RiFbQ.qqeOSshuavz9kNOoChp2CJ6qc2MTgPi', '78412545855', '2026-06-12 07:32:05', '2026-06-12 07:32:05', 262),
('Эдуард', 'Эдуард', 'Антонович', '151215eldarsibrimov1812123@gmail.com', '$2b$12$Ua4zggkOI9H0W2BHGdpPJOPYCdtXY4dZXTrltv4QDBGGvpI9lq7gK', '78412545855', '2026-06-15 02:56:29', '2026-06-15 02:56:29', 263),
('Кира', 'Эдуард', 'Антонович', 'eldarsibriasdasdsadsadasov1812123@gmail.com', '$2b$12$10xi5nKatiaYddXYqvNWX.T/lhcay/9zSdkuGCSiSpl0wtQxV1bMy', '78412545855', '2026-06-15 02:58:19', '2026-06-15 02:58:19', 264),
('вфывфыв', 'ыфвфывфы', 'фывфывыфв', 'dadsdasddeldarsibrimov1812123@gmail.com', '$2b$12$KWqnaCFBOyh/MvbqHuRYXe6KSs1Zy9HFoiwPlThMmugdAGDeSJSJ6', '78888888888', '2026-06-17 08:56:56', '2026-06-17 08:56:56', 265),
('фывфывфыв', 'фывфыв', 'фывфывфыв', 'eqwqeqweldarsibrimov1812123@gmail.com', '$2b$12$yPD6WiVgKjs50PRmWCAzfOon6Ui63lnUsU2NyI.5IcyG8KEoHBVJO', '75624563256', '2026-06-18 12:32:02', '2026-06-18 12:32:02', 266),
('Эдуард', 'Эдуард', 'Антонович', 'asdadasdsadeldarsibrimov1812123@gmail.com', '$2b$12$mFNN4RlerHpXjEfe8ozI7O9L6TNgxCLDF.qFierRFduZSqB1AI8gO', '78412545855', '2026-06-21 04:09:25', '2026-06-21 04:09:25', 267),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrimov1551515151518@gmail.com', '$2b$12$WKyf3xjI71NTm.h.tZALKeOsW3QA39jj/sH3GAODqqyduIAK163va', '78412545855', '2026-06-22 04:42:56', '2026-06-22 04:42:56', 268),
('Эдуард', 'Эдуард', 'Антонович', 'eldaadasdasdasdasdasdasrsibrimov1812123@gmail.com', '$2b$12$QQx4oDHw2n1Ao3M44Z6a1.AIkXNCtoZsI5TXwzBuAHLbd.yy8wpt.', '78412545855', '2026-06-24 01:25:47', '2026-06-24 01:25:47', 269),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsasdasdasdasadibrimov1812123@gmail.com', '$2b$12$SeeD2A0WvILdnNRro5rxuuFcKuJr4GUPo6rfhg3CY4GfpSLWbPP9W', '78412545855', '2026-06-24 01:57:39', '2026-06-24 01:57:39', 270),
('Эдуард', 'Эдуард', 'фывфвфывы', 'eldarasdasdasdasdasdimov1812123@gmail.com', '$2b$12$P86ZWuYJvD7vx.5lUgrkD.Zjt74xNI9a1li7RKwd4.dAmGvKHsF8S', '78412545855', '2026-06-24 02:03:18', '2026-06-24 02:03:18', 271),
('Эдуард', 'Эдуард', 'Антонович', 'eldaradsadsadasdsibrimov1812123@gmail.com', '$2b$12$fkaZt6dr9/4qgOM2mn77Ae/Or1W5Bq0wbDnMEjeh6Zbc6H0vzj3sK', '78412545855', '2026-06-24 02:06:49', '2026-06-24 02:06:49', 272),
('Эдуард', 'Эдуард', 'Антонович', 'eldadsasdasdadarsibrimov1812123@gmail.com', '$2b$12$3.0IpG8GZAvW81PM7hqZbeTXJ9xazm9qk5fhCetmPQ1jlwgBHCx3m', '78412545855', '2026-06-24 11:55:32', '2026-06-24 11:55:32', 273),
('Эдуард', 'Эдуард', 'Антонович', 'asdsadsadeldarsibrimov1812123@gmail.com', '$2b$12$xYZNdoj.GZu30jJXeHglDOGbNoHoGiZtIwD72YB.yJHu2RDkr.2I2', '78412545855', '2026-06-24 11:56:05', '2026-06-24 11:56:05', 274),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsisdadsdasdbrimov1812123@gmail.com', '$2b$12$EJM9MRH1LKZFCPnKPmknJu2ECCA1SsYc1VwoqNY7VociKPpAIdGMe', '78412545855', '2026-06-25 12:28:01', '2026-06-25 12:28:01', 275),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsidfsdfdsfsdbrimov1812123@gmail.com', '$2b$12$JLyVNMF6sdCj5EcyOQPeoedW72LoWhWOBuUp8BeEcRvllP9plj9wG', '78412545855', '2026-06-25 13:25:54', '2026-06-25 13:25:54', 276),
('Эдуард', 'Эдуард', 'Антонович', 'eldarsibrdsadasdasdasdasdmov1812123@gmail.com', '$2b$12$W7EEifcpqfEmF0RcVnfPHeeKM6Zcielz315o/bIVo7Hwdl7z.BGKy', '78412545855', '2026-06-26 08:38:27', '2026-06-26 08:38:27', 277),
('Эдуард', 'Эдуард', 'Антонович', 'asdasdasasdaseldarsibrimov1812123@gmail.com', '$2b$12$s8pFnd4t13HaKro31hPreu3jVoXyIdINgTkzviuuHPbYlOnzUhea2', '78412545855', '2026-06-26 09:14:42', '2026-06-26 09:14:42', 278);

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
-- Индексы таблицы `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id_application`),
  ADD KEY `fk_id_basket` (`Id_tovar`),
  ADD KEY `fk_application_user` (`id_user`);

--
-- Индексы таблицы `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id_basket`),
  ADD KEY `fk_basket_user` (`id_user`),
  ADD KEY `fk_tovar` (`Id_tovar`);

--
-- Индексы таблицы `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id_cards`);

--
-- Индексы таблицы `messageuser`
--
ALTER TABLE `messageuser`
  ADD PRIMARY KEY (`ID_message`),
  ADD KEY `fk_messageuser_user` (`ID_User`);

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
-- AUTO_INCREMENT для таблицы `application`
--
ALTER TABLE `application`
  MODIFY `id_application` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT для таблицы `basket`
--
ALTER TABLE `basket`
  MODIFY `id_basket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT для таблицы `cards`
--
ALTER TABLE `cards`
  MODIFY `id_cards` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `messageuser`
--
ALTER TABLE `messageuser`
  MODIFY `ID_message` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

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
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `fk_application_tovar` FOREIGN KEY (`Id_tovar`) REFERENCES `cards` (`id_cards`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_application_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `basket`
--
ALTER TABLE `basket`
  ADD CONSTRAINT `fk_basket_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `fk_tovar` FOREIGN KEY (`Id_tovar`) REFERENCES `cards` (`id_cards`);

--
-- Ограничения внешнего ключа таблицы `messageuser`
--
ALTER TABLE `messageuser`
  ADD CONSTRAINT `fk_messageuser_user` FOREIGN KEY (`ID_User`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

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
