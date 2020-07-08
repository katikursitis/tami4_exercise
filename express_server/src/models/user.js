const TABLE_NAME = 'user'

const add = (db, username, password, email) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO ${TABLE_NAME}(username, password, email) VALUES(?, ?, ?)`, 
            [username, password, email], 
            (err) => {
                if (err) {
                    reject(err.message)
                }
                console.log(`Row was added to the table`)
                resolve()}
        ) 
    })
}

const find = (db, username) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM ${TABLE_NAME} WHERE username='${username}'`, 
            [], 
            (err, res) => {
                if (err) {
                    reject(err.message)
                }
                resolve(res)
             }
        )
    })
}

module.exports = { add, find }