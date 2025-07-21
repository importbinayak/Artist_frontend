import { defineStore } from "pinia"
import axios from "axios"


export const useUserStore= defineStore({
    id:'user',


    state:()=>({
        user:{
            isAuthenticated:false,
            id:null,
            name:null,
            email:null,
            access:null,
            refresh:null,
        }
    }),
    actions:{
        initStore(){
            if(localStorage.getItem('user.access')){
                this.user.access=localStorage.getItem('user.access')
                this.user.refresh=localStorage.getItem('user.refresh')
                this.user.id=localStorage.getItem('user.id')
                this.user.name=localStorage.getItem('user.name')
                this.user.email=localStorage.getItem('user.email')

                this.refreshToken()

                console.log('Initialized user:',this.user)
            }
        },
        setToken(data){
            console.log('setToken',data)

            this.user.access=data.access
            this.user.refresh=data.refresh
            this.user.isAuthenticated=true

            localStorage.setItem('user.access',data.access)
            localStorage.setItem('user.refresh',data.refresh)
        }
    }
})