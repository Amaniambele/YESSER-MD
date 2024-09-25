const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE5wSmJjdjBmbkthSGR0R2xMajdHcUk4K3R1YmJCc3gyUWJVQ1ZYV01HRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXlwQkhOZXRBc1JCOU9UWi9vSGZvTU9YYmJqYzJlNEhRbCs5YzhsOUJVdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSWloaklGak5qeVU2RXlnQzhUdXdodVBlSlNnVzd2cWxWeGdoTzhqYTNzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0NVNtVDRweU9haTRHdmJTKzlxcXFqeGRtTGhQa0FQb09uY25SK0x6WkU0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlQd1dMQnErMW5mN2VWaCtmQVlZRzlQWmJuMG5raG1DdXhubGpXWFpXa1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNRZFNnanlHaXh4bWE0TXpIbnVTcEJyNzVva0RWVklvNk9oa05pYnkzaHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5XaTBxTFRBL2hxWVZUNFZiZHY5YVl5eXhteTBmVkhOR2puL1hkM1JIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0E5TjBQS1UwSWc0Q0RZMjRjNTYzc0I3QURyY2ZBRG14elBxSFdnWWdqND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRZQ1AxeG52TXFzQUwybTJSclg4VVlPRmRkUlVWemhzMWpYOHNXaS9aa2tpUG05OWZ5ZzBLQWNQZEpJMUFOZEZxSUdOK1dZR0piNzJ6NnJkQ2VDZURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJ2WFVNTGtVOHh6NXE4dGJkcmljaFlxQy9TWk1xSDVPSnFpUENXNmR6UCtZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUdUtSTkc2U1RVNmNNbEZLTmVlNjlBIiwicGhvbmVJZCI6ImExMjE3YTFiLTVhNTUtNGVhMS1iZTg1LWUwYjI0ZTIwM2RlYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkQ3h6Sis1QWo4ZTlFUzdRVjBKRURkYitPWEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2tyNWJNaWZtdnhRTjdmWnNteGJDRC9DUFFzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlENTYxTTY3IiwibWUiOnsiaWQiOiIyNTU2OTY0OTc3MDk6NTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQTEgUGhvdG9ncmFwaGVyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPRFZnWndDRU8yYTBMY0dHQzBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOeDdhYm1jTVhqaTdNS0daQVFWdFBRc3RQaG95c0h2T3dXMnlWSkZCREg0PSIsImFjY291bnRTaWduYXR1cmUiOiJBTkhjc3hiSDZUYVEvSGo2NnF2MkJIWVdKUjZuYitWckpyS2hHeXFpOGhpcS9zbHR4UEdVaFVvVVk4dUJsYzNYTU84QVN0ODFiSDdqREVsT2NMQ0pBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaFB3RkFkcmJwc0NmMXJmYXFCbzJ1Mkt5ekJvNjNmb1BFZGt3RFJPRm5scXJhNk1yWm9PSk1OK1NnZHVSeStHOEh4Q0o0Y3k0ZXZjdG5NRStNZERuQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTY0OTc3MDk6NTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGNlMm01bkRGNDR1ekNobVFFRmJUMExMVDRhTXJCN3pzRnRzbFNSUVF4KyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzI3MDI2N30=''zokk',
    PREFIXE: process.env.PREFIX || "?",
    OWNER_NAME: process.env.OWNER_NAME || "Yassin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255621995482",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Yesser Md ',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/37882de26f9ffc60043ef.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
