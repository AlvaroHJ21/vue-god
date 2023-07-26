<template>
  <div class="flex justify-between mb-4">
    <h1 class="text-2xl">Lista de tareas</h1>
    <button @click="onNewTask" class="capitalize btn btn-success">
      <i class="fa fa-plus"></i> Nuevo
    </button>
  </div>

  <div v-if="taskStore.isLoading" class="flex flex-col items-center gap-4">
    <p>Cargando</p>
    <span class="loading loading-spinner loading-lg"></span>
  </div>

  <table v-else class="table">
    <thead>
      <tr>
        <th>N°</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Estado</th>
        <th class="text-right">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in taskStore.tasks" :key="task.id">
        <td>{{ index + 1 }}</td>
        <td>{{ task.name }}</td>
        <td>{{ task.description }}</td>
        <td>
          <span
            @click="onToggleComplete(task)"
            v-if="task.completed"
            class="cursor-pointer badge badge-success"
            >Completada</span
          >
          <span
            @click="onToggleComplete(task)"
            v-else
            class="cursor-pointer badge badge-neutral"
            >Pendiente</span
          >
        </td>

        <td class="space-x-2 text-right">
          <button @click="onEditTask(task)" class="capitalize btn btn-sm btn-success">
            <i class="fa fa-edit"></i>
          </button>
          <button @click="onDeleteTask(task.id)" class="capitalize btn btn-sm btn-error">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useTaskStore } from "../stores/task";
export default {
  setup() {
    const taskStore = useTaskStore();

    const onNewTask = () => {
      taskStore.setCurrentTask(null);
      window.task_form_modal.showModal();
    };

    const onDeleteTask = (id) => {
      taskStore.startDeleteTask(id);
    };

    const onEditTask = (task) => {
      taskStore.setCurrentTask(task);
      window.task_form_modal.showModal();
    };

    const onToggleComplete = (task) => {
      taskStore.startUpdateTask({ ...task, completed: !task.completed });
    };

    return {
      taskStore,
      // methods
      onNewTask,
      onEditTask,
      onDeleteTask,
      onToggleComplete,
    };
  },
};
</script>

<style></style>
