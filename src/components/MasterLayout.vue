<script setup>
import router from "../router";
import { useAuth } from "../stores/auth";
import { ref } from "vue";
import Swal from "sweetalert2";

const auth = useAuth();
function logOut() {
  Swal.fire({
    title: "Are you sure To Log Out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      const success = auth.logout();

      if (success) {
        router.push({ name: "login" });
        Swal.fire("success!", "You have successfully logOut", "success");
      } else {
        Swal.fire("error!", "Something went wrong", "success");
      }
    }
  });
}

const mobileMenuOpen = ref(true);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
<template>
  <nav
    class="bg-fuchsia-950 z-50 sticky top-0 shadow-lg border-b border-b-fuchsia-500"
  >
    <div class="flex justify-between items-center p-4">
      <div class="flex justify-between items-center space-x-5">
        <RouterLink :to="{ name: 'dashboard' }" class="flex items-center">
          <h2 class="text-3xl text-white">Admin Panel</h2>
        </RouterLink>

        <button @click="toggleMobileMenu" class="focus:outline-none mt-2">
          <svg
            v-show="!mobileMenuOpen"
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>

          <svg
            v-show="mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <a href="#" class="relative p-1">
          <div class="absolute right-0 -top-0">
            <span class="relative flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"
              ></span>
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
          </svg>
        </a>

        <div class="dropdown inline-block relative">
          <button
            class="bg-fuchsia-700 text-white font-semibold py-2 px-4 rounded inline-flex space-x-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Log Out</span>
          </button>
          <ul
            class="dropdown-menu absolute hidden text-center border bg-fuchsia-500 text-fuchsia-300 p-1"
          >
            <li class="">
              <a
                class="border-b border-dotted py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Profile</a
              >
            </li>
            <li class="">
              <RouterLink :to="{ name: 'dashboard' }" class="flex items-center">
                <a
                  class="rounded-t border-b border-dotted py-2 px-4 block whitespace-no-wrap"
                  href="javascript:void(0)"
                  >Dashboard</a
                >
              </RouterLink>
            </li>

            <li class="">
              <a
                href="#"
                @click.prevent="logOut()"
                class="rounded-t py-2 px-4 block whitespace-no-wrap"
              >
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <aside
    :class="mobileMenuOpen ? 'block' : 'hidden'"
    class="fixed left-0 z-40 w-64 h-screen"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-fuchsia-950 border-r">
      <ul class="flex font-semibold flex-col space-y-2">
        <div
          class="section border-b pt-4 mb-4 text-xs text-fuchsia-400 border-fuchsia-700 pb-1 pl-3"
        >
          User
        </div>
        <!-- ITEM -->
        <li class="text-white">
          <RouterLink :to="{ name: 'userDetails' }">
            <a
              href="javascript:void(0)"
              class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-700 hover:bg-white"
            >
              <div class="pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
              </div>
              <div>User Details</div>
            </a>
          </RouterLink>
        </li>

        <div
          class="section border-b pt-4 mb-4 text-xs text-fuchsia-400 border-fuchsia-700 pb-1 pl-3"
        >
          Work
        </div>

        <!-- ITEM -->
        <li class="text-white">
          <a
            href="#"
            class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-500 hover:bg-white"
          >
            <div class="pr-2">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <div>Tasks</div>
          </a>
        </li>

        <!-- ITEM -->
        <li class="text-white">
          <a
            href="#"
            class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-500 hover:bg-white"
          >
            <div class="pr-2">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>Errors &amp; Bugs</div>
          </a>
        </li>

        <!-- Section Devider -->
        <div
          class="section border-b pt-4 mb-4 text-xs text-fuchsia-400 border-fuchsia-700 pb-1 pl-3"
        >
          Managment
        </div>

        <!-- List ITEM -->
        <li class="text-white">
          <a
            href="#"
            class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-500 hover:bg-white"
          >
            <div class="pr-2">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <div>Team</div>
            <div class="absolute right-1.5 transition-transform duration-300">
              <svg
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </a>
        </li>

        <!-- List ITEM -->
        <li class="text-white">
          <a
            href="#"
            class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-500 hover:bg-white"
          >
            <div class="pr-2">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
            </div>
            <div>Projects</div>
            <div
              class="absolute right-1.5 transition-transform duration-300"
              :class="{ 'rotate-180': selected === 'Projects' }"
            >
              <svg
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </a>
        </li>

        <!-- List ITEM -->
        <li class="text-white">
          <a
            href="#"
            class="flex items-center w-full py-1 px-2 rounded relative hover:text-fuchsia-500 hover:bg-white"
          >
            <div class="pr-2">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
            </div>
            <div>Tasks</div>
            <div class="absolute right-1.5 transition-transform duration-300">
              <svg
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
