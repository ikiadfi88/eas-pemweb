<!-- CekStatus.vue -->

<template>
  <div>
    <span class="text-sky-800 font-bold text-2xl">Cek Status Pendaftaran Peserta</span>
    <div class="flex flex-col gap-3 my-3">
      <div class="flex flex-col gap-1">
        <label class="text-sky-800 font-semibold">Email</label>
        <input v-model="inputEmail" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-pointer" />
      </div>
    </div>
    <div v-if="statusResult !== null" class="mt-3">
      <p v-if="statusResult === '1'">Status: Waiting</p>
      <p v-if="statusResult === '2'">Status: Rejected</p>
      <p v-if="statusResult === '3'">Status: Accepted</p>
      <p v-if="statusResult === 'not_found'">Email tidak ditemukan</p>
    </div>
    <button @click="showCekList" class="px-4 py-2 mt-3 bg-sky-800 w-fit h-fit text-white font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300">Cek Status</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputEmail: "",
      statusResult: null,
    };
  },
  methods: {
    checkStatus() {
      if (this.inputEmail === "") return;

      axios
        .get(`http://localhost:3000/api/peserta/status?email=${this.inputEmail}`)
        .then((response) => {
          if (response.data.status) {
            this.statusResult = response.data.status;
          } else {
            this.statusResult = "not_found";
          }
        })
        .catch((error) => {
          console.error("Error checking status:", error);
        });
    },
    showCekList() {
      this.$emit("show-CekList"); // Memancarkan event untuk menampilkan CekList
    },
  },
};
</script>
