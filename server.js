const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: '192.168.1.100',
    user: 'externo',   // Coloque seu usuário do MySQL
    password: 'Senha@Segura123',   // Coloque sua senha do MySQL
    database: 'tarefas_db' // Coloque o nome do seu banco de dados
});

// Conecta ao banco de dados
connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Criação da tabela de tarefas
const createTasksTable = `
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
)`;

connection.query(createTasksTable, (err, results) => {
    if (err) throw err;
    console.log('Tabela de tarefas pronta');
});

// Rota para adicionar uma nova tarefa
app.post('/api/tarefas', (req, res) => {
    const { descricao } = req.body;
    const query = 'INSERT INTO tarefas (descricao) VALUES (?)';

    connection.query(query, [descricao], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: results.insertId, descricao });
    });
});

// Rota para listar todas as tarefas
app.get('/api/tarefas', (req, res) => {
    const query = 'SELECT * FROM tarefas';

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
