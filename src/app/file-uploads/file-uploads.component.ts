import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {UploadItemService} from "./upload-item-service";



@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.css']
})
export class FileUploadsComponent implements OnInit {
  invoiceForm: FormGroup;
  fileToUpload: File = null;
  constructor(
    private _fb: FormBuilder,
    private itemUploadService: UploadItemService) {

  }

  // createForm(){
  //   this.invoiceForm = this._fb.group({
  //     itemRows: this._fb.array([])
  //   });
  //   this.invoiceForm.setControl('itemRows', this._fb.array([]));
  // }

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()]) // here
    });
  }

  get itemRows(): FormArray {
    return this.invoiceForm.get('itemRows') as FormArray;
  }

  addNewRow() {
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    // add new formgroup
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.invoiceForm.controls['itemRows'];
    // remove the chosen row
    control.removeAt(index);
  }

  initItemRows() {
    return this._fb.group({
      // list all your form controls here, which belongs to your form array
      itemname: ['']
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log('uploaded file  ', this.fileToUpload)
  }

  uploadItemsToActivity() {
    this.itemUploadService.postItems(this.fileToUpload, 'hello').subscribe(
      data => {
      console.log('Successs')
    },
      error => {
      console.log(error);
    });
  }

}
