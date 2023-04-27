import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private themeSvc: ThemeService) {
    this.themeSvc.setInitialTheme();
  }

  ngOnInit(): void {
    if (isPlatform('hybrid')) {
      StatusBar.setBackgroundColor({ color: '#ea125e' });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.show();
    } else {
      console.log('Estoy en web');
    }
  }
}
