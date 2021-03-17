import serve from '../lib/index.js'
export default function getData(data,options){
  let $where = options.$where || {}
  let $like = options.$like || {}
  if($where && Object.keys($where).length) {
    for (let i in $where){
      data = data.filter( item =>{
        return item[i]+'' === $where[i]+''
      })
    }
  }

  if($like && Object.keys($like).length) {
    for (let i in $like){
      data = data.filter( item =>{
        console.log((item[i] + '').search($like[i].replace(/^(\s|%)+|(\s|%)+$/g, '')));
        return (item[i]+'').search($like[i].replace(/^(\s|%)+|(\s|%)+$/g, '')) !== -1
      })
    }
  }
  return data
}
