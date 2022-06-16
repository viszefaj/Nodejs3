const setupTestEnv =require ('./setupTestEnv')

const app=setupTestEnv();

describe("Integretation tests for CRUD operations connected to test postgres Db",()=>{
    test("Should create an item via POST route",async()=>{
        const todo={
            title:'Test item 2',
            description:'This is a test item',
            gross_amount:20
        }
        const response=await app.inject({
            method: "POST",
            url:"/v2/",
            payload:todo
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(todo)
    })

})