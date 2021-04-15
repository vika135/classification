import { Component, OnInit } from "@angular/core";
import {Router} from '@angular/router';

@Component({
  selector: "clf-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.less"]
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigateByUrl("classification");
  }
}
