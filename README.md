Insatllation

Backend

- cd backend

-source venv/Scripts/activate

- uvicorn main:app --reload

Frontend

-npm install

-npm run dev <!-- run the server-->


.env

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=keepalive_server



Creating the database in MySql

<!-- create a database table -->

- CREATE DATABASE keepalive_server;

- USE keepalive_server;

-  SHOW TABLES;      <!--   it will display 'projects' -->

<!-- Insert the data for test weather the table insert the data or not check condition -->

INSERT INTO projects (name, url, `interval`, enabled)

VALUES (
  'Test App',
  'https://example.com',
  300,
  1
);

<!-- see the table -->

SELECT * FROM projects;