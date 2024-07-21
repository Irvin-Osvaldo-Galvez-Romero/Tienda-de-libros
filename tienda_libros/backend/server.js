const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda_libros'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un nuevo libro
app.post('/libros', (req, res) => {
    const { titulo, autor, precio, stock } = req.body;
    const query = 'INSERT INTO libros (titulo, autor, precio, stock) VALUES (?, ?, ?, ?)';
    db.query(query, [titulo, autor, precio, stock], (err, results) => {
        if (err) {
            console.error('Error al agregar el libro:', err);
            res.status(500).json({ message: 'Error al agregar el libro' });
        } else {
            res.status(200).json({ message: 'Libro agregado correctamente', id: results.insertId });
        }
    });
});

// Ruta para obtener todos los libros
app.get('/libros', (req, res) => {
    const query = 'SELECT * FROM libros';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los libros:', err);
            res.status(500).json({ message: 'Error al obtener los libros' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Ruta para actualizar un libro
app.put('/libros/:id', (req, res) => {
    const libroId = req.params.id;
    const { titulo, autor, precio, stock } = req.body;
    const query = 'UPDATE libros SET titulo = ?, autor = ?, precio = ?, stock = ? WHERE id = ?';
    db.query(query, [titulo, autor, precio, stock, libroId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el libro:', err);
            res.status(500).json({ message: 'Error al actualizar el libro' });
        } else {
            res.status(200).json({ message: 'Libro actualizado correctamente' });
        }
    });
});

// Ruta para eliminar un libro
app.delete('/libros/:id', (req, res) => {
    const libroId = req.params.id;
    const query = 'DELETE FROM libros WHERE id = ?';
    db.query(query, [libroId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el libro:', err);
            res.status(500).json({ message: 'Error al eliminar el libro' });
        } else {
            res.status(200).json({ message: 'Libro eliminado correctamente' });
        }
    });
});

// Ruta para registrar un nuevo usuario
app.post('/registro', async (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    
    try {
        const result = await db.query(query, [username, password]);
        console.log('User inserted:', result);
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});


// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err || results.length === 0) {
            res.status(401).json({ message: 'Credenciales inválidas' });
        } else {
            const user = results[0];
            if (user.rol === 'administrador') {
                res.status(200).json({ message: 'Inicio de sesión exitoso', rol: 'administrador' });
            } else if (user.rol === 'cliente') {
                res.status(200).json({ message: 'Inicio de sesión exitoso', rol: 'cliente' });
            } else {
                res.status(403).json({ message: 'Rol de usuario no válido' });
            }
        }
    });
});
//CRUD usuarios
// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).json({ message: 'Error al obtener los usuarios' });
        } else {
            res.status(200).json(results);
        }
    });
});
//CRUD usuarios
// Ruta para agregar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    
    try {
        const result = await db.query(query, [username, password]);
        console.log('User inserted:', result);
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});
//CRUD usuarios
// Ruta para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        } else {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        }
    });
});
//CRUD usuarios
// Ruta para actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    const { username, password } = req.body;
    const query = 'UPDATE usuarios SET username = ?, password = ? WHERE id = ?';
    db.query(query, [username, password, usuarioId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).json({ message: 'Error al actualizar el usuario' });
        } else {
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        }
    });
});
//CRUD usuarios
// Ruta para actualizar el rol de un usuario
app.put('/usuarios/:id/rol', (req, res) => {
    const usuarioId = req.params.id;
    const { rol } = req.body;
    const query = 'UPDATE usuarios SET rol = ? WHERE id = ?';
    db.query(query, [rol, usuarioId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el rol del usuario:', err);
            res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
        } else {
            res.status(200).json({ message: 'Rol de usuario actualizado correctamente' });
        }
    });
});


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
