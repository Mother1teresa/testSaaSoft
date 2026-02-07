<script setup lang="ts">
import { ref } from "vue";
import AccountRow from "@/components/accountRow.vue";
import type { Account } from "@/types/account";

const accounts = ref<Account[]>(JSON.parse(localStorage.getItem("accounts") || "[]")
    .filter((a: Account) => a.login.trim() !== "" || a.labels.length > 0 || (a.type === "local" && a.password?.trim() !== "")));

function persist() {
  localStorage.setItem("accounts", JSON.stringify(accounts.value));
}

function addAccount() {
  accounts.value.push({
    id: Date.now(),
    labels: [],
    type: "local",
    login: "",
    password: "",
    isValid: false,
    touched: false,
  });
}

function updateAccount(account: Account) {
  const index = accounts.value.findIndex((a) => a.id === account.id);
  if (index !== -1) {
    const isEmpty =
      account.login.trim() === "" &&
      ((account.type === "ldap") || (account.password?.trim() === "")) &&
      account.labels.length === 0;
    if (isEmpty) {
      accounts.value.splice(index, 1);
    } else {
      accounts.value[index] = account;
    }

    persist();
  }
}

function removeAccount(id: number) {
  accounts.value = accounts.value.filter((a) => a.id !== id);
  persist();
}
</script>

<template>
  <div class="accounts">
    <div class="top">
      <h1 class="title">Учетная запись</h1>

      <button class="add" @click="addAccount">+</button>
    </div>

    <div class="line">
      <img src="/public/icon/free-icon.png" alt="" />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
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
  max-width: 1250px;
  margin: 30px auto;
}

.top {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
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

.line {
  padding: 3px 6px;
  background-color: rgba(189, 189, 253, 0.299);
  border-radius: 4px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.line img {
    width: 18px;
    height: 18px;
}
</style>
