import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {RegisterComponent} from './components/register/register.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';
import {AuthService} from './services/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {BackendErrorsComponent} from '../shared/backend-errors/backend-errors.component';
import {PersistenceService} from '../shared/services/persistence.service';
import {RegisterEffect} from './store/effects/register.effect';
import {LoginComponent} from './components/login/login.component';
import {LoginEffect} from './store/effects/login.effect';

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, BackendErrorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
  ],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
