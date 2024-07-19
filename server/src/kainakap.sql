SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Create tables based on Prisma schema

CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` boolean NOT NULL DEFAULT false,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` boolean NOT NULL DEFAULT false,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthplace` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `citizenship` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `civil` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `landline` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseno` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `baranggay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `elementary` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attain` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `highschool` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attain1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `senior` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attain2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `college` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attain3` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `yearEmploy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `yearUnemploy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill1_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill2_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blood` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `height` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disability` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visibility` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `made_disabled` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `device` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specificDevice` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medicine` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specificMedicine` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `others` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refreshToken` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_files` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brgy_residence_certificate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_certificate` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proof_of_disability` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `emergency_person` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middleName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationship` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `religion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `landline` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `houseno` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `street` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `baranggay` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_files` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_photo_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_photo_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd_id_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pwd_id_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brgy_residence_certificate_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brgy_residence_certificate_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_certificate_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_certificate_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proof_of_disability_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proof_of_disability_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_id_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_id_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `otp` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otpCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `event_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` varchar(191) NOT NULL,
  `date_created` varchar(191) NOT NULL,
  `time_created` varchar(191) NOT NULL,
  `scheduled_date` varchar(191) NOT NULL,
  `scheduled_time` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `event_title` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imagefiles` varchar(100) NOT NULL,
  `target_group` varchar(1000) NOT NULL,
  `post_type` varchar(191) NOT NULL,
  `archive_status` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `event_registry` (
  `registration_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `registration_code` varchar(20) NOT NULL,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `job_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` varchar(191) NOT NULL,
  `date_created` varchar(191) NOT NULL,
  `time_created` varchar(191) NOT NULL,
  `scheduled_date` varchar(191) NOT NULL,
  `scheduled_time` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `event_title` varchar(191) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `imagefiles` varchar(100) NOT NULL,
  `target_group` varchar(1000) NOT NULL,
  `post_type` varchar(191) NOT NULL,
  `archive_status` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `job_registry` (
  `registration_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) NOT NULL,
  `user_id` varchar(11) NOT NULL,
  `registration_code` varchar(20) NOT NULL,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `mail_sent` (
  `send_id` int(10) NOT NULL AUTO_INCREMENT,
  `senderID` varchar(191) NOT NULL,
  `date_sent` varchar(191) NOT NULL,
  `time_sent` varchar(191) NOT NULL,
  `receiverID` varchar(191) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `body` varchar(5000) NOT NULL,
  `documentfile` varchar(1500) NOT NULL,
  `imagefile` varchar(1500) NOT NULL,
  `read_status` varchar(11) NOT NULL,
  PRIMARY KEY (`send_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

