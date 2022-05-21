import { Component, OnInit } from '@angular/core';
import { NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './services/util/util.service';
import { Usuario } from './models/model';
import { AuthService } from './services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from './services/firestore/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  usuario: Usuario={
    cedula: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    email: '',

    //Info personal
    dob: '',
    groLegal: '',
    estadoCivil: '',
    seguro: '',
    ocupacion: '',
    discapacidad: '',
    gpoSanguineo:'',
    talla: 0,
    peso: 0,
    rol: '',
    id: ''
  };

  public isMenuEnabled = false;
  public selectedIndex = 0;

  public appPages = [
    { title: 'Admin-Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Admin-Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Admin-Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Admin-Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Admin-Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Admin-Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Admin-Family', 'Admin-Friends', 'Admin-Notes'];

  public workerPages = [
    { title: 'Worker-Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Worker-Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Worker-Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Worker-Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Worker-Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Worker-Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public workerLabels = ['Worker-Family', 'Worker-Friends', 'Worker-Notes'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private authService: AuthService,
    private afs: FirestoreService,
    private navCAtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.loadUsuario();

    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });

    const path = window.location.pathname.split('folder')[1];
    if(path !== undefined){
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  onLogout(){
    this.authService.logout();
    this.util.setMenuState(false);
    this.navCAtrl.navigateRoot('welcome', { animationDirection: 'back'});
  }

  private loadUsuario(){
    this.authService.userData.pipe(
        switchMap(auth => {
          if (auth) {
              return this.afs.getDoc('users', auth.uid);
          } else {
              return [];
          }
        })
    ).subscribe(user =>{
      this.usuario = user as Usuario;
    });
  }


}
