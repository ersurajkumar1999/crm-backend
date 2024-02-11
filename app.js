const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(cors());


app.use('/', homeRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/v1', adminRoutes)
app.use('/api/v1', countryRoutes)
app.use('/api/v1', stateRoutes)

module.exports = {app};