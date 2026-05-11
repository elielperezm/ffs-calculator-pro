import axios from 'axios';

export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('Falta el código de autorización de GHL');
    }

    try {
        const options = {
            method: 'POST',
            url: 'https://services.leadconnectorhq.com/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: new URLSearchParams({
                client_id: process.env.GHL_CLIENT_ID,
                client_secret: process.env.GHL_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.GHL_REDIRECT_URI,
                user_type: 'Location'
            })
        };

        const response = await axios.request(options);
        
        // Por ahora, solo mostraremos que la conexión fue exitosa
        console.log('Conexión exitosa:', response.data);
        res.status(200).json({ 
            message: '¡App conectada con éxito!',
            access_token: 'Recibido correctamente' 
        });

    } catch (error) {
        console.error('Error en la conexión:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Error al conectar con GHL', 
            details: error.response?.data || error.message 
        });
    }
}
