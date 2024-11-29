import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

type Publication ={ file: string,image: string, name: string, desc: string}

@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.scss']
})
export class PartnershipComponent {

  public readonly cards: Publication[] = [
    {
      image: 'assets/images/publication1.jpg',
      name: 'THE EVOLUTION OF AIRPORTS - A Flight Path to 2050',
      desc: 'Report outlining trends for travel facing airports and ways airport leaders and governments can pave the way to tackle travel/mobility and sustainability.',
      file: 'assets/reports/1 THE EVOLUTION OF AIRPORTS - A Flight Path to 2050.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & WATER FOOTPRINT THROUGH FOOD CHOICES 2023',
      desc: 'Toolkit for SME hotels, caterers and restaurants to reduce food emissions & water footprint.',
      image: 'assets/images/publication2.jpg',
      file: 'assets/reports/2 THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & WATER FOOTPRINT THROUGH FOOD CHOICES 2023.pdf'
    },
    {
      name: 'THE SOCIAL IMPACT OF GLOBAL TOURISM 2023',
      desc: 'Top-down Social Impact report assessing the T&T sector across 185 countries focusing on women, youth and high-wage jobs through-out economies.',
      image: 'assets/images/publication3.jpg',
      file: 'assets/reports/3 THE SOCIAL IMPACT OF GLOBAL TOURISM 2023.pdf'
    },
    {
      name: 'THE ENVIRONMENTAL IMPACT OF GLOBAL TOURISM 2023',
      desc: 'Top-down Environmental Impact report assessing the T&T sector across 185 countries focusing on GHGs, energy, water, air pollutants, raw material extraction.',
      image: 'assets/images/publication4.jpg',
      file: 'assets/reports/4 THE ENVIRONMENTAL IMPACT OF GLOBAL TOURISM 2023.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR SUSTAINABILITY IN TOURISM - THE VALUE OF SOLAR POWER GENERATION 2023',
      desc: 'Toolkits for hotels for sustainability - focus on off-grid solar energy benefits.',
      image: 'assets/images/publication5.jpg',
      file: 'assets/reports/5 THE BUSINESS CASE FOR SUSTAINABILITY IN TOURISM - THE VALUE OF SOLAR POWER GENERATION 2023.pdf'
    },
    {
      name: 'TPCC FOUNDATION FRAMEWORK 2022',
      desc: 'Framework Assessment for Stocktake covering 60 University researchers on science-based assessment of progress and gaps in tourism climate actions.',
      image: 'assets/images/publication6.jpg',
      file: 'assets/reports/6 TPCC FOUNDATION FRAMEWORK 2022.pdf'
    },
    {
      name: 'THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & COST THROUGH SOLAR THERMAL HEATERS 2023',
      desc: 'Toolkit for SME hotels across various geographies focusing on economic and social benefits of solar thermal heaters.',
      image: 'assets/images/publication7.jpg',
      file: 'assets/reports/7 THE BUSINESS CASE FOR CLIMATE ACTION IN TOURISM - REDUCING GHG EMISSIONS & COST THROUGH SOLAR THERMAL HEATERS 2023.pdf'
    },
    {
      name: 'BEST PRACTICES FOR LOCAL SOURCING IN DESTINATIONS',
      desc: 'Toolkit for hospitality SMEs on business case for sustainability, focus on off-grid.',
      image: 'assets/images/publication8.jpg',
      file: 'assets/reports/8 BEST PRACTICES FOR LOCAL SOURCING IN DESTINATIONS.pdf'
    },
    {
      name: 'BETTER TRAVEL & TOURISM, BETTER WORLD 2022',
      desc: 'Strategic sustainability roadmap on sustainable tourism. Joint analysis and report assisting to create the STGC strategy and intervention areas.',
      image: 'assets/images/publication9.jpg',
      file: 'assets/reports/9 BETTER TRAVEL & TOURISM, BETTER WORLD 2022.pdf'
    }
  ]
  public selectedPublication?: Publication;
  public logosNumbers = [1,'02',2,3,5,6,7,8,9,10,11,13,14,15,16,'017',17,12,20,22,24,25,26,27,28,29,30,31,32];
  public logosNumbersMobile = [1,'02',2,12,'017',6,7,8,9,28,11,13,14,15,16,5,17,3,20,22,24,25,26,27,10,29,30,31,32];
  public isScrolledToRightEnd: boolean = false;
  public isScrolledToLeftEnd: boolean = true;
  public isScrolledToRightEnd2: boolean = false;
  public isScrolledToLeftEnd2: boolean = true;
  public downloadFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  })
  public isDownloadModalOpened: boolean = false;
  public isScrolledToConfirmationButton: boolean = false;
  public showFloatingIcon: boolean = false;
  public isScrolledToConfirmationButton1: boolean = false;
  public isScrolledToConfirmationButtonGroup: boolean = false;
  @ViewChild('confirmationButtonRef') confirmationButtonRef!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('scrollHorizontallyRef') scrollHorizontallyRef!: ElementRef;
  @ViewChild('containerRef') containerRef!: ElementRef;
  @ViewChild('downloadFormGroupRef') downloadFormGroupRef!: ElementRef;
  @ViewChild('confirmationButtonRef1') confirmationButtonRef1!: ElementRef;
  @ViewChild('contactUsForm') contactUsForm!: ElementRef;
  @ViewChild('sponsorsContainer') sponsorsContainer!: ElementRef;
  private _destroy$: Subject<void> = new Subject<void>();
  public contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  public viewLogos: boolean = false;
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;
  public isSaving: boolean = false;
  public targetOffsetTop!: number;
  constructor(private _AppService: AppService, private _ActivatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this._AppService.onNavColorChange$.next({color: 'white'});
    this._AppService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: ()=> this._handleScroll()
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.targetOffsetTop = this.contactUsForm.nativeElement.getBoundingClientRect().top + scrollY - innerHeight;
      if(this._ActivatedRoute.snapshot.fragment === 'contact-us')
        this.navigateToFormSection();
    },1000);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public submitContactForm(): void{
    if(this.contactForm.invalid || this.isSaving){
      this.contactForm.markAllAsTouched();
      this.contactFormRef.nativeElement.reportValidity();
      return;
    }
    this.isSaving = true;
    this._AppService.contactUs(this.contactForm.value).subscribe({
      next: ()=>{
        this.isSaving = false;
        this._AppService.toaster$.next({message:`Thank you ${this.getFromControlContactForm('name').value} for showing your interest, Our team will be in contact with you`, success: true})
        this.contactForm.reset();
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error)
      }
    })
  }

  public get isMediumScreen(){
    return window.innerWidth > 992 && innerWidth < 1440;
  }

  public get isSmallScreenView(): boolean{
    return window.innerWidth <= 992;
  }

  private _handleScroll(): void {
    if(scrollY > 0)
      this._AppService.onNavColorChange$.next({color:'black'});
    else{
      this._AppService.onNavColorChange$.next({color: 'white'});
    }
    this.showFloatingIcon = scrollY > 450 && scrollY < this.targetOffsetTop;
      if(this.confirmationButtonRef.nativeElement.getBoundingClientRect().top - innerHeight < 0)
      this.isScrolledToConfirmationButton = true;
    this.isScrolledToConfirmationButtonGroup = this.sponsorsContainer.nativeElement.getBoundingClientRect().top < 0 && this.sponsorsContainer.nativeElement.querySelector('.logos-container').getBoundingClientRect().width- innerWidth + this.sponsorsContainer.nativeElement.getBoundingClientRect().top > 0 ;
  }

  public toggleDownloadModal(card?: Publication){
    this.selectedPublication = card;
    this.isDownloadModalOpened = !this.isDownloadModalOpened;
  }

  public getFromControl(controlName: string): FormControl{
    return this.downloadFormGroup.get(controlName) as FormControl;
  }

  public getFromControlContactForm(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl;
  }

  public submit(): void{
    if(this.downloadFormGroup.invalid || this.isSaving){
      this.downloadFormGroup.markAllAsTouched();
      this.downloadFormGroupRef.nativeElement.reportValidity();
      return;
    }
    this.isSaving = true;
    this._AppService.downloadPublicationData(this.downloadFormGroup.value).subscribe({
      next: ()=>{
        this.isSaving = false;
        this.isDownloadModalOpened =false;
        this._AppService.toaster$.next({message:`Thank you for downloading, happy reading!`, success: true});
        this._saveFile(this.selectedPublication?.file)
        this.downloadFormGroup.reset();
      },
      error: (error)=>{
        this.isSaving = false;
        console.log(error)
      }
    })
  }

  private _saveFile(fileURL?: string): void {
    if (!fileURL) return;
    const link = document.createElement("a");
    link.download = fileURL.split('/').pop() || '';
    link.href =fileURL;
    link.click();
  }

  public navigateToFormSection(){
    const yPosition = this.contactUsForm.nativeElement.getBoundingClientRect().top + scrollY;
    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    });
  }

  scrollLeft(element: HTMLElement, type: 0 | 1){
    if(type===0)
      this.isScrolledToRightEnd = false
    if(type===1)
      this.isScrolledToRightEnd2 = false
    let left =element.scrollLeft - 450
    element.scrollTo({left: left, behavior: 'smooth'})
    if(left < 0) left = 0;
    setTimeout(() => {
      if(type===0)
        this.isScrolledToLeftEnd = element.scrollLeft === 0;
    if(type===1)
      this.isScrolledToLeftEnd2 = element.scrollLeft === 0
    }, 500)
  }

  scrollRight(element: HTMLElement, type: 0 | 1){
    if(type===0)
      this.isScrolledToLeftEnd = false
    if(type===1)
      this.isScrolledToLeftEnd2 = false
    let left =element.scrollLeft + 450;
    // if(left > element.scrollWidth - innerWidth) left = element.scrollWidth - innerWidth;
    element.scrollTo({left: left, behavior: 'smooth'})
    setTimeout(() => {
      if(type===0)
        this.isScrolledToRightEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth -30;
    if(type===1)
      this.isScrolledToRightEnd2 = element.scrollLeft + element.clientWidth >= element.scrollWidth -30;
  }, 500);
  }
  public getImageSrc(url: string): string | undefined {
    const cachedImage = this._AppService.getImage(url);
    return cachedImage?.src || url;
  }

  navigateToTop(){
    this._AppService.navigateToTop();
  }
  displayLogos(){
    this.viewLogos = true;
  }

  public onMouseEnterCard(element: HTMLElement): void{
    element.classList.add('fade-out-card');
  }

  public onCardTransitioned(element: HTMLElement): void{
    if (element.classList.contains('fade-out-card')) {
      element.classList.add('!hidden');
    }
  }

  public onMouseLeaveCard(element: HTMLElement): void{
    element.classList.remove('fade-out-card', '!hidden');
  }
}
