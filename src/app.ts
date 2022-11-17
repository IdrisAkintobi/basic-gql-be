import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import { expressjwt, Request } from "express-jwt";
import { applyMiddleware } from "graphql-middleware";
import morgan from "morgan";
import context from "./middleware/ctx";
import permissions from "./middleware/permission";
import typeDefs from "./model/type.defs";
import resolvers from "./resolver";

//Initialize express
const app = express();

//Pass express-jwt middleware
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

//Initialize morgan
morgan.token("graphql-query", (req: Request) => {
  const query = req.body?.query;
  return `GraphQL query: ${query}`;
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms \n :graphql-query"
  )
);

//Create Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schema, permissions);

//Initialize ApolloServer
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context,
  introspection: process.env.NODE_ENV !== "production",
  cache: "bounded",
});

//Apply ApolloServer to express
server.start().then(() =>
  server.applyMiddleware({
    app,
    path: "/",
  })
);

export default app;
