require('dotenv').config();
const app = require('./config/server');
const db = require("./config/database");

const PORT = process.env.PORT || 8000;

db.getConnection().then(() => {
  console.log("database connected.");
  app.listen(PORT, (err) => {
    // eslint-disable-next-line no-console
    if (err) console.error(err);
    // eslint-disable-next-line no-console
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});