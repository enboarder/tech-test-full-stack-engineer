CREATE TABLE spaceData (
  id CHAR(36) NOT NULL,
  shipId varchar(255) NOT NULL,
  shipType varchar(255) NOT NULL,
  weight decimal(10, 2),
  homePort varchar(255),
  shipName varchar(255),
  class varchar(255),
  shipImage LONGBLOB,
  PRIMARY KEY (id)
);
