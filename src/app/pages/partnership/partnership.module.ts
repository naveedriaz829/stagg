import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnershipComponent } from './partnership.component';
import { RouterModule } from '@angular/router';
import { HorizontalScrollDirective } from 'src/app/shared/directives/horizontal-scroll.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { FadeInDirective } from 'src/app/shared/directives/fade-in.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PartnershipComponent }
    ]),
    HorizontalScrollDirective,
    ReactiveFormsModule,
    FadeInDirective,
    ModalComponent
  ],
  declarations: [PartnershipComponent]
})
export class PartnershipModule { }
