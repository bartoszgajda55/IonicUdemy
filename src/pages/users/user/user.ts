import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'src/pages/users/user/user.html',
})
export class UserPage {
  name: string;
}
