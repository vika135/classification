import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassificationService} from "../../service/classification.service";
import {ClassificationRequest} from "../../model/request.model";
import {ClassificationResponse} from "../../model/response.model";

@Component({
  selector: "clf-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.less"]
})
export class FormComponent implements OnInit {
  public itemForm: FormGroup;
  public serverError: boolean = false;
  private clfList = [];
  public text: string;
  public clfResult: ClassificationResponse;
  public atLeastOneClfChecked = false;
  public loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private classificationService: ClassificationService
  ) {
    this.itemForm = this.formBuilder.group({
      clfListForm: new FormGroup({
        sklearn_bayes: new FormControl(),
        my_bayes: new FormControl(),
        sklearn_knn: new FormControl(),
        my_knn: new FormControl(),
      }),
      text: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
  }

  public clfCheck(event, clfName): void {
    // tslint:disable-next-line:no-unused-expression
    event.checked && this.clfList.push(clfName);
    // tslint:disable-next-line:no-unused-expression
    !event.checked && (this.clfList = this.clfList.filter(clf => clf !== clfName));

    this.atLeastOneClfChecked = Object.entries(this.itemForm.value.clfListForm).some(([, value]) => value);
  }

  submit(): void {
    this.loading = true;
    const request: ClassificationRequest = {
      clf_list: this.clfList,
      text: this.itemForm.value.text
    };
    this.classificationService.classifyText(request).subscribe(
      res => {
        this.clfResult = res;
        this.loading = false;
        this.serverError = false;
        console.log(this.clfResult);
      },
      err =>  {
        if (err.status !== 200) {
          this.serverError = true;
        }
        this.loading = false;
      }
    );
  }

  closeAlert(): void {
    this.serverError = false;
  }

  backFromResultPage(): void {
    this.clfResult = null;
  }
}
