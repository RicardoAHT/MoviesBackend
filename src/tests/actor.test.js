const request = require("supertest")
const app = require("../app");
//const Student = require("../models/Student");
require("../models")
/*npm run test */
let id;

test("GET /actors debe traer los actores", async () => {
    const res = await request(app).get("/actors")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /actors debe crear un actor", async () => {
    const actor = {
        firstName:"Leonardo",
        lastName: "DiCaprio",
        nationality:"Colombia",
        image:"imageUrl",
        birthday:"1995-07-31",
    }
    const res = await request(app).post("/actors").send(actor)
    //console.log(res.body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actor = {
        firstName:"Leo",
        lastName: "Dicaprio",
        nationality:"Colombiano",
        image:"imageUrl2",
        birthday:"1992-02-02",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});
/*
test('POST /actors/:id/students debe insertar estudiantes', async () => {
    const student = await Student.create({
        firstName:"Andres",
        birthday: "1995-10-10",
        program: "programacion"
    }) 
    const res = await request(app).post(`/actors/${id}/students`).send([student.id])
    console.log(res.body)
    await student.destroy()
    expect(res.status).toBe(200)
    //expect(res.body.length).toBe(1)
})
*/

test("DELETE /actors/:id debe eliminar un actor", async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})