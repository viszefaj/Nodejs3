const {v4:uuidv4} =require('uuid')
let {todo}=require('../todo')

const getTodoList=(req,reply)=>{

    reply.send(todo)

}

const getTodoItem=(req,reply)=>{
    const { id }=req.params
        
    const item=todo.find((item) => item.id === id)
        
    reply.send(item)

}

const postTodoItem=(req,reply)=>{
    const {title}=req.body
    const {description}=req.body
    const item={
        id: uuidv4(),
        title,
        description
    }

    todo=[...todo,item]

    reply.code(201).send(item)
}
const deleteTodoItem=(req,reply)=>{

    const {id}=req.params
    todo=todo.filter(item=>item.id !==id)

    reply.send({message:`Item ${id} has been removed`})

}
const updateTodoItem=(req,reply)=>{

    const {id}=req.params
    const {title}=req.body
    const {description}=req.body

    todo=todo.map(item=>(item.id===id ? {id,title,description}:item))

    item=todo.find((item)=>item.id === id)

    reply.send(item)

}


module.exports={getTodoItem,getTodoList,postTodoItem,deleteTodoItem,updateTodoItem};