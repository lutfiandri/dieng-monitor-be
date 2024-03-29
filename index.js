const env = require('./config/env');
const express = require('express');
const cors = require('cors');

const app = express();

const deviceController = require('./controller/device-controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('files'));

app.get('/', (req, res) => res.send('welcome to dieng-monitor'));

app.post('/devices/:id/data', deviceController.upsertData);
app.get('/devices/:id/excel', deviceController.exportExcel);

app.listen(env.AppPort, () =>
  console.log('server started on port', env.AppPort)
);
