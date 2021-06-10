import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { AddPetPage } from '../add-pet/add-pet.page';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage {

  public pets: Array<Object> = [];
  public images = {
    'gato': '../../assets/image/gato.png',
    'cachorro': '../../assets/image/cachorro.png',
    'aves': '../../assets/image/ave.png',
    'outros': '../../assets/image/outros.png',
  };

  constructor(public alertController: AlertController, public modalController: ModalController, private routerOutlet: IonRouterOutlet) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddPetPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    modal.onDidDismiss().then(data => {
        this.pets.push({
        nome: data.data.nome,
        tipo: this.images[data.data.tipo]
      })
    })

    return await modal.present();
  }
}
