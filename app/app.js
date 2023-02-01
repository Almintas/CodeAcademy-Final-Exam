const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

const usersToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
};

const verifyToken = (req, res, next) => {
    try {
        usersToken(req);
        next();
    } catch(e) {
        res.send({ error: 'Invalid token' });
    }
};

app.get('/admins', (req, res) => {
    connection.execute('SELECT * FROM admins', (err, result) => {
        res.send(result);
    })
});

app.post('/register', (req, res) => {
    const { email, password, name, surname } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute('INSERT INTO admins (email, password, name, surname) VALUES (?, ?, ?, ?)', [email, hashedPassword, name, surname], (err, result) =>{
        res.send(result);
        console.log(result)
    })
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM admins WHERE email=?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    const { id, email } = result[0];
                    const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
                    res.send({ token, id, email });
                } else {
                    res.sendStatus(401);
                }
            }
        }
    );
});



app.listen(8080, () => console.log('Server is Online'))