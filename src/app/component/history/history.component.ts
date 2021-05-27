import { Component, OnInit } from "@angular/core";
import {ClassificationResponse} from "../../model/response.model";
import {Classifiers} from "../../const/classifiers.const";
import {Router} from '@angular/router';

@Component({
  selector: "clf-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.less"]
})
export class HistoryComponent implements OnInit {
  CLASSIFIERS_ENUM = Classifiers;

  public storage: (ClassificationResponse & { text: string })[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.storage = JSON.parse(window.localStorage.getItem("storage"));
  }

  goBack(): void {
    this.router.navigateByUrl("");
  }

}
