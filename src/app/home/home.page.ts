import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NgZone, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {

  notificationNumber: number;
  notificationDataList: Array<any>;
  newMap = GoogleMap;

  constructor(
    private notificationService : NotificationsService,
    private zone: NgZone,
    ) {}

  async ngOnInit(): Promise<void> {
    this.notificationService.getNotificationNumber().subscribe(value => {
      this.zone.run(() => {
        this.notificationNumber = value;
      })
    })

    this.notificationService.getNotificationDataList().subscribe(dataList => {
      this.zone.run(() => {
        this.notificationDataList = dataList;
      })
    })

    console.log(document.getElementById('map'));
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.createMap();
    }, 1000);
  }


  createMap() {
    GoogleMap.create({
      id: 'map',
      element: document.getElementById('map'),
      apiKey: "YOUR_API_KEY_HERE",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    })
  }

  resetBadgeCount() {
    this.notificationService.setNotificationNumber(0);
    this.notificationService.setNotificationDataList([]);
  }

}
