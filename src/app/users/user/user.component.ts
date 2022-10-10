import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';//Subscription

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;//this params subscription property is bound to the subscription.

  constructor(private route: ActivatedRoute) { }
  //The ActivatedRoute object we injected will give us access to the id passed in the url and also give access to the currently loaded route.
  //passed in the URL => Selected User.

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    this.paramsSubscription = this.route.params//this.route.params so params here is an observable 
    //So observable is an easy way to subscribe to some event which might happen in the future, to then execute some code when it happens without having to wait for it now and tatis what params is. 
    //135: Fetching Route Parameters Reactively.
      .subscribe(
        (params: Params) => { //so Params will alwz be an object just like here on the snapshot which holds the parameters tat defined inthe route as properties.
          //subscribe to our params to update them or to react to any changes and update the page.
          this.user.id = params['id'];
          this.user.name = params['name']; //So this will now update our user object whenever the parameter change.
          //we will exchange the above params every time in users object.
        }
      );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
