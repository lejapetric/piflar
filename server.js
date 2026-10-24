// server.js
import "dotenv/config";
import app from "./app.js";
import { poveziBazo } from "./api/db.js";

const port = process.env.PORT || 3000;

await poveziBazo();

app.listen(port, () => {
  console.log(
    `Piflar.si started in ${process.env.NODE_ENV || "development"} listening on port ${port}!`
  );
});
