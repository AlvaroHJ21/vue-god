<template>
  <div class="navbar bg-base-200">
    <div class="flex-1">
      <RouterLink to="/" class="text-xl normal-case btn btn-ghost">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="24" height="24" />
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="px-1 menu menu-horizontal">
        <li><RouterLink to="/tasks">Tareas</RouterLink></li>
        <li><RouterLink to="/sales">Ventas</RouterLink></li>
        <li>
          <details>
            <summary>Opciones</summary>
            <ul class="p-2 bg-base-100">
              <li><RouterLink to="/">Crear</RouterLink></li>
              <li><RouterLink to="/">Actualizar</RouterLink></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
// export default {}
</script>

<style></style>
