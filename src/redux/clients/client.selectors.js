import { createSelector } from 'reselect';

const selectClient = state => state.client;

export const selectToggleClick = createSelector(
  [selectClient],
  client => client.toggleClick
);

export const selectClients = createSelector(
  [selectClient],
  client => client.clients
);
export const selectLoading = createSelector(
  [selectClient],
  client => client.isFetching
);
