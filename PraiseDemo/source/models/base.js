/**
 * Created by JerryC on 14-11-11.
 */

var knex = require("knex")({
        client:'mysql',
        connection:{
            host    :'127.0.0.1',
            user    :'root',
            password:'',
            database:'bookshelfTest',
            charset :'utf8'
        }
    }),
    bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;