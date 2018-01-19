CREATE USER 'gorillachat'@'localhost' IDENTIFIED BY '***';
GRANT ALL PRIVILEGES ON gorillachat.* TO 'gorillachat'@'localhost';

CREATE USER 'gorilla'@'%' IDENTIFIED BY 'allirog';
GRANT SELECT ON gorillachat.* TO 'gorilla'@'%';
