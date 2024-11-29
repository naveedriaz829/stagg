import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  public isSaving: boolean = false;
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;

  constructor(private _AppService: AppService){}

  ngOnInit(): void {
    this._AppService.onNavColorChange$.next({color: 'white', class: 'bg-green'});
  }

  public getFromControl(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl
  }

  public submit(): void{
    if(this.contactForm.invalid || this.isSaving){
      this.contactForm.markAllAsTouched();
      this.contactFormRef.nativeElement.reportValidity();
      return;
    }
    this.isSaving = true;
    this._AppService.contactUs(this.contactForm.value).subscribe({
      next: ()=>{
        this.isSaving = false;
        this._AppService.toaster$.next({message:`Thank you ${this.getFromControl('name').value} for showing your interest, Our team will be in contact with you`, success: true})
        this.contactForm.reset();
      },
      error: (error)=>{
        console.log(error);
        this.isSaving = false;
      }
    })
  }

  public isScrolledTo(element: HTMLElement){
    return element?.getBoundingClientRect().top - innerHeight < 0;
  }
  navigateToTop(){
    this._AppService.navigateToTop();
  }
}
