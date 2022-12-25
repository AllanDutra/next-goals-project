import { TypeOptions } from "react-toastify/dist/types";
import { RELOAD_NOTIFICATION } from "../../configs";

export interface ReloadNotificationProps {
  message: string;
  type: TypeOptions;
}

const notifyOnReload = (reloadNotification: ReloadNotificationProps) => {
  sessionStorage.setItem(
    RELOAD_NOTIFICATION,
    JSON.stringify(reloadNotification)
  );

  window.location.reload();
};

export const Notify = { notifyOnReload };
