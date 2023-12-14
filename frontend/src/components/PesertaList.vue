<template>
  <table class="rounded-lg bg-white overflow-hidden">
    <thead class="bg-sky-800">
      <tr>
        <th class="p-1 text-sm font-bold tracking-wide text-white">No.</th>
        <th class="p-3 text-sm font-bold tracking-wide text-white">Nama</th>
        <th class="p-1 text-sm font-bold tracking-wide text-white">Email</th>
        <th class="p-1 text-sm font-bold tracking-wide text-white">Asal Sekolah</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b" v-for="(peserta, index) in pesertas" :key="peserta.id">
        <th class="p-3 text-sm text-gray-700 font-normal" :class="pesertaClasses(peserta)">
          {{ index + 1 }}
        </th>
        <th class="p-3 text-sm text-gray-700 font-normal" :class="pesertaClasses(peserta)">
          {{ peserta.name }}
        </th>
        <th class="p-3 text-sm text-gray-700 font-normal" :class="pesertaClasses(peserta)">
          {{ peserta.email }}
        </th>
        <th class="p-3 text-sm text-gray-700 font-normal" :class="pesertaClasses(peserta)">
          {{ peserta.school }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pesertas: [],
    };
  },
  created() {
    this.fetchPesertaData();
  },
  methods: {
    fetchPesertaData() {
      axios
        .get("http://localhost:3000/api/peserta")
        .then((response) => {
          this.pesertas = response.data.docs;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },
    pesertaClasses(peserta) {
      const classes = {
        "p-3": true,
        "text-sm": true,
        "text-gray-700": true,
        "font-normal": true,
      };
      return classes;
    },
  },
};
</script>

<style>
.default-selected {
  background-color: #b6b6b6;
}
.rejected-selected {
  background-color: #fa3e3e;
}
.accepted-selected {
  background-color: #86efac;
}
</style>
