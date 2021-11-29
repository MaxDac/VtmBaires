// @flow

export const requestDesktopNotificationPermission = () => {
    Notification.requestPermission(perm => console.debug("permission", perm));
};

export const showDesktopNotification = (title: string, text: string, tag?: string) => {
    if (Notification.permission === "granted") {
        const notification = new Notification(title, {
            dir: "auto",
            lang: "IT-it",
            body: text,
            tag: tag
        });
        console.debug("new notification", notification);
    }
    else {
        console.warn("Notifications not allowed");
    }
}