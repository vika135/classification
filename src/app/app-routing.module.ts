import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FormComponent} from "./component/form/form.component";
import {AboutComponent} from "./component/about/about.component";
import {HttpClient} from '@angular/common/http';


const routes: Routes = [
  {
    path: "",
    redirectTo: "classification",
    pathMatch: "full"
  },
  {
    path: "classification",
    component: FormComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
