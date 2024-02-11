const express = require("express");
const http = require("http");
const cors = require('cors');
const dotenv = require("dotenv");
const { PORT } = require('./utilities/config');
const connectToDB = require("./db");
const homeRoutes = require('./routes/HomeRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const countryRoutes = require('./routes/countryRoutes');
const stateRoutes = require('./routes/stateRoutes');
const cityRoutes = require('./routes/cityRoutes');
const friendShipRoutes = require('./routes/friendShipRoutes');
const imageRoutes = require('./routes/imageRoutes');
const postRoutes = require('./routes/postRoutes');


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(cors());


app.use('/', homeRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', countryRoutes);
app.use('/api/v1', stateRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', cityRoutes);
app.use('/api/v1', friendShipRoutes);
app.use('/api/v1', imageRoutes);
app.use('/api/v1', postRoutes);

connectToDB();
const server = http.createServer(app);

server.listen(PORT, () => {
   console.log(`server up on port ${PORT}`);
});