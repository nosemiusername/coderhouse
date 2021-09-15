import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";

const app = createApp();

const colors = [];

//TODO: Implementar carga de listado de colors
app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head></head>
        <body>
          <form action="/addColor" method="POST">
            <input
              class="input"
              type="text"
              name="color"
              id="color"
              placeholder="Insertar Color"
            />
            <button style="display:block" type="submit">
              Enviar
            </button>
          </form>
          <div id="divColor"></div>
        </body>
      </html>
    ),
  });
});

//TODO: Implementar redirect de /
app.handle("/addColor", async (req) => {});

app.listen({ port: 8080 });
