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
  height: 30px;
  padding: 0 4px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid rgb(154, 154, 229);
  /* appearance: base-select;
  min-inline-size: 14ch;
  justify-content: space-between;
  display: flex;
  align-items: center; */
}

/* select::picker(select) {
  appearance: base-select;
  padding: 0 4px;
} */
</style>
