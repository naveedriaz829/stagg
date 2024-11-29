import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  public bgImages: {src: string, isSelected: boolean}[] = [
    {
      // src: 'assets/images/bg-1.jpg',
      src: 'assets/images/bg-main.png',

      isSelected: true
    },
    {
      // src: 'assets/images/bg-1.jpg',
      src: 'assets/images/bg-main.png',
      isSelected: false
    },
    {
      src: 'assets/images/image-1.jpg',
      // src: 'assets/images/bg-main-2.png',
      isSelected: false
    },
    {
      // src: 'assets/images/image-2.jpg',
      src: 'assets/images/bg-main-4.png',

      isSelected: false
    }
  ]

  public cards: {image: string, name: string, desc: string}[] = [
    {
      image: 'assets/images/group1.jpg',
      name:'MSMEs',
      desc:'Empowering Small Businesses for Sustainable Growth – Micro, Small, and Medium Enterprises are vital for innovation and local economic development in sustainable tourism'
    },
    {
      image: 'assets/images/group2.jpg',
      name:'Large Companies',
      desc:'Driving Corporate Responsibility in Tourism – Encouraging large corporations to lead by example through sustainable operations and supply chains.'
    },
    {
      image: 'assets/images/group3.jpg',
      name:'Destinations',
      desc:'Promoting Eco-friendly Tourism Hotspots – Destinations play a key role in implementing sustainable practices to minimize environmental impacts.'
    },
    {
      image: 'assets/images/group4.jpg',
      name:'Travelers & Youth',
      desc:'Engaging the Future of Tourism – Involving travelers, especially younger generations, in shaping eco-conscious behaviors and preferences.'
    },
    {
      image: 'assets/images/group5.jpg',
      name:'Mobility',
      desc:'Advancing Sustainable Transportation Solutions – Ensuring that transportation options reduce carbon footprints and enhance travel efficiency.'
    },
  ]

  public services: {image: string, name: string, desc: string}[] = [
    {
      image: 'assets/images/knowledge.png',
      name:'Knowledge',
      desc:'We are dedicated to empowering individuals and organizations through the sharing of valuable knowledge and best practices.'
    },
    {
      image: 'assets/images/progress.png',
      name:'Progress',
      desc:'"We are committed to advancing individuals and organizations by disseminating key insights and proven strategies."'
    },
    {
      image: 'assets/images/enablement.png',
      name:'Enablement',
      desc:'We are focused on enabling individuals and organizations by providing essential knowledge and effective practices.'
    },
  
  ]

  public readonly areasCards: {image: string, label: string, desc: { title:string, content: string, count: number }[]}[] = [
    {
      image: 'assets/images/area1.jpg',
      label: 'Climate',
      desc: [
        {
          count: 1,
          title: 'Circular Carbon Economy approaches',
          content: 'Supporting innovations in carbon capture and utilization, encouraging the development of renewable energy solutions, and advocating for policies that facilitate the reduction, reuse, recycling, and removal of carbon, driving sustainable travel and tourism growth while mitigating climate change.'
        }
      ]
    },
    {
      image: 'assets/images/area2.jpg',
      label: 'Nature',
      desc: [
        {
          count: 3,
          title: 'Resource efficiency',
          content: 'Promoting sustainable practices that minimize waste and optimize the use of energy, water, and materials by supporting innovative solutions that enhance operational efficiency, reduce environmental impact, and contribute to a more sustainable global economy.'
        },
        {
          count: 2,
          title: 'Ecosystem Conservation, Nature-Based, and Regenerative Solutions',
          content: 'Advancing nature-based and regenerative solutions globally by supporting initiatives that protect ecosystems, promote eco-friendly tourism practices, and enhance biodiversity, ensuring tourism contributes to environmental preservation and local community well-being.'
        },
      ]
    },
    {
      image: 'assets/images/area3.jpg',
      label: 'Communities',
      desc: [
        {
          count: 5,
          title: 'Preserving cultural heritage and boosting sustainable livelihoods',
          content: 'Promoting initiatives that protect traditional practices and local knowledge by supporting community-based projects that enhance cultural tourism, foster heritage and artisanal crafts, and integrate sustainable practices, ensuring that cultural assets contribute to economic development and community well-being.'
        },
        {
          count: 4,
          title: 'Enabling community-based innovation and digitalization',
          content: 'Empowering local communities to develop solutions that address their unique challenges by promoting digital tools and supporting collaborations and initiatives that drive sustainable growth technological advancement at the grassroots level worldwide.'
        },
      ]
    },
    {
      image: 'assets/images/area4.jpg',
      label: 'Transversal',
      desc: [
        {
          count: 8,
          title: 'Building Tourism Resilience',
          content: 'Developing strategies that enhance the ability of destinations to withstand the range of challenges faced. We do this by supporting adaptive management practices, encouraging diversification of tourism offerings, and fostering collaboration among stakeholders, ensuring that tourism sectors remain robust and sustainable for the future.'
        },
        {
          count: 7,
          title: 'Sustainable procurement and Consumer Awareness',
          content: 'Promoting initiatives that encourage ethical supply chains and raising awareness about the environmental and social impacts of purchasing decisions, empowering youth and travelers and the tourism industry to make informed choices for a sustainable future.'
        },
        {
          count: 6,
          title: 'Sustainable Destination Management and Governance',
          content: 'Promoting frameworks for responsible tourism and environmental stewardship that focus on and engage the needs of local communities, enhance stakeholder collaboration, and ensure sustainable resource management, allowing tourist destinations to thrive economically while preserving cultural and natural heritage.'
        },
      ]
    }
  ]
  public isExpanding: boolean = false;
  public displaySecondSection: boolean = false;
  public expandCards: boolean = false;
  public contactForm: FormGroup = new FormGroup({
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  private _destroy$: Subject<void> = new Subject<void>();
  public isScrolledToConfirmationButton: boolean = false;
  @ViewChild('stakeholderGroupsRef') stakeholderGroupsRef!: ElementRef;
  @ViewChild('contactFormRef') contactFormRef!: ElementRef;
  @ViewChild('headerContentOne') headerContentOne!: ElementRef;
  @ViewChild('headerContentTwo') headerContentTwo!: ElementRef;
  @ViewChild('confirmationButtonRef') confirmationButtonRef!: ElementRef;
  @ViewChildren('imagesRef') imagesRef!: QueryList<ElementRef>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('sponsorsContainer') sponsorsContainer!: ElementRef;
  public hideScrollButton: boolean = false;
  private _isLoadingPage = true;
  public isScrolledToConfirmationButtonGroup: boolean = false;
  public logosNumbers = [1,'02',2,3,5,6,7,8,9,10,11,13,14,15,16,'017',17,12,20,22,24,25,26,27,28,29,30,31,32];
  public logosNumbersMobile = [1,'02',2,12,'017',6,7,8,9,28,11,13,14,15,16,5,17,3,20,22,24,25,26,27,10,29,30,31,32];
  public isScrolledToRightEnd: boolean = false;
  public isScrolledToLeftEnd: boolean = true;
  public isScrolledToRightEnd2: boolean = false;
  public isScrolledToLeftEnd2: boolean = true;
  public displayLastImageSection: boolean = false;
  public viewLogos: boolean = false;

  constructor( private _AppService: AppService) {}

  public get currentSection(): number{
    return this._isLoadingPage ? 0 : Math.round(scrollY / innerHeight);
  }

  public get isSmallScreenView(): boolean{
    return innerWidth <= 992;
  }

  ngAfterViewInit(): void {
    this._isLoadingPage=false;
    this.videoPlayer.nativeElement.muted = true;
    this.videoPlayer.nativeElement.playbackRate = 2;
  }

  ngOnInit() {
    setTimeout(() => {
      this._AppService.onNavColorChange$.next({color: 'white'});
      this.hideScrollButton =false;
    }, 100);
    this.displaySecondSection =  this.currentSection >= 2 && this.currentSection <= 3;
    this.expandCards = window.innerWidth > 1920;
    this._AppService.onScrollChange$.pipe(
      tap(()=>{
        const section = scrollY / innerHeight;
        this.displayLastImageSection = section <= 3.3 && section >= 2.5;
        this.displaySecondSection =  this.currentSection >= 2 && section <= 3.3;
        if(scrollY > 4 * innerHeight)
          this._AppService.onNavColorChange$.next({color:'black'});
        else
          this._AppService.onNavColorChange$.next({color: 'white'});
        this.isScrolledToConfirmationButtonGroup = this.sponsorsContainer.nativeElement.getBoundingClientRect().top - innerHeight < 0 ;
        this.hideScrollButton = scrollY > 0;
        let percentage = (window.scrollY / (innerHeight * 3));
        if(percentage > 1) percentage = 1;
        // Handle scaling
        const minScale = 1.2;
        const maxScale = 1;
        const scale = maxScale - ((percentage) * (maxScale - minScale));
        this.imagesRef.forEach(imageRef=> imageRef.nativeElement.style.transform = `scale(${scale})`)
        if(this.confirmationButtonRef.nativeElement.getBoundingClientRect().top - innerHeight < 0)
          this.isScrolledToConfirmationButton = true;
        this.expandCards = this.stakeholderGroupsRef.nativeElement.getBoundingClientRect().top - (innerHeight/2) <0
      }
    ),
    takeUntil(this._destroy$),
    debounceTime(5)
  ).subscribe({
    next: ()=>{
      for(let [index, image] of Object.entries(this.bgImages)){
        image.isSelected = this.currentSection > 2 ? true : this.currentSection === +index;
      }
    }
  })
}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getFormControl(controlName: string): FormControl{
    return this.contactForm.get(controlName) as FormControl;
  }

  expandCardsFun(){
    this.expandCards = true;
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

  scrollDown(){
    scrollTo({top: innerHeight, behavior: 'smooth'})
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
}
