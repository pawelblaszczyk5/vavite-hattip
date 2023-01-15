import { createMiddleware } from "@hattip/adapter-node";
import { HattipHandler } from "@hattip/core";

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

const app = createMiddleware(handler);

export default app;
