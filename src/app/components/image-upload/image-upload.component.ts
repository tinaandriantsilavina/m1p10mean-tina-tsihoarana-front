import { Component } from '@angular/core';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  url: any;
  msg = "";
  image : any;
  selectFile(event: any) {
    this.url = ""
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
    this.image = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

  deleteFile(){
    this.url = "";
    this.image  = null;
  }
}
