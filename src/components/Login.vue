<script setup>
import { reactive, ref } from "vue";
import { useAuth } from "../stores/auth";
import router from "../router";
import Swal from "sweetalert2";

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

const loginForm = reactive({
  userEmail: "",
  password: "",
});

let msg = ref("");

const auth = useAuth();

function submitFrom() {
  const success = auth.login(loginForm);
  if (success) {
    if (
      success.newUserEmail === loginForm.userEmail &&
      success.newPassword === loginForm.password
    ) {
      router.push({ name: "userDetails" });
      auth.isLoggedIn = true;

      toaster.show(`You have successfully Logged In`, {
        type: "success",
        position: "top",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `No record Match with this ${loginForm.userEmail} & Password `,
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Error!",
      text: "Something Went wrong",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
}

function validateEmail(email) {
  if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
    msg.value = "Please enter a valid email address";
  } else {
    msg.value = "";
  }
}
</script>

<template>
  <section class="bg-fuchsia-900" id="app">
    <!-- Show login and registration forms if the user is not logged in -->
    <div class="container h-screen flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <!-- Login form -->
        <form
          class="bg-fuchsia-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          @submit.prevent="submitFrom"
        >
          <div class="mb-4 w-80">
            <label
              class="block text-white text-sm font-bold mb-2"
              required
              for="userEmail"
            >
              Email
            </label>
            <input
              v-model="loginForm.userEmail"
              required
              class="shadow bg-fuchsia-500 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="userEmail"
              type="email"
              placeholder="Email"
              @blur="validateEmail(loginForm.userEmail)"
            />
            <span class="text-white">{{ msg }}</span>
          </div>
          <div class="mb-6 w-80">
            <label
              class="block text-white text-sm font-bold mb-2"
              for="password"
              required
            >
              Password
            </label>
            <input
              v-model="loginForm.password"
              class="shadow bg-fuchsia-500 appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              v-if="msg ? '' : 'disabled'"
              class="bg-fuchsia-900 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <RouterLink
              :to="{ name: 'register' }"
              class="inline-block align-baseline font-bold text-sm text-white hover:text-fuchsia-500"
            >
              Or Register
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
