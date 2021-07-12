const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const { notFound, errorHandler } = require('./middleware/Error');
const connectDB = require('./config/db');

connectDB();

dotenv.config();

//init middleware
app.use(express.json({ extented: false }));

app.use(morgan('dev'));

app.use('/api/users', require('./routes/user'));
app.use('/api/task', require('./routes/task'));

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running on ${port}`));
