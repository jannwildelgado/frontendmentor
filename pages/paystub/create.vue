<template>
  <div class="flex">
    <div class="w-full">
      <div class="flex items-center p-4">
        <div class="flex items-center text-teal-600 relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600 text-center">
            <Icon
              name="ph:buildings"
              class="w-6 h-6"
            />
          </div>

          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600 ">
            company
          </div>
        </div>

        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600" />

        <div class="flex items-center text-white relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600 text-center">
            <Icon
              name="ph:user-plus"
              class="w-6 h-6"
            />
          </div>

          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
            employee
          </div>
        </div>

        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />

        <div class="flex items-center text-gray-500 relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300 text-center">
            <Icon
              name="uil:money-bill"
              class="w-6 h-6"
            />
          </div>

          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
            salary
          </div>
        </div>

        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300" />

        <div class="flex items-center text-gray-500 relative">
          <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300 text-center">
            <Icon
              name="uil:envelope"
              class="w-6 h-6"
            />
          </div>

          <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">
            email
          </div>
        </div>
      </div>

      <div class="px-5 pt-10">
        <PaystubCompany />
      </div>
    </div>

    <div class="w-full">
      Section 2
    </div>
  </div>
</template>
