import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassificationService} from "../../service/classification.service";
import {ClassificationRequest} from "../../model/request.model";
import {ClassificationResponse} from "../../model/response.model";
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: "clf-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.less"]
})
export class FormComponent implements OnInit {
  public showForm: boolean = false;

  public itemForm: FormGroup;
  public serverError: boolean = false;
  private clfList = [];
  public text: string;
  public clfResult: ClassificationResponse;
  public fileClfResult: string;
  public atLeastOneClfChecked = false;
  public loading: boolean = false;
  public textFile: string;
  public textFileArray: string[] = [];
  public fileOption: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private classificationService: ClassificationService,
              private localStorageService: LocalStorageService
  ) {
    this.itemForm = this.formBuilder.group({
      clfListForm: new FormGroup({
        sklearn_bayes: new FormControl(),
        my_bayes: new FormControl(),
        sklearn_knn: new FormControl(),
        my_knn: new FormControl(),
      }),
      text: new FormControl("", this.fileOption ? Validators.required : null),
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
    this.fileOption ?  this.classifyText(null, true) : this.classifyText(this.itemForm.value.text);
  }

  closeAlert(): void {
    this.serverError = false;
  }

  backFromResultPage(): void {
    this.clfResult = null;
  }

  private classifyText(text?: string, textFile?: boolean): void {
    this.loading = true;
    const request: ClassificationRequest = {
      clf_list: this.clfList,
    };
    textFile ? request.textArray = this.textFileArray : request.text = text;

    if (!textFile) {
      this.classificationService.classifyText(request).subscribe(
        res => {
          this.clfResult = res;
          this.loading = false;
          this.serverError = false;
          this.localStorageService.saveInStorage(this.clfResult, request.text);
        },
        err =>  {
          if (err.status !== 200) {
            this.serverError = true;
          }
          this.loading = false;
        }
      );
    }

    if (textFile) {
      this.classificationService.classifyTextFile(request).subscribe(
        res => {
          this.fileClfResult = res;
          this.download("classification_report.txt", this.fileClfResult);
          this.loading = false;
          this.serverError = false;
        },
        err =>  {
          if (err.status !== 200) {
            this.serverError = true;
          }
          this.loading = false;
        }
      );
    }
  }

  async handleFileInput(files: FileList): Promise<void> {
    this.textFile = await this.readText(files.item(0));
    this.textFileArray = this.textFile.split("\n");
  }

  private readText(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file, "ANSI");
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  private download(filename, text): void {
    console.log("dowload");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    // document.body.removeChild(element);
  }
}
