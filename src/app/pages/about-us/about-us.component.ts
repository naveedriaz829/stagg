import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit {

  public isSectionsFixed: boolean = true;
  @ViewChild('scrollHorizontallyRef') scrollHorizontallyRef!: ElementRef;
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('videoContainer') videoContainer!: ElementRef;
  public containerWidth = 0

  public readonly cardsList: {type: '' | 'card' | 'img', title?: string, caption?: string, img?: string}[] = [
    {
      type: 'card',
      title: 'Galvanize and Corral',
      caption: 'Leading and accelerating the travel and tourism industry’s transition to a fully sustainable future',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Establish a Research Hub',
      caption: 'Supply stakeholders with localized, evidence-based research, tools, training, policy papers and resources through global research partners, all in one platform to enhance sustainability efforts.',
    },
    {
      type:'',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Drive SDGs in Tourism',
      caption: 'Advancing our global climate agenda and the achievement of our sustainable development goals through the Travel and Tourism eco-system.',
    },
    {
      type:'',
    },
    {
      type: 'img',
      img: 'assets/images/desc-img1.jpg'
    },
    {
      type: 'card',
      title: 'Ensure Impactful Engagement',
      caption: 'Measuring the potential and outcomes of every initiative and every research project, through bottom-up stakeholder engagement and quality-driven impact methodologies.',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Set Sustainable Priorities',
      caption: 'Boosting and stimulating new priorities and targets to measure sustainable advancement of their destination.',
    },
    {
      type:'',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Build Resilient Communities',
      caption: 'Boosting the understanding of the full benefits of investment to build their local economy, business and tourist communities.',
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Increase Youth Involvement',
      caption: 'to create a global network of STGC Youth Climate Champions, and navigating professional opportunities, training and networks with leading Climate mentors.',
    },
    {
      type: 'img',
      img: 'assets/images/desc-img2.jpg'
    },
    {
      type:'',
    },
    {
      type: 'card',
      title: 'Empower Stakeholders',
      caption: 'Empowering stakeholders and communities to lead in sustainability, advancing access to green finance, sustainable education, global citizenship, local culture, responsible consumption, environmental goals, and intergovernmental best practice sharing.',
    },
  ]


  private _handleScroll(skip: boolean = false): void {
    if(
      (scrollY > 3 * innerHeight && this.isSmallScreenView) ||
      (scrollY > 7 * innerHeight && this.isMediumScreenView) ||
      (scrollY > 8 * innerHeight && !this.isMediumScreenView && !this.isSmallScreenView)
    )
      this._AppService.onNavColorChange$.next({color: 'black'});
    else
      this._AppService.onNavColorChange$.next({color: 'black-no-bg'});


    let percentage = (window.scrollY / (this.containerWidth-innerHeight));
    if(percentage > 1) percentage = 1;
    if(percentage >= 1)
      this.isSectionsFixed = false;
    else this.isSectionsFixed = true;
    if(this.isSectionsFixed || skip)
      this.scrollHorizontallyRef.nativeElement.style.transform = `translate3d(-${percentage * (this.containerWidth- innerWidth)}px, 0px, 0px)`;
    let videoPercentage = 1- (this.videoContainer.nativeElement.getBoundingClientRect().top / (this.videoContainer.nativeElement.getBoundingClientRect().height));
    if(videoPercentage > 1) videoPercentage = 1;
    // Handle scaling
    const minScale2 = 1;
    const maxScale2 = 1.4;
    const scale2 = maxScale2 - ((videoPercentage) * (maxScale2 - minScale2));
    if(!this.isSmallScreenView)
      this.videoContainer.nativeElement.firstElementChild.style.transform = `scale(${scale2})`;
    this._AppService.cursorChange$.next('circle')
  }

  // public get containerWidth(){
  //   return (this.containerRef?.nativeElement?.getBoundingClientRect()?.width) || 0;
  // }
  private _destroy$: Subject<void> = new Subject<void>();
  isPlaying = false;
  constructor(private _AppService: AppService, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object){
    this.containerWidth = this.containerRef?.nativeElement?.getBoundingClientRect()?.width || 0;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._AppService.onNavColorChange$.next({color: 'black-no-bg'});
    }, 100);
    this._AppService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: ()=> this._handleScroll()
    })
  }
  public get videoContainerTop(){
    return this.videoContainer.nativeElement.getBoundingClientRect().top;
  }

  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.muted = true;
    const navElement = document.querySelector('nav');
    if (navElement) {
      navElement.classList.add('custom-nav');
    }
    setTimeout(() =>{

      this._handleScroll(true)
      this.containerWidth = this.containerRef?.nativeElement?.getBoundingClientRect()?.width || 0;
      this.cdr.detectChanges();
    }, 400);
  }

  // ngOnDestroy(): void {
  //   document.querySelector('nav')?.classList.remove('custom-nav')
  //   this._destroy$.next();
  //   this._destroy$.complete();
  // }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navElement = document.querySelector('nav');
      if (navElement) {
        navElement.classList.remove('custom-nav');
      }
    }
    this._destroy$.next();
    this._destroy$.complete();
  }
  public onMouseOver(videoElement: HTMLVideoElement): void{
    videoElement.muted = false;
    this._AppService.cursorChange$.next('video')
  }

  public onMouseLeave(videoElement: HTMLVideoElement): void{
    videoElement.muted = true;
    this._AppService.cursorChange$.next('circle')
  }

  public toggleVideo(videoElement: HTMLVideoElement) {
    this.isPlaying = !this.isPlaying
    if(this.isPlaying)
      videoElement.play();
    else
      videoElement.pause();
  }

  public getImageSrc(url: string): string | undefined {
    const cachedImage = this._AppService.getImage(url);
    return cachedImage?.src || url;
  }


  public get isMediumScreenView(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth < 1440 && window.innerWidth > 1100;
    }
    return false;
  }

  public get isSmallScreenView(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth < 1100;
    }
    return false;
  }
  navigateToTop(){
    this._AppService.navigateToTop();
  }
}
