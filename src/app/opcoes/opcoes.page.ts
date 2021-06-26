import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from 'src/config/data';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.page.html',
  styleUrls: ['./opcoes.page.scss'],
})
export class OpcoesPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela);
  }

  logout() {
    Data.removeToken();
    this.navCtrl.navigateRoot('home');
  }

}
