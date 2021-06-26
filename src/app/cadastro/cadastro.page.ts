import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/services/http';
import { Data } from 'src/config/data';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private http: HttpService
   ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    });
  }

  register() {   
    const password = this.registerForm.get('password').value;
    
    this.http.register(
      this.registerForm.get('name').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('password_confirmation').value
    ).subscribe(response => {
      Data.setToken(response.email, password);
      Data.saveToken();
      Data.saveUser({ name: response.name, email: response.email });

      this.navCtrl.navigateRoot('pet');
    }, async err => {
      const alert = await this.alertController.create({
        header: 'GetVet',
        message: Object.values(err.error).map(e => `<p>${e}<p>`).join(''),
        buttons: [
          {  text: 'OK' }
        ]
      });

      return await alert.present();
    });
  }

  back() {
    this.navCtrl.navigateForward("/home");
  }

}
