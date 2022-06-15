const {getTodoItem,getTodoList,postTodoItem,deleteTodoItem,updateTodoItem}=require('../controller/todo')


const Todo={
    type:'object',
    properties:{
        id:{type:'string'},
        title:{type:'string'},
        description:{type:'string'}
    }



}


const getTodoOpts= {
    schema:{
        response:{
            200:{
                type:'array',
                items:Todo,
            },
        },
    },
    handler: getTodoList
}

const getTodo={
    schema:{
        response:{
            200:Todo
        }
    },
    handler: getTodoItem

}

const postTodoOpts={
    schema:{
        body:{
            type:'object',
            required:['title'],
            required:['description'],
            properties:{
                title:{type:'string'},
                description:{type:'string'}
            }

        },
        response:{
            201:Todo
        }
    },
    handler: postTodoItem

}
const deleteTodoOpts={
    schema:{
        response:{
            200:{
                type:'object',
                properties:{
                    message:{type:'string'}
                }
            }
        }
    },
    handler: deleteTodoItem

}

const updateTodoOpts={
    schema:{
        response:{
            200:Todo
        }
    },
    handler: updateTodoItem

}


function todoRoutes (fastify,options,done){

fastify.get('/todo',getTodoOpts)
    
    
fastify.get('/todo/:id',getTodo)


fastify.post('/todo',postTodoOpts)

fastify.delete('/todo/:id',deleteTodoOpts)

fastify.put('/todo/:id',updateTodoOpts)

done()
}

module.exports=todoRoutes;