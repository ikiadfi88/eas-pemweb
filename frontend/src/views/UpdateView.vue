<template>
  <div class="flex justify-center items-center mt-20">
    <div class="p-4 w-1/2">
      <h2 class="text-2xl font-bold text-sky-800 mb-4 flex items-center">
        <div @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" class="cursor-pointer" />
          </svg>
        </div>
        Edit Surat
      </h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-sky-800 font-semibold">Kebutuhan Surat</label>
          <div class="flex flex-row">
            <input v-model="inputNewName" class="w-full px-3 py-2 bg-white rounded-md focus:outline-sky-800 cursor-text" />
            <svg
              @click="startSpeechRecognition"
              aria-hidden="true"
              type="button"
              class="h-10 w-6 absolute right-[450px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sky-800 font-semibold">Tanggal Surat</label>
          <input type="date" v-model="inputNewDeadline" class="px-3 py-2 bg-white rounded-md focus:outline-sky-800 cursor-pointer" />
        </div>
        <div class="flex flex-col">
          <label class="text-sky-800 font-semibold">Pengaju Surat</label>
          <input v-model="inputNewReq" class="w-full px-3 py-2 bg-white rounded-md focus:outline-sky-800 cursor-text" />
        </div>
        <div class="flex flex-col">
          <label class="text-sky-800 font-semibold">Tujuan Surat</label>
          <input v-model="inputNewDestination" class="w-full px-3 py-2 bg-white rounded-md focus:outline-sky-800 cursor-text" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sky-800 font-semibold">Kategori</label>
          <select v-model="inputNewCategory" class="px-3 py-2 bg-white rounded-md focus:outline-sky-800 cursor-pointer">
            <option v-for="Category in priorities" :key="Category.id" :value="Category.id" class="cursor-pointer">{{ Category.name }}</option>
          </select>
        </div>
      </div>
      <button @click="updateChannel" class="px-4 py-2 mt-4 bg-sky-800 text-sky-100 font-bold text-sm rounded-lg hover:bg-sky-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">Update</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      inputNewName: "",
      inputNewDeadline: "",
      inputNewReq: "",
      inputNewDestination: "",
      inputNewCategory: "",
      priorities: [], // Menyimpan daftar kategori
      originalStatus: null,
    };
  },
  methods: {
    async getChannelById() {
      // Mengambil data surat dari server
      const Channel = await this.fetchChannelById(this.id);
      if (Channel) {
        this.inputNewName = Channel.name;
        this.inputNewDeadline = Channel.deadline;
        this.inputNewReq = Channel.req;
        this.inputNewDestination = Channel.destination;
        this.inputNewCategory = Channel.Category;
        this.originalStatus = Channel.status;
      }
    },
    async fetchChannelById(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/channel/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching Channel: ", error);
        return null;
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        this.priorities = response.data.docs; // Menyimpan daftar kategori
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    },
    async updateChannel() {
      const updatedChannel = {
        id: this.id,
        name: this.inputNewName,
        deadline: this.inputNewDeadline,
        req: this.inputNewReq,
        destination: this.inputNewDestination,
        Category: this.inputNewCategory,
        status: this.originalStatus,
      };

      try {
        await axios.put(`http://localhost:8000/api/channel/${this.id}`, updatedChannel);
        this.$router.push("/");
      } catch (error) {
        console.error("Error updating data: ", error);
      }
    },
    startSpeechRecognition() {
      const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new speechRecognition();
      recognition.start();
      recognition.lang = "id-ID";
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.inputNewName = result;
      };
      recognition.start();
    },
  },
  async mounted() {
    await this.getChannelById();
    await this.fetchCategories();
  },
};
</script>
