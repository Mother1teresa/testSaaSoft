<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Account } from '@/types/account'

const props = defineProps<{account: Account}>()
const emit = defineEmits<{
  (e: 'update', value: Account): void
  (e: 'remove', id: number): void
}>()

const form = ref<Account>({...props.account})

watch(
  () => props.account,
  value => {
    form.value = {...value}
    validate()
  },
  {deep: true, immediate: true}
)

watch(
  form,
  value => {
    validate()
    emit('update', value)
  },
  {deep: true}
)

function validate() {
  const hasLogin = form.value.login.trim().length > 0
  const hasPassword =
    form.value.type === 'ldap' ||
    (form.value.password && form.value.password.length > 0)

  form.value.isValid = hasLogin && hasPassword
}

function onTypeChange() {
  form.value.password = form.value.type === 'local' ? '' : null
}

function onLabelsBlur(event: FocusEvent) {
  const input = event.target as HTMLInputElement

  form.value.labels = input.value
    .split(';')
    .map(text => ({text: text.trim()}))
    .filter(label => label.text.length > 0)
}
</script>

<template>
  <div class="row" :class="{ error: !form.isValid }">
    <input
      :defaultValue="form.labels.map(l => l.text).join('; ')"
      placeholder="Метки"
      @blur="onLabelsBlur"
    />

    <select v-model="form.type" @change="onTypeChange">
      <option value="local">Локальная</option>
      <option value="ldap">LDAP</option>
    </select>

    <input v-model="form.login" placeholder="Логин" />

    <input
      v-if="form.type === 'local'"
      type="password"
      v-model="form.password"
      placeholder="Пароль"
    />

    <div v-else></div>

   <button @click="emit('remove', form.id)">
      <img src="/public/icon/icons8-tr-24.gif" alt="" />
    </button>
    
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr 40px;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.row.error input,
.row.error select {
  border-color: red;
}
</style>
