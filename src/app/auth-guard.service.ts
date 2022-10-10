import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { //So canActivate can run both asynchronously, returning an observable or a promise or synchronously 
       return this.authService.isAuthenticated() 
       .then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);//NOTE: After navigating away, u may also 'return false' - though u will prevent the original navigation from happening anyways.
                }
            }
       );
    }

    canActivateChild(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {//route, state, observable so these are the things used to access canActivateChild
            return this.canActivate(route, state);
    }  
}