import { fromHono } from "chanfana";
import { Hono } from "hono";

import { AccountCreate } from "./endpoints/v1/create";

const app = new Hono<{ Bindings: Env }>();

const openapi = fromHono(app, {
	docs_url: "/",
});

openapi.get("/v1/login", AccountCreate);

export default app;
