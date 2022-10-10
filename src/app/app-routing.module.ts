import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    //It should be array becoz there will be multiple routes.
    //Each route is just a js object in this array.
    { path: '', component: HomeComponent }, //empty path for home
    { path: 'users', component: UsersComponent, children: [ //also path without slash
    //we named id below so we can retrieve id from the params object - at user.component.ts- ngOnInit().
      { path: ':id/:name', component: UserComponent }//children property -below, where children property takes another arrayof routes.
    ] },//adding above :id/:name as dynamic part
    { 
      path: 'servers', 
    //canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], //AuthGuard protects single aswell as child Guard.
    component: ServersComponent, 
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },//map all the resolvers in resolve array
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
    //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },//This message property is been used in ErrorPageComponent.
    { path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})//usehash - after localhost:4200 - which means we have this # in our hashtag in our URL.
    ],
    exports: [RouterModule]//export insense tells tat from this module add this module to imports of another module.
})
export class AppRoutingModule {

}