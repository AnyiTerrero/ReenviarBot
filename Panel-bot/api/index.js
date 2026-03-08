const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'bot_reenvio_db'
});

// Grupos
app.get('/api/grupos', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM grupos_destino');
    res.json(rows);
});

app.post('/api/grupos', async (req, res) => {
    const { enlace, nombre } = req.body;
    await pool.query('INSERT INTO grupos_destino (enlace_invitacion, nombre_grupo) VALUES (?, ?)', [enlace, nombre]);
    res.json({ success: true });
});

// Campañas (Mensaje + Selección de Grupos)
app.post('/api/campanas', async (req, res) => {
    const { contenido, grupos_ids, min, max } = req.body;
    const [ins] = await pool.query(
        'INSERT INTO mensajes_programados (contenido, intervalo_min, intervalo_max) VALUES (?, ?, ?)',
        [contenido, min, max]
    );
    const msgId = ins.insertId;
    
    const values = grupos_ids.map(gid => [msgId, gid]);
    await pool.query('INSERT INTO mensaje_destinos (mensaje_id, grupo_id) VALUES ?', [values]);
    
    res.json({ success: true });
});

module.exports = app;

