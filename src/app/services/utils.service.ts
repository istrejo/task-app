import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
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

  // ========= Modal ===========
  // PRESENT
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) return data;
  }

  // DISSMISS
  dismissModal(data?) {
    this.modalCtrl.dismiss(data);
  }

  getPercentage(task: Task) {
    let completedItems = task.items.filter((item) => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItems;

    return parseInt(percentage.toString());
  }
}
