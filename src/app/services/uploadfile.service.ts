import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buffer } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  loadFH_Data = new BehaviorSubject(false);
  currentLoadFH_Data = this.loadFH_Data.asObservable();


  isAnyData = new BehaviorSubject(false);
  currentIsAnyData = this.isAnyData.asObservable();

  numberOfResults = new BehaviorSubject(false);
  currentNOR = this.numberOfResults.asObservable();


  checkedSubscriptions = new BehaviorSubject(false);;
  currentCheckedSub = this.checkedSubscriptions.asObservable();


  allFilesUploaded = new BehaviorSubject(false);
  currentFilesUploaded = this.allFilesUploaded.asObservable();

  goToCreateTicketFH = new BehaviorSubject(false);
  currentGoToCreateTicketFH = this.goToCreateTicketFH.asObservable();

  showSouscriptionList = new BehaviorSubject(false);
  currentSouscriptionList = this.showSouscriptionList.asObservable();


  // Reponse intermediaire
  showBtnEnvoieReponseIntermedaire = new BehaviorSubject(false);
  currentBtnEnvoieReponseIntermedaire = this.showBtnEnvoieReponseIntermedaire.asObservable();

  constructor() {

  }

  // Reponse intermediaire
  changeShowBtnEnvoieReponseIntermedaire(show: boolean) {
    this.showBtnEnvoieReponseIntermedaire.next(show);
  }

  changeshowSouscriptionList(data: any) {
    this.showSouscriptionList.next(data);
  }

  changeLoadFH_Data(value: boolean) {
    this.loadFH_Data.next(value);
    console.log(this.loadFH_Data.getValue());
  }

  changeIsAnyData(value: boolean) {
    this.isAnyData.next(value);
  }

  changeNumberOfResults(val: any) {
    this.numberOfResults.next(val)
  }

  changeCheckedSub(data: any) {
    this.checkedSubscriptions.next(data);
  }

  changeAllFileUploaded(files: any) {
    this.allFilesUploaded.next(files);
  }

  changegoToCreateTicketFH(val: any) {
    this.goToCreateTicketFH.next(val);
  }
  async  encodeFileToBase64(file: any): Promise<string> {
    const reader = new FileReader();
    let value: any
    return new Promise((resolve, reject) => {
      if(file!=null){
        reader.readAsDataURL(file);
        reader.onload = function () {
          value = reader.result;
          resolve(value);
        };
        reader.onerror = function (error) {
          resolve("");
        };
      }else{
        resolve("");
      }
    });
  }
  bufferToImage(imageBuffer) {
    let val = ""
    try {
      let base64Image = Buffer.from(imageBuffer['data']).toString('base64');
      val = 'data:image/jpg;base64,' + base64Image;
    } catch (error) {
      // console.error("Erreur convert Buffer")
    } finally {
    }
    return val;
  }

}
