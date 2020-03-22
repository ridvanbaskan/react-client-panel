import { createSelector } from 'reselect';

const selectCheckBox = state => state.settings;

export const selectDisableBalanceOnAdd = createSelector(
  [selectCheckBox],
  settings => settings.disableBalanceOnAdd
);
export const selectDisableBalanceOnEdit = createSelector(
  [selectCheckBox],
  settings => settings.disableBalanceOnEdit
);
export const selectAllowRegistration = createSelector(
  [selectCheckBox],
  settings => settings.allowRegistration
);
