<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
            <!-- <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484143611_2453532924847814_5733475624213570211_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NeIEMN1qCYAQ7kNvwFLMtdE&_nc_oc=AdljRNN_SWrpm7OlNvSF-trt7XlUdS5nlD1-wHINtZUEDSNxP0ka5Ip6Z8ELD1i_B9lz96cNIPPLdj9HCpzqJaaO&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=IV_bZ6S0LppMIXjHGDssMQ&oh=00_AfQk1pEcf6Njn4FTs3OvG-pZEgORdjvnLhhFthoad_veQQ&oe=688062A0" class="mb-6 rounded-full"> -->
            <img src="https://i.pravatar.cc/100?img=70" class="mb-6 mx-auto rounded-full">
            <p><strong>{{ user.name }}</strong></p>

            <div class="mt-6 flex space-x-8 justify-around">
                <RouterLink :to="{name:'friends',params:{'id':user.id}}" class="text-xs text-gray-500">{{ user.friends_count }} friends</RouterLink>
                <p class="text-xs text-gray-500">2333 post</p>
            </div>
            <div class="mt-6" >
                <button
                v-if="userStore.user && user && userStore.user.id !== user.id"
                 class="inline-block py-4 px-3 bg-purple-600 text-sm text-white rounded-lg" @click="sendFriendshipRequest">Send Request
                </button>
                <button
                v-if="userStore.user && user && userStore.user.id === user.id"
                 class="inline-block py-4 px-3 bg-red-600 text-sm text-white rounded-lg" @click="logout">Logout
                </button>
            </div>
        </div>
        <div class="main-center col-span-2 space-y-4">
            <div class=" bg-white border border-gray-200 round-lg" v-if="userStore.user && user && userStore.user.id === user.id">
                <form v-on:submit.prevent="submitForm" method="POST">
                <div class="p-4">
                    <textarea v-model="body" placeholder="Whats on your mind" class="p-4 w-full bg-gray-100 rounded-lg "></textarea>
                </div>
                <div class="p-4 border-t border-gray-100 flex justify-between">
                        <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">Attach image</a>
                        <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
                </div>
                </form>
            </div>
                    <div class="p-4 bg-white border border-gray-200 rounded-lg" v-for="post in posts" v-bind:key="post.id">
                    
                     <FeedItem v-bind:post="post"/>
                    </div>
        </div>
        <div class="main-right col-span-1 space-y-4">
                    <PeopleYouMayKnow />

                    <Trends />
        </div>
    </div>
</template>

<script>
import PeopleYouMayKnow from '@/components/PeopleYouMayKnow.vue';
import Trends from '@/components/Trends.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import FeedItem from '@/components/FeedItem.vue';
import { useToastStore } from '@/stores/toast';

export default{

    name:'FeedView',

    setup(){
        const userStore=useUserStore()
        const toastStore=useToastStore()

        return{
            userStore,
            toastStore
        }
    },
    components:{
        PeopleYouMayKnow,
        Trends,
        FeedItem
    },
    data(){
        return{
            posts:[],
            user:{
                id:null,
            },
            body:'',
        }
    },
    mounted(){
        this.getFeed()
    },

    // updated(){
    //     //this.getFeed() //yesle infinite loop ma chalauxa
    // },
//yesle ni kaam garena
    // beforeRouteUpdate(to,from,next){
    //     if(from.name===to.name){  //yedi query ra params change vayena vane ra route matra change vayo vane
    //         this.getFeed()
    //     }
    // },

    watch:{
        '$route.params.id':{
            handler:function(){
                console.log("aaba profile switch vayo my profile ma thichda")
                this.getFeed()
            },
            deep:true,//deep ra immediate use nagarda ni chalxa
            immediate:true
        }
    },

    methods:{
        sendFriendshipRequest(){
            axios
                .post(`/api/friends/${this.$route.params.id}/request/`)
                .then(Response=>{
                    console.log('data',Response.data)
                    this.user=Response.data.user

                    if (Response.data.message=='Friend request sent already'){
                        console.log('sent')
                        this.toastStore.showToast(5000,'This request has already been sent!','bg-red-300')
                    }else{
                        this.toastStore.showToast(5000,"This request was sent!",'bg-emerald-300')
                    }
                })
                .catch(error=>{
                    console.log('error',error)
                })

        },
        getFeed(){
            axios
                .get(`/api/posts/profile/${this.$route.params.id}/`)
                .then(Response => {
                    console.log('data',Response.data)
                    this.posts =Response.data.posts
                    this.user=Response.data.user
                })
                .catch(error=>{
                    console.log('error',error)
                })
        },
        submitForm(){
            console.log('submitForm',this.body)
            axios
                .post('/api/posts/create/',{
                    'body':this.body
                })
                .then(Response =>{
                    console.log('data',Response.data)

                    this.posts.unshift(Response.data)
                })
                .catch(error =>{
                    console.log('error',error)
                })
        },
        logout(){
            console.log('logout')
            this.userStore.removeToken()
            this.$router.push('/login')
        }
    }
}


</script>
