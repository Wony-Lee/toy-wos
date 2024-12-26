# DB 생성

### mysql version 8.0.32

## create database

```sql
CREATE DATABASE word_of_support DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

## create user with login database

mysql -u root

```sql
CREATE USER 'word_of_support_owner'@'localhost' IDENTIFIED BY 'word_of_support_password';

GRANT ALL PRIVILEGES ON word_of_support_owner.* TO word_of_support_owner@'%';
FLUSH PRIVILEGES;

DATABASE USERNAME = WORD_OF_SUPPORT_OWNER
DATABASE PASSWORD = WORD_OF_SUPPORT_OWNER_PASSWORD
```
