import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AppService } from '../services/app.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true
})
export class HorizontalScrollDirective {
  private _destroy$: Subject<void> = new Subject<void>();

  private get scrollContainer(): HTMLElement{
    return this.element.nativeElement.querySelector('.scroll-horizontally-container') as HTMLElement
  }
  constructor(private element: ElementRef, private _AppService:AppService, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const scrollContainer = document.createElement('div');
    scrollContainer.classList.add('scroll-horizontally-container');
    scrollContainer.style.width = '100vw';
    scrollContainer.style.height = '100vh';
    scrollContainer.style.position = 'fixed';
    scrollContainer.style.zIndex = '9999';
    scrollContainer.style.top = '0';
    scrollContainer.style.left = '0';
    scrollContainer.style.display = 'flex';
    scrollContainer.style.alignItems = 'center';
    const scrollElement = this.renderer.createElement('div');
    // Append the original element's children to the new scrollElement
    while (this.element.nativeElement.firstChild) {
      this.renderer.appendChild(scrollElement, this.element.nativeElement.firstChild);
    }
    this.renderer.appendChild(this.element.nativeElement, scrollElement);

    scrollContainer.appendChild(scrollElement);
    this.element.nativeElement.appendChild(scrollContainer);
    this.element.nativeElement.style.backgroundColor = 'white';
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.height = scrollElement.getBoundingClientRect().width - (this.isSmallScreenView ? -Math.abs(innerHeight - innerWidth) : Math.abs(innerHeight - innerWidth)) + 'px';

    this._handleScroll(true);
    this._AppService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: ()=>{
        this._handleScroll();
      }
    })
  }

  public get isSmallScreenView(): boolean{
    return window.innerWidth <= 992;
  }

  private _handleScroll(skip: boolean = false){
    const top = this.element.nativeElement.getBoundingClientRect().top;
    const maxScroll = -((this.scrollContainer?.firstElementChild?.getBoundingClientRect()?.width || 0) - innerWidth);
    if( (top<0 && top > maxScroll))
      this._startScrollHorizontally();
    else if(top > 0){
      this.element.nativeElement.style.display = 'flex';
      this.element.nativeElement.style.alignItems = 'start';
      this._stopScrollHorizontally();
    }else if( top < maxScroll){
      if(skip)this._startScrollHorizontally(skip);
      this.element.nativeElement.style.display = 'flex';
      this.element.nativeElement.style.alignItems = 'end';
      this._stopScrollHorizontally();
    }
  }

  private _startScrollHorizontally(skip: boolean = false){
    const maxScroll = -((this.scrollContainer?.firstElementChild?.getBoundingClientRect()?.width || 0) - innerWidth);
    this.scrollContainer.style.position = 'fixed';
    this.scrollContainer.style.transform = `translate3d(${skip ? maxScroll : this.element.nativeElement.getBoundingClientRect().top}px, 0px, 0px)`;
  }

  private _stopScrollHorizontally(){
    this.scrollContainer.style.position = 'relative';
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
