import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cafpi.leader',
  appName: 'leader',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    }
}
};

export default config;
