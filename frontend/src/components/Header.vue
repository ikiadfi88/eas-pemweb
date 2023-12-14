<script>
import { PesertaStore } from "../store/store.js";
import Popup from "../components/Popup.vue";
import AddPeserta from "./AddPeserta.vue";
import axios from "axios";

export default {
  components: {
    Popup,
    AddPeserta,
  },
  data() {
    return {
      PesertaStore,
      isPopup: false,
    };
  },
  methods: {
    togglePopup() {
      this.isPopup = !this.isPopup;
    },
  },
};
</script>

<template>
  <div>
    <span class="font-bold text-4xl text-sky-800">Pendaftaran Peserta Lomba UI/UX ITS 2023</span>
    <div class="w-full flex justify-end gap-3">
      <button @click="togglePopup" class="px-6 py-2 bg-green-600 text-white font-bold mb-2 w-fit border-[1.5px] hover:scale-110 transition-all hover:ease-in-out hover:duration-300 rounded-xl text-sm">Tambah Peserta</button>
      <Popup @close-Popup="togglePopup" :isPopup="isPopup">
        <AddPeserta @close-Popup="togglePopup" />
      </Popup>
      <button @click="togglePopup" class="px-6 py-2 bg-green-600 text-white font-bold mb-2 w-fit border-[1.5px] hover:scale-110 transition-all hover:ease-in-out hover:duration-300 rounded-xl text-sm">Cek Status</button>
      <Popup @close-Popup="togglePopup" :isPopup="isPopup">
        <AddPeserta @close-Popup="togglePopup" />
      </Popup>
    </div>
  </div>
</template>
