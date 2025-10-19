// A simple service to handle browser notifications.

interface NotificationOptions {
  body: string;
  icon?: string;
}

class NotificationService {
  private permission: NotificationPermission = 'default';

  constructor() {
    // Check if the Notification API is available in the window
    if ('Notification' in window) {
      this.permission = Notification.permission;
    } else {
      console.warn('This browser does not support desktop notification');
    }
  }

  /**
   * Requests permission from the user to show notifications.
   * @returns The permission status ('granted', 'denied', or 'default').
   */
  public async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
    return this.permission;
  }

  /**
   * Gets the current notification permission status.
   */
  public getPermission(): NotificationPermission {
    return this.permission;
  }

  /**
   * Shows a notification if permission has been granted.
   * @param title The title of the notification.
   * @param options The body and other options for the notification.
   */
  public showNotification(title: string, options: NotificationOptions): void {
    if (this.permission === 'granted') {
      // We can add a custom icon later if we have one hosted.
      new Notification(title, options);
    }
  }
}

// Export a singleton instance of the service
export const notificationService = new NotificationService();
