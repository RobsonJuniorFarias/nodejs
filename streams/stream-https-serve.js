import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform (chunk, encording, callback) {
      const transformed = Number(chunk.toString()) * -1

      console.log (transformed)
      
      callback (null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer ((req, res ) => {
    return res
    .pipe (InverseNumberStream())
    .pipe (res)
})

server.listen (3334)