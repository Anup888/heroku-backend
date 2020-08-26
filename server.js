const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
require("dotenv").config({ path: "variables.env" });

const Form = require("./models/Form");
const FormResponse = require("./models/FormResponses");
//  graphql middlewares
const {
  graphiqlExpress,
  graphqlExpress,
  graphiqlConnect,
} = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
// connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.error(err));

// initializes app
const app = express();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
app.use(cors("*"));
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// create graphql application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// connect schema to graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { Form, FormResponse } })
);
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
