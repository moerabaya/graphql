import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";
import resolvers from "./data/resolvers";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazing!");
});

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3001, () =>
  console.log("Running server on port localhost:3001/graphql")
);
