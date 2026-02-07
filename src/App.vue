<script setup lang="ts">
import AccountsForm from "@/components/accountForm.vue";
</script>

<template>
  <AccountsForm />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  outline: none;
}

html {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
}

input {
  padding: 2px 8px;
  font-size: 12px;
  height: 25px;
  border-radius: 6px;
  border: 1px solid rgb(154, 154, 229);
}

input::placeholder {
  color: black;
}

select {
  height: 31px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid rgb(154, 154, 229);
  /* appearance: base-select;
  min-inline-size: 14ch;
  justify-content: space-between;
  display: flex;
  align-items: center; */
}
select {
  padding-right: 28px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 14px;
}

/* select::picker(select) {
  appearance: base-select;
  padding: 0 4px;
} */
</style>
