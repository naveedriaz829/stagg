import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class ModalComponent {

  public isModalClosed: boolean = false;
  @Output('closeModal') onCloseModal: EventEmitter<void> = new EventEmitter<void>();

  public closeModal(): void{
    this.isModalClosed= true;
    setTimeout(() => {
      this.onCloseModal.emit();
    }, 1000);
  }
}
