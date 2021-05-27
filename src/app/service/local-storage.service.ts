import { Injectable } from "@angular/core";
import {ClassificationResponse, Result} from "../model/response.model";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  private storage: (ClassificationResponse & { text: string })[] = [];

  constructor() { }

  public saveInStorage(result: ClassificationResponse, text: string): void {
    if (window.localStorage.getItem("storage")) {
      this.storage = JSON.parse(window.localStorage.getItem("storage"));
      window.localStorage.removeItem("storage");
      console.log(this.storage.length);
      if (this.storage.length > 2) {
        this.deleteOldestFromStorage();
      }
    }
    this.storage.push({text, ...result});
    window.localStorage.setItem("storage", JSON.stringify(this.storage));
  }

  private deleteOldestFromStorage(): void {
    this.storage.shift();
  }
}
