const vatCalculator=require('../../utilis/vatCalculator')
const Todo={
    type:'object',
    properties:{
        id:{type:'string'},
        title:{type:'string'},
        description:{type:'string'},
        gross_amount:{type:'number'}
    }



}

const postTodoOpts={
    schema:{
        body:{
            type:'object',
            required:['title','description','gross_amount'],
            properties:{
                title:{type:'string'},
                description:{type:'string'},
                gross_amount:{type:'number'},
            }

        },
        response:{
            201:Todo
        }
    }

}





const todo_v2 = async (fastify,options,done)=>{

    fastify.get('/',async(request,reply)=>{
        try {
            const {rows}=await fastify.pg.query("SELECT * FROM todo")
            reply.send(rows)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get('/:id',async(request,reply)=>{
        try {
            const {id}=request.params
            const {rows}=await fastify.pg.query("SELECT * FROM todo WHERE id=$1",[id])
            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
            
        }
    })

    fastify.post('/',postTodoOpts,async(request,reply)=>{
         try{
            const client=await fastify.pg.connect();
            const {title,description,gross_amount}=request.body

            const netAmount=vatCalculator.calculateNetAmount(gross_amount)

            const vatAmount=vatCalculator.calculateVAT(gross_amount)

            const {rows}=await fastify.pg.query("INSERT INTO todo (title,description,gross_amount,net_amount,excluded_vat_amount) VALUES ($1, $2,$3,$4,$5) RETURNING *",
            [title,description,gross_amount,netAmount,vatAmount]);

            reply.code(201).send(rows[0]);
        }
        catch(err){
            reply.send(err)
        }
        finally{
            client.release();
        }
    })

    fastify.put('/:id',async(request,reply)=>{
        try {
            var {id}=request.params
            var {title,description}=request.body
            var {rows}=await fastify.pg.query("UPDATE todo SET title=$1,description=$2 WHERE id=$3 RETURNING *",[title,description,id])
            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete("/:id",async(request,reply)=>{
        try {
            var {id} =request.params
            await fastify.pg.query("DELETE FROM todo WHERE id=$1",[id])
            reply.send(`Item with id: ${id} has been deleted`)
        } catch (error) {
            reply.send(error)
        }
    })

    done();

    


}

module.exports={todo_v2}