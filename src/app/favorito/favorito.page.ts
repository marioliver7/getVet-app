import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

  vets: any;

  constructor(public http: HttpService) { }

  ngOnInit() {
    this.http.getVets().subscribe(response => this.vets = response);
  }

}
