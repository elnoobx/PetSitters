-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2022 a las 05:49:04
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `petsitter`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `Stateid` int(11) NOT NULL,
  `City` varchar(32) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id`, `Stateid`, `City`, `fecha_alta`, `fecha_baja`) VALUES
(1, 1, 'Culiacan', '2022-07-13 18:59:24', NULL),
(2, 1, 'Guamuchil', '2022-07-13 20:28:33', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `connection_pet_to_type`
--

CREATE TABLE `connection_pet_to_type` (
  `id` int(11) NOT NULL,
  `petsitterId` int(11) NOT NULL,
  `petstype` int(11) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_baja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `connection_pet_to_type`
--

INSERT INTO `connection_pet_to_type` (`id`, `petsitterId`, `petstype`, `fecha_alta`, `fecha_baja`) VALUES
(1, 2, 1, '2022-07-13 21:04:46', 2147483647),
(2, 2, 2, '2022-07-13 21:04:59', NULL),
(4, 2, 3, '2022-07-13 22:08:24', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `petsitter`
--

CREATE TABLE `petsitter` (
  `id` int(11) NOT NULL,
  `CityId` int(11) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Lastname` varchar(32) NOT NULL,
  `cellphone` int(11) NOT NULL,
  `email` varchar(32) NOT NULL,
  `photoURL` varchar(32) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `petsitter`
--

INSERT INTO `petsitter` (`id`, `CityId`, `Name`, `Lastname`, `cellphone`, `email`, `photoURL`, `fecha_alta`, `fecha_baja`) VALUES
(2, 2, 'Pepito', 'asdasd', 77777777, 'email@email.com', '1.jpg', '2022-07-13 21:01:35', NULL),
(3, 1, 'Perrs', 'Prrs', 7777777, 'email@email.com', '2.jpg', '2022-07-13 21:37:22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `petstype`
--

CREATE TABLE `petstype` (
  `id` int(11) NOT NULL,
  `Description` varchar(32) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `petstype`
--

INSERT INTO `petstype` (`id`, `Description`, `fecha_alta`, `fecha_baja`) VALUES
(1, 'Perros', '2022-07-13 19:27:22', NULL),
(2, 'Gatos', '2022-07-13 19:27:22', NULL),
(3, 'Serpientes', '2022-07-13 19:27:22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `fecha_alta` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `state`
--

INSERT INTO `state` (`id`, `Nombre`, `fecha_alta`, `fecha_baja`) VALUES
(1, 'Sinaloa', '2022-07-13 19:27:53', NULL),
(2, 'Aguascalientes', '2022-07-13 21:50:38', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StateId` (`Stateid`);

--
-- Indices de la tabla `connection_pet_to_type`
--
ALTER TABLE `connection_pet_to_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PetSitterId` (`petsitterId`),
  ADD KEY `PetsType` (`petstype`);

--
-- Indices de la tabla `petsitter`
--
ALTER TABLE `petsitter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CityId` (`CityId`);

--
-- Indices de la tabla `petstype`
--
ALTER TABLE `petstype`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `connection_pet_to_type`
--
ALTER TABLE `connection_pet_to_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `petsitter`
--
ALTER TABLE `petsitter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `petstype`
--
ALTER TABLE `petstype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `StateId` FOREIGN KEY (`Stateid`) REFERENCES `state` (`id`);

--
-- Filtros para la tabla `connection_pet_to_type`
--
ALTER TABLE `connection_pet_to_type`
  ADD CONSTRAINT `PetSitterId` FOREIGN KEY (`petsitterId`) REFERENCES `petsitter` (`id`),
  ADD CONSTRAINT `PetsType` FOREIGN KEY (`petstype`) REFERENCES `petstype` (`id`);

--
-- Filtros para la tabla `petsitter`
--
ALTER TABLE `petsitter`
  ADD CONSTRAINT `CityId` FOREIGN KEY (`CityId`) REFERENCES `city` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
