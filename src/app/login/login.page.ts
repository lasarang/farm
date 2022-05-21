import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email= '';
  pwd='';

  constructor(
    private navCAtrl: NavController,
    private util: UtilService,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  async onLogin(email: string, pwd: string){
    //Enabling Side Menu
    try{
      console.log({email, pwd});

      const user = await this.authService.login(email, pwd);

      if(user){
        this.util.setMenuState(true);
        this.navCAtrl.navigateRoot('folder/Inbox', { animationDirection: 'forward'});
      }

    }catch(e){
      console.log('error de login: ', e);
    }
  }

}
