export class Database {
    Database = {

        select(table){
            const data = this.Database[table] ?? []

            return data
        }}

        Insert(table, data){
            if (Array.isArray(this.Database[table])) {
                this.Database[table].push(data)
            } else{
            this.Database[table] = [data]
        }

        return data;
    }
}