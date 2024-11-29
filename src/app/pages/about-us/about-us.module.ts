import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule } from '@angular/router';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AboutUsComponent }
    ]),
    FadeInDirective,
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
