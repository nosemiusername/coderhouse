import {
  contentTypeFilter,
  createApp,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";

// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOM from "https://dev.jspm.io/react-dom/server.js";

const app = createApp();

const colors: any = [];

const App = () => colors.map((item: string, key: string) => <li>{item}</li>);

//TODO: Implementar carga de listado de colors
app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: `
    <html>
    <head></head>
    <body>
      <form action="/addColor" method="POST">
        <input
          type="text"
          name="color"
          id="color"
          placeholder="Insertar Color"
        />
        <button type="submit">Enviar</button>
      </form>
      <ul style="background-color:grey" id="ul">${ReactDOMServer.renderToString(
        <App />
      )}</ul>
    </body>
  </html>`,
  });
});

//TODO: Implementar redirect de /
app.post(
  "/addColor",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");
    colors.push(color);
    await req.redirect("/");
  }
);

app.listen({ port: 8080 });
