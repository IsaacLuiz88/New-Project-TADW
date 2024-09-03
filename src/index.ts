import 'graphql-import-node';
import { getGraphQLParameters, processRequest, Request, renderGraphiQL, shouldRenderGraphiQL, sendResult } from "graphql-helix";
import { schema } from "./schema";
import fastify = require('fastify');

async function main() {
  const server = fastify();
  
  server.route({
    method: ["POST", "GET"],
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      };

      if (shouldRenderGraphiQL(request)) {
        reply.header("Content-Type", "text/html");
        reply.send(
          renderGraphiQL({
            endpoint: "/graphql",
          })
        );

        return;
      }

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        query,
        variables,
      });

      sendResult(result, reply.raw);
    }
  });


  server.get("/", (req, reply) => {
    reply.send({ test: true });
  });

  server.listen(8100,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:8100`);
  });
}

main();