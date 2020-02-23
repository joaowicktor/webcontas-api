const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const corsOptions = require('./config/cors')

require('./database');

const app = express();

app.use(express.json());
app.use(cors(corsOptions))
app.use(routes);

app.listen(3333, () => console.log('Server running at port 3333'));
