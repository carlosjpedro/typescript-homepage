import { TodoModel } from './todo'
import { Controller, Route, Get, Post, BodyProp, Put, Delete } from "tsoa";


interface Todo {
    id: String,
    description: String
}


@Route('/todo')
export class TodoController extends Controller {

    @Get()
    public async getAll(): Promise<Todo[]> {
        try {
            const items: any = await TodoModel.find({})
            return items.map(x => ({ id: x._id, description: x.description }))
        }
        catch (err) {
            console.error("Caught error", err)
            this.setStatus(500)
        }
    }

    @Post()
    public async create(@BodyProp() description: string): Promise<void> {
        await TodoModel.create({ description })
    }

    @Put('/{id}')
    public async update(id: string, @BodyProp() description: string): Promise<void> {
        await TodoModel.findOneAndUpdate({ _id: id }, { $set: { description } })
    }

    @Delete('/{id}')
    public async delete(id: string): Promise<void> {
        await TodoModel.deleteMany({ _id: id })
    }
}