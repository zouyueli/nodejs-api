-- -- 表结构
CREATE TABLE blog(
    id INT(11) NOT NULL ,
    title VARCHAR(128) ,
    content VARCHAR(256) ,
    categories VARCHAR(64) ,
    author VARCHAR(32) ,
    PRIMARY KEY(id)
)
