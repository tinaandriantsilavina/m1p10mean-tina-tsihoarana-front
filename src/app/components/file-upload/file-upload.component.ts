import { UploadfileService } from './../../services/uploadfile.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  files: any[] = [];
  subscription: Subscription;


  /**
   * on file drop handler
   */

  constructor(
    private sm_fh: UploadfileService
  ) {

  }
  ngOnInit(): void {

    //  Load all files if exist
    this.subscription = this.sm_fh.currentFilesUploaded.subscribe((allFiles) => {

      if (this.sm_fh.allFilesUploaded.getValue() != null) {
        // // alert("99")
        // this.loadFH_Data = loadFH;
        // if (this.loadFH_Data) {
        //   this.getAllFHData();
        // }
        this.files = allFiles;
      }

    })
  }

  ngDestroy() {
    this.subscription.unsubscribe();
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          let tmp = this.files[index];

          if (tmp) {
            if (tmp.progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1);
            } else {
              this.files[index].progress += 5;
            }
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);

    // Update file list
    this.sm_fh.changeAllFileUploaded(this.files);
    console.log("--------MAC-------->", this.files);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
