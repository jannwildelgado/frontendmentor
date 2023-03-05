<!--
  @USE AS
  <TextField
    v-model="test"
    class="disabled:opacity-50"
    @focus="$event.target.select()"
  />
-->

<template>
  <input
    class="bg-gray-50 border border-gray-300 text-gray-900 rounded block w-full p-2.5 focus:ring-[#00754a] focus:border-[#00754a]"
    :value="props.modelValue"
    :type="props.type"
    :disabled="props.disabled"
    placeholder=""
    @input="updateHandler"
  >
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },

  type: {
    type: String,
    default: 'text'
  },

  disabled: {
    type: Boolean,
    default: false
  },

  size: {
    type: String,
    default: 'medium'
  }
})

const emit = defineEmits(['update:modelValue'])

function updateHandler (event: any) {
  emit('update:modelValue', event.target.value)
}

// p-2    - Small
// p-2.4  - Base
// p-4    - Large
</script>
