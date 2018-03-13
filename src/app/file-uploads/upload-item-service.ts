import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UploadItemService {

  ServerUrl = 'https://apis.dhaar.pk/products/';

  constructor(private _http : HttpClient) {

  }

  postOneImage(fileToUpload: FileList,StoreName, ProductID): Observable<boolean> {
    console.log('I am in 1 Service');
    const formData: FormData = new FormData();
    console.log('File to upload in service is:', fileToUpload);
    formData.append('input_file0', fileToUpload[0]);
    formData.append('ProductID', ProductID);
    formData.append('StoreName', StoreName);

    return this._http.post(this.ServerUrl+'onePicUpload', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }

  postTwoImage(fileToUpload: FileList,StoreName, ProductID): Observable<boolean> {
    console.log('I am in 2 Service');
    const formData: FormData = new FormData();
    console.log('File to upload in service is:', fileToUpload);
    formData.append('input_file0', fileToUpload[0]);
    formData.append('input_file1', fileToUpload[1]);
    formData.append('ProductID', ProductID);
    formData.append('StoreName', StoreName);

    return this._http.post(this.ServerUrl+'twoPicUpload', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }

  postThreeImage(fileToUpload: FileList,StoreName, ProductID): Observable<boolean> {
    console.log('I am in 3 Service');
    const formData: FormData = new FormData();
    console.log('File to upload in service is:', fileToUpload);
    formData.append('input_file0', fileToUpload[0]);
    formData.append('input_file1', fileToUpload[1]);
    formData.append('input_file2', fileToUpload[2]);
    formData.append('ProductID', ProductID);
    formData.append('StoreName', StoreName);

    return this._http.post(this.ServerUrl+'threePicUpload', formData)
      .map((d) => { return true; })
      .catch((e) => {
        return Observable.throw(e.statusText);
      });
  }
}
