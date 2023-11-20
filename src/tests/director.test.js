const request = require("supertest")
const app = require("../app");

let id;

test("GET /directors debe traer los directores", async () => {
    const res = await request(app).get("/directors")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /directors debe crear un director", async () => {
    const director = {
        firstName:"Andy",
        lastName:"Schooles",
        nationality:"Colombia",
        image:"imageUrl",
        birthday:"2000-03-03"
    }
    const res = await request(app).post("/directors").send(director)
    console.log(res.body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test('PUT /directors/:id debe actualizar un director', async () => {
    const director = {
        firstName:"Rick",
        lastName:"Schooles",
        nationality:"Colombia",
        image:"imageUrl",
        birthday:"2000-03-03"
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test("DELETE /directors/:id debe eliminar un director", async() => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
})