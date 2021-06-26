import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { MyLocation } from '@ionic-native/google-maps';
import { HttpService } from 'src/services/http';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage {
  // public search: string = '';
  // public searchResults = new Array<any>();

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    private renderer: Renderer2,
    private element: ElementRef,
    @Inject(DOCUMENT) private _document,
    private http: HttpService,
    public alertCtrl: AlertController
  )  {}

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela);
  }

  map: any;
  markers: any;

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

  async createMap(latitude = -23.520570645840127, longitude = -46.549175275582044) {
    const options = {
      center: new google.maps.LatLng(latitude, longitude),
      disableDefaultUI: true,
      zoom: 15,
    };

    try {
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    } catch (e) {}

    this.http.places(latitude, longitude).subscribe(response => {
      for(let i in response) {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(response[i].latitude, response[i].longitude),
          animation: google.maps.Animation.DROP,
          map: this.map,
          clickable: true,
        });

        marker['place_id'] = response[i].place_id;
        marker['name'] = response[i].name;
        marker['rating'] = response[i].rating;

        marker.addListener('click', async e => {
          const alert = await this.alertCtrl.create({
            header: 'Adicionar Veterinário',
            message: [
              marker['name'],
              `Nota: ${marker['rating'] || 'Sem Nota'}`
            ].map(text => `<p>${text}<p>`).join(''),
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.http.addVet(marker['place_id']).subscribe(response => {
                    alert.dismiss();
                  });
                }
              },
              {
                text: 'Não'
              }
            ]
          });
  
          return await alert.present();
        });
      }
    });
  }

  async exibirMapa() {
    await this.loadSDK();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.createMap(position.coords.latitude, position.coords.longitude);
      }, () => this.createMap());
    }
  }

}