import makeWASocket, { 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import P from 'pino';
import express from 'express';
import QRCode from 'qrcode';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

app.use(express.json());

let sock;
let qrCodeData = null;
let connectionStatus = 'disconnected';

// Logger
const logger = P({ level: 'info' });

// Iniciar WhatsApp
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./whatsapp_session');
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        version,
        logger,
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        getMessage: async (key) => {
            return { conversation: '' };
        }
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            // Generar código QR
            qrCodeData = await QRCode.toDataURL(qr);
            logger.info('QR Code generated');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true;

            logger.info('Connection closed', { shouldReconnect });
            connectionStatus = 'disconnected';

            if (shouldReconnect) {
                setTimeout(connectToWhatsApp, 3000);
            }
        } else if (connection === 'open') {
            logger.info('WhatsApp connected successfully');
            connectionStatus = 'connected';
            qrCodeData = null;
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // Escuchar mensajes entrantes
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            for (const msg of messages) {
                if (!msg.message || msg.key.fromMe) continue;

                const from = msg.key.remoteJid.replace('@s.whatsapp.net', '');
                const messageContent = msg.message.conversation || 
                                     msg.message.extendedTextMessage?.text || 
                                     '';

                logger.info('Message received', { from, message: messageContent });

                // Enviar al backend
                try {
                    await axios.post(`${BACKEND_API_URL}/api/whatsapp/webhook`, {
                        from,
                        message: messageContent,
                        timestamp: new Date(msg.messageTimestamp * 1000)
                    });
                } catch (error) {
                    logger.error('Error sending to backend', error);
                }
            }
        }
    });
}

// API Endpoints

app.get('/status', (req, res) => {
    res.json({
        status: connectionStatus,
        hasQR: qrCodeData !== null
    });
});

app.get('/qr', (req, res) => {
    if (qrCodeData) {
        res.json({
            qr: qrCodeData,
            message: 'Scan this QR code with WhatsApp'
        });
    } else if (connectionStatus === 'connected') {
        res.json({
            message: 'WhatsApp already connected'
        });
    } else {
        res.status(404).json({
            message: 'QR code not available yet'
        });
    }
});

app.post('/send-message', async (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: 'Missing to or message' });
    }

    if (connectionStatus !== 'connected') {
        return res.status(503).json({ error: 'WhatsApp not connected' });
    }

    try {
        const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`;
        
        await sock.sendMessage(jid, { text: message });
        
        logger.info('Message sent', { to, message });
        
        res.json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        logger.error('Error sending message', error);
        res.status(500).json({
            error: 'Failed to send message',
            details: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    logger.info(`WhatsApp service listening on port ${PORT}`);
    connectToWhatsApp();
});
