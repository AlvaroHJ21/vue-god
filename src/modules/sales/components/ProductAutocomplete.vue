<template>
  <div class="relative">
    <div class="relative">
      <input
        type="text"
        v-model="inputValue"
        class="input input-bordered w-full"
        :placeholder="placeholder"
        ref="inputElement"
        @focus="onFocus"
        @blur="onBlur"
        @mouseover="onMouseover"
        @mouseout="onMouseout"
      />
      <i
        @click="onClear"
        class="fa fa-close absolute right-4 top-4 cursor-pointer"
        :class="showClearIcon ? '' : 'opacity-0'"
        aria-hidden="true"
      ></i>
    </div>
    <div v-if="showResults" class="min-h-16 absolute z-20 mt-2">
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
        <div v-for="item in results" :key="item.code" @click="onClickItem(item)">
          <li>
            <div @mouseover="onMouseoverResult" @mouseout="onMouseoutResult">
              <span>{{ item.code }}</span>
              <span class="min-w-[200px]">{{ item.description }}</span>
              <span>{{ item.stock }}</span>
              <span>PEN {{ item.unitPrice }}</span>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const inputElement = ref(null);
const hoveringResult = ref(false);
const inputValue = ref("");
const showResults = ref(false);
const showClearIcon = ref(false);

defineProps({
  placeholder: String,
});

const results = ref([
  {
    code: "P1231",
    description: "Camara",
    stock: 20,
    unitPrice: 20.0,
  },
  {
    code: "P4562",
    description: "Sensor de movimiento",
    stock: 20,
    unitPrice: 20.0,
  },
  {
    code: "PX123",
    description: "Sensor de temperatura",
    stock: 20,
    unitPrice: 20.0,
  },
]);

const emits = defineEmits(["selectResult"]);

watch(inputValue, (val) => {
  if (val == "") {
    showResults.value = false;
    return;
  }
  showClearIcon.value = true;
  showResults.value = true;
});

function onFocus() {
  if (inputValue.value.length > 0) {
    showResults.value = true;
    showClearIcon.value = true;
  }
}

function onBlur() {
  if (!hoveringResult.value) {
    showResults.value = false;
  }
  showClearIcon.value = false;
}

function onMouseover() {
  if (inputValue.value.length > 0) {
    showClearIcon.value = true;
  }
}

function onMouseout() {
  const activeElement = document.activeElement;
  if (activeElement != inputElement.value) {
    showClearIcon.value = false;
  }
}

function onClear() {
  inputValue.value = "";
  showClearIcon.value = false;
  showResults.value = false;
}

function onMouseoverResult() {
  hoveringResult.value = true;
}

function onMouseoutResult() {
  hoveringResult.value = false;
}

function onClickItem(item) {
  showResults.value = false;
  emits("selectResult", item);
}
</script>
