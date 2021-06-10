import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  @Input() nome: string;
  @Input() tipo: any;

  constructor(private modalController: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  dismiss() {
    const tipo = document.querySelector('ion-radio-group').value;
    const nome = document.querySelector('input').value;

    console.log(nome, tipo)

    // switch(radio) {
    //   case 'gato': 
    //     radio == '../assets/image/ionPet.png';
    //     break;
      
    //   case 'cachorro':
    //     radio == '../';
    //     break;

    //   case 'aves':
    //     radio == '../';
    //     break;

    //   case 'outros':
    //     radio == '../';
    //     break;
    // }

    this.modalController.dismiss({
      'dismissed': true,
      tipo,
      nome
    });
  }
}
