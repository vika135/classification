import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {FormComponent} from "./component/form/form.component";
import {AboutComponent} from "./component/about/about.component";
import {HistoryComponent} from "./component/history/history.component";


const routes: Routes = [
  {
    path: "",
    component: FormComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "history",
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
