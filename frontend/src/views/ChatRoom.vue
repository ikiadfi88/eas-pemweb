<template>
  <div class="flex justify-center items-center mt-20">
    <div class="p-4 w-1/2">
      <h2 class="text-2xl font-bold text-sky-800 mb-4 flex items-center">
        <div @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" class="cursor-pointer" />
          </svg>
        </div>
        {{ channelName }}
      </h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <div class="overflow-y-auto max-h-[875px] border border-gray-300 p-4 rounded-md bg-gray-100 justify-end items-end text-right" ref="messageContainer">
            <template v-if="messages.length === 0">
              <p class="text-gray-500">There are no messages, let's start chatting!</p>
            </template>
            <div v-else>
              <!-- Reverse the order of messages using the 'reversedMessages' computed property -->
              <div v-for="(message, index) in reversedMessages" :key="index">
                <div :class="[message.sender === 'user' ? 'self-end' : 'self-start', 'mb-4']">
                  <div :class="[message.sender === 'user' ? 'bg-sky-800 text-sky-100' : 'bg-sky-800 text-sky-100', 'p-3 rounded-md inline-block']">
                    {{ message.message }}
                    <p class="text-xs text-gray-400">{{ formatDate(message.createdAt) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-3 items-center absolute inset-x-0 bottom-5 justify-center">
            <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message" class="px-3 py-4 bg-white rounded-md focus:outline-sky-800 cursor-text w-[45%]" />
            <button @click="sendMessage" class="px-4 py-4 bg-sky-800 text-sky-100 font-bold text-sm rounded-lg hover:bg-sky-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputMessage: "",
      messages: [],
      currentUser: "user",
      channelName: "",
    };
  },
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  methods: {
    async getChannelById(channelId) {
      try {
        console.log("Fetching channel:", channelId);
        const response = await axios.get(`http://localhost:8000/api/channel/${channelId}`);
        const channel = response.data;
        this.channelName = channel.name;
        await this.fetchMessageById(channel._id);
      } catch (error) {
        console.error("Error fetching Channel: ", error);
      }
    },
    async fetchMessageById(channelId) {
      try {
        console.log("Fetching messages for channel:", channelId);
        let page = 1;
        let allMessages = [];

        while (true) {
          const response = await axios.get(`http://localhost:8000/api/chat`, {
            params: {
              channel: channelId,
              page,
            },
          });

          const messages = response.data.docs.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          }));

          if (messages.length === 0) {
            break;
          }

          allMessages = allMessages.concat(messages);

          page++;
        }

        this.messages = allMessages;
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    },
    async sendMessage() {
      if (this.inputMessage.trim() === "") {
        return;
      }

      const newMessage = {
        sender: this.currentUser,
        content: this.inputMessage,
        createdAt: new Date(),
      };

      this.messages = [...this.messages, newMessage];

      try {
        console.log("Sending message:", this.inputMessage);
        await axios.post(`http://localhost:8000/api/chat`, {
          channel: this.$route.params.id,
          message: this.inputMessage,
        });

        this.inputMessage = "";

        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });

        await this.fetchMessageById(this.$route.params.id);
      } catch (error) {
        console.error("Error sending message: ", error.response.data);
      }
    },
    formatDate(dateTime) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
      };

      return new Date(dateTime).toLocaleDateString("id-ID", options);
    },
  },
  async beforeRouteEnter(to, from, next) {
    // Access the component instance through the next callback
    next((vm) => {
      // Fetch messages for the channel ID in the route parameters
      vm.getChannelById(to.params.id);
    });
  },
  async beforeRouteUpdate(to, from, next) {
    // Clear messages when route is updated
    this.messages = [];

    // Fetch messages for the new channel
    await this.getChannelById(to.params.id);

    next();
  },
  async mounted() {
    console.log("Mounted with channel ID:", this.$route.params.id);
    await this.getChannelById(this.$route.params.id);
  },
};
</script>
