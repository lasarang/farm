import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class FirestoreService{
  constructor(private firestore: AngularFirestore){}

  createDoc(data: any, path: string){
    try{
       this.firestore.collection(path).add(data).then(docRef => {
         docRef.update({id: docRef.id});
        });
    }catch(e){
      console.log('error capturado: ',e);
    }
  }

  createDocId(data: any, path:string, id: string){
    try{
      this.firestore.collection(path).doc(id).set(data);
   }catch(e){
     console.log('error capturado: ',e);
   }
  }


  getCollection<T>(path: string): Observable<T[]>{
    try{
      return this.firestore.collection<T>(path).valueChanges().pipe();
    }catch(e){
      console.log('error capturado: ',e);
    }
    return new Observable();
  }

  getDoc<T>(path: string, id: string): Observable<T|undefined>{
    try{
      return this.firestore.collection<T>(path).doc<T>(id).valueChanges();
    }catch(e){
      console.log('error capturado: ',e);
    }
    return new Observable();
  }

  updateDoc(path: string, id: string, data: any){
    try{
      this.firestore.collection(path).doc(id).update(data);
    }catch(e){
      console.log('error capturado: ',e);
    }
  }

  deleteDoc(path: string, id: string){
    try{
      this.firestore.collection(path).doc(id).delete();
    }catch(e){
      console.log('error capturado: ',e);
    }
  }

}
