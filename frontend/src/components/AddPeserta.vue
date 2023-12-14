<template>
  <div>
    <span class="text-sky-800 font-bold text-2xl">Pendaftaran Peserta</span>
    <div class="flex flex-col gap-3 my-3">
      <div>
        <label class="text-sky-800 font-semibold">Nama</label>
        <div class="flex flex-row">
          <input ref="pesertaNameInput" v-model="inputName" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-text w-full" />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sky-800 font-semibold">Email</label>
        <input v-model="inputEmail" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-pointer" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sky-800 font-semibold">Asal Sekolah</label>
        <input v-model="inputSchool" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-pointer" />
      </div>
    </div>
    <button @click="addPeserta" class="px-4 py-2 mt-1 bg-sky-800 w-fit h-fit text-white font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputName: "",
      inputEmail: "",
      inputSchool: "",
    };
  },
  methods: {
    addPeserta() {
      if (this.inputName === "" || this.inputEmail === "" || this.inputSchool === "") return;

      const newPeserta = {
        name: this.inputName,
        email: this.inputEmail,
        school: this.inputSchool,

        status: "1",
      };

      axios
        .post("http://localhost:3000/api/peserta", newPeserta)
        .then((response) => {
          console.log("Peserta added successfully:", response.data);
          this.$emit("Peserta added", response.data);

          this.inputName = "";
          this.inputEmail = "";
          this.inputSchool = "";

          this.$emit("close-popup");
        })
        .catch((error) => {
          console.error("Error adding Peserta:", error);
        })
        .finally(() => {
          console.log("Post request completed");
        });

      window.location.reload();
    },
  },
};
</script>
