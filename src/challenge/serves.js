import { randomUUID } from 'node:crypto'
import http from 'node:http'

const users = []

    const server = http.createServer ((req, res) => {
        const {method, url} = req

        if (method === 'GET' && url === '/users')
        return res.end('Criação de usuários')

    if (method === 'POST' && url === '/users') {  

                const {name, email } = req.body
                id: randomUUID()
                name,
                email,
})

server.listen(3335)
        