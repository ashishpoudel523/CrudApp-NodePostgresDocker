import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })
    res.json(todos)
})

// Create a new todo
router.post('/', async (req, res) => {
    const { task } = req.body
    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

// Update a todo
router.put('/:id', async (req, res) => {

    /*  req.body	
        1. Data src = Request body (payload)	
        2. Usage = Submitting large or sensitive data, typically with POST or PUT requests.	
        3. Example URL = /api/users	
        4. Example Code = 
        app.post('/api/users', (req, res) => {
        console.log(req.body.name); // "Tommy" 
    */

    /*  req.params	
        1. Data src = Route path segments	
        2. Usage = Identifying specific resources (e.g., fetching a user by ID).	
        3. Example URL = /users/123	
        4. Example Code = 
        app.get('/users/:id', (req, res) => {
        console.log(req.params.id); // "123"
        });
    */

    /*  req.query	
        1. Data src = URL query string	
        2. Usage = Optional data like filtering, sorting, or pagination.	
        3. Example URL = /search?q=users&page=4	
        4. Example Code = 
        app.get('/search', (req, res) => {
        console.log(req.query.q); // "nodejs"
        });
    */

    const { completed } = req.body
    const { id } = req.params
    const { page } = req.query

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            /* !! mark converts values into true or false stmt */
            completed: !!completed
        }
    })
    res.json(updatedTodo)
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })

    res.send({ message: "Todo deleted" })
})

export default router