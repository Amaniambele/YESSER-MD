const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NYdk1aaGx2Qnh6NXFCY0l2WThsdHVRYUovc1pMN1Jkc1FZWWtsS1dsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZXRnBmelVKNG9yR1hzY2xzU3dqQUVvT0tQVUx2VlFKSytqaEgwTnRVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZSitmZmlsV3dSWkQ1bWZHVmRsY2xiQzhzVVd4QTBYUWc2ZkxTeDQ0UkVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVRTYyNWkyQWxNMjROOWxQZmpBN0pjeEdwR3BCOVg0S0RmRDJ6bU81bDJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDRlk5UXlRdVNRNUhTay9vSTFaa2JhR1hnRGIyait1cGhvLzZYVmhSRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9GaVlGSUVtQU5NRUhjTGJBcHlkTlY0YkJYVm02WE5OYVdCNkc2SlNEMUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZUeU53WWE1OUg4UTM2OWFsQ2ZtYkR3QlVjU1VqTWdibWpXYjJGSWNXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzREZGhYSUZPSzExbmhKRnphdnRBeWxFdUkrblZLSkc2aGtVeEEya2hoMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9vdjh4RkcxMVY1dHk1SDIyUzE3aVBiUzhqYktjb0FjbmI2a2JNOTM1VWRPRDMyT0laZDAySmM3QXVycFgzVVAydldHb1ptbzZ0b0xEWUZyVW85emhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJiK1l4WEEvOHVLVzFzRExKL0o1bnh3UVV1NVM0ekRMNmVtU0dzNFdYV2o0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnQ1NCMDd5OFRKR25WWFhmN0I2cUJ3IiwicGhvbmVJZCI6ImI1Nzg5ZDljLTVmYTEtNGM2Yi1iZmM1LTc0NTQ0NGYyM2YwMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsQmdtL0xNWnAvSFljclJwR3pVaVhsY0x1Zms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXNZZ0Z3Um1IcFZvQ2hobnR6ZGp3YWpQY1owPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNIVzVMV0g4IiwibWUiOnsiaWQiOiIyNTU2OTY0OTc3MDk6NDRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQTEgUGhvdG9ncmFwaGVyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPRFZnWndDRUttU29yY0dHQ0lnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOeDdhYm1jTVhqaTdNS0daQVFWdFBRc3RQaG95c0h2T3dXMnlWSkZCREg0PSIsImFjY291bnRTaWduYXR1cmUiOiJaaU9ERnNla3FMYzlvMytuT2UxZEtGbEI4STk0MEZBMyt0bkQ2ZnZxNmFMLzBDaW1IVDhMQjlMNGZhWUd0TkgxN0FFN2FZenV6Q2xoK2djN1V3cnFBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVkE2YmJxbXcvdFk2WjJNaW5NVWJGNHZqNlQ3RzBXSTBqeFdZaEVCUzZjRTR6MG8wSHdsbFg0c0E2WXFuWHk3YXdrdXV1VGdVZW93OXZDVkFUTzRmaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTY0OTc3MDk6NDRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGNlMm01bkRGNDR1ekNobVFFRmJUMExMVDRhTXJCN3pzRnRzbFNSUVF4KyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjUxNTUxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLdFQifQ==''zokk',
    PREFIXE: process.env.PREFIX || "+",
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
