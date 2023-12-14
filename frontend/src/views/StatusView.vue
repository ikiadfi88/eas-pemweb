<!-- StatusView.vue -->

<script>
import CekList from "../components/CekList.vue";
import CekStatus from "../components/CekStatus.vue";

export default {
  components: {
    CekList,
    CekStatus,
  },
  data() {
    return {
      isCekStatusVisible: true,
    };
  },
  methods: {
    showCekList() {
      this.isCekStatusVisible = false;
    },
  },
};
</script>

<template>
  <main class="min-h-full w-full flex flex-col justify-center p-8">
    <div class="w-full h-full justify justify-center flex flex-col mt-3 px-56">
      <CekStatus v-if="isCekStatusVisible" @show-CekList="showCekList" />
      <CekList v-if="!isCekStatusVisible" />
    </div>
  </main>
</template>
