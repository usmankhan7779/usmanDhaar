import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {UploadItemService} from "./upload-item-service";
import swal from 'sweetalert2';



@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.css']
})
export class FileUploadsComponent implements OnInit {
  invoiceForm: FormGroup;
  fileToUpload: File = null;
  fileToUpload1: File = null;
  fileToUpload2: File = null;
  filetoup:any = [];
  fileName: any;
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
    if (files.length>3){
      swal('You can upload maximum 3 images','','error')
    } else if (files.length ===3) {
      this.fileToUpload = files.item(0);
      this.fileToUpload1 = files.item(1);
      this.fileToUpload2 = files.item(2);
      this. filetoup = [this.fileToUpload,this.fileToUpload1,this.fileToUpload2];
      this.fileName = this.fileToUpload.name + ',' + this.fileToUpload1.name + ',' + this.fileToUpload2.name;
      console.log('File Name is:' ,this.fileName);
      console.log('uploaded file  ', this.fileToUpload);
      console.log('uploaded file1  ', this.fileToUpload1);
      console.log('uploaded file2  ', this.fileToUpload2);
      console.log('uploaded filetoup  ', this.filetoup);
    } else if (files.length === 2) {
      this.fileToUpload = files.item(0);
      this.fileToUpload1 = files.item(1);
      this.fileName = this.fileToUpload.name + ',' + this.fileToUpload1.name;
      this. filetoup = [this.fileToUpload,this.fileToUpload1];
      console.log('File Name is:' ,this.fileName);
    } else if (files.length === 1) {
      this.fileToUpload = files.item(0);
      this. filetoup = [this.fileToUpload];
      this.fileName = this.fileToUpload.name;
      console.log('File Name is:' ,this.fileName);
    }
  }

  uploadItemsToActivity() {
    if (this.filetoup.length === 1) {
      console.log('I am in 1 Component');
      this.itemUploadService.postOneImage(this.filetoup, 'hello', 'hh').subscribe(
        data => {
          console.log('Successs')
        },
        error => {
          console.log(error);
        });
    } else if (this.filetoup.length === 2) {
      console.log('I am in 2 Component');
      this.itemUploadService.postTwoImage(this.filetoup, 'hello', 'hh').subscribe(
        data => {
          console.log('Successs')
        },
        error => {
          console.log(error);
        });
    } else {
      console.log('I am in 3 Component');
      this.itemUploadService.postThreeImage(this.filetoup, 'hello', 'hh').subscribe(
        data => {
          console.log('Successs')
        },
        error => {
          console.log(error);
        });
    }
  }

}
