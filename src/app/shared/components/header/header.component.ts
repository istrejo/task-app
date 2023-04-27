import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;
  @Input() toggleTheme: boolean = true;

  darkMode;

  constructor(
    private themeSvc: ThemeService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode;
  }

  setTheme(darkMode: boolean) {
    this.themeSvc.setTheme(darkMode);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
