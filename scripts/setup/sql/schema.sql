--
-- Created 12/18/2023
--

DROP DATABASE IF EXISTS `4players`;
CREATE DATABASE `4players`;
USE `4players`;


--
-- Table structure for table `cloudinary_image`
--

CREATE TABLE `cloudinary_image` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `public_id` TEXT NOT NULL,
  `url` TEXT NULL,
  `small_url` TEXT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `ballot`
--

CREATE TABLE `ballot` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` TEXT NOT NULL,
  `desc` TEXT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `rig_image`
--

CREATE TABLE `rig_image` (
  `id` CHAR(25) NOT NULL,
  `image` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image`) REFERENCES `cloudinary_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `year` INT(32) NOT NULL,
  `make` TEXT NOT NULL,
  `model` TEXT NOT NULL,
  `name` TEXT NULL,
  `trim` TEXT NULL,
  `outfit_level` TEXT NULL,
  `image` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`image`) REFERENCES `cloudinary_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `joined` TIMESTAMP NULL DEFAULT NULL,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  `first_name` TEXT NOT NULL,
  `last_name` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `gender` TEXT NULL,
  `birthdate` DATETIME NULL DEFAULT NULL,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `reset_token` TEXT NULL,
  `reset_token_expiry` TIMESTAMP NULL DEFAULT NULL,
  `role` TEXT NOT NULL,
  `account_status` TEXT NOT NULL,
  `account_type` TEXT NOT NULL,
  `office` TEXT NULL,
  `comfort_level` TEXT NULL,
  `avatar` CHAR(25) NULL DEFAULT NULL,
  `vehicle` CHAR(25) NULL DEFAULT NULL,
  `rig` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `default$default._user.email.unique` (`email`(100)),
  UNIQUE KEY `default$default._user.office.unique` (`office`(100)),
  UNIQUE KEY `default$default._user.username.unique` (`username`(100)),
  CONSTRAINT `user_avatar_fkey` FOREIGN KEY (`avatar`) REFERENCES `cloudinary_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `user_rig_fkey` FOREIGN KEY (`rig`) REFERENCES `rig_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `user_vehicle_fkey` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `street` TEXT NULL,
  `city` TEXT NULL,
  `state` TEXT NULL,
  `zip` TEXT NULL,
  `phone` TEXT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `election`
--

