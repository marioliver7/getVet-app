import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { HttpService } from 'src/services/http';

@Component({
  selector: 'app-sos-page',
  templateUrl: './sos-page.page.html',
  styleUrls: ['./sos-page.page.scss'],
})
export class SosPagePage implements OnInit {
  public pet: any;
  public sosForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public http: HttpService,
    public alertCtrl: AlertController
  ) {
    this.route.queryParams.subscribe((params) => (this.pet = params));
  }

  ngOnInit() {
    this.sosForm = this.formBuilder.group({
      description: [],
    });
  }

  sos() {
    const description = this.sosForm.get('description').value;

    if (!description) {
      return;
    }

    this.http
      .sos({
        description,
        pet_id: this.pet.id || null,
      })
      .subscribe(async (response) => {
        const alert = await this.alertCtrl.create({
          header: 'GetVet',
          message: 'SOS Enviado',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.sosForm.get('description').setValue('');
                this.navCtrl.back();
              }
            },
          ],
        });

        return await alert.present();
      });
  }
}
