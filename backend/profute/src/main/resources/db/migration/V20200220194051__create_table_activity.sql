CREATE TABLE IF NOT EXISTS `profute`.`activity` (
    `id`    INT           NOT NULL AUTO_INCREMENT,
    `part` VARCHAR(50) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `focus` VARCHAR(50) NOT NULL,
    `goal` VARCHAR(500) NOT NULL,
    `time` INT NOT NULL,
    `serie` INT NOT NULL,
    `stop` INT NOT NULL,
    `rules` VARCHAR(5000) NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `id_session` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_activity_session_idx` (`id_session` ASC),
    CONSTRAINT `fk_activity_session`
        FOREIGN KEY (`id_session`)
            REFERENCES `profute`.`session` (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION)
ENGINE = InnoDB
