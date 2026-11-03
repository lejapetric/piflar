// Statične datoteke: meni, skripte in slogi se po objavi ne smejo predpomniti (sicer je meni en dan star).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = "testna-skrivnost";
const { default: app } = await import("../app.js");

let server, url;
before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  url = `http://localhost:${server.address().port}`;
});
after(() => server.close());

test("HTML, JS in CSS brskalnik ob vsakem obisku preveri (no-cache)", async () => {
  for (const pot of ["/components/sidebar.html", "/components/matura.js", "/style/snov.css", "/views/kemija/matura/pole/pole.html"]) {
    const res = await fetch(url + pot);
    assert.equal(res.status, 200, pot);
    assert.equal(res.headers.get("cache-control"), "no-cache", pot);
  }
});
