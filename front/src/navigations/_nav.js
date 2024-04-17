import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilSpeedometer,
  cilSettings,
  cilFile,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import _navComponenet from './_navComponenet'
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admins',
        to: '/settings/admins',
      },
      {
        component: CNavItem,
        name: 'Auth & permissions',
        to: '/settings/admins/permissions',
      },
      {
        component: CNavItem,
        name: 'Profiles',
        to: '/settings/profiles',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/settings/categories/plan/pack',
      },
      {
        component: CNavItem,
        name: 'Salesoffert',
        to: '/settings/salesoffert/plan/pack',
      },
      
      {
        component: CNavItem,
        name: 'Plan Pack',
        to: '/settings/plan/pack',
      },


    ],
  },
  {
    component: CNavTitle,
    name: 'Wokflow',
  },
  {
    component: CNavGroup,
    name: 'Services',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customers',
        to: '/workflow/settings/customers',
      },
      {
        component: CNavItem,
        name: 'Subscriptions',
        to: '/services/subscriptions/management',
      },
      {
        component: CNavItem,
        name: 'Profiles Used',
        to: '/dashboard',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Orders',
  },
  {
    component: CNavGroup,
    name: 'Orders',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'new Orders/SUBSCRIPTION',
        to: '/workflow/orders/management',
      },
      {
        component: CNavItem,
        name: 'Old Orders/SUBSCRIPTION',
        to: '/workflow/orders/management',
      },


    ],
  },


  ..._navComponenet

]

export default _nav
