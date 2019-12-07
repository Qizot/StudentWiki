import { ServiceMessage } from './service-message';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



interface Options {
    duration: number;
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
}

const defaultOptions: Options = {
    duration: 4000,
    horizontalPosition: "left",
    verticalPosition: "bottom"
};

export const displaySnackbar = (
    message: ServiceMessage, 
    snackbar: MatSnackBar,
    options?: Options
) => {
    snackbar.open(message.message, '', {
      ...defaultOptions, 
      ...options,
      panelClass: message.success ? "success-snackbar" : "failure-snackbar"
    });
}