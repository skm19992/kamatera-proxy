const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = "44d658798aa09b6287c6736fb3b352df"; 
const API_SECRET = "35bab809874b741cf21185c6680c00dc";

app.post("/power", async (req, res) => {
    const { serverId, action } = req.body; 

    if (!serverId || !action) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const response = await axios.put(
            `https://console.kamatera.com/service/server/${serverId}/power`,
            { power: action },
            {
                headers: {
                    "AuthClientId": API_KEY,
                    "AuthSecret": API_SECRET,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy Server Running on Port ${PORT}`));
