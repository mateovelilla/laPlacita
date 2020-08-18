const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser')
const dotenv = require('dotenv');
const app = new Koa();
app.use(cors());
app.use(bodyParser());
dotenv.config({path: path.resolve(__dirname, '../.env')});

// Import Routes
const ProductRouter = require(path.resolve(__dirname, './routes/productRouter'))

app.use(ProductRouter().routes())


app.listen(3000);