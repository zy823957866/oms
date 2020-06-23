import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { WorkBook } from "xlsx";
import { DatePipe } from "@angular/common"
import { MomentService } from "./moment.service";

/**
 * 浏览器导出excel服务(前台生成excel,不消耗后台资源,进线小数据量使用)
 */
@Injectable()
export class ExcelService {

    defaultCellStyle = { font: { name: "Verdana", sz: 11, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } };

    constructor(
        private datePipe: DatePipe,
        private _moment: MomentService) {
    }

    //解析时间
    private dataFormat(data, type: any = 'yyyy-MM-dd') {
        if (data instanceof Date) {
            type = type.replace(/H/g, 'h');
            return this._moment.dateFormat(type, data);
        } else {
            return data;
        }
    }

    private createSheet(data) {
        return XLSX.utils.json_to_sheet(data);
    }

    private string2ArrayBuffer(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    export2xlsx(data, name) {
        let fileName = name + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let wb: WorkBook = { SheetNames: [], Sheets: {} };
        let ws = this.createSheet(data);
        wb.SheetNames.push(fileName);
        wb.Sheets[fileName] = ws;

        let wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });

        saveAs(
            new Blob(
                [this.string2ArrayBuffer(wbout)],
                {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                }), fileName + ".xlsx");
    }

    export2xls(data, name) {
        let fileName = name + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let wb: WorkBook = { SheetNames: [], Sheets: {} };
        let ws = this.createSheet(data);

        wb.SheetNames.push(fileName);
        wb.Sheets[fileName] = ws;

        let wbout = XLSX.write(wb, {
            bookType: 'xls',
            bookSST: false,
            type: 'binary'
        });

        saveAs(new Blob([this.string2ArrayBuffer(wbout)], {
            type: "application/vnd.ms-excel;charset=utf-8"
        }), fileName + ".xls");
    }

    getHeaders(data) {
        let headers = [];
        for (let i in data) {
            headers.push(i);
        }
        return headers;
    }

    export2csv(data, name) {
        let fileName = name + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let dataHeader = data;
        var csvText = '';
        if (data.length > 0) csvText = '\ufeff';
        dataHeader.unshift(this.getHeaders(dataHeader[0]));
        for (var i = 0; i < dataHeader.length; i++) {
            var subData = dataHeader[i];
            if (i != 0) {
                csvText = csvText + '\r\n';
            }
            let m = 0;
            for (let j in subData) {
                if (m == 0) {
                    csvText = csvText + this.dataFormat(subData[j]);
                } else {
                    csvText = csvText + ',' + this.dataFormat(subData[j]);
                }
                m++;
            }
        }
        saveAs(new Blob([csvText], {
            type: "text/plain;charset=utf-8"
        }), fileName + ".csv");
    }

    export2txt(data, name) {
        let fileName = name + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let dataHeader = data;
        var txtText = '';
        dataHeader.unshift(this.getHeaders(dataHeader[0]));
        for (var i = 0; i < dataHeader.length; i++) {
            var subData = dataHeader[i];
            if (i != 0) {
                txtText = txtText + '\r\n';
            }
            let m = 0;
            for (let j in subData) {
                if (m == 0) {
                    txtText = txtText + this.dataFormat(subData[j]);
                } else {
                    txtText = txtText + '	' + this.dataFormat(subData[j]);
                }
                m++;
            }
        }
        saveAs(new Blob([txtText], {
            type: "text/plain;charset=utf-8"
        }), fileName + ".txt");

    }

    read(file, component) {
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = function (ev) {
            let data = ev.target['result'];
            let workbook = XLSX.read(data, { type: 'array' });
            let sheet = workbook.Sheets[workbook.SheetNames[0]];
            let jSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            component.buildTextValue(jSheet);
        }
    }
}