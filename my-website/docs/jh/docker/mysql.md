```js
cat /path/to/your-file.sql | docker exec -i <mysql-container-name> mysql -u <username> -p <password> <database_name>

```

```js
cat /home/user/my-file.sql | docker exec -i my-mysql-container mysql -u root -p password my_database
```