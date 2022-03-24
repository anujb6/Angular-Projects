import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  //connect frontend to backend using http client
  apiUrl = "https://x5uj7t-4000.sse.codesandbox.io/users";
  //get all the data from server
  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }
  //create data
  createData(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }
  //delete data by id
  deleteData(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }
  //Update data by id
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.post(`${this.apiUrl}/${ids}`, data);
  }
  //get data by id
  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}
