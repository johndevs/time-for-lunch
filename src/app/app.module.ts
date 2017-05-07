import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { AppComponent } from './app.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MdCardModule} from '@angular2-material/card';
import { MdButtonModule} from '@angular2-material/button';
import { MdButtonToggleModule} from '@angular2-material/button-toggle';
import { MdIconRegistry, MdIconModule} from '@angular2-material/icon';
import { MdSidenavModule, MdSidenavLayout, MdSidenav} from '@angular2-material/sidenav';
import { MdListModule, MdListItem } from '@angular2-material/list';
import { MdToolbarModule, MdToolbar} from '@angular2-material/toolbar';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { Gravatar } from 'ng2-gravatar-directive';
import { StatisticsComponent } from './statistics/statistics.component';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core/coordination/unique-selection-dispatcher';
import { FavouritesComponent } from './favourites/favourites.component';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbU8BJw20v6B5RsaqBuSkuAsp4pl15S2g'
    }),
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdToolbarModule,
    MdButtonToggleModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'map', pathMatch: 'full' },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'map', component: MapComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'about', component: AboutComponent }
    ]),
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
            //storageType: 'sessionStorage'
    })
  ],
  declarations: [AppComponent, MapComponent, AboutComponent, Gravatar, StatisticsComponent, FavouritesComponent],
  providers: [MdIconRegistry, MdUniqueSelectionDispatcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
