<script setup>
import { RouterView } from "vue-router";
import DashboardLayout from "./views/DashboardLayout.vue";
import GuestLayout from "./views/GuestLayout.vue";
import { useAuth } from "./stores/auth";

const auth = useAuth();
</script>

<template>
  <DashboardLayout v-if="auth.getAuthStatus">
    <router-view></router-view>
  </DashboardLayout>

  <GuestLayout v-if="!auth.getAuthStatus">
    <router-view></router-view>
  </GuestLayout>
</template>

<style scoped></style>
