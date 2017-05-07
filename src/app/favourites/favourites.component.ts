import { Restaurant } from '../restaurant';
import { LolnasService } from '../services/lolnas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [LolnasService]
})
export class FavouritesComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(private _lunchService: LolnasService) { }

  ngOnInit() {
    this._lunchService.getRestaurants().subscribe(
      r => {
        this.restaurants = r;
      }
    );
  }

  private setFavourite(restaurant: Restaurant, favourite: boolean) {
      restaurant.favourite = favourite;
      this._lunchService.updateRestaurant(restaurant);
  }

}
