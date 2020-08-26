import * as express from 'express'
import { Request, Response, NextFunction } from "express"
import { MongoHelper } from './mongo-helper'
import { Todo } from './todo'
import * as core from "express-serve-static-core";
import * as mongodb from 'mongodb'

const todoRoutes = express.Router()


const getCollection = () => MongoHelper.client.db('todo').collection('todos')


todoRoutes.get('/todo', (
    _req: Request,
    resp: Response<Todo[]>,
    _next: NextFunction) =>
    getCollection().find({}).toArray()
        .then(items => {
            const todos = items.map(x => ({ id: x._id, description: x.description }))
            resp.json(todos)
        })
        .catch(err => {
            console.error("Caught error", err)
            resp.status(500)
            resp.end()
        }))


todoRoutes.post('/todo', (
    req: Request<core.ParamsDictionary, Todo, Todo>, resp: Response, _next: NextFunction) => {
    getCollection()
        .insert({ description: req.body.description })
        .then(_ => resp.end())
})


todoRoutes.put('/todo/:id', (
    req: Request<core.ParamsDictionary, Todo, Todo>, resp: Response, _next: NextFunction) =>
    getCollection()
        .findOneAndUpdate({ _id: new mongodb.ObjectId(req.params['id']) },
            { $set: { description: req.body.description } })
        .then(_ => resp.end()))

todoRoutes.delete('/todo/:id', (req: Request, resp: Response, _next: NextFunction) =>
    getCollection()
        .findOneAndDelete({ _id: req.params['_id'] })
        .then(_ => resp.end()))

export { todoRoutes }

