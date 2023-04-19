import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form: FormGroup;
  // form: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  // });

  constructor(
    private fb: FormBuilder,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'Autenticando...' });
      this.firebaseSvc
        .login(this.form.value as User)
        .then(async (res) => {
          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };

          this.utilsSvc.setElementInLocalstorage('user', user);
          this.utilsSvc.routerLink('/tabs/home');

          this.utilsSvc.dismissLoading();

          this.utilsSvc.presentToast({
            message: `Te damso la bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline',
          });

          this.form.reset();
        })
        .catch((error) => {
          this.utilsSvc.dismissLoading();
          this.utilsSvc.presentToast({
            message: error,
            duration: 5000,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
        });
    }
  }
}
