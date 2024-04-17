import React from 'react'
;

const UsersAdmin = React.lazy(() => import('../viewSuperAdmin/userAdmin'))
const Privileges = React.lazy(() => import('src/viewSuperAdmin/privileges'))
const Sensors   = React.lazy(() => import('src/viewSuperAdmin/sensors'))
const Gateways   = React.lazy(() => import('src/viewSuperAdmin/gateways'))
const Orders   = React.lazy(() => import('src/viewSuperAdmin/orders'))
const CompositionGW   = React.lazy(() => import('src/viewSuperAdmin/composition'))
const OrdersAssign   = React.lazy(() => import('src/viewSuperAdmin/assign'))
const DataVisualisation   = React.lazy(() => import('src/viewSuperAdmin/datavisualisation'))
const Dashboard   = React.lazy(() => import('src/Templates/dashboard/Dashboard'))


const Page404 = React.lazy(() => import('src/Templates/pages/page404/Page404'));

const routeSupper = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/supper/settings/admins/users/list', name: 'UserList', element: UsersAdmin },
  { path: '/supper/settings/privilege/users/list', name: 'Privileges', element: Privileges },
  { path: '/supper/settings/sensors/list', name: 'Sensors', element: Sensors },
  { path: '/supper/settings/gateways/list', name: 'gateways', element: Gateways },
  { path: '/supper/settings/orders/index', name: 'Order', element: Orders },
  { path: '/supper/settings/composition/index', name: 'Order', element: CompositionGW },
  { path: '/supper/settings/assign/index', name: 'Order', element: OrdersAssign },
  { path: '/supper/data/visual/index', name: 'Order', element: DataVisualisation },
  { path: '/supper/dashbord', name: 'Order', element: Dashboard },


  
  { path: '/*', name: 'Privileges', element: Page404 },


]

export default routeSupper
