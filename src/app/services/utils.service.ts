import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  // =============LOADING ===========

  /* PRESENT */
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingCtrl.create(opts);
    await loading.present();
  }

  /* DISMISS */
  async dismissLoading() {
    return await this.loadingCtrl.dismiss();
  }

  // ============ LocalStorage =========

  // SET
  setElementInLocalstorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  // GET
  getElementFromLocalstorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // ======== ROUTER ========

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // ========= Alert ===========
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);

    await alert.present();
  }
}
