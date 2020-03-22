import Board from './Board';
import {authRoles} from 'app/auth';

export const BoardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth  : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/board',
            component: Board
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
