import { Component } from "@angular/core";
import {Router} from "@angular/router";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "classification";
  constructor(private router: Router) {
  }

  infoIconClick(): void {
    this.router.navigateByUrl("about");
  }

  historyView(): void {
    this.router.navigateByUrl("history");
  }
}
