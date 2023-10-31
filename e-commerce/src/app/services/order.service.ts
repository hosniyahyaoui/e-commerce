import {Client} from '../model/client.model';
import {ItemProduct} from '../model/item-product.model';
import {CaddyService} from './caddy.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from './catalogue.service';
import {Order} from '../model/Order.model';
import {Observable} from 'rxjs';
import { baseURL } from '../model/baseURL';

@Injectable({
  providedIn:'root'
})
export class OrderService {
  /*
/AUTHOR HOSNI YAHYAOUI
*/
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient,
              private catalService:CatalogueService){}

  public setClient(client:Client){
    this.order.client=client;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
   for(let key in this.caddyService.getCaddy().items){
     this.order.products.push(this.caddyService.getCaddy().items[key]);
   }
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(baseURL+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(baseURL+"/orders/"+id);
  }
}
