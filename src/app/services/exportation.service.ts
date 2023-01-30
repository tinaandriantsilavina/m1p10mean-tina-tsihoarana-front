import { UploadfileService } from 'src/app/services/uploadfile.service';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import { base_url } from 'src/environments/environment';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ExportationService {

  constructor(
    public uploadfileService: UploadfileService
  ) { }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  async sheet(worksheet, cell, value, align = 'left', bold = false, italic = false, underline = false, fcolor = '#000000', bcolor = '#ffffff') {
    let fontcolor = fcolor.substring(1)
    let backcolor = bcolor.substring(1)
    worksheet.getCell(cell).value = value;
    worksheet.getCell(cell).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: backcolor }, bgColor: { argb: backcolor } };
    worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: align };
    worksheet.getCell(cell).font = { color: { argb: fontcolor }, name: 'Arial', family: 3, size: 8, underline: underline, bold: bold, italic: italic };
  }


  async visite_list(eta,tab) {
    let etat = eta ==0 ? 'Non terminé' :"Terminé"
    let index = 4;
    let monnaieform = '_("Ar"* #,##0.00_);_("Ar"* (#,##0.00);_("Ar"* "-"??_);_(@_)';
    let prform = '_(" "* #,##0.00_)"%";_(" "* (#6,##0.00)"%";_(" "* "-"??_)"%";_(@_)';
    let numberform = '_(" "* #,##0.00_);_(" "* (#,##0.00);_(" "* "-"??_);_(@_)';
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Visite");

    const imageBuffer = await axios.get('../../assets/images/logo.png', { responseType: 'arraybuffer' });
    const imageId2 = workbook.addImage({
      buffer: imageBuffer.data,
      extension: 'png',
    });

    worksheet.addImage(imageId2,  'C1:C4');
    worksheet.columns = [
      { key: 'A', width: 25 },
      { key: 'B', width: 60 },
      { key: 'C', width: 20 }
    ];
    this.sheet(worksheet, 'A1', 'Liste Visite', 'left', true, false, true)
    this.sheet(worksheet, 'A2', `Etat: ${etat}`, 'left', true, false, true)
    index++
    this.sheet(worksheet, 'A' + index, 'Visite', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'B' + index, 'Reparation', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'C' + index, 'Status', 'left', true, false, false, '#ffffff', '#0088af')

    for (let i = 0; i < tab.length; i++) {
      index++
      let valueA = tab[i]['date_debut']
      this.sheet(worksheet, 'A' + index, valueA, 'left', true, false, false, '#000000', '#ffffff')

      let status = tab[i]['status'] == 0 ? 'En cours' : (tab[i]['status'] == 1 ? 'Non Payé' : 'terminé')
      this.sheet(worksheet, 'C' + index, status, 'left', true, false, false, '#000000', '#ffaa00')

      for (let u = 0; u < tab[i]['reparations'].length; u++) {
        ['A' + index, 'B' + index, 'C' + index].map(key => {
          worksheet.getCell(key).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        let valueB = `* Pièce: ${tab[i]['reparations'][u]['piece']} ; Durée :  ${tab[i]['reparations'][u]['duree']} ; Prix: ${tab[i]['reparations'][u]['prix']}  Ariary `
        this.sheet(worksheet, 'B' + index, valueB, 'left', false, true, false, '#005039', '#ffffff')
        index++
      }
    }


    workbook.xlsx.writeBuffer().then((data: any) => {
      //console.log("buffer");
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = "Liste Visite.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }


  async bonsortie_list(eta,tab) {
    let etat = eta ==0 ? 'Non Payé' :"Payé"
    let index = 4;
    let monnaieform = '_("Ar"* #,##0.00_);_("Ar"* (#,##0.00);_("Ar"* "-"??_);_(@_)';
    let prform = '_(" "* #,##0.00_)"%";_(" "* (#6,##0.00)"%";_(" "* "-"??_)"%";_(@_)';
    let numberform = '_(" "* #,##0.00_);_(" "* (#,##0.00);_(" "* "-"??_);_(@_)';
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Visite");

    const imageBuffer = await axios.get('../../assets/images/logo.png', { responseType: 'arraybuffer' });
    const imageId2 = workbook.addImage({
      buffer: imageBuffer.data,
      extension: 'png',
    });

    worksheet.addImage(imageId2,  'B1:B4');
    worksheet.columns = [
      { key: 'A', width: 20 },
      { key: 'B', width: 30 },
      { key: 'C', width: 50 },
      { key: 'D', width: 40 },
      { key: 'E', width: 10 }
    ];
    this.sheet(worksheet, 'A1', 'Bon de sortie', 'left', true, false, true)
    this.sheet(worksheet, 'A2', `Etat: ${etat}`, 'left', true, false, true)
    index++
    this.sheet(worksheet, 'A' + index, 'Bon de sortie', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'B' + index, 'Date Payement', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'C' + index, 'Visite', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'D' + index, 'Reparations', 'left', true, false, false, '#ffffff', '#0088af')
    this.sheet(worksheet, 'E' + index, 'Etat', 'left', true, false, false, '#ffffff', '#0088af')


    for (let l of tab) {
      index++
      let valueA = "Bon de sortie de "+l['prix']+" Ariary"
      this.sheet(worksheet, 'A' + index, valueA, 'left', true, false, false, '#000000', '#ffffff')

      let valueB = "Payé le "+l['date_paye']
      this.sheet(worksheet, 'B' + index, valueB, 'left', true, false, false, '#000000', '#ffffff')


      let status = l['etat'] == 0 ? 'Non Payé' : 'Payé'
      this.sheet(worksheet, 'E' + index, status, 'left', true, false, false, '#000000', '#ffaa00')

      let etatC = l['visite_detail']['etat'] == 0 ? 'En cours' : (l['visite_detail']['etat'] == 1 ? 'Non Payé' : 'terminé')
      let valueC = "Visite ==> debut: " +l['visite_detail']['date_debut'] +";  fin: "+l['visite_detail']['date_fin']+";  recup: "+l['visite_detail']['date_recup']+" ;  Etat : "+etatC
      this.sheet(worksheet, 'C' + index, valueC, 'left', true, false, false, '#ffffff', '#d02f00')

      for (let rep of l['visite_detail']['reparations']) {
        ['A' + index, 'B' + index, 'C' + index, 'D' + index, 'E' + index].map(key => {
          worksheet.getCell(key).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        let valueD = `* Pièce: ${rep['piece']} ; Durée :  ${rep['duree']} ; Prix: ${rep['prix']} Ariary`
        this.sheet(worksheet, 'D' + index, valueD, 'left', false, true, false, '#005039', '#ffffff')
        index++
      }
    }


    workbook.xlsx.writeBuffer().then((data: any) => {
      //console.log("buffer");
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      a.download = "Bon de sortie Liste.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

}
