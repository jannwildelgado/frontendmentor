<!--
  @USE AS
  <TextField
    v-model="test"
    class="disabled:opacity-50"
    @focus="$event.target.select()"
  />
-->

<template>
  <textarea
    class="bg-gray-50 text-[#324152] border border-gray-300 outline-primary rounded block w-full h-full p-2.5"
    :value="props.modelValue"
    :disabled="props.disabled"
    placeholder=""
    @input="updateHandler"
  />
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
