import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public cursorChange$: Subject<'video' | 'circle'> = new Subject<'video' | 'circle'>();
  public onScrollChange$: Subject<void> = new Subject<void>();
  public onNavColorChange$: Subject<{color: 'white' | 'black' | 'black-no-bg' , class?: string}> = new Subject<{color: 'white' | 'black' | 'black-no-bg' , class?: string}>();
  public toaster$: Subject<{message: string, success: boolean}> = new Subject<{message: string, success: boolean}>();
  private _imageCache: Map<string, HTMLImageElement> = new Map();
  constructor(private _HttpClient: HttpClient) { }

  public contactUs(data:{name: string, address: string, message: string}): Observable<any>{
    const payload = {
      fields: {...data}
    }
    return this._HttpClient.post(`${environment.air_table_url}${environment.air_table_contact_us_table_id}`,payload, {
      headers: {
        Authorization: `Bearer ${environment.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public downloadPublicationData(data:{name: string, email: string, organization: string, position: string}): Observable<any>{
    const payload = {
      fields: {...data}
    }
    return this._HttpClient.post(`${environment.air_table_url}${environment.air_table_publication_table_id}`,payload, {
      headers: {
        Authorization: `Bearer ${environment.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public handleFillingText(elementContainer: HTMLElement, num1: number, num2: number):void{
    let textPercentage = (innerHeight - elementContainer.getBoundingClientRect().top -num1) / (innerHeight -num2) *100;
    textPercentage = Math.max(0, Math.min(textPercentage, 100));
    elementContainer.querySelectorAll('span').forEach((element: HTMLElement, index: number) => {
      if(index ===0)
        element.style.backgroundPosition = `${Math.max(0, Math.min(100- ( textPercentage/16 *100 ), 100))}% 0`;
      if(index ===1){
        const position = textPercentage > 16 ? Math.max(0, Math.min(100- ( (textPercentage - 16)/16 *100 ), 100)) : 100;
        element.style.backgroundPosition = `${position}% 0`;
      }
      if(index ===2){
        const position = textPercentage > 32 ? Math.max(0, Math.min(100- ( (textPercentage - 32)/16 *100 ), 100)) : 100;
        element.style.backgroundPosition = `${position}% 0`;
      }
      if(index ===3){
        const position = textPercentage > 48 ? Math.max(0, Math.min(100- ( (textPercentage - 48)/16 *100 ), 100)) : 100;
        element.style.backgroundPosition = `${position}% 0`;
      }
      if( index ===4){
        const position = textPercentage > 64 ? Math.max(0, Math.min(100- ( (textPercentage - 64)/16 *100 ), 100)) : 100;
        element.style.backgroundPosition = `${position}% 0`;
      }
      if(index ===5){
        const position = textPercentage > 80 ? Math.max(0, Math.min(100- ( (textPercentage - 80)/16 *100 ), 100)) : 100;
        element.style.backgroundPosition = `${position}% 0`;
      }
    });
  }


  public preloadImages(imageUrls: string[]): void {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      this._imageCache.set(url, img);
    });
  }

  public getImage(url: string): HTMLImageElement | undefined {
    return this._imageCache.get(url);
  }

  public navigateToTop(): void {
    scrollTo({top:0, left:0})
  }

}
