import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }

  carregarTela(tela) {
    this.navCtrl.navigateForward(tela);
  }

  async alertInicial(msn) {
    const alert = await this.alertController.create({
      header: 'GetVet',
      message: 'Deseja realmente sair dessa tela?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
          handler: () => {
          }
        }, 
        {
          text: 'Sim',
          role: 'não',
          handler: () => {
            this.navCtrl.navigateForward("/home");
          }
        }
      ]
    });

    await alert.present();
  }

}
