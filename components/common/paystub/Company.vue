<template>
  <div>
    Company Information

    <form class="">
      <div class="mb-6">
        <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
          Company name*
        </label>

        <TextField
          @focus="$event.target.select()"
        />
      </div>

      <div class="mb-6">
        <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
          address*
        </label>

        <TextField
          @focus="$event.target.select()"
        />
      </div>

      <div class="flex mb-6">
        <div class="w-full">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            Apt/Ste No. (optional)
          </label>

          <TextField
            @focus="$event.target.select()"
          />
        </div>

        <div class="w-full">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            city*
          </label>

          <TextField
            @focus="$event.target.select()"
          />
        </div>
      </div>

      <div class="flex mb-6">
        <div class="w-full">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            State *
          </label>

          <TextField
            @focus="$event.target.select()"
          />
        </div>

        <div class="w-full">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            Zip Code (Optional)
          </label>

          <TextField
            @focus="$event.target.select()"
          />
        </div>
      </div>
    </form>
  </div>
</template>
