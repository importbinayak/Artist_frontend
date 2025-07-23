<template>
    <div class="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div class="main-left">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <h1 class="mb-6 text-2xl">Log in</h1>
                <p class="mb-6 text-gray-500">
                    hello everybody this is login page of my site
                    You can also create account by clicking on button below
                </p>

                <p class="font-bold">
                    Already have an account? <RouterLink :to="{'name':'login'}" class="underline">Click here</RouterLink> to Login !!
                </p>
            </div>
        </div>

        <div class="main-right">
            <div class="p-12 bg-white border border-gray-200 rounded-lg">
                <form class="space-y-6" @submit.prevent="submitForm">
                            <div>
                                <label>Name</label><br>
                                <input type="text" v-model="form.name" placeholder="Your Full Nme" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                            </div>
                            <div>
                                <label>E-mail</label><br>
                                <input type="email" v-model="form.email" placeholder="Your e-mail address" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                            </div>

                            <div>
                                <label>Password</label><br>
                                <input type="password" v-model="form.password1" placeholder="Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                            </div>

                            <div>
                                <label>Confirm Password</label><br>
                                <input type="password" v-model="form.password2" placeholder="Confirm Your password" class="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg">
                            </div>
                            <template v-if="errors.length > 0">
                                <div class="bg-red-300 text-white rounded-lg p-6 ">
                                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                                </div>
                            </template>
                            <div>
                                <button class="py-4 px-6 bg-purple-600 text-white rounded-lg">Signup</button>
                            </div>
                        </form>
            </div>
        </div>
    </div>
</template>
<script>

import axios  from 'axios'
import { useToastStore } from '@/stores/toast';
export default{
    setup(){
        const toastStore= useToastStore()

        return{
            toastStore
        }
    },
    data(){
        return{
            form:{
                email:'',
                name:'',
                password1:'',
                password2:'',
            },
            errors:[],
        }    
    },
    methods:{
        submitForm(){
            this.errors = []

            if (this.form.email === '') {
                this.errors.push('Your email is missing')
            }
            if (this.form.name === '') {
                this.errors.push('Your name is missing')
            }
            if (this.form.password1 === '') {
                this.errors.push('Your password is missing')
            }
            if (this.form.password1 !== this.form.password2) {
                this.errors.push('The password does not match')
            }

            if (this.errors.length === 0) {
                axios
                    .post('/api/signup/', this.form) // Note the trailing slash
                    .then(response => {
                        if (response.data.message === 'success') {
                            this.toastStore.showToast(
                                5000,
                                'The user is registered. Please log in',
                                'bg-emerald-500'  // Fixed class name
                            )
                            this.form.email = ''
                            this.form.name = ''
                            this.form.password1 = ''
                            this.form.password2 = ''
                            // Redirect to login page
                            this.$router.push({ name: 'login' })
                        } else {
                            // Show backend validation errors
                            if (response.data.errors) {
                                this.errors = response.data.errors
                            }
                            this.toastStore.showToast(
                                5000,
                                'Something went wrong. Please check the errors and try again',
                                'bg-red-300'
                            )
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                        this.toastStore.showToast(
                            5000,
                            'An error occurred. Please try again',
                            'bg-red-300'
                        )
                    })
            }
        }
    }
}
</script>
<!-- <script>
import axios from 'axios'
import { useToastStore } from '@/stores/toast';

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        password1: '',
        password2: '',
      },
      errors: [],
      toastStore: useToastStore(),  // 👈 use it directly here
    };
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.form.email === '') {
        this.errors.push('Your email is missing');
      }
      if (this.form.name === '') {
        this.errors.push('Your name is missing');
      }
      if (this.form.password1 === '') {
        this.errors.push('Your password is missing');
      }
      if (this.form.password1 !== this.form.password2) {
        this.errors.push('The password does not match');
      }

      if (this.errors.length === 0) {
        axios
          .post('/api/signup', this.form)
          .then((response) => {
            if (response.data.message === 'success') {
              this.toastStore.showToast(
                5000,
                'The user is registered. Please log in',
                'bg-emerald-500'
              );
              this.form.email = '';
              this.form.name = '';
              this.form.password1 = '';
              this.form.password2 = '';
            } else {
              this.toastStore.showToast(
                5000,
                'Something went wrong. Please try again',
                'bg-red-500'
              );
            }
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    },
  },
};
</script> -->
