<script setup>
import { reactive, ref } from "vue";
import { useAuth } from "../stores/auth";
import router from "../router";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

import Swal from "sweetalert2";

const registerForm = reactive({
  newUserEmail: "",
  newPassword: "",
  conformPassword: "",
});

let msg = ref("");
let pasMsg = ref("");

// Register

const auth = useAuth();

function submitRegisterFrom() {
  // Perform password matching validation
  if (registerForm.newPassword !== registerForm.conformPassword) {
    Swal.fire({
      title: "Error!",
      text: "Passwords do not match. Please try again.",
      icon: "error",
      confirmButtonText: "Cool",
    });
  } else {
    const success = auth.register(registerForm);
    if (success) {
      router.push({ name: "dashboard" });
      toaster.show(`You have successfully complete Your Registration`, {
        type: "success",
        position: "top",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something Went wrong",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }
}

// email validation

function validateEmail(email) {
  if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
    msg.value = "Please enter a valid email address";
  } else {
    msg.value = "";
  }
}

function validatePassword(confirmPassword) {
  if (registerForm.newPassword !== confirmPassword) {
    pasMsg.value = "Password & Confirm Password Do not match";
  } else {
    pasMsg.value = "";
  }
}
</script>

<template>
  <section class="bg-fuchsia-900" id="app">
    <!-- Show login and registration forms if the user is not logged in -->
    <div class="container h-screen flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <form
          class="bg-fuchsia-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          @submit.prevent="submitRegisterFrom"
        >
          <div class="mb-4 w-80">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="UserEmail"
              required
            >
              Email
            </label>
            <input
              v-model="registerForm.newUserEmail"
              class="shadow bg-fuchsia-500 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="UserEmail"
              type="text"
              placeholder="Email"
              required
              @blur="validateEmail(registerForm.newUserEmail)"
            />
            <span class="text-red-500">{{ msg }}</span>
          </div>
          <div class="mb-4 w-80">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="newPassword"
              required
            >
              New Password
            </label>
            <input
              v-model="registerForm.newPassword"
              class="shadow bg-fuchsia-500 appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              id="newPassword"
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="mb-6 w-80">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="conformPassword"
              required
            >
              Conform Password
            </label>
            <input
              v-model="registerForm.conformPassword"
              class="shadow bg-fuchsia-500 appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              id="conformPassword"
              type="password"
              placeholder="******************"
              @blur="validatePassword(registerForm.conformPassword)"
            />
            <span class="text-red-500">{{ pasMsg }}</span>
          </div>
          <div class="flex items-center justify-between">
            <button
              v-if="msg ? '' : 'disabled'"
              class="bg-fuchsia-900 hover:bg-fuchsia-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <RouterLink
              :to="{ name: 'login' }"
              class="inline-block align-baseline font-bold text-sm text-white hover:text-fuchsia-900"
            >
              Back to Login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
