import { computed, onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
  const isLoading = ref(false)
  const selectedItems = ref([
    {
      code: 'P123',
      description: 'Camara Tubo 1080P 2.8MM MARCA HIKVISION',
      stock: 20,
      cantidad: 1,
      unitPrice: 10.52,
      subtotal: 0,
      total: 0
    },
    {
      code: 'P456',
      description: 'Sensor de movimiento',
      stock: 20,
      cantidad: 1,
      unitPrice: 20.48,
      subtotal: 0,
      total: 0
    },
    {
      code: 'PX12',
      description: 'Sensor de temperatura',
      stock: 30,
      cantidad: 1,
      unitPrice: 30.2,
      subtotal: 0,
      total: 0
    }
  ])

  const subtotal = ref(0)
  const taxtTotal = computed(() => subtotal.value * 0.18)
  const total = computed(() => subtotal.value + taxtTotal.value)

  const currentItem = ref(null)

  onMounted(() => {
    updateTotales()
  })

  watch(
    () => selectedItems.value,
    () => {
      updateTotales()
    },
    { deep: true } // deep: escucha cambios en objetos anidados
  )

  function updateTotales() {
    selectedItems.value.forEach((item) => {
      item.subtotal = item.cantidad * item.unitPrice
      item.total = item.cantidad * item.unitPrice
    })

    subtotal.value = selectedItems.value.reduce((acc, item) => acc + item.subtotal, 0)
  }

  function setCurrentItem(item) {
    currentItem.value = item
  }

  function addItem(item) {
    selectedItems.value.push({
      code: item.code,
      description: item.description,
      stock: item.stock,
      cantidad: 1,
      unitPrice: item.unitPrice,
      subtotal: item.unitPrice,
      total: item.unitPrice
    })
  }

  function updateItem(item) {
    const index = selectedItems.value.findIndex((t) => t.code === item.id)
    if (index === -1) return
    selectedItems.value[index] = { ...item }
  }

  function quitItem(code) {
    selectedItems.value = selectedItems.value.filter((item) => item.code !== code)
  }

  return {
    // items,
    selectedItems,
    subtotal,
    taxtTotal,
    total,
    isLoading,
    currentItem,
    // methods
    setCurrentItem,
    addItem,
    updateItem,
    quitItem
  }
})
