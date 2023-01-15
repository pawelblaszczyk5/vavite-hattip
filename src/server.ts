import { createMiddleware, createServer } from "@hattip/adapter-node";
import { HattipHandler } from "@hattip/core";
import { Server } from "http";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";
import { WebSocketServer } from "ws";

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

const createWsHandler = (server: Server) => {
  const ws = new WebSocketServer({ server });

  ws.on("connection", (socket) => {
    socket.on("message", (data) => {
      console.log(data.toString());
    });
  });
};

if (httpDevServer) {
  console.log("DEV SERVER");
  httpDevServer.on("request", createMiddleware(handler));
  createWsHandler(viteDevServer?.httpServer!);
} else {
  console.log("PROD SERVER");
  const server = createServer(handler).listen(3000, "localhost", () => {
    console.log("Server listening on http://localhost:3000");
  });
  createWsHandler(server);
}
