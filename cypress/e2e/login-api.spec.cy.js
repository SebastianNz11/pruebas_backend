
describe("Login API Tests", () => {
  it("debería de retornar 201 y un token para credenciales válidas", () => {
    cy.request({
      method: "POST",
      url: "/login",
      body: {
        email: "user2@correo.com",
        password: "123456",
      },
    }).then((response) =>{
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("token");
    })
  });
});
