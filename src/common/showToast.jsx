// src/utils/toastUtils.js
import { toast } from "react-hot-toast";

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    case "info":
      toast(message); // default/info
      break;
    default:
      console.warn("Unknown toast type:", type);
  }
};