CREATE TABLE `election` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `election_name` TEXT NOT NULL,
  `start_time` TIMESTAMP NULL DEFAULT NULL,
  `end_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` TEXT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NULL,
  `start_time` TIMESTAMP NULL DEFAULT NULL,
  `end_time` TIMESTAMP NULL DEFAULT NULL,
  `address` TEXT NULL,
  `trail_difficulty` TEXT NULL,
  `trail_notes` TEXT NULL,
  `rally_address` TEXT NULL,
  `members_only` BOOL NULL DEFAULT NULL,
  `max_attendees` INT(32) NULL DEFAULT NULL,
  `max_rigs` INT(32) NULL DEFAULT NULL,
  `host` CHAR(25) NULL DEFAULT NULL,
  `featured_image` CHAR(25) NULL DEFAULT NULL,
  `creator` CHAR(25) NULL DEFAULT NULL,
  `change_disabled` BOOL NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `event_creator_fkey` FOREIGN KEY (`creator`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `event_featured_image_fkey` FOREIGN KEY (`featured_image`) REFERENCES `cloudinary_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `event_host_fkey` FOREIGN KEY (`host`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `membership_log_item`
--

CREATE TABLE `membership_log_item` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` TEXT NOT NULL,
  `message_code` TEXT NOT NULL,
  `user` CHAR(25) NULL DEFAULT NULL,
  `logger` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `membership_log_item_logger_fkey` FOREIGN KEY (`logger`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `membership_log_item_user_fkey` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `preference`
--

CREATE TABLE `preference` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `emergency_contact_name` TEXT NULL,
  `emergency_contact_phone` TEXT NULL,
  `photo_permissions` BOOL NULL DEFAULT NULL,
  `show_phone_number` BOOL NULL DEFAULT NULL,
  `tshirt_size` TEXT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `run_report`
--

CREATE TABLE `run_report` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `start_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `report_filed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` TEXT NOT NULL,
  `description` TEXT NULL,
  `weather` TEXT NOT NULL,
  `difficulty` TEXT NOT NULL,
  `rating` DOUBLE(65,30) NOT NULL,
  `favorite` BOOL NULL DEFAULT NULL,
  `event` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `run_report_event_fkey` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `trail`
--

CREATE TABLE `trail` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `slug` TEXT NOT NULL,
  `name` TEXT NULL,
  `description` TEXT NULL,
  `trailhead_coords` TEXT NULL,
  `address` TEXT NULL,
  `featured_image` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `trail_featured_image_fkey` FOREIGN KEY (`featured_image`) REFERENCES `cloudinary_image` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` TEXT NULL,
  `last_name` TEXT NULL,
  `email` TEXT NOT NULL,
  `source` TEXT NOT NULL,
  `token` TEXT NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `default$default._registration.token.unique` (`token`(26))
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `user_equipment`
--

CREATE TABLE `user_equipment` (
  `node_id` CHAR(25) NOT NULL,
  `position` INT(32) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`node_id`,`position`),
  CONSTRAINT `user_equipment_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_trail_run_report`
--

CREATE TABLE `_trail_run_report` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_trail_run_report_a_b_unique` (`a`,`b`),
  KEY `_trail_run_report_b` (`b`),
  CONSTRAINT `_trail_run_report_a_fkey` FOREIGN KEY (`a`) REFERENCES `run_report` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_trail_run_report_b_fkey` FOREIGN KEY (`b`) REFERENCES `trail` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `user_titles`
--

CREATE TABLE `user_titles` (
  `node_id` CHAR(25) NOT NULL,
  `position` INT(32) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`node_id`,`position`),
  CONSTRAINT `user_titles_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_candidate_user`
--

CREATE TABLE `_candidate_user` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_candidate_user_a_b_unique` (`a`,`b`),
  KEY `_candidate_user_b` (`b`),
  CONSTRAINT `_candidate_user_a_fkey` FOREIGN KEY (`a`) REFERENCES `ballot` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_candidate_user_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `user_meta`
--

CREATE TABLE `user_meta` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email_verified` BOOL NULL DEFAULT NULL,
  `first_login_complete` BOOL NULL DEFAULT NULL,
  `account_setup_complete` BOOL NULL DEFAULT NULL,
  `old_site_migration_complete` BOOL NULL DEFAULT NULL,
  `email_public_notifications` BOOL NULL DEFAULT NULL,
  `email_member_notifications` BOOL NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `rsvp`
--

CREATE TABLE `rsvp` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` TEXT NOT NULL,
  `guest_count` INT(32) NULL DEFAULT NULL,
  `is_rider` BOOL NULL DEFAULT NULL,
  `event` CHAR(25) NULL DEFAULT NULL,
  `vehicle` CHAR(25) NULL DEFAULT NULL,
  `member` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `rsvp_event_fkey` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `rsvp_member_fkey` FOREIGN KEY (`member`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `rsvp_vehicle_fkey` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `vehicle_mods`
--

CREATE TABLE `vehicle_mods` (
  `node_id` CHAR(25) NOT NULL,
  `position` INT(32) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`node_id`,`position`),
  CONSTRAINT `vehicle_mods_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `condition`
--

CREATE TABLE `condition` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` TEXT NOT NULL,
  `notes` TEXT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `bandaid`
--

CREATE TABLE `bandaid` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` TEXT NULL,
  `description` TEXT NULL,
  `member_involved` CHAR(25) NULL DEFAULT NULL,
  `event` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `bandaid_event_fkey` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `bandaid_member_involved_fkey` FOREIGN KEY (`member_involved`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ballot` CHAR(25) NULL DEFAULT NULL,
  `candidate` CHAR(25) NULL DEFAULT NULL,
  `voter` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `vote_ballot_fkey` FOREIGN KEY (`ballot`) REFERENCES `ballot` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `vote_candidate_fkey` FOREIGN KEY (`candidate`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `vote_voter_fkey` FOREIGN KEY (`voter`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_ballot_to_election`
--

CREATE TABLE `_ballot_to_election` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_ballot_to_election_a_b_unique` (`a`,`b`),
  KEY `_ballot_to_election_b` (`b`),
  CONSTRAINT `_ballot_to_election_a_fkey` FOREIGN KEY (`a`) REFERENCES `ballot` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_ballot_to_election_b_fkey` FOREIGN KEY (`b`) REFERENCES `election` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_trail_visitor`
--

CREATE TABLE `_trail_visitor` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_trail_visitor_a_b_unique` (`a`,`b`),
  KEY `_trail_visitor_b` (`b`),
  CONSTRAINT `_trail_visitor_a_fkey` FOREIGN KEY (`a`) REFERENCES `trail` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_trail_visitor_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `activity_log_item`
--

CREATE TABLE `activity_log_item` (
  `id` CHAR(25) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time` TIMESTAMP NOT NULL,
  `message` TEXT NOT NULL,
  `message_code` TEXT NOT NULL,
  `link` TEXT NULL,
  `user` CHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `activity_log_item_user_fkey` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_members_rsvp`
--

-- CREATE TABLE `_members_rsvp` (
--   `a` CHAR(25) NOT NULL,
--   `b` CHAR(25) NOT NULL,
--   UNIQUE KEY `_members_rsvp_a_b_unique` (`a`,`b`),
--   KEY `_members_rsvp_b` (`b`),
--   CONSTRAINT `_members_rsvp_a_fkey` FOREIGN KEY (`a`) REFERENCES `rsvp` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
--   CONSTRAINT `_members_rsvp_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
-- ) CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_run_condition`
--

CREATE TABLE `_run_condition` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_run_condition_a_b_unique` (`a`,`b`),
  KEY `_run_condition_b` (`b`),
  CONSTRAINT `_run_condition_a_fkey` FOREIGN KEY (`a`) REFERENCES `condition` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_run_condition_b_fkey` FOREIGN KEY (`b`) REFERENCES `run_report` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_event_trail`
--

CREATE TABLE `_event_trail` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_event_trail_a_b_unique` (`a`,`b`),
  KEY `_event_trail_b` (`b`),
  CONSTRAINT `_event_trail_a_fkey` FOREIGN KEY (`a`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_event_trail_b_fkey` FOREIGN KEY (`b`) REFERENCES `trail` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_run_reporter`
--

CREATE TABLE `_run_reporter` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_run_reporter_a_b_unique` (`a`,`b`),
  KEY `_run_reporter_b` (`b`),
  CONSTRAINT `_run_reporter_a_fkey` FOREIGN KEY (`a`) REFERENCES `run_report` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_run_reporter_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `rsvp_equipment`
--

CREATE TABLE `rsvp_equipment` (
  `node_id` CHAR(25) NOT NULL,
  `position` INT(32) NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`node_id`,`position`),
  CONSTRAINT `rsvp_equipment_node_id_fkey` FOREIGN KEY (`node_id`) REFERENCES `rsvp` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_user_contact_info`
--

CREATE TABLE `_user_contact_info` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_user_contact_info_a_b_unique` (`a`,`b`),
  KEY `_user_contact_info_b` (`b`),
  CONSTRAINT `_user_contact_info_a_fkey` FOREIGN KEY (`a`) REFERENCES `contact_info` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_user_contact_info_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_user_meta`
--

CREATE TABLE `_user_meta` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_user_meta_a_b_unique` (`a`,`b`),
  KEY `_user_meta_b` (`b`),
  CONSTRAINT `_user_meta_a_fkey` FOREIGN KEY (`a`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_user_meta_b_fkey` FOREIGN KEY (`b`) REFERENCES `user_meta` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;

--
-- Table structure for table `_user_preferences`
--

CREATE TABLE `_user_preferences` (
  `a` CHAR(25) NOT NULL,
  `b` CHAR(25) NOT NULL,
  UNIQUE KEY `_user_preferences_a_b_unique` (`a`,`b`),
  KEY `_user_preferences_b` (`b`),
  CONSTRAINT `_user_preferences_a_fkey` FOREIGN KEY (`a`) REFERENCES `preference` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `_user_preferences_b_fkey` FOREIGN KEY (`b`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;
