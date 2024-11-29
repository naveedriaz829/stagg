import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    data: { animation: 'home' }
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about-us/about-us.module').then((m) => m.AboutUsModule),
    data: { animation: 'about' }

  },
  {
    path: 'partnerships',
    loadChildren: () =>
      import('./pages/partnership/partnership.module').then((m) => m.PartnershipModule),
    data: { animation: 'partnerships' }

  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./pages/contact-us/contact-us.module').then((m) => m.ContactUsModule),
    data: { animation: 'contact' }
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
