import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCAtrl: NavController,
    private util: UtilService
    ) { }

  ngOnInit() {
  }

  login(){
    //Enabling Side Menu
    this.util.setMenuState(true);
    this.navCAtrl.navigateRoot('home', { animationDirection: 'forward'});
  }

}
