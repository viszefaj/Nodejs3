const {build}=require('../src/app')

const createTableSQL=
"CREATE TABLE IF NOT EXISTS todo (id SERIAL,title VARCHAR(200),description VARCHAR(200),gross_amount NUMERIC,net_amount NUMERIC,excluded_vat_amount NUMERIC,PRIMARY KEY (id))"

const clearTableSQL="DELETE From todo";

const insertFakeItemSQL="INSERT INTO todo(title,description,gross_amount,net_amount,excluded_vat_amount) VALUES ($1,$2,$3,$4,$5)";

module.exports=function setupTestEnv(){
    const app=build({logger:true},{},
        {connectionString:'postgres://postgres:postgres@localhost:5432/postgres_test'})

    beforeAll(async()=>{
        await app.ready()
        await app.pg.query(createTableSQL)
        await app.pg.query(clearTableSQL)
    })

    beforeEach(async()=>{
        await app.pg.query(insertFakeItemSQL,["test item","this test item",20,16.67,3.33])
    })

    afterEach(async()=>{
        await app.pg.query(clearTableSQL)
    })

    afterAll(async()=>{
        app.close()
    })

    return app
}