import { Component, OnInit, ViewChild } from '@angular/core';
import { LolnasService } from '../services/lolnas.service';
import { Restaurant } from '../restaurant';
import { LatLng, LatLngBounds } from 'angular2-google-maps/core';
import { MdButtonToggle} from '@angular2-material/button-toggle';
import { MdIcon } from '@angular2-material/icon';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [LolnasService]
})
export class MapComponent implements OnInit {

  errorMessage = '';

  restaurants: Restaurant[] = [];

  zoom: number = 12;

  latitude: number;

  longitude: number;

  bounds: LatLngBounds;

  constructor(private _lunchService: LolnasService, private _localStorage: LocalStorageService) { }

  ngOnInit() {
    this._lunchService.getRestaurants().subscribe(
      r => {
        this.restaurants = r;
        this.bounds = this.calculateBounds(r);
        if (this.bounds != null) {
          this.latitude = this.bounds.getCenter().lat();
        }
        if (this.bounds != null) {
          this.longitude = this.bounds.getCenter().lng();
        }
      },
      e => this.errorMessage = e
    );
  }

  private calculateBounds(restaurants: Restaurant[]): LatLngBounds {
    if (window['google'] !== undefined) {
      const bounds = new window['google'].maps.LatLngBounds();
      restaurants.map(this.toLatLng).forEach(pos => bounds.extend(pos));
      return bounds;
    }
    return null;
  }

  private toLatLng(restaurant: Restaurant): LatLng {
    if (window['google'] !== undefined) {
      return new window['google'].maps.LatLng(restaurant.latitude, restaurant.longitude);
    }
    return null;
  }

  private setFavourite(restaurant: Restaurant, favourite: boolean) {
      restaurant.favourite = favourite;
      this._lunchService.updateRestaurant(restaurant);
  }
}
