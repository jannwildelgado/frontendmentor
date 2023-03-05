<script setup lang="ts">
//
</script>

<template>
  <div class="flex flex-col h-screen bg-[#f0f1f3] dark:bg-[#101827] relative">
    <!-- <NavBar /> -->

    <!-- class="flex h-[calc(100vh_-_100px)]" -->
    <main
      class="h-screen overflow-y-auto"
      style=""
    >
      <!-- <SideBar /> -->

      <!-- <div class="overflow-y-auto w-full">
        <NuxtPage />
      </div> -->

      <NuxtPage />
    </main>

    <Toastify />
  </div>
</template>
