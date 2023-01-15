import { createMiddleware, createServer } from "@hattip/adapter-node";
import { HattipHandler } from "@hattip/core";
import httpDevServer from "vavite/http-dev-server";

const handler: HattipHandler = (context) => {
  const { pathname } = new URL(context.request.url);
  if (pathname === "/") {
    return new Response("Hello from HatTip.");
  } else if (pathname === "/about") {
    return new Response(
      "This HTTP handler works in Node.js and Cloudflare Workers. LOL"
    );
  } else {
    return new Response("Not found.", { status: 404 });
  }
};

if (httpDevServer) {
  console.log("DEV SERVER");
  httpDevServer.on("request", createMiddleware(handler));
} else {
  console.log("PROD SERVER");
  createServer(handler).listen(3000, "localhost", () => {
    console.log("Server listening on http://localhost:3000");
  });
}
