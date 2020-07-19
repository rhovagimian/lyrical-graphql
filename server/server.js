//@ts-check
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Replace with your Mongodb URI
const MONGO_URI = "";
if (!MONGO_URI) {
  throw new Error("You must provide a MongoDB URI");
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB instance."));
db.on("error", (error) => console.log("Error connecting to MongoDB:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
