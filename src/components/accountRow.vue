<script setup lang="ts">
import { ref, watch } from "vue";
import type { Account } from "@/types/account";

const props = defineProps<{account: Account}>();
const emit = defineEmits<{
  (e: 'update', value: Account): void;
  (e: 'remove', id: number): void;
}>();

const form = ref<Account>({...props.account});
const labelsInput = ref(
  props.account.labels.map(l => l.text).join("; ")
);

watch(
  () => props.account,
  value => {
    form.value = {...value};
    labelsInput.value = value.labels.map(l => l.text).join("; ");
    validate();
  },
  {deep: true, immediate: true}
);

watch(
  form,
  (value) => {
    if (!value) return;
    validate();
    const hasData =
      value.login.trim() !== "" ||
      value.labels.length > 0 ||
      (value.type === "local" && value.password?.trim() !== "");
    if (hasData) {
      emit("update", value);
    }
  },
  {deep: true}
);

function validate() {
  if (!form.value.touched) {
    form.value.isValid = true;
    return;
  }
  const hasLogin = form.value.login.trim().length > 0 && form.value.login.length <= 100;
  const hasPassword: boolean =
  form.value.type === "ldap" || (!!form.value.password && form.value.password.length > 0 && form.value.password.length <= 100);
  form.value.isValid = hasLogin && hasPassword;
}

function onTypeChange() {
  form.value.touched = true;
  form.value.password = form.value.type === "local" ? "" : null;
}

function onLabelsBlur(event: FocusEvent) {
  form.value.touched = true;
  const input = event.target as HTMLInputElement;

  form.value.labels = input.value
    .slice(0, 50)
    .split(";")
    .map(text => ({text: text.trim()}))
    .filter(label => label.text.length > 0)
}
</script>

<template>
  <div class="row" :class="{error: form.touched && !form.isValid, ldap: form.type === 'ldap'}">
    <input v-model="labelsInput" placeholder="Значение" @blur="onLabelsBlur" maxlength="50"/>

    <select v-model="form.type" @change="onTypeChange">
      <option value="local">Локальная</option>
      <option value="ldap">LDAP</option>
    </select>

    <input v-model="form.login" placeholder="Значение" @blur="form.touched = true" maxlength="100"/>

    <input v-show="form.type === 'local'" type="password" v-model="form.password" placeholder="Пароль" @blur="form.touched = true" maxlength="100"/>

    <!-- <div v-else /> -->

    <button class="remove" @click="emit('remove', form.id)">
      <img src="/public/icon/icons8-tr-24.gif" alt="Удалить" />
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

.row.ldap {
  grid-template-columns: 2fr 1fr 4fr 40px;
}

.row.error input,
.row.error select {
  border-color: red;
}

.remove {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
}

.remove img {
  width: 100%;
  height: 100%;
}
</style>
