<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
            <!-- <img src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484143611_2453532924847814_5733475624213570211_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=NeIEMN1qCYAQ7kNvwFLMtdE&_nc_oc=AdljRNN_SWrpm7OlNvSF-trt7XlUdS5nlD1-wHINtZUEDSNxP0ka5Ip6Z8ELD1i_B9lz96cNIPPLdj9HCpzqJaaO&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=IV_bZ6S0LppMIXjHGDssMQ&oh=00_AfQk1pEcf6Njn4FTs3OvG-pZEgORdjvnLhhFthoad_veQQ&oe=688062A0" class="mb-6 rounded-full"> -->
            <img src="https://i.pravatar.cc/100?img=70" class="mb-6 mx-auto rounded-full">
            <p><strong>{{ user.name }}</strong></p>

            <div class="mt-6 flex space-x-8 justify-around">
                <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
                <p class="text-xs text-gray-500">2333 post</p>
            </div>
            <!-- <div class="mt-6">
                <button class="inline-block py-4 px-3 bg-purple-600 text-sm text-white rounded-lg" @click="sendFriendshipRequest">Send Request</button>
            </div> -->
        </div>
        <div class="main-center col-span-2 space-y-4">
            <div 
                    v-if="friendshipRequests.length"
                    class="p-4 bg-white border border-gray-200 rounded-lg">
                    <h2 class="text-xl mb-6">Friend Request</h2>
                    <div 
                        v-for="friends in friendshipRequests" v-bind:key="friends.id"
                        class="p-4 text-center bg-gray-100 rounded-lg">
                            <img src="https://i.pravatar.cc/100?img=70" class="mb-6 mx-auto rounded-full">
                        
                            <p><strong><RouterLink :to="{name:'profile',params:{'id':friends.id}}"> {{ friends.created_by.name }}</RouterLink></strong></p>

                            <div class="mt-6 flex space-x-8 justify-around">
                                <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
                                <p class="text-xs text-gray-500">120 posts</p>
                            </div>
                            <div class="mt-6 space-x-4">
                                <button class="inline-block py-1 px-3 bg-purple-600 text-white rounded-lg" @click="handleRequest('accepted',friends.created_by.id)">Accept</button>
                                <button class="inline-block py-1 px-3 bg-red-600 text-white rounded-lg" @click="handleRequest('Rejected',friends.created_by.id)">Reject</button>
                            </div>
                        </div>
                        <hr>
                    </div>
                    
            <div 
                    v-if="friends.length"
                    class="p-4 bg-white border border-gray-200 rounded-lg grid grid-cols-2 gap-4">
                        <div 
                        v-for="user in friends" v-bind:key="user.id"
                        class="p-4 text-center bg-gray-100 rounded-lg">
                            <img src="https://i.pravatar.cc/300?img=70" class="mb-6 rounded-full">
                        
                            <p><strong><RouterLink :to="{name:'profile',params:{'id':user.id}}"> {{ user.name }}</RouterLink></strong></p>

                            <div class="mt-6 flex space-x-8 justify-around">
                                <p class="text-xs text-gray-500">{{ user.friends_count }} friends</p>
                                <p class="text-xs text-gray-500">120 posts</p>
                            </div>
                        </div>
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
    },
    data(){
        return{
            user:{},
            friendshipRequests:[],
            friends:[]
        }
    },
    mounted(){
        this.getFriends()
    },

    methods:{
        getFriends(){
            axios
                .get(`/api/friends/${this.$route.params.id}/`)
                .then(Response=>{
                    console.log('data',Response.data)
                    this.friendshipRequests=Response.data.requests
                    this.friends=Response.data.friends
                    this.user=Response.data.user
                })
                .catch(error=>{
                    console.log('error',error)
                })
        },
        handleRequest(status,pk){
            console.log('handleRequest',status)
            axios
                .post(`/api/friends/${pk}/${status}/`)
                .then(Response=>{
                    console.log('data',Response.data)
                })
        .catch(error=>
            console.log('error',error)
        )
        }
    }
}


</script>
