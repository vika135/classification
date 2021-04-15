import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ClassificationResponse} from "../../model/response.model";
import {Classifiers} from '../../const/classifiers.const';

export interface ResultRow {
  name: string;
  category: string;
  confidence: string;
}

@Component({
  selector: "clf-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.less"]
})
export class ResultComponent implements OnInit {
  @Input() result: ClassificationResponse;

  public dataSource: ResultRow[] = [];

  public displayedColumns: string[] = ["name", "category", "confidence"];

  constructor() { }

  ngOnInit(): void {
    this.result?.result.forEach(res => {
      this.dataSource.push({name: Classifiers[res.classifier], category: res.category, confidence: res.confidence});
    });
  }

  showAdditionalStatistics(element: ResultRow): void {
    console.log(element);
  }
}
