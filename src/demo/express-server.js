const express = require('express');
const path = require("path");

const app = express();

app.use(express.static("static"));

/**
 * app.[method]([route], [route handler])
 */
app.get('/', (req, res) => {
  console.log('Hello from express');
  res.status(200);
  res.json({ message: 'hello' });
})
app.get("/home", (req, res) => {
  // sending back an HTML file that a browser can render on the screen.
  res.sendFile(path.resolve("pages/index.html"));
});

app.listen(3001, () => {
  console.log('API is running')
})

module.exports = app;