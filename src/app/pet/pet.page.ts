import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage {

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    private renderer: Renderer2,
    private element: ElementRef,
    @Inject(DOCUMENT) private _document)  {}

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela);
  }

  map: any;
  // markers = [];
  markers: any;

  vet = [{
    nome: 'Hospital Veterinário VetPenha',
    lat: -23.525312379852544,
    lng: -46.54935577808895,
  }, {
    nome: 'Hospital Veterinário Animal Prime',
    lat: -23.522761666613448,
    lng: -46.53630760374526,
  }, {
    nome: 'Clínica Veterinária Fênix',
    lat: -23.521769124455723, 
    lng: -46.54361493046856,
  }]

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  ionViewWillEnter() {
    this.exibirMapa();
  }

  ionViewDidLoad() {
    this.exibirMapa();
  }

  async loadSDK() {
    return new Promise((resolve, reject) => {
      window['mapInit'] = () => {
        resolve(true);
      }

      let script = this.renderer.createElement('script');

      script.id = 'maps';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=mapInit`;

      this.renderer.appendChild(this._document.body, script);
    });
  }

  async exibirMapa() {
    await this.loadSDK();
    
    const options = {
      center: new google.maps.LatLng(-23.520570645840127, -46.549175275582044),
      disableDefaultUI: true,
      zoom: 14,
    };

    try {
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    } catch (e) {}

    for(let i = 0; i < this.vet.length; i++) {
      new google.maps.Marker({
        position: new google.maps.LatLng(this.vet[i].lat, this.vet[i].lng),
        animation: google.maps.Animation.DROP,
        map: this.map
      });
    }
  }

}

// let content = `
    // <div id="myId" class="item item-thumbnail-left item-text-wrap">
    //   <ion-item>
    //     <ion-row>
    //       <h6> `+Marker+` </h6>
    //     </ion-row>
    //   </ion-item>
    // </div>
    // `