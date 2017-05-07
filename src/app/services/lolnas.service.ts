import { Restaurant } from '../restaurant';
import { Injectable} from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LolnasService {

  private corsProxy = 'http://cors-proxy.htmldriven.com/?url=';

  private baseUrl = 'http://www.lolnas.fi/api/';

  private url = this.corsProxy + this.baseUrl;

  constructor(private http: Http) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http
      .get(`${this.url}/restaurants.json`, { headers: this.getHeaders()})
      .map(mapRestaurants);
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    const errorMsg = error.message || `Oops! There was an error!`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
}

/**
 * Creates a Restaurant instance array of a HTTP response
 */
function mapRestaurants(response: Response): Restaurant[] {
  return JSON.parse(response.json().body).restaurants.map(toRestaurant);
}

/**
 * Creates a Restaurant instace of a json object
 */
function toRestaurant(r: any): Restaurant {
  return <Restaurant>({
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
}

