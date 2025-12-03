import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "./user.service";

export const authGuard: CanActivateFn = () => {

    const auth = inject(UserService);
    const router = inject(Router);

    const token = auth.getToken();

    if(token) {
        return true;
    }

    router.navigate(['/auth']);
    return false;
};
