const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'miBaseDeDatos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Crear la tabla de usuarios si no existe
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createUserTable, (err, result) => {
  if (err) throw err;
  console.log('Tabla de usuarios lista.');
});

// Crear la tabla de pedidos si no existe
const createOrderTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(255),
    cantidad INT,
    otroProducto VARCHAR(255),
    otraCantidad INT,
    direccion TEXT
  )
`;

db.query(createOrderTable, (err, result) => {
  if (err) throw err;
  console.log('Tabla de pedidos lista.');
});

// Ruta de registro de usuarios
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      res.status(400).send('Error al registrar usuario.');
      return;
    }
    res.status(201).send('Usuario registrado exitosamente.');
  });
});

// Ruta de autenticación de usuarios
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      res.status(400).send('Error al autenticar usuario.');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Credenciales inválidas.');
      return;
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).send('Credenciales inválidas.');
      return;
    }

    const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Middleware para verificar el token
const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).send('No autorizado, no se encontró el token.');
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('No autorizado, token no válido.');
  }
};

// Ruta protegida para manejar el formulario
app.post('/enviar', protect, (req, res) => {
  const { producto, cantidad, 'otro-producto': otroProducto, direccion } = req.body;
  const otraCantidad = req.body.cantidad;

  const query = 'INSERT INTO orders (producto, cantidad, otroProducto, otraCantidad, direccion) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [producto, cantidad, otroProducto, otraCantidad, direccion], (err, result) => {
    if (err) {
      res.status(500).send('Error al guardar el pedido.');
      return;
    }
    res.send('Pedido guardado exitosamente.');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
