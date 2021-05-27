import {Component, EventEmitter, Input, OnInit } from "@angular/core";
import {ClassificationResponse, ClassifierStatistics, Result} from "../../model/response.model";
import {Classifiers} from "../../const/classifiers.const";
import {LocalStorageService} from "../../service/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: "clf-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.less"]
})
export class ResultComponent implements OnInit {
  @Input() result: ClassificationResponse;

  public dataSource: (Result & { name: string})[] = [];
  public displayedColumns: string[] = ["name", "category", "confidence"];
  public statisticsPopupOpen: boolean = false;
  public currentStatistics: ClassifierStatistics[];
  public eventX: number;
  public eventY: number;

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.result?.result.forEach(res => {
      this.dataSource.push({name: Classifiers[res.classifier], ...res});
    });
  }

  onStatisticsOpen(event: MouseEvent, result: Result): void {
    this.statisticsPopupOpen = true;
    this.currentStatistics = result.statistics;
    this.eventX = event.pageX;
    this.eventY = event.pageY;
  }

  goBack(): void {
    this.router.navigateByUrl("");
  }
}
