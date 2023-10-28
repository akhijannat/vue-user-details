<script setup>
import { ref, reactive, computed, watchEffect, watch } from "vue";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
  /* options */
});

import axios from "axios";

const user = reactive({});

const userUpdate = reactive({});

const user_id = ref(1);

const vote = ref("");

watchEffect(async () => {
  const json = await fetch(`https://dummyjson.com/users/${user_id.value}`);
  const response = await json.json();
  user.id = response.id;
  user.firstName = response.firstName;
  user.lastName = response.lastName;
  user.maidenName = response.maidenName;
  user.email = response.email;
  user.address = response.address.address;
  user.age = response.age;
  user.phone = response.phone;
  user.gender = response.gender;
  user.username = response.username;
  user.image = response.image;
  user.title = response.company.title;
});

let birthYear = 0;
let currentDate = new Date().getFullYear();

watch(() => {
  vote.value =
    user.age >= 18 ? "Eligible for voting" : "Not eligible for voting";
  birthYear = currentDate - user.age;
});

const FindBirthYear = computed(() => {
  birthYear = currentDate - user.age;
  return birthYear;
});

const voter = computed(() => {
  return user.age >= 18 ? "You are legally the right to vote" : "No";
});

// user update
function updateUser(user_id) {
  axios.get(`https://dummyjson.com/users/${user_id}`).then((response) => {
    userUpdate.id = response.data.id;
    userUpdate.email = response.data.email;
    userUpdate.firstName = response.data.firstName;
    userUpdate.lastName = response.data.lastName;
    userUpdate.image = response.data.image;
    userUpdate.age = response.data.age;
  });
}

function fromSubmit(user_id) {
  axios
    .put(`https://dummyjson.com/users/${user_id}`, userUpdate)
    .then((response) => {
      if (response.status === 200) {
        user.id = response.data.id;
        user.email = response.data.email;
        user.firstName = response.data.firstName;
        user.lastName = response.data.lastName;
        user.image = response.data.image;
        user.age = response.data.age;
        toaster.show(`You have successfully Update the User`, {
          type: "success",
          position: "top",
        });
      } else {
        toaster.show(`Something went Wrong`, {
          type: "error",
          position: "top",
        });
      }
    });
}
</script>

