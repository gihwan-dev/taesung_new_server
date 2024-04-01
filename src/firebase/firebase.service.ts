import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import * as CREDENTIALS from 'src/json/taesung-25dc0-firebase-adminsdk-zxjdj-efc21df5fd.json';

@Injectable()
export class FirebaseService {
  private readonly firebaseAdmin: admin.app.App;

  constructor() {
    if (admin.apps.length === 0) {
      // Firebase Admin이 아직 초기화되지 않았는지 확인
      this.firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(CREDENTIALS as admin.ServiceAccount),
      });
    } else {
      this.firebaseAdmin = admin.app(); // 이미 초기화된 인스턴스 반환
    }
  }

  async sendNotifications(message: MulticastMessage) {
    return await this.firebaseAdmin.messaging().sendEachForMulticast(message);
  }
}
