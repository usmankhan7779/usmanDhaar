import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UploadItemService {

  ServerUrl = 'https://apis.dhaar.pk/products/';

  constructor(private _http : HttpClient) {

  }

  postItems(fileToUpload: File, productID): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('input_file', fileToUpload, fileToUpload.name);
    formData.append('productID', productID);

    return this._http.post(this.ServerUrl+'picUploadTest', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }
}
