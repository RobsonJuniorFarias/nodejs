import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform (chunk, encording, callback) {
        
      const vapo = Number(chunk.toString()) * -1

      console.log (vapo)
      
      callback (null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer (async(req, res ) => {
  const buffers = []

  for await (const chunk of req){
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)

/* return res
  .pipe (InverseNumberStream())
  .pipe (res) */
})

server.listen (3334)