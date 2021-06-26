import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from 'src/config/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCTRL: NavController) {}

  ngOnInit() {
    Data.initToken();

    if (Data.token) {
      this.navCTRL.navigateRoot('pet');
    }
  }

  carregarTela(tela) {
    this.navCTRL.navigateForward(tela);
  }

}
