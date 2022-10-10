import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from '../servers.service';

interface Server {
    id: number;
    name: string;
    status: string;
}

//Resolve is a generic type & it should wrap whichever item or data field will get here, will fetch here in the end.
@Injectable()
export class ServerResolver implements Resolve<Server> {// the above interface Server is been used in Resolve<Server>we will fetch server here.
    constructor(private serversService: ServersService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> |
    Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);// is the easiest way of using resolver loading our data in advance & now this would also work if this were to return an observable or promise
    }
}