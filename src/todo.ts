import * as mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }
})

const TodoModel = mongoose.model('Todo', todoSchema)
export { TodoModel }