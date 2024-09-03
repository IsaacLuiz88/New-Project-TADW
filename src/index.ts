import 'graphql-import-node';
import { execute, parse } from "graphql";
import { schema } from "./schema";
import fastify = require('fastify');

async function main() {
  const server = fastify();
  
  server.get("/", (req, reply) => {
    reply.send({ test: true });
  });

  server.listen(8100,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:8100`);
  });
}

main();