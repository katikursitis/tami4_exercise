
const TABLE_NAME = 'candidate'

const list = (db) => {
    return new Promise((resolve, reject)=> {
        db.all(`SELECT * FROM ${TABLE_NAME}`, [], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    })
}

module.exports = {list}