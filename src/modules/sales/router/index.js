import SalesLayout from '../layouts/SalesLayout.vue'
const router = {
  // path: '/',
  name: 'sales',
  component: SalesLayout,
  children: [
    {
      path: '',
      name: 'list',
      component: () => import('../views/SalesListView.vue')
    },
    {
      path: 'add-edit',
      name: 'add-edit',
      component: () => import('../views/SalesAddEditView.vue')
    }
  ]
}

export default router
