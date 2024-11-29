import { Component, HostListener } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { debounceTime, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { slideInOutAnimation } from './shared/animation';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimation],
})
export class AppComponent {
  title = 'stgc';

  public cursorPositionX: number = 0;
  public cursorPositionY: number = 0;
  public tosterData?: {message: string, success: boolean};

  constructor( private _AppService: AppService, private router: Router, private metaService: Meta, private titleService: Title) {
    this.setGlobalMetaTags();
  }

  setGlobalMetaTags() {
    this.titleService.setTitle('STGC - Sustainable Tourism Global Center');

    this.metaService.addTags([
      { name: 'description', content: 'Lead, accelerate and track Travel & Tourism industry’s journey to a sustainable future.' },
      { name: 'keywords', content: 'Sustainability, Travel, Tourism, Responsible, Global, Earth, Planet, Climate, Nature, Ecosystem, Community, Green, Ethical,  Nature-based, Preservation, Security, Cultural Heritage, Digital, Solutions, Stakeholders, Experts, Advisory, Enablement,  Knowledge, Measurement, Standards, Certifications, Quality, Analytics, Impact Assessment, Support, People, Communities,  Destinations, Youth, Tourists, Travelers, Mobility, Transportation, Circularity, Carbon Emission, Paris Agreement, United Nations,  Hub, Riyadh, KSA, Micro, MSME, Large Companies, Champion, North Star, Sustainable tourism destinations, Eco-friendly travel ideas,  Responsible travel guides, Green travel options, Carbon-neutral vacations, Eco-tourism destinations, Ethical tourism practices,  Sustainable hotels, Nature-friendly tours, Conservation-focused travel, Climate-conscious travel, Community-based tourism,  Wildlife preservation trips, Sustainable travel planning, Eco-conscious vacations, Renewable energy travel, Green tourism strategies,  Plastic-free travel tips, Eco-friendly resorts, Leave-no-trace destinations, Responsible wildlife tourism, Sustainable tour operators,  Ethical travel tips, Sustainable tourism center, Zero-waste travel tips, Green vacation destinations, Sustainable travel products,  Eco-conscious packing, Planet-friendly vacations, Low-carbon travel, Responsible holiday ideas, Carbon offset travel, Green travel agencies,  Sustainable adventure travel, Ethical cultural tourism, Environmentally friendly destinations, Green travel network, Sustainable travel influencer,  Eco-friendly hotels, Responsible tourism practices, Eco-certified travel, Conservation and eco-tourism solutions, Low-carbon mobility initiatives,  Planet-focused travel advisory, Green tourism hub in Riyadh, Sustainable tourism solutions in KSA, Community-based tourism impact,  Sustainable support for MSMEs, Corporate travel for sustainability, Championing green tourism practices, North Star sustainability initiatives' },
      { name: 'author', content: 'STGC - Sustainable Tourism Global Center' },
      { property: 'og:title', content: 'STGC - Sustainable Tourism Global Center' },
      { property: 'og:description', content: 'Lead, accelerate and track Travel & Tourism industry’s journey to a sustainable future.' },
      { property: 'og:image', content: 'https://www.stgc.global/assets/images/thumbnail.jpg' },
      { property: 'og:url', content: 'https://www.stgc.global/' }
    ]);
  }

  public cursor: 'video' | 'circle' = 'circle';
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPositionX = event.clientX;
    this.cursorPositionY = event.clientY;
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this._AppService.onScrollChange$.next();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    this._AppService.onScrollChange$.next();
    const x = this.cursorPositionX + scrollX;
    const y = this.cursorPositionY + scrollY;
    const target = document.elementFromPoint(this.cursorPositionX, this.cursorPositionY)
    if(target?.classList.contains('video-player'))
      this._AppService.cursorChange$.next('video')
    else
      this._AppService.cursorChange$.next('circle')
  }

  private _destroy$: Subject<void> = new Subject<void>();

    showLoader= true;
  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false
    }, 4000);
    this._AppService.cursorChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next:(res)=>{
        this.cursor = res
      }
    })
    this._AppService.toaster$.pipe(takeUntil(this._destroy$)).subscribe({
      next:(res)=>{
        this.tosterData = res;
        setTimeout(() => {
          this.tosterData = undefined
        }, 4000);
      }
    })
    const imagesToPreload = [
      'assets/images/section1.jpg',
      'assets/images/section2.jpg',
      'assets/images/STGC-black.svg',
      'assets/images/STGC.svg',
      'assets/images/desc-img1.jpg',
      'assets/images/desc-img2.jpg',
      'assets/images/bg-1.jpg',
      'assets/images/image-1.jpg',
      'assets/images/image-2.jpg',
      'assets/images/partners-bg.jpg',
      'assets/images/pic1.jpg',
      'assets/images/pic2.jpg',
      'assets/images/pic3.jpg',
      'assets/images/Menu.jpg',
      'assets/images/bg-main.png',
      'assets/images/bg-main-2.png',
    ];
    this._AppService.preloadImages(imagesToPreload);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
