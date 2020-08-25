const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = new Koa();
app.use(cors());
app.use(bodyParser());

// GET THE ENVIRONMENT VARIABLES
dotenv.config({path: path.resolve(__dirname, '../.env')});
const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DBNAME} = process.env

// IMPORT ROUTES
const ProductRouter = require(path.resolve(__dirname, './routes/productRouter'))
const UserRouter = require(path.resolve(__dirname, './routes/userRouter'))
const CartRouter = require(path.resolve(__dirname, './routes/cartRouter'))

// BUILD DATABASE URL
const url = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`;

// START CONNECTION TO MONGODB

mongoose.connect(url, {
  auth: {
    authSource: 'admin'
  },
  "user": MONGODB_USERNAME,
  "pass": MONGODB_PASSWORD,
  useUnifiedTopology: true,
  useNewUrlParser: true 
});

// ROUTES INJECTION
app.use(ProductRouter().routes())
app.use(UserRouter().routes())
app.use(CartRouter().routes())

app.listen(process.env.PORT);