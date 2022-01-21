import {createAction, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {ActionTypes} from './actionsTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<RegisterRequestInterface>()
);
