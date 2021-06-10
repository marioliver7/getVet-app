import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, Platform } from '@ionic/angular';
// import { GeralService } from '../service/geral.service';

// declare var google: any;

@Component({
  selector: 'app-pet',
  templateUrl: './pet.page.html',
  styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

  ngOnInit() {
  }

  constructor(public navCtrl: NavController)  {}

  // this.geralCtrl.alertacomum("Deseja sair?");

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela);
  }

  map: google.maps.Map;
  // markers = [];
  markers: any;

  vet = [{
    nome: 'Vet 1',
    lat: -23.520570645840127,
    lng: -46.549175275582044
  }, {
    nome: 'Vet 2',
    lat: -23.520570645840127,
    lng: -46.549175275582044
  }, {
    nome: 'Vet 3',
    lat: -23.520570645840127,
    lng: -46.549175275582044
  }]

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  ionViewWillEnter() {
    this.exibirMapa();
  }

  exibirMapa() {
      const posicao = new google.maps.LatLng(-23.520570645840127, -46.549175275582044);
      const opcoes = {
      center: posicao,
      zoom: 15, // 15 para ruas, 20 para construções
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    for(let i = 0; i < this.vet.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.vet[i].lat, this.vet[i].lng),
        map: this.map,
        title: "teste",
        animation: google.maps.Animation.BOUNCE,
      })
    }

    // marker.setMap(this.map);
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