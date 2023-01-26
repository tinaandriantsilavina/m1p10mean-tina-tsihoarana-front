import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.min.js'
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExportationService {

  constructor() { }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  sheet(worksheet,cell,value,align='left',bold=false,italic=false,underline=false, fcolor='#000000', bcolor='#ffffff'){
    let fontcolor=fcolor.substring(1)
    let backcolor=bcolor.substring(1)
    worksheet.getCell(cell).value=value;
    worksheet.getCell(cell).fill= { type: 'pattern',pattern: 'solid', fgColor: { argb: backcolor },bgColor: { argb: backcolor }};
    worksheet.getCell(cell).alignment = {vertical: 'middle',horizontal: align};
    worksheet.getCell(cell).font = {color:{ argb: fontcolor },name: 'Arial',family: 3,size: 8,underline: underline, bold: bold, italic:italic};
}


  visite_list(tab) {
    let index=4;
    let monnaieform= '_("Ar"* #,##0.00_);_("Ar"* (#,##0.00);_("Ar"* "-"??_);_(@_)';
    let prform= '_(" "* #,##0.00_)"%";_(" "* (#6,##0.00)"%";_(" "* "-"??_)"%";_(@_)';
    let numberform= '_(" "* #,##0.00_);_(" "* (#,##0.00);_(" "* "-"??_);_(@_)';
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("SB");

    worksheet.columns = [
      { key: 'A', width: 25 },
      { key: 'B', width: 60 },
      { key: 'C', width: 20 }
    ];

    this.sheet(worksheet,'A1','Liste Visite','left',true,false,true)
    this.sheet(worksheet,'A2','Status','left',true,false,true)
     index++
    this.sheet(worksheet,'A'+index,'Visite','left',true,false,false,'#ffffff','#0088af')
    this.sheet(worksheet,'B'+index,'Reparation','left',true,false,false,'#ffffff','#0088af')
    this.sheet(worksheet,'C'+index,'Status','left',true,false,false,'#ffffff','#0088af')

    for(let i=0; i<tab.length ; i++){
      index++
      let valueA = tab[i]['date_debut']
      this.sheet(worksheet,'A'+index,valueA,'left',true,false,false,'#000000','#ffffff')

      let status = tab[i]['status']==0 ? 'En cours' : (tab[i]['status']==1 ? 'Non Payé': 'terminé')
      this.sheet(worksheet,'C'+index, status ,'left',true,false,false,'#000000','#ffaa00')

      for(let u =0 ; u<tab[i]['reparations'].length ; u++){
        ['A'+index,'B'+index,'C'+index].map(key => {
          worksheet.getCell(key).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        let valueB = `* Pièce: ${tab[i]['reparations'][u]['piece']} ; Durée :  ${tab[i]['reparations'][u]['duree']} ; Prix: ${tab[i]['reparations'][u]['prix']} `
        this.sheet(worksheet,'B'+index,valueB,'left',false,true,false,'#005039','#ffffff')
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




}
