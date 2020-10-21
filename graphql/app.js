const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const fs = require('fs');
const path = require('path');

const schema = graphql.buildSchema(
  fs.readFileSync(path.resolve(__dirname, '1.graphql'), { encoding: 'utf-8' })
);
const root = {
  hello: () => 'Hello world!',
};

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => console.log('localhost:4000'));
