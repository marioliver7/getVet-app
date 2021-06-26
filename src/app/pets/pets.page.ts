import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { HttpService } from 'src/services/http';
import { AddPetPage } from '../add-pet/add-pet.page';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage {
  public pets: any;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.http.getPets().subscribe(response => {
      this.pets = response;
    })
  }

  async addPet() {
    const modal = await this.modalController.create({
      component: AddPetPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    
    return this.http.addPet(data.data).subscribe(response => {
      this.pets.push(response);
    });
  }

  carregarTela(tela, pet) {
    this.navCtrl.navigateForward(tela, {
      queryParams: {
        id: pet.id,
        name: pet.name,
        photo_url: pet.photo_url
      }
    });
  }
}
