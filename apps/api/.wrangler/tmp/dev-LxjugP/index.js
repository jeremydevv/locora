var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/itty-router/index.mjs
var e = /* @__PURE__ */ __name(({ base: e2 = "", routes: t = [], ...o2 } = {}) => ({ __proto__: new Proxy({}, { get: /* @__PURE__ */ __name((o3, s2, r, n) => "handle" == s2 ? r.fetch : (o4, ...a) => t.push([s2.toUpperCase?.(), RegExp(`^${(n = (e2 + o4).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), a, n]) && r, "get") }), routes: t, ...o2, async fetch(e3, ...o3) {
  let s2, r, n = new URL(e3.url), a = e3.query = { __proto__: null };
  for (let [e4, t2] of n.searchParams) a[e4] = a[e4] ? [].concat(a[e4], t2) : t2;
  for (let [a2, c2, i2, l2] of t) if ((a2 == e3.method || "ALL" == a2) && (r = n.pathname.match(c2))) {
    e3.params = r.groups || {}, e3.route = l2;
    for (let t2 of i2) if (null != (s2 = await t2(e3.proxy ?? e3, ...o3))) return s2;
  }
} }), "e");
var o = /* @__PURE__ */ __name((e2 = "text/plain; charset=utf-8", t) => (o2, { headers: s2 = {}, ...r } = {}) => void 0 === o2 || "Response" === o2?.constructor.name ? o2 : new Response(t ? t(o2) : o2, { headers: { "content-type": e2, ...s2.entries ? Object.fromEntries(s2) : s2 }, ...r }), "o");
var s = o("application/json; charset=utf-8", JSON.stringify);
var c = o("text/plain; charset=utf-8", String);
var i = o("text/html");
var l = o("image/jpeg");
var p = o("image/png");
var d = o("image/webp");

// src/routes/utils/OriginValidate.ts
var ValidOrigins = ["https://locora.org", "https://api.locora.org", "http://localhost:5173"];
function OriginValidate(origin) {
  if (!origin) return false;
  if (origin?.startsWith("http://localhost")) return true;
  if (ValidOrigins.includes(origin)) return true;
  return false;
}
__name(OriginValidate, "OriginValidate");

// src/routes/utils/Corsify.ts
function Corsify_default(req, res) {
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", OriginValidate(req.headers.get("Origin")) && req.headers.get("Origin") || "https://locora.org");
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(res.body, {
    headers,
    status: res.status
  });
}
__name(Corsify_default, "default");

// src/routes/utils/JSONResponse.ts
function JSONResponse(req, data, status = 200) {
  return Corsify_default(req, new Response(
    JSON.stringify(data),
    { status, headers: { "Content-Type": "application/json" } }
  ));
}
__name(JSONResponse, "JSONResponse");

// src/routes/v1/auth.ts
var router = e({ base: "/v1/auth" });
router.post("/test", (req) => {
  return JSONResponse(req, {
    "test": "test"
  });
});
var handleAuth = router.handle;

// src/routes/utils/isValidEmail.ts
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
__name(isValidEmail, "isValidEmail");

// src/routes/v1/waitlist.ts
var router2 = e({ base: "/v1/waitlist/" });
router2.post("add", async (req, env) => {
  const WaitlistResults = await Add_To_Waitlist(req, env);
  return WaitlistResults;
});
router2.options("*", (req) => {
  return Corsify_default(req, new Response(null, {
    status: 200
  }));
});
router2.all("/*", (req) => {
  return Corsify_default(req, new Response("Not Found", { status: 404 }));
});
async function checkForValidEmail(req, email) {
  if (email == "") {
    return JSONResponse(
      req,
      {
        status: "error",
        message: "Email is required."
      },
      400
    );
  }
  if (!email) {
    return JSONResponse(
      req,
      {
        status: "error",
        message: "Email is required."
      },
      400
    );
  }
  if (!isValidEmail(email)) {
    return JSONResponse(
      req,
      {
        status: "error",
        message: "Invalid email address."
      },
      400
    );
  }
  return true;
}
__name(checkForValidEmail, "checkForValidEmail");
async function VerifyTurnstileToken(req, token, env, ip) {
  if (!token) {
    return JSONResponse(
      req,
      {
        status: "error",
        message: "Turnstile token is required."
      },
      400
    );
  }
  if (token == "") {
    return JSONResponse(
      req,
      {
        status: "error",
        message: "Turnstile token is required."
      },
      400
    );
  }
  const formData = new URLSearchParams();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  if (ip) formData.append("remoteip", ip);
  console.log("passed form data thing");
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData
    }
  );
  const data = await res.json();
  if (data.success) {
    return true;
  }
  return JSONResponse(
    req,
    {
      status: "error",
      message: "Turnstile token is invalid."
    },
    400
  );
}
__name(VerifyTurnstileToken, "VerifyTurnstileToken");
async function Add_To_Waitlist(req, env) {
  const body = await req.json();
  const Email = body.email;
  const IP = req.headers.get("CF-Connecting-IP");
  const EmailValid = await checkForValidEmail(req, Email);
  if (!EmailValid) {
    return EmailValid;
  }
  const TurnstileValid = await VerifyTurnstileToken(req, body.turnstile_token, env, IP);
  if (!TurnstileValid) {
    return TurnstileValid;
  }
  return JSONResponse(req, {
    status: "success",
    message: "You have been added to the waitlist."
  });
}
__name(Add_To_Waitlist, "Add_To_Waitlist");
var handleWaitlist = /* @__PURE__ */ __name((req, env) => router2.handle(req, env), "handleWaitlist");

// src/routes/utils/SourceValidation.ts
var AllowedOrigins = [
  "https://locora.org",
  "https://api.locora.org",
  "http://localhost:5173"
];
function SourceValidation(req) {
  console.log(req.headers.get("Origin"));
  if (req.headers.get("Origin") == null || !AllowedOrigins.includes(req.headers.get("Origin"))) {
    return false;
  }
  return true;
}
__name(SourceValidation, "SourceValidation");

// src/index.ts
var router3 = e();
router3.get("/", () => {
  return Response.redirect("https://locora.org", 302);
});
router3.all("/v1/auth/*", handleAuth);
router3.all("/v1/waitlist/*", handleWaitlist);
router3.all("*", (req) => Corsify_default(req, new Response("Not Found", { status: 404 })));
var src_default = {
  fetch: /* @__PURE__ */ __name((request, env, ctx) => {
    if (!SourceValidation(request)) {
      return Corsify_default(request, new Response("Forbidden", { status: 403 }));
    }
    return router3.handle(request, env, ctx);
  }, "fetch")
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e2) {
      console.error("Failed to drain the unused request body.", e2);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-UtRDf0/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-UtRDf0/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
