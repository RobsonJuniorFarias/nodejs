import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform (chunk, encording, callback) {
      const vapo = Number(chunk.toString()) * -1

      console.log (vapo)
      
      callback (null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer ((req, res ) => {
    return res
    .pipe (InverseNumberStream())
    .pipe (res)
})

server.listen (3334)