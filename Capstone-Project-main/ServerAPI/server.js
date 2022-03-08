const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./DB');
const adminRoute = require('./routes/AdminRoute');
const companyRoute = require('./routes/companyRoute');
const customerRoute = require('./routes/CustomerRoute');
const productRoute = require('./routes/ProductRoute');

const PORT = process.env.PORT || 5000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use('/api/admins', adminRoute);
app.use('/api/company',companyRoute);
app.use('/api/customer',customerRoute);
app.use('/api/product',productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});