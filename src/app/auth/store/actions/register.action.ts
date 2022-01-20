import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionsTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{username: string; email: string; password: string}>()
);
