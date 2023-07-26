<template>
  <div class="container m-auto my-4 w-[90%]">
    <TaskTable />
  </div>
  <TaskForm />
</template>

<script>
import { onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskTable from "../components/TaskTable.vue";
import { useTaskStore } from "../stores/task";

export default {
  components: { TaskForm, TaskTable },

  setup() {
    const store = useTaskStore();

    onMounted(() => {
      console.log("cargando tareas...");
      store.startLoadTasks();
    });
    // return {};
  },
};
</script>

<style></style>
