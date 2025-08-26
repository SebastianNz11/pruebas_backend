import request from "supertest";
import app from "../src/app.js";

//testeo de autorización y retorno de código 200
describe("GET /products con JWT", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "user2@correo.com", password: "123456" }); //usuario de prueba que si existe en la base de datos, de lo contrario no funciona

    token = res.body.token;
  });

  it("debería devolver un array de productos", async () => {
    const response = await request(app)
      .get("/products")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

//testeo de autorización y retorno de código 401
describe("GET /products", () => {
  test("Esto debería de devolver un codigo 401, por falta de autenticación", async () => {
    const response = await request(app).get("/products").send();
    expect(response.statusCode).toBe(401);
  });
});
