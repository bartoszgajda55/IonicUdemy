import firebase from 'firebase';

export class AuthService {
  signup(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

}
