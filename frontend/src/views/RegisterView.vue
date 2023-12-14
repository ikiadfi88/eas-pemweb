<template>
  <div class="min-h-screen flex items-center justify-center">
    <form class="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-96">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Buat Akun Baru</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-md mb-2" for="name"> Nama </label>
        <input v-model="name" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Masukkan Nama" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-md mb-2" for="email"> Email </label>
        <input v-model="email" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Masukkan Email" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-md mb-2" for="password"> Password </label>
        <input v-model="password" class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Masukkan Password" />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-md mb-2" for="password"> Confirm Password </label>
        <input
          v-model="confirmPassword"
          class="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Masukkan Ulang Password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button @click.prevent="register" class="bg-sky-700 hover:bg-sky-700 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Register</button>
      </div>
      <div class="mt-4 text-sm text-gray-600">Sudah punya akun? <router-link to="/login" class="text-sky-700 hover:underline">Login di sini</router-link></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        console.error("Password and Confirm Password do not match");
        return;
      }

      try {
        // Send registration data to the server
        const response = await axios.post("http://localhost:8000/api/account", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Handle the response (you may want to redirect the user or show a success message)
        console.log("Registration successful:", response.data);

        // Optionally, you can redirect the user to the login page after successful registration
        this.$router.push("/login");
      } catch (error) {
        // Handle registration error
        console.error("Registration error:", error.response.data);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
