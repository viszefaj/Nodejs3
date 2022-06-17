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


    test("Should get a all items", async () => {
        const response = await app.inject({
          method: "GET",
          url: "/v2/",
        });
    
        expect(response.statusCode).toBe(200);
      });



    test("Should get a single item", async () => {
        const response = await app.inject({
          method: "GET",
          url: "/v2/2",
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty(
          "title",
          "description",
          "gross_amount",
          "net_amount",
          "excluded_vat_amount"
        );
      });



    test("Should update an item", async () => {
        const item = {
          title: "Updated name",
          description: "update description",
        };
        const response = await app.inject({
          method: "PUT",
          url: "/v2/5",
          payload: item,
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(expect.objectContaining(item));
      });



      test("Should delete an item", async () => {
        const response = await app.inject({
          method: "DELETE",
          url: "/v2/6",
        });
    
        expect(response.statusCode).toBe(200);
        expect(response.json()).toMatchObject({
          message: "Item 6 deleted succesfully!",});


      });

})


