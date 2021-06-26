import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.page.html',
  styleUrls: ['./veterinarios.page.scss'],
})
export class VeterinariosPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela)
  }

}
