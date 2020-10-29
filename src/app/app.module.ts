import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayersSelectorComponent } from './components/map/layers-selector/layers-selector.component';
// import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    LayersSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    // NgxLeafletLocateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
