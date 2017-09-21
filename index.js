require('dotenv').config();

const Koa = require('koa');
const error = require('koa-json-error');
const body = require('koa-json-body');
const jwt = require('koa-jwt');
const routes = require('./routes');

const app = new Koa();

app
  .use(error())
  .use(body())
  .use(routes.public)
  .use(jwt({ secret: process.env.JWT_SECRET }))
  .use(routes.protected);

const port = 3000;

app.listen(port, function(){
  console.log(`Server running at http://localhost:${port}`);
});
