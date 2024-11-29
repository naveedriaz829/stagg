import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HorizontalScrollDirective } from 'src/app/shared/directives/horizontal-scroll.directive';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
    HorizontalScrollDirective,
    FadeInDirective
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
