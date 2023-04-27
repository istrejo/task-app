import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {
  @Input() task: Task;
  user = {} as User;

  form: FormGroup;
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private fb: FormBuilder
  ) {
    this.form = this.initForm();
  }

  ngOnInit() {
    this.user = this.utilsSvc.getElementFromLocalstorage('user');
    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
  }

  /* Crear o Actualizar Tarea */
  submit() {
    if (this.form.valid) {
      if (this.task) {
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  /* Crear Tarea */
  createTask() {
    let path = `users/${this.user.uid}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.addToSubcollection(path, 'tasks', this.form.value).then(
      (res) => {
        this.utilsSvc.dismissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Tarea creada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 4000,
        });

        this.utilsSvc.dismissLoading();
      }
    );
  }

  /* Editar Tarea */
  updateTask() {
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.utilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(
      (res) => {
        this.utilsSvc.dismissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Tarea actualizada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 4000,
        });

        this.utilsSvc.dismissLoading();
      }
    );
  }

  initForm() {
    return this.fb.group({
      id: ['', []],
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      items: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  getPercentage() {
    return this.utilsSvc.getPercentage(this.form.value as Task);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }

  removeItem(index: number) {
    this.form.value.items.splice(index, 1);
    this.form.controls['items'].updateValueAndValidity();
  }

  createItem() {
    this.utilsSvc.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (res) => {
            let item: Item = { name: res.name, completed: false };
            this.form.value.items.push(item);
            this.form.controls['items'].updateValueAndValidity();
          },
        },
      ],
    });
  }
}
