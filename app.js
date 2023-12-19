const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'davidvovchik',
    database: 'wokbase',
    port: 3306,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключение к базе данных успешно установлено');
        connection.release();
    }
});

app.get('/wokbase/todolist/', (req, res) => {
    const sql = 'SELECT * FROM todolist';

    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json(results);
        }
    });
});

app.post('/wokbase/todolist/', (req, res) => {
    const newData = {
        task: req.body.task,
    };

    const sql = 'INSERT INTO todolist SET ?';

    pool.query(sql, newData, (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json({ message: 'Данные успешно добавлены' });
        }
    });
});

app.delete('/wokbase/todolist/:id', (req, res) => {
    const itemId = req.params.id;

    const sql = 'DELETE FROM todolist WHERE id = ?';

    pool.query(sql, [itemId], (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json({ message: 'Данные успешно удалены' });
        }
    });
});

app.put('/wokbase/todolist/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedTask = req.body.task;

    const sql = 'UPDATE todolist SET task = ? WHERE id = ?';

    pool.query(sql, [updatedTask, itemId], (err, results) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        } else {
            res.json({ message: 'Данные успешно обновлены' });
        }
    });
});

process.on('exit', () => {
    pool.end((err) => {
        if (err) {
            console.error('Ошибка при закрытии соединения с базой данных:', err);
        } else {
            console.log('Соединение с базой данных успешно закрыто');
        }
    });
});

app.listen(800, () => {
    console.log('Сервер запущен на порту 800');
});
