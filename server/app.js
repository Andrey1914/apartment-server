const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("../schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({
  defaults: ".env",
});

const app = express();
const { PORT, MONGO_DB } = process.env;

mongoose.connect(MONGO_DB, { useNewUrlParser: true });

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = mongoose.connection;
dbConnection.on("error", (error) => console.log(`Connection error: ${error}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`The server is started on port: ${PORT}`);
});
