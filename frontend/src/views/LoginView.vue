<template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-96">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Selamat Datang Kembali!</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-md mb-2" for="email"> Email </label>
        <input v-model="email" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Masukkan Email" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-md mb-2" for="password"> Password </label>
        <input v-model="password" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Masukkan Password" />
      </div>
      <div class="flex items-center justify-between">
        <button @click.prevent="login" class="bg-sky-700 hover:bg-sky-700 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Sign In</button>
      </div>
      <div class="mt-4 text-sm text-gray-600">Belum punya akun? <router-link to="/register" class="text-sky-700 hover:underline">Registrasi di sini</router-link></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        // Check if the account exists
        const response = await axios.get(`http://localhost:8000/api/account?email=${this.email}&password=${this.password}`);
        const accounts = response.data.docs;

        // Find the account with matching email and password
        const account = accounts.find((acc) => acc.email === this.email && acc.password === this.password);

        if (account) {
          // Redirect to the home page if the account exists
          this.$router.push("/home");
          console.log("Login successful");
        } else {
          // Show a message if the account doesn't exist
          console.error("Akun tidak terdaftar");
        }
      } catch (error) {
        console.error("Error during login:", error.response.data);
      }
    },
  },
};
</script>
