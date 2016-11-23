'use strict';

export const push = (route, key) => ({ type: 'PUSH_ROUTE', route, key });
export const pop = key => ({ type: 'POP_ROUTE', key });
export const reset = (route, key) => ({ type: 'RESET_ROUTE', route, key });
