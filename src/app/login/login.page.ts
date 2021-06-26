import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Data } from 'src/config/data';
import { HttpService } from 'src/services/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public alertController: AlertController, public http: HttpService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.http.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(response => {
        Data.saveToken();
        Data.saveUser({
          name: response.name,
          email: response.email
        });

        this.navCtrl.navigateRoot('pet');
      }, async err => {
        const alert = await this.alertController.create({
          header: 'GetVet',
          message: 'Email e/ou Senha Inválidos',
          buttons: [
            {
              text: 'OK'
            }
          ]
        });

        return await alert.present();
      });
  }

  back() {
    return this.navCtrl.navigateForward("/home");
  }

}
