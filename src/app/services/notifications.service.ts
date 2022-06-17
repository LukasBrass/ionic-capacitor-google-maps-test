import { Injectable } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import { FCM } from '@capacitor-community/fcm';
import { ActionPerformed, PushNotificationActionPerformed, PushNotifications } from '@capacitor/push-notifications';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
    private notificationNumber$ = new BehaviorSubject<number>(0);
    private notificationNumber = 0;

    private notificationDataList$ = new BehaviorSubject<Array<any>>([]);
    private notificationDataList = new Array();

    constructor() { }

    initPush() {
        if (Capacitor.getPlatform() !== 'web') {
            this.registerPush();
        }
    }

    public getNotificationNumber(): Observable<number> {
      return this.notificationNumber$;
    }

    public setNotificationNumber(value: number): void {
      this.notificationNumber$.next(value);
    }

    public getNotificationDataList(): Observable<Array<any>> {
      return this.notificationDataList$;
    }

    public setNotificationDataList(list: Array<any>): void {
      this.notificationDataList$.next(list);
    }

    private registerPush() {
        PushNotifications.requestPermissions().then(permission => {
          console.log(permission);
            if (permission.receive === 'granted') {
                PushNotifications.register();
                console.log('here');
            }
            else {
                // If permission is not granted
            }
        });
        if (Capacitor.getPlatform() === 'ios') {
// Get FCM token instead the APN one returned by Capacitor
        FCM.getToken()
          .then((r) => {
            alert(`Token ${r.token}`)
            console.log(r);
          })
          .catch((err) => console.log(err));
          console.log("token received");
        } else {
          PushNotifications.addListener('registration', (token) => {
            console.log(token.value);
            console.log('here again');
              console.log(token);
              console.log(token.toString())
          });
        }

        PushNotifications.addListener('registrationError', (err)=> {
            console.log(err);
        });

        PushNotifications.addListener('pushNotificationReceived', (notifications: Object) => {
            this.notificationNumber += 1;
            this.setNotificationNumber(this.notificationNumber);
            this.notificationDataList.push(notifications);
            this.setNotificationDataList(this.notificationDataList);
        });

        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          async (notification: ActionPerformed) => {
            const data = notification.notification.data;
            //console.log('Action performed: ' + JSON.stringify(notification.notification));
            if (data.detailsId) {
              //console.log('details ID: ' + data.detailsId)
            }
          }
        );
    
    }
}