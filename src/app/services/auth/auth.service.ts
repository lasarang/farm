import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Usuario } from 'src/app/models/model';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    //private afs: FirestoreService
  ) {
    this.userData = this.afAuth.authState;

    }

  async login(email: string, pwd: string){
    try{
      return await this.afAuth.signInWithEmailAndPassword(email, pwd);
    }catch(e){
      console.log('No se puedo realizar el login: '+e);
    }
    return;
  }

  async register(cedula: string, pwd: string){
    try{
       //return await this.afAuth.createUserWithEmailAndPassword(cedula, pwd);
    }catch(e){
      console.log('No se pudo registrar: '+e);
    }
    return;
  }

  async resetPwd(email: string){
    try{
      //return await this.afAuth.sendPasswordResetEmail(email);
   }catch(e){
    console.log('No se puedo cambiar la contraseña: '+e);
  }
   return;
  }

  async logout(){
    try{
      await this.afAuth.signOut();
      console.log('Saliendo... ');
    }catch(e){
      console.log('No se pudo salir: '+e);
    }
  }

  /* Assign roles to an ability method */
  canRead(user: User): boolean{
    const allowed = ['admin', 'worker'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean{
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean{
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean{
    if (!user) {
      return false;
    }

    for (const role of allowedRoles){
      if(user.roles[role]){
        return true;
      }
    }
    return false;
  }

}
