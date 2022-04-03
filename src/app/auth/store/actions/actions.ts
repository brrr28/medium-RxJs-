import {createAction, props} from '@ngrx/store';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {ActionLoginTypes, ActionTypes} from './actionsTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: RegisterRequestInterface}>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);

export const loginAction = createAction(
  ActionLoginTypes.LOGIN,
  props<{request: LoginRequestInterface}>()
);

export const loginSuccessAction = createAction(
  ActionLoginTypes.LOGIN_SUCCESS,
  props<{currentUser: LoginRequestInterface}>()
);

export const loginFailureAction = createAction(
  ActionLoginTypes.LOGIN_FAILURE,
  props<{error: BackendErrorsInterface}>()
);
