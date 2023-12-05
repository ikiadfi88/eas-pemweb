<template>
  <div>
    <span class="text-sky-800 font-bold text-2xl">Add Channel</span>
    <div class="flex flex-col gap-3 my-3">
      <div>
        <label class="text-sky-800 font-semibold">Channel Name</label>
        <div class="flex flex-row">
          <input ref="channelNameInput" v-model="inputName" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-text w-full" />
          <svg
            @click="startSpeechRecognition"
            aria-hidden="true"
            type="button"
            class="h-10 w-6 absolute right-10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sky-800 font-semibold">Channel Owner</label>
        <input v-model="inputOwner" class="px-3 py-2 bg-slate-100 rounded-md text-gray-800 focus:outline-sky-800 cursor-pointer" />
      </div>
    </div>
    <button @click="addChannel" class="px-4 py-2 mt-1 bg-sky-800 w-fit h-fit text-white font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputName: "",
      inputOwner: "",
    };
  },
  methods: {
    addChannel() {
      if (this.inputName === "" || this.inputOwner === "") return;

      const newChannel = {
        name: this.inputName,
        owner: this.inputOwner,
      };

      axios
        .post("http://localhost:8000/api/channel", newChannel)
        .then((response) => {
          console.log("Channel added successfully:", response.data);
          this.$emit("Channel added", response.data);

          this.inputName = "";
          this.inputOwner = "";
          this.$emit("close-popup");
        })
        .catch((error) => {
          console.error("Error adding Channel:", error);
        });
      window.location.reload();
    },
    startSpeechRecognition() {
      const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new speechRecognition();
      recognition.lang = "id-ID";
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.$refs.channelNameInput.placeholder = result;
      };
      recognition.start();
    },
  },
};
</script>
