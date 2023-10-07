<template>
  <div>
    <input type="text" v-model="searchText" @input="onInput" />
    <div v-if="filteredApps.length">
      <div v-for="app in filteredApps" :key="app" @click="selectApp(app)">
        {{ app }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { ipcRenderer } from "electron";
import { defineComponent } from "vue";

const name = "AppComponent";

// Props
const props = defineProps<{ apps: string[] }>();

// Data
const searchText = ref("");
const filteredApps = ref<string[]>([]);
const apps = ref<string[]>([]);

// Fetch installed apps from Electron's main process
onMounted(async () => {
  apps.value = await ipcRenderer.invoke("getApps");
});

// Methods
const onInput = () => {
  if (!searchText.value) {
    filteredApps.value = [];
    return;
  }
  filteredApps.value = apps.value.filter((app) =>
    app.toLowerCase().includes(searchText.value.toLowerCase())
  );
};

const selectApp = (app: string) => {
  searchText.value = app;
  filteredApps.value = [];

  // Send message to Electron's main process
  ipcRenderer.send("launchApp", app);
};
</script>

<style scoped>
/* Your styles here */
</style>
