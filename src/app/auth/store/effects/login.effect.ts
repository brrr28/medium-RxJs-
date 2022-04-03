import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';

import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/actions';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from 'src/app/shared/services/persistence.service';
import {Router} from '@angular/router';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persService: PersistenceService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: any) => {
            this.persService.set('token', currentUser.token);
            return loginSuccessAction({currentUser});
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(loginFailureAction({error: errorResponce.error.errors}));
          })
        );
      })
    )
  );

  loginAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
