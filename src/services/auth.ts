import firebase from 'firebase';

export class AuthService {
  signup(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

}
