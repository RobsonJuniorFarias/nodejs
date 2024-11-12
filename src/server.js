import http from 'node:http'

const server = http.createServer ((req, res) => {
    const {method, url} = req

    if (method = 'POST' && url === '/users')
        return res.end ('Listagem de usuários')

    if (method = 'GET' && url === '/users')
    return res.end ('criaçãp de usuários')



    return res.end ('Hello Ignite')
})

server.listen(3333)