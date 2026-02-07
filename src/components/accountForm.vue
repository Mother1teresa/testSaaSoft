<script setup lang="ts">
import { ref } from "vue";
import AccountRow from "@/components/accountRow.vue";
import type { Account } from "@/types/account";

const accounts = ref<Account[]>([]);

function addAccount() {
  accounts.value.push({
    id: Date.now(),
    labels: [],
    type: "local",
    login: "",
    password: "",
    isValid: false,
  });
}

function updateAccount(account: Account) {
  const index = accounts.value.findIndex((a) => a.id === account.id);
  if (index !== -1) {
    accounts.value[index] = account;
  }
}

function removeAccount(id: number) {
  accounts.value = accounts.value.filter((a) => a.id !== id);
}
</script>

<template>
  <div class="accounts">
    <div class="top">
      <h1 class="title">Учетная запись</h1>

      <button class="add" @click="addAccount">+</button>
    </div>

    <div class="header">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div>
    </div>

    <AccountRow
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @update="updateAccount"
      @remove="removeAccount"
    />
  </div>
</template>

<style scoped>
.accounts {
  max-width: 1400px;
  margin: 30px auto;
}

.top {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr 40px;
  gap: 8px;
  margin-bottom: 8px;
  color: #777;
}

.header div {
  font-size: 12px;
}

.add {
  padding: 6.5px 12px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgb(155, 155, 255);
  color: rgb(155, 155, 255);
  font-size: 16px;
}
</style>
