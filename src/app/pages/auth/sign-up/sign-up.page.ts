import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.form.controls['confirmPassword'].setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls['password']),
    ]);

    this.form.controls['confirmPassword'].updateValueAndValidity();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'registrando...' });
      this.firebaseSvc
        .signUp(this.form.value as User)
        .then(async (res) => {
          await this.firebaseSvc.updateUser({
            displayName: this.form.value.name,
          });

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
