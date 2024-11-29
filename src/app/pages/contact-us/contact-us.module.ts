import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ContactUsComponent }
    ]),
    FadeInDirective,
    ReactiveFormsModule,
    ModalComponent
  ],
  declarations: [ContactUsComponent]
})
export class ContactUsModule { }
