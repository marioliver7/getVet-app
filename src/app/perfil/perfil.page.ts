import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpService } from 'src/services/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: any;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    private http: HttpService,
   ) { }

  ngOnInit() {
    this.http.getUser().subscribe(response => {
      this.user = response;
    })
  }

  back() {
    this.navCtrl.back();
  }

}
