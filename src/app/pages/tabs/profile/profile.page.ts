import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private firebaseSvc: FirebaseService) {}

  ngOnInit() {}

  signOut() {
    this.firebaseSvc.signOut();
  }
}
