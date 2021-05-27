import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassificationRequest} from "../model/request.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClassificationService {
  private options = { headers: new HttpHeaders().set("Content-Type", "application/json") };

  constructor(private httpClient: HttpClient) { }

  public classifyText(request: ClassificationRequest): Observable<any> {
    return this.httpClient.post(environment.apiEndpoint, request);
  }

  public classifyTextFile(request: ClassificationRequest): Observable<any> {
    return this.httpClient.post(environment.apiEndpoint, request, {responseType: "text"});
  }
}
