import Dashboard from "../dashboard";
// import {authRoles} from 'app/auth';

export const BoardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  // auth  : authRoles.onlyGuest,
  routes: [
    {
      path: "/dashboard",
      component: Dashboard
    }
  ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
