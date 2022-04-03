import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {map, catchError, switchMap, tap} from 'rxjs/operators';

import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/actions';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistenceService} from 'src/app/shared/services/persistence.service';
import {Router} from '@angular/router';

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persService: PersistenceService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: any) => {
            this.persService.set('token', currentUser.token);
            return registerSuccessAction({currentUser});
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              registerFailureAction({errors: errorResponce.error.errors})
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
