import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/Order.model';
import { baseURL } from '../model/baseURL';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
 /*
/AUTHOR HOSNI YAHYAOUI
*/

  constructor(private http:HttpClient) {
  }

  public getResource(url){
      return this.http.get(url);
  }
  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', baseURL+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


}
