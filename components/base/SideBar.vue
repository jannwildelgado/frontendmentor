<template>
  <div class="bg-white dark:bg-[#1f2937] border-r border-gray-200 w-20 pt-3">
    <div class="flex flex-col items-center gap-2">
      <NuxtLink
        class="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded"
        active-class="bg-gray-200"
        to="/"
      >
        <Icon
          class="w-5 h-5"
          name="icon-park-outline:refresh"
        />

        <span class="text-xs">
          Generate
        </span>
      </NuxtLink>

      <NuxtLink
        class="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded"
        active-class="bg-gray-200"
        to="/paystub"
      >
        <Icon
          class="w-5 h-5"
          name="icon-park-outline:paper-money"
        />

        <span class="text-xs">
          Payslip
        </span>
      </NuxtLink>

      <NuxtLink
        class="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded"
        active-class="bg-gray-200"
        to="/contact"
      >
        <Icon
          class="w-5 h-5"
          name="icon-park-outline:phone-telephone"
        />

        <span class="text-xs">
          Contact
        </span>
      </NuxtLink>

      <NuxtLink
        class="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded"
        active-class="bg-gray-200"
        to="/account"
      >
        <Icon
          class="w-5 h-5"
          name="icon-park-outline:user"
        />

        <span class="text-xs">
          Account
        </span>
      </NuxtLink>

      <NuxtLink
        class="flex flex-col justify-center items-center gap-1 w-16 h-16 rounded"
        active-class="bg-gray-200"
        to="/comment"
      >
        <Icon
          class="w-5 h-5"
          name="icon-park-outline:comment"
        />

        <span class="text-xs">
          Comment
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
