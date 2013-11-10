CREATE TABLE `meeting` (
    `meeting_id` INT(11) NOT NULL AUTO_INCREMENT,
    `user1_id` INT(11) NOT NULL DEFAULT '0',
    `user2_id` INT(11) NOT NULL DEFAULT '0',
    `user1_schedule_begin` DATE,
    `user1_schedule_end` DATE,
    `user2_schedule_begin` DATE,
    `user2_schedule_end` DATE,
    `meeting_venue_name` VARCHAR(128),
    `meeting_venue_category` VARCHAR(128),
    `meeting_venue_address` VARCHAR(128),
    `meeting_time` DATE,
    `status` VARCHAR(128),
    `error` VARCHAR(128),
    `new` BOOLEAN DEFAULT TRUE,
PRIMARY KEY (`meeting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='latin1_swedish_ci'