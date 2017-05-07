import { Restaurant } from '../restaurant';
import { Injectable} from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LolnasService {

  private corsProxy = 'http://cors-proxy.htmldriven.com/?url=';

  private baseUrl = 'http://www.lolnas.fi/api/';

  private url = this.corsProxy + this.baseUrl;

  private restaurants: Observable<Restaurant[]>;

  constructor(
    private _http: Http,
    private _localStorage: LocalStorageService) {
  }

  getRestaurants(): Observable<Restaurant[]> {
    if (this.restaurants === undefined) {
      this.restaurants = this._http.get(`${this.url}/restaurants.json`, { headers: this.getHeaders()})
        .map((response) => {
           return JSON.parse(response.json().body).restaurants.map((r) => {
              const instance: Restaurant = <Restaurant>({
                id: r.id,
                name: r.name,
                url: r.url,
                favourite: false,
                latitude: parseFloat(r.latitude),
                longitude: parseFloat(r.longitude),
                distance: parseInt(r.distance),
                data_provider_title: r.data_provider_title,
                data_provider_url: r.data_provide_url
              });
             this.loadRestaurant(instance);
             this.updateRestaurant(instance);
             return instance;
           });
        });
    }
    return this.restaurants;
  }

  updateRestaurant(restaurant: Restaurant) {
    this._localStorage.set('restaurant-' + restaurant.id + '-favourite', restaurant.favourite);
  }

  private loadRestaurant(restaurant: Restaurant) {
    restaurant.favourite = !!this._localStorage.get('restaurant-' + restaurant.id + '-favourite');
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    const errorMsg = error.message || 'Oops! There was an error!';
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
}


