const request = require("supertest")
const app = require("../app");
require("../models")
/*npm run test */
let id;

test("GET /genres debe traer los generos", async () => {
    const res = await request(app).get("/genres")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /genres debe crear un genre", async () => {
    const genre = {
        name:"drama"
    }
    const res = await request(app).post("/genres").send(genre)
    //console.log(res.body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test('PUT /genres/:id debe actualizar un genre', async () => {
    const genre = {
        name:"comedia"
    }
    const res = await request(app).put(`/genres/${id}`).send(genre)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test("DELETE /genres/:id debe eliminar un genre", async() => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
})