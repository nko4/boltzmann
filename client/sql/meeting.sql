CREATE TABLE `meeting` (
  `meeting_id` int(11) NOT NULL AUTO_INCREMENT,
  `user1_id` int(11) NOT NULL DEFAULT '0',
  `user2_id` int(11) NOT NULL DEFAULT '0',
  `user1_schedule_begin` date DEFAULT NULL,
  `user1_schedule_end` date DEFAULT NULL,
  `user2_schedule_begin` date DEFAULT NULL,
  `user2_schedule_end` date DEFAULT NULL,
  `meeting_venue_name` varchar(128) DEFAULT NULL,
  `meeting_venue_category` varchar(128) DEFAULT NULL,
  `meeting_venue_address` varchar(128) DEFAULT NULL,
  `meeting_time` date DEFAULT NULL,
  `status` varchar(128) DEFAULT NULL,
  `error` varchar(128) DEFAULT NULL,
  `new` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`meeting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COMMENT='latin1_swedish_ci'
