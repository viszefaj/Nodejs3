let {build}=require('../src/app')
let env =require('../src/config/env')

const createTableSQL=
"CREATE TABLE IF NOT EXISTS todo (id SERIAL,title VARCHAR(200),description VARCHAR(200),gross_amount NUMERIC,net_amount NUMERIC,excluded_vat_amount NUMERIC,PRIMARY KEY (id))"

const clearTableSQL="DELETE From todo";

const insertFakeItemSQL="INSERT INTO todo(title,description,gross_amount,net_amount,excluded_vat_amount) VALUES ($1,$2,$3,$4,$5)";

module.exports=function setupTestEnv(){
    let app=build({logger:true},
        {},
        {connectionString: env.POSTGRES_TEST_DB_CONNECTION_STRING}
        )

    beforeAll(async ()=>{
        await app.ready()
        await app.pg.query(createTableSQL)
        await app.pg.query(clearTableSQL)
    },10000)

    beforeEach(async ()=>{
        await app.pg.query(insertFakeItemSQL,["test item","this test item",20,16.67,3.33])
    },10000)

    afterEach(async ()=>{
      
        await app.pg.query(clearTableSQL)
    },10000)

    afterAll(async ()=>{
        app.close()
    },10000)

    return app
}