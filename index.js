const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

// vars
const env = dotenv.config().parsed;
const app = express();
const PORT = env.PORT || 6060;

// middlewars
app.use(cors());
app.use(fileUpload()); // позволяет получать formData в запросах
app.use(express.json()); // позволяет читать json в запросах
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] :response-time ms')); // выведение в консоль всех запросов
app.use('/', express.static('./static')); // путь для всех элементов

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// start server
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`link: http://localhost:${PORT}`);
});
