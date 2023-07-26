<template>
  <div>
    <div class="flex gap-2 items-center py-2 border-b border-b-gray-700 px-8">
      <RouterLink to="/sales" class="btn">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </RouterLink>
      <h1>Nueva venta</h1>
    </div>
    <div class="flex min-h-[calc(100vh-160px)]">
      <!-- Productos -->
      <div class="w-2/3 px-8 py-4 border-r border-r-gray-700">
        <ProductAutocomplete
          @selectResult="onSelectResult"
          placeholder="Ingresar nombre"
        />
        <table class="table my-4">
          <thead>
            <tr>
              <th class="w-72">Producto</th>
              <th>Cantidad</th>
              <th class="text-right">Precio U.</th>
              <!-- <th>Impuesto</th> -->
              <th class="text-right">Subtotal</th>
              <th class="text-right">Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itemStore.selectedItems" :key="item">
              <td>
                {{ item.description }}
                <span class="block text-gray-500">
                  {{ item.code }}
                </span>
              </td>
              <td>
                <input type="number" min="0" class="input w-20" v-model="item.cantidad" />
              </td>
              <td class="text-right">
                <input
                  v-model="item.unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="input input-sm w-20 text-right"
                />
              </td>
              <td class="text-right">
                <input
                  v-model="item.subtotal"
                  type="number"
                  min="0"
                  step="0.01"
                  class="input input-sm w-20 text-right input-disabled"
                  readonly
                />
              </td>
              <td class="text-right">
                <input
                  v-model="item.total"
                  type="number"
                  min="0"
                  step="0.01"
                  class="input input-sm w-20 text-right input-disabled"
                  readonly
                />
              </td>
              <td>
                <i
                  @click="onQuitItem(item.code)"
                  class="fa fa-trash text-error cursor-pointer"
                  aria-hidden="true"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex flex-col items-end w-full gap-3 mb-4">
          <div class="flex gap-4">
            <div class="min-w-[100px] text-right">Subtotal</div>
            <div class="min-w-[40px]">$</div>
            <div class="min-w-[60px] text-right">{{ itemStore.subtotal.toFixed(2) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="min-w-[100px] text-right">IGV</div>
            <div class="min-w-[40px]">$</div>
            <div class="min-w-[60px] text-right">
              {{ itemStore.taxtTotal.toFixed(2) }}
            </div>
          </div>
          <div class="flex gap-4">
            <div class="min-w-[100px] text-right">Descuentos(-)</div>
            <div class="min-w-[40px]">$</div>
            <div class="min-w-[60px] text-right">0.00</div>
          </div>
          <div class="flex gap-4">
            <div class="min-w-[100px] text-right">Total</div>
            <div class="min-w-[40px]">$</div>
            <div class="min-w-[60px] text-right">{{ itemStore.total.toFixed(2) }}</div>
          </div>
        </div>

        <div class="flex justify-end gap-4 mb-4">
          <button class="btn capitalize">Cancelar</button>
          <button class="btn btn-success capitalize">Guardar</button>
        </div>

        <div class="join flex">
          <textarea
            class="textarea textarea-bordered join-item flex-1"
            placeholder="Observaciones (Visible en la impresión del comprobante)."
          ></textarea>
          <textarea
            class="textarea textarea-bordered join-item flex-1"
            placeholder="Nota(No visible en la impresión del comprobante)"
          ></textarea>
        </div>
      </div>

      <!-- Pago -->
      <div class="w-1/3 px-8 py-4 space-y-4">
        <div class="flex gap-2">
          <button class="btn flex-1">Boleta</button>
          <button class="btn flex-1">Factura</button>
        </div>
        <div class="flex justify-between">
          <div>Total</div>
          <div>{{ itemStore.total.toFixed(2) }}</div>
        </div>
        <div class="w-full">
          <div class="join flex">
            <button class="btn btn-sm join-item">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <select class="select select-sm select-bordered join-item">
              <option selected>Yape</option>
              <option>Efectivo</option>
              <option>Credito</option>
              <option>Debito</option>
            </select>
            <input
              type="date"
              class="input input-sm input-bordered join-item flex-1 min-w-[140px]"
            />
            <input
              type="text"
              class="input input-sm input-bordered join-item flex-1 min-w-[160px]"
              value="0"
            />
            <button class="btn btn-sm join-item">
              <i class="fa fa-comment" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="flex justify-between">
          <button href="" class="hover:underline text-sm">Agregar pago</button>
          <div>Deuda $<span>0.00</span></div>
        </div>
        <div class="join flex">
          <input class="input input-bordered join-item flex-1" placeholder="Cliente" />
          <button class="btn join-item">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div class="flex gap-2 items-center justify-end">
          <i class="fa fa-user" aria-hidden="true"></i>
          <button class="hover:underline text-sm">Nuevo cliente</button>
        </div>
        <div class="join flex">
          <select class="select select-bordered join-item flex-1">
            <option selected>Dólares americano</option>
            <option>Soles</option>
          </select>
          <input type="date" class="input input-bordered join-item flex-1" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Orden de compra</span>
          </label>
          <input type="text" class="input input-bordered w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ProductAutocomplete from "../components/ProductAutocomplete.vue";
import { useItemsStore } from "../stores/items";
const itemStore = useItemsStore();

function onSelectResult(result) {
  itemStore.addItem(result);
}

function onQuitItem(code) {
  itemStore.quitItem(code);
}
</script>
