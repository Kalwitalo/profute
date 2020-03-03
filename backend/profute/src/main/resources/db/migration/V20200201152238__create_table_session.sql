CREATE TABLE IF NOT EXISTS `profute`.`session`
(
    `id`    INT           NOT NULL AUTO_INCREMENT,
    `date`  DATE    NOT NULL,
    `goals` VARCHAR(1000) NOT NULL,
    `id_team` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_session_team
    FOREIGN KEY (id_team) references team (id)
)
    ENGINE = InnoDB
