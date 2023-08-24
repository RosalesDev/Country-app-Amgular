import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'secureDom'
})
export class SecureDomPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer){};

  transform(value: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOVYL_MNOUBiA-NFDh3djGHrzf4acXv_A
    &q=`+value);
  }

}
