-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 23 2026 г., 00:56
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
  `email` int(255) NOT NULL,
  `password` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('Эдуард', 'Эдуард', 'sad', 'eldarsibrimov18@gmail.com', '', '', '2026-05-21 01:11:02', '2026-05-21 01:11:02', 175),
('asd', 'ads', 'ads', 'eldarsibrimov18@gmail.com', '', '', '2026-05-21 03:43:23', '2026-05-21 03:43:23', 176),
('asd', 'asd', 'asd', 'asddsad@gmail.com', '', '', '2026-05-21 03:46:01', '2026-05-21 03:46:01', 177),
('12', '123', '123', '123@gmail.com', '', '123', '2026-05-22 00:27:23', '2026-05-22 00:27:23', 178),
('12', '123', '123', '123@gmail.com', '', '123', '2026-05-22 00:27:25', '2026-05-22 00:27:25', 179),
('12', '123', '123', '123@gmail.com', '', '', '2026-05-22 00:27:45', '2026-05-22 00:27:45', 180),
('Эдуард', 'Эдуард', 'Сибримов', 'eldarsibrimov18@gmail.com', '', '79997941722', '2026-05-22 00:56:59', '2026-05-22 00:56:59', 181),
('Эдуард', 'Эдуард', 'Сибримов', 'eldarsibrimov18@gmail.com', '', '78565632553', '2026-05-22 00:58:23', '2026-05-22 00:58:23', 182),
('Эдуард', 'Эдуард', 'фывфывфыв', 'eldarsibrimov18@gmail.com', '', '78512652541', '2026-05-22 01:14:52', '2026-05-22 01:14:52', 183),
('Эдуард', 'Эдуард', 'фывфывфыв', 'eldarsibrimov18@gmail.com', '', '78512652541', '2026-05-22 01:15:37', '2026-05-22 01:15:37', 184),
('Эдуард', 'Эдуард', 'фывфвфыв', 'eldarsibrimov18@gmail.com', '', '71231231313', '2026-05-22 01:15:48', '2026-05-22 01:15:48', 185),
('Эдуард', 'Эдуард', 'фвфыв', 'eldarsibrimov18@gmail.com', '', '75254525412', '2026-05-22 01:16:28', '2026-05-22 01:16:28', 186),
('Эдуард', 'Эдуард', 'фвфыв', 'eldarsibrimov18@gmail.com', '', '75254525412', '2026-05-22 01:16:29', '2026-05-22 01:16:29', 187),
('Эдуард', 'Эдуард', 'фвфыв', 'eldarsibrimov18@gmail.com', '', '75254525412', '2026-05-22 01:16:30', '2026-05-22 01:16:30', 188),
('Эдуард', 'Эдуард', 'фвфыв', 'eldarsibrimov18@gmail.com', '', '75254525412', '2026-05-22 01:17:07', '2026-05-22 01:17:07', 189),
('Эдуард', 'Эдуард', 'фыв', 'eldarsasdasdibrimov18@gmail.com', 'Em!1029384756', '78412545855', '2026-05-22 02:36:30', '2026-05-22 02:36:30', 190),
('Эдуард', 'Эдуард', 'фыв', 'eldarsassdasddasdibrimov18@gmail.com', 'passwordHash', '78412545855', '2026-05-22 02:39:52', '2026-05-22 02:39:52', 191),
('Эдуард', 'Эдуард', 'фыв', 'eldasdarsibrimov18@gmail.com', 'passwordHash', '74222222222', '2026-05-22 02:57:55', '2026-05-22 02:57:55', 192),
('Эдуард', 'Эдуард', 'фыв', 'eldasdarsibrimov1asd8@gmail.com', '$2b$12$f.GvWxD5KZSBGjJDICZ.RuWlEUxzbcYFOfcM/SNRlIWkhJzQBm/BC', '74222222222', '2026-05-22 03:04:06', '2026-05-22 03:04:06', 193);

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
-- Индексы таблицы `order_door`
--
ALTER TABLE `order_door`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `fk_door_site` (`id_door`),
  ADD KEY `fk_id_user` (`id_user`);

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
  MODIFY `ID_administrator` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `all_door`
--
ALTER TABLE `all_door`
  MODIFY `id_door` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `order_door`
--
ALTER TABLE `order_door`
  MODIFY `id_order` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

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
