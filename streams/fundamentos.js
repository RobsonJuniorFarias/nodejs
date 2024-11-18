// Streams ->

// process.stdin
//   .pipe(process.stdout)

import { transcode } from 'node:buffer';
import { Readable, Transform, Writable } from 'node:stream'
class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++
        setTimeout(() => {
            if (i > 100) {
              this.push(null)
            } else {
              const buf = Buffer.from(String(i))
              this.push(buf)
            }
          }, 1000);
        }
      }

    class InverseNumberStream extends Transform {
      _transform (chunk, encording, callback) {
        const transformed = Number(chunk.toString()) * -1
        
        callback (null, Buffer.from(String(transformed)))
      }
  }

  class MultiplyByToStream extends Writable {
    _write (chunk, encording, callback) {
      console.log (Number(chunk.toString())) * 10

      callback()
    }
  }
      new OneToHundredStream()
      .pipe(new InverseNumberStream()) // Inverte os números
      .pipe(new MultiplyByToStream()); // Multiplica por 10 e exibe o resultado no console