<template>
  {{ user }}

  <div class="grid gap-2 mb-6 md:grid-cols-2">
    <div>
      <br />

      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-fuchsia-900 dark:text-white"
        >Input user ID</label
      >
      <input
        type="text"
        v-model="user_id"
        id="first_name"
        class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
        placeholder="User Id"
        required
      />
    </div>
  </div>

  <div class="grid gap-2 mb-6 md:grid-cols-2">
    <div class="bg-white overflow-hidden shadow rounded-lg border">
      <div class="px-4 py-5 sm:px-6">
        <div class="circular_image">
          <img :src="user.image" alt="" />
        </div>
        <h1 class="text-lg leading-6 font-medium text-fuchsia-900">
          {{ user.username }}
        </h1>

        <h4 class="mt-1 max-w-2xl text-sm text-fuchsia-500">
          {{ user.title }}
        </h4>

        <h4 class="mt-1 max-w-2xl text-sm text-fuchsia-500">
          Age : <span class="text-red-800 font-bold">{{ user.age }}</span>
        </h4>

        <br />
        <br />
        <br />

        <div class="align-middle">
          <h1 class="font-bold">Age change for observe watcher</h1>
          <br />
          <input
            type="text"
            v-model="user.age"
            id="first_name"
            class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-700 dark:border-fuchsia-600 dark:placeholder-fuchsia-400 dark:text-white dark:focus:ring-fuchsia-500 dark:focus:border-fuchsia-500"
          />
          <br />
          <h2 class="text-red-800">
            Watcher OutPut Birth Year :
            <span class="text-green-800 font-bold"> {{ birthYear }}</span>
          </h2>
          <br />
          <h2 class="text-red-800">
            Watcher OutPut Vote :
            <span class="text-green-800 font-bold">{{ vote }}</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="bg-white overflow-hidden shadow rounded-lg border">
      <div class="px-2 py-5 sm:px-6">
        <h1 class="text-fuchsia-700 font-semibold">User Details</h1>

        <button
          @click.prevent="updateUser(user.id)"
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          class="float-right block text-white bg-fuchsia-700 hover:bg-fuchsia-800 font-medium rounded text-sm px-2.5 py-2.5 text-center"
          type="button"
        >
          Edit User
        </button>
        <br />
      </div>

      <div class="border-t border-fuchsia-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-fuchsia-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-500">Full name</dt>
            <dd class="mt-1 text-sm text-fuchsia-900 sm:mt-0 sm:col-span-2">
              {{ user.firstName }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-500">Email address</dt>
            <dd class="mt-1 text-sm text-fuchsia-900 sm:mt-0 sm:col-span-2">
              {{ user.email }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-500">Phone number</dt>
            <dd class="mt-1 text-sm text-fuchsia-900 sm:mt-0 sm:col-span-2">
              {{ user.phone }}
            </dd>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-500">Address</dt>
            <dd class="mt-1 text-sm text-fuchsia-900 sm:mt-0 sm:col-span-2">
              {{ user.address }}
            </dd>
          </div>

          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-500">
              <h1 class="font-bold">Birth Year using Computed Property</h1>
            </dt>
            <dd class="mt-1 text-sm text-fuchsia-900 sm:mt-0 sm:col-span-2">
              <h1 class="font-bold text-red-700">{{ FindBirthYear }}</h1>
            </dd>
          </div>

          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-green-800">
              Computed Property Calculate Age
            </dt>
            <dd
              class="mt-1 font-bold text-sm sm:mt-0 sm:col-span-2 text-red-800"
            >
              {{ user.age }}
            </dd>
          </div>

          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-fuchsia-700">
              <h1 class="font-bold">Computed Property Calculate Voter</h1>
            </dt>
            <dd
              class="mt-1 text-sm font-bold text-red-800 sm:mt-0 sm:col-span-2"
            >
              {{ voter }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <!-- Main modal -->
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-fuchsia-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-fuchsia-600"
        >
          <h3 class="text-xl font-semibold text-fuchsia-900 dark:text-white">
            Terms of Service
          </h3>
          <button
            type="button"
            class="text-fuchsia-400 bg-transparent hover:bg-fuchsia-200 hover:text-fuchsia-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-fuchsia-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-fuchsia-900 dark:text-white">
            Update User
          </h3>

          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-fuchsia-900 dark:text-white"
              >First Name</label
            >
            <input
              type="text"
              id="first_name"
              v-model="userUpdate.firstName"
              class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-600 dark:border-fuchsia-500 dark:placeholder-fuchsia-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              for="last_name"
              class="block mb-2 text-sm font-medium text-fuchsia-900 dark:text-white"
              >Your Last Name</label
            >
            <input
              type="text"
              id="last_name"
              v-model="userUpdate.lastName"
              name="last_name"
              class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-600 dark:border-fuchsia-500 dark:placeholder-fuchsia-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-fuchsia-900 dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="userUpdate.email"
              name="last_name"
              class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-600 dark:border-fuchsia-500 dark:placeholder-fuchsia-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label
              for="birthDate"
              class="block mb-2 text-sm font-medium text-fuchsia-900 dark:text-white"
              >Age</label
            >
            <input
              type="text"
              id="birthDate"
              v-model="userUpdate.age"
              name="birthDate"
              class="bg-fuchsia-50 border border-fuchsia-300 text-fuchsia-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-fuchsia-600 dark:border-fuchsia-500 dark:placeholder-fuchsia-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-fuchsia-200 rounded-b"
        >
          <button
            @click.prevent="fromSubmit(user.id)"
            data-modal-hide="defaultModal"
            type="submit"
            class="text-white hover:text-fuchsia-600 bg-fuchsia-950 hover:bg-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circular_image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: fuchsia;
  /* commented for demo
  float: left;
  margin-left: 125px;
  margin-top: 20px;
  */

  /*for demo*/
  display: inline-block;
  vertical-align: middle;
}
.circular_image img {
  width: 100%;
}
</style>
