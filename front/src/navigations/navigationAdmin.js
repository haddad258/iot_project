import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilSettings,
  cilAudio,
  cilBlurLinear,
  cilLineStyle
} from '@coreui/icons'
import { CNavGroup, CNavItem, } from '@coreui/react'
import i18n from 'src/i18n'
const _navAdmin = [
  {
    component: CNavItem,
    name: i18n.t('dashboardMenuTitle'),
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
 


  
  {
    component: CNavGroup,
    name: i18n.t('generalSettingsMenuTitle'),
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('privilegesMenuTitle'),
        to: '/supper/settings/privilege/users/list',
      },
      {
        component: CNavItem,
        name: i18n.t('usersMenuTitle'),
        to: '/supper/settings/admins/users/list',
      },

    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('settingsMenuTitle'),
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('sensorSettings'),
       to:'/supper/settings/sensors/list'

      },
      {
        component: CNavItem,
        name: i18n.t('GatewaySettings'),
       to:'/supper/settings/gateways/list'

      },
      {
        component: CNavItem,
        name: i18n.t('OrderSettings'),
       to:'/supper/settings/orders/index'

      },
      
    ],
  },
  {
    component: CNavGroup,
    name: i18n.t('composeandasign'),
    icon: <CIcon icon={cilBlurLinear} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('composition'),
        to: '/supper/settings/composition/index',
      },
      {
        component: CNavItem,
        name: i18n.t('assign'),
        to: '/supper/settings/assign/index',
      },

    ],
  },
  
  {
    component: CNavGroup,
    name: i18n.t('dataVisualisation'),
    icon: <CIcon icon={cilLineStyle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: i18n.t('viewSensors'),
        to: '/supper/data/visual/index',
      },
      {
        component: CNavItem,
        name: i18n.t('assign'),
        to: '/supper/settings/assign/index',
      },

    ],
    
  },
  {
    component: CNavItem,
    name: i18n.t('TestAPI'),
    to: '/test/api/test',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "danger",
      text: 'Test',
    },
  },
  
]

export default _navAdmin
