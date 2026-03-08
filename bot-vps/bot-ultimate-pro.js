const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const mysql = require('mysql2/promise');
const fs = require('fs');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Vega-CuBa0510',
    database: 'bot_reenvio_db'
};

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './auth_session' }),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

async function query(sql, params) {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(sql, params);
    await conn.end();
    return rows;
}

// Extrae IDs de WhatsApp de los links nuevos
async function revisarNuevosGrupos() {
    const pendientes = await query('SELECT id, enlace_invitacion FROM grupos_destino WHERE whatsapp_id IS NULL');
    for (const g of pendientes) {
        try {
            const code = g.enlace_invitacion.split('chat.whatsapp.com/')[1];
            const info = await client.getInviteInfo(code);
            await query('UPDATE grupos_destino SET whatsapp_id = ?, nombre_grupo = ? WHERE id = ?', [info.id._serialized, info.subject, g.id]);
            console.log(`✅ ID vinculado: ${info.subject}`);
        } catch (e) { console.error("❌ Error en link:", g.enlace_invitacion); }
    }
}

// Procesa cada mensaje como una campaña independiente
async function procesarCampanas() {
    await revisarNuevosGrupos();
    const mensajes = await query('SELECT * FROM mensajes_programados WHERE estado = "pendiente"');

    for (const m of mensajes) {
        // Marcamos como 'enviando' para que otros procesos no lo toquen
        await query('UPDATE mensajes_programados SET estado = "enviando" WHERE id = ?', [m.id]);
        
        const destinos = await query(`
            SELECT g.whatsapp_id FROM grupos_destino g 
            JOIN mensaje_destinos md ON g.id = md.grupo_id 
            WHERE md.mensaje_id = ? AND g.activo = 1`, [m.id]);

        console.log(`🚀 Iniciando Campaña #${m.id} (${destinos.length} grupos)`);

        for (const d of destinos) {
            try {
                await client.sendMessage(d.whatsapp_id, m.contenido);
                console.log(`  [Campaña ${m.id}] Enviado a ${d.whatsapp_id}`);
                
                // Ritmo personalizado de este mensaje
                const espera = Math.floor(Math.random() * (m.intervalo_max - m.intervalo_min) + m.intervalo_min);
                await new Promise(r => setTimeout(r, espera * 1000));
            } catch (e) { console.error("  ❌ Error envío:", e.message); }
        }
        await query('UPDATE mensajes_programados SET estado = "finalizado" WHERE id = ?', [m.id]);
    }
}

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => {
    console.log('🤖 Bot de Reenvío Online');
    setInterval(procesarCampanas, 30000); // Revisa campañas cada 30 seg
});
client.initialize();

