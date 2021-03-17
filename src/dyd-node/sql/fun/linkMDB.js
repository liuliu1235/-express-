const Monk = require('monk')
let url;
let db

class LinkMdb{
    constructor(config){
      db = new Monk(config);
    }

    db(){
        return db
    }
    get(body){
        let table=body.$table
        let data=body.$where
        return new Promise(  (resolve, reject) => {
            db.get(table).find(data).then(res=>{
                resolve(res.reverse()) ;
            })
        })
    }
    add(body){
        let table=body.$table
        let data=body.$insert
        return new Promise(   (rs, rj) => {
            if (db.get(table).insert([data])) {
                rs(true)
            } else {
                rj(false)
            }
        })
    }
    del(body){
        let table=body.$table
        let data=body.$where
        return new Promise(   (rs, rj) => {
            if (db.get(table).remove(data)) {
                rs(true)
            } else {
                rj(false)
            }
        })
    }

    up(body){
        let table=body.$table
        let data=body.$set
        let where=body.$where
        return new Promise(   (rs, rj) => {
            if (db.get(table).update(where,{$set:data})) {

                rs(true)
            } else {

                rj(false)
            }
        })
    }
}

module.exports=LinkMdb

