import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  petForm: FormGroup;

  constructor(private modalController: ModalController, public navCtrl: NavController, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.petForm = this.formBuilder.group({
      name: [''],
      animal: ['']
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      name: this.petForm.get('name').value,
      animal: this.petForm.get('animal').value,
    });
  }
}
