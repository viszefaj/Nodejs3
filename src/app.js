const fastify = require("fastify");
const todo = require("./routes/todo");
const fastifySwagger = require("@fastify/swagger");
const fastifyPostgres=require('@fastify/postgres')
const {todo_v2}=require('./routes/v2/todo')

const build = (opts = {}, optsSwagger = {},optsPostgres={}) => {
  const app = fastify(opts);
  app.register(fastifyPostgres,optsPostgres);
  app.register(fastifySwagger, optsSwagger);
  app.register(todo,{prefix:'/v1'});
  app.register(todo_v2,{prefix:'/v2'});
  return app;
};
module.exports = { build };