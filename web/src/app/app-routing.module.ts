import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'hyderabad';
import { LoginComponent } from './login';

// import { AuthGuard } from './auth/auth.guard';
// import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  // {
  //   path: 'admin',
  //   loadChildren: './admin/admin.module#AdminModule',
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'person',
    loadChildren: './person/person.module#PersonModule',
    data: { preload: true }
  },
  { path: '', redirectTo: '/person', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload',
      enableTracing: false // <-- debugging purposes only
      // preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
