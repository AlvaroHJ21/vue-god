<template>
  <!-- <button class="btn" onclick="task_form_modal.showModal()">open modal</button> -->
  <dialog id="task_form_modal" class="modal">
    <form method="dialog" class="modal-box">
      <div class="mb-3 form-control">
        <h3 class="text-lg font-bold">Nueva Tarea</h3>
        <label class="label">
          <span class="label-text">Nombre</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          class="w-full input input-bordered"
          placeholder="Nueva nota"
        />
      </div>
      <div class="mb-3 form-control">
        <label class="label">
          <span class="label-text">Descripción</span>
        </label>
        <textarea
          v-model="form.description"
          class="w-full textarea input-bordered"
          placeholder="¿Qué piensas?"
          autocomplete="off"
        ></textarea>
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Hecho</span>
          <input
            type="checkbox"
            v-model="form.completed"
            class="checkbox checkbox-success"
          />
        </label>
      </div>

      <div class="modal-action">
        <button type="button" @click="onSave" class="btn btn-success">Guardar</button>
        <button @click="cleanForm" class="btn">Cancelar</button>
      </div>
    </form>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
import { reactive, watch } from "vue";
import { useTaskStore } from "../stores/task";
export default {
  setup() {
    const taskStore = useTaskStore();

    const form = reactive({
      name: "",
      description: "",
      completed: false,
    });

    watch(taskStore, (state) => {
      if (state.currentTask) {
        form.name = state.currentTask.name;
        form.description = state.currentTask.description;
        form.completed = state.currentTask.completed;
      } else {
        cleanForm();
      }
    });

    const onSave = () => {
      if (taskStore.currentTask) {
        console.log("actualizando...");
        // taskStore.updateTask(taskStore.currentTask.id, { ...form });
        taskStore.startUpdateTask({ id: taskStore.currentTask.id, ...form });
      } else {
        console.log("creando...");
        // taskStore.addTask({
        //   id: new Date().getTime(),
        //   ...form,
        // });
        taskStore.startCreateTask({ ...form });
      }
      cleanForm();
      window.task_form_modal.close();
    };

    const cleanForm = () => {
      form.title = "";
      form.description = "";
      form.completed = false;

      taskStore.setCurrentTask(null);
    };

    return {
      taskStore,
      form,
      //methods
      onSave,
      cleanForm,
    };
  },
};
</script>

<style></style>
