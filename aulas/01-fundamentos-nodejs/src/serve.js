import http from 'node:http'

const server = http.createserver ((req, res)) -> {
    return res.end('Hello Wolrd')
}

server.listen(3333)