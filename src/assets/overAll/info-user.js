import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
function json(data){
    return JSON.parse(data)
}

let store= new Vuex.Store({
    state: {
        user:json(sessionStorage.getItem('infoUser'))||json(localStorage.getItem('infoUser'))||{
            username:'',
            password:'',
            names:'',
            userImg:'',
            ids:'',
        },
        navDefaultActive:sessionStorage.getItem('navDefaultActive-user')||false
    },
    getters: {
        user(state){
            return state.user
        },
    },
    mutations: {
        setUser (state, options) {
            if(options==='clear'){
                for(let i in  state.user){
                    Vue.set(state.user,`${i}`, '')
                }
            }
            else{
                for(let c in  options){
                    Vue.set(state.user,`${c}`, options[c]);
                }
            }
            sessionStorage.setItem('infoUser', JSON.stringify(state.user))
        },
        setNav(state , options){
            state.navDefaultActive=options
            sessionStorage.setItem('navDefaultActive-user', options)
        }
    }
})
function userInfo(options=null){
    if(!options) return store.state.user
    else {
        store.commit('setUser',options)
    }
}
userInfo.prototype.nav=function(options){
    if(!options){
        return store.state.navDefaultActive
    }else{
        store.commit('setNav',options)
    }
}
export default userInfo
