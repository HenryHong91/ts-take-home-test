import { Database } from "@db/sqlite";
import * as oak from "@oak/oak";
import * as path from "@std/path";
import { Port } from "../lib/utils/index.ts";
import { createTable } from "./tables/insights.ts";
import { insightService } from "./services/insightService.ts";
import { validateCreateInsight, validateId } from "./utils/validator.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const dbFilePath = path.resolve("tmp", "db.sqlite3");
console.log(`Opening SQLite database at ${dbFilePath}`);

await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);
db.exec(createTable);

const service = insightService(db);

console.log("Initialising server");
const app = new oak.Application();
const router = new oak.Router();

// Register global error handler
app.use(errorHandler);

// Health check
router.get("/_health", (ctx: oak.Context) => {
  ctx.response.body = { status: true, message: "OK" };
});

// [GET] Retrieve all insights
router.get("/insights", async (ctx: oak.Context) => {
  ctx.response.body = {
    status: true,
    message: "Success",
    data: await service.getAll(),
  };
});

// [GET] Retrieve a single insight
router.get("/insights/:id", async (ctx: oak.RouterContext<"/insights/:id">) => {
  const id = validateId(ctx.params.id);
  const data = await service.getById(id);
  ctx.response.body = { status: true, message: "Success", data: [data] };
});

// [POST] Create an insight
router.post("/insights/create", async (ctx: oak.Context) => {
  const rawBody = await ctx.request.body.json();
  const validatedData = validateCreateInsight(rawBody);
  const result = await service.create(validatedData);

  ctx.response.status = 201;
  ctx.response.body = { status: true, message: "Created", data: [result] };
});

// [DELETE] Delete an insight
router.delete(
  "/insights/:id",
  async (ctx: oak.RouterContext<"/insights/:id">) => {
    const id = validateId(ctx.params.id);
    const result = await service.remove(id);
    ctx.response.body = { status: true, message: "Deleted", data: [result] };
  },
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
