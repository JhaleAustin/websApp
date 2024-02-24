import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = (message, type) => {
  switch (type) {
    case "success":
      return toast.success(
        <div>
          <p>{message}</p>
        </div>,{
            position: toast.POSITION.BOTTOM_RIGHT
        }
      );
    case "error":
      return toast.error(
        <div>
          <p>{message}</p>
        </div>, {
            position: toast.POSITION.BOTTOM_RIGHT
        }
      );
    case "warning":
      return toast.warning(
        <div>
          <p>{message}</p>
        </div>, {
            position: toast.POSITION.BOTTOM_RIGHT
        }
      );
    default:
      return toast.warning(
        <div>
          <p>Toast not defined...</p>
        </div>
      );
  }
};
export default Toast;