import express from "express";
import routerUser from "./routes/user.routes.js";
import routerProducts from "./routes/product.routes.js"
const app = express();

app.use(express.json());
app.use(routerUser);
app.use(routerProducts)


const main = () => {
  app.listen(4000, () => {
    console.log(`Servidor escuchando en el puerto 4000`);
  });
};

main();
