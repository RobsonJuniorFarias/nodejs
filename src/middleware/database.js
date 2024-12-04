import fs from 'node:fs/promises'

export class Database {
    #Database = {}

        #persist(){
            fs.writeFile('db.JSON', JSON.stringify(this.#Database))
        }

        select(table){
            const data = this.Database[table] ?? []

            return data
        }

        Insert(table, data){
            if (Array.isArray(this.Database[table])) {
                this.Database[table].push(data)
            } else{
            this.Database[table] = [data]
        }
        this.#Database
        return data;
    }
}