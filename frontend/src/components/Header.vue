<script>
import { ChannelStore } from "../store/store.js";
import Popup from "../components/Popup.vue";
import AddChannel from "./AddChannel.vue";
import axios from "axios";

export default {
  components: {
    Popup,
    AddChannel,
  },
  data() {
    return {
      ChannelStore,
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
  <span class="font-bold text-4xl text-sky-800">Halo Adfi Chat App</span>
  <div class="w-full flex justify-end gap-3">
    <button @click="togglePopup" class="px-6 py-2 bg-green-600 text-white font-bold mb-2 w-fit border-[1.5px] hover:scale-110 transition-all hover:ease-in-out hover:duration-300 rounded-xl text-sm">+ Add Channel</button>
    <Popup @close-Popup="togglePopup" :isPopup="isPopup">
      <AddChannel @close-Popup="togglePopup" />
    </Popup>
  </div>
</template>
