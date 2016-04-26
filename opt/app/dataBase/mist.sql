insert into sys.mistconvmsg(sender,recepient,msgtext) values(1,2,'Hi, You there ???');

select * from sys.mistconvmsg;



CREATE TABLE `sys`.`mistuser` (
  `mistid_user` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `birth_date` DATETIME NULL,
  `join_date` DATETIME NOT NULL,
  `email_id` VARCHAR(150) NOT NULL,
  `firebase_id` VARCHAR(200) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`mistid_user`, `firebase_id`),
  UNIQUE INDEX `firebase_id_UNIQUE` (`firebase_id` ASC));
  
insert into sys.mistuser(first_name,last_name,birth_date,join_date,email_id,firebase_id,password) 
values('Srikanth','Pai',STR_TO_DATE('1987,11,13 17,30,22', '%Y,%m,%d %H,%i,%s'),SYSDATE(),'srikanthvpai@gmail.com','12345','testpwd');

//date has to be in this format : 1987,11,13 17,30,22
  
