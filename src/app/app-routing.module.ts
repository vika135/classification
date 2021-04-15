import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FormComponent} from "./component/form/form.component";
import {AboutComponent} from "./component/about/about.component";


const routes: Routes = [
  {
    path: "",
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
