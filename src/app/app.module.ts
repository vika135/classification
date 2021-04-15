import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {ClassificationService} from "./service/classification.service";
import { FormComponent } from "./component/form/form.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from "./component/about/about.component";
import { HttpClientModule } from "@angular/common/http";
import { ResultComponent } from "./component/result/result.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AboutComponent,
    ResultComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatExpansionModule
    ],
  providers: [ClassificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
