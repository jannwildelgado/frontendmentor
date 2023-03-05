<script setup lang="ts">
import { faker } from '@faker-js/faker'

definePageMeta({
  middleware: ['auth']
})

const app = useNuxtApp()
const isLoading = ref(true)

const companies = computed(() => {
  const arr = []

  for (let i = 0; i < 2; i++) {
    arr.push({
      id: faker.datatype.uuid(),
      avatar: i % 2 === 0 ? faker.internet.avatar() : null,
      name: faker.company.name()
    })
  }

  return arr
})

app.hook('page:finish', () => {
  isLoading.value = false
})
</script>

<template>
  <div class="h-full flex">
    <div class="bg-white pt-2 w-80 overflow-y-auto border-r border-gray-200 dark:border-[#4b5563]">
      <div class="">
        <span class="uppercase font-black text-xs px-2">
          Companies
        </span>

        <div
          v-if="isLoading"
          class="uppercase px-2 text-xs"
        >
          Loading...
        </div>

        <div
          v-else
          class=""
        >
          <NuxtLink
            v-for="(company, key) in companies"
            :key="key"
            :to="{
              query: { companyId: company.id }
            }"
            class="flex justify-center items-center h-8 px-2 text-sm hover:bg-slate-100 cursor-pointer"
            :class="{
              'bg-gray-200': $route.query?.companyId === company.id
            }"
          >
            <div class="flex w-5 max-w-5 min-w-5 h-5 mr-2">
              <img
                v-if="company.avatar"
                role="presentation"
                decoding="async"
                fetchpriority="high"
                loading="lazy"
                class="rounded-md min-w-5"
                :src="company.avatar ?? ''"
              >
            </div>

            <div class="w-full">
              {{ company.name }}
            </div>
          </NuxtLink>

          <NuxtLink
            class="flex justify-center items-center h-8 px-2 text-sm hover:bg-slate-100 cursor-pointer"
            to="/paystub/create"
          >
            <div class="flex mr-2">
              <Icon
                class="w-5 h-5"
                name="icon-park-outline:plus"
              />
            </div>

            <div class="w-full">
              Create new company
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="w-full p-4">
      <NuxtPage />
    </div>
  </div>
</template>
