import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { json } from 'node:stream/consumers'

const users = []

const server = http.createServer ((req, res) => {
    const { method, URL } = req

    if ( method === 'POST' && URL === ('/tasks'))
        const (name , email)
        users.push ({
    id: randomUUID()
    name: 'Robson Junior',
    email: 'fariasjuniorrobson@gmail.com',
        })

        return res.end()

    if ( method === 'GET' && URL === ('/tasks'))
        return res.end()
})

server.listen(3335)
        