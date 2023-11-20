const request = require("supertest")
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models")
/*npm run test */
let id;

test("GET /movies debe traer las peliculas", async () => {
    const res = await request(app).get("/movies")
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test("POST /movies debe crear un movie", async () => {
    const movie = {
        name:"drama",
        image:"imageUrl",
        synopsis:"empezo y termino",
        releaseYear:2014
    }
    const res = await request(app).post("/movies").send(movie)
    //console.log(res.body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test('PUT /movies/:id debe actualizar un movie', async () => {
    const movie = {
        name:"comedia",
        image:"imageUrl",
        synopsis:"empezo bien y termino mal",
        releaseYear:2014
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});


test('POST /movies/:id/actors debe insertar actors', async () => {
    const actor = await Actor.create({
        firstName:"Leonardo",
        lastName: "DiCaprio",
        nationality:"Colombia",
        image:"imageUrl",
        birthday:"1995-07-31",
    }) 
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    console.log(res.body)
    await actor.destroy()
    expect(res.status).toBe(200)
})

test('POST /movies/:id/directors debe insertar directors', async () => {
    const director = await Director.create({
        firstName:"Rick",
        lastName:"Schooles",
        nationality:"Colombia",
        image:"imageUrl",
        birthday:"2000-03-03"
    }) 
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    console.log(res.body)
    await director.destroy()
    expect(res.status).toBe(200)
})

test('POST /movies/:id/genres debe insertar genres', async () => {
    const genre = await Genre.create({
        name:"Accion",
    }) 
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    console.log(res.body)
    await genre.destroy()
    expect(res.status).toBe(200)
    //expect(res.body.length).toBe(1)
})

test("DELETE /movies/:id debe eliminar un movie", async() => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
})