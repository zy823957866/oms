import { Component, Injector, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'oms-download-column',
    styleUrls: ['./download-column.component.scss'],
    templateUrl: './download-column.component.html'
})

export class OmsDownloadColumnComponent {
    //列数据
    public tableColumnList: any=[];
    //是否为全选
    public checked: boolean=false;
    //是否为半选
    public indeterminate: boolean=false;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private baseInjector: Injector,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.setList();
    }

    setList() {
        this.tableColumnList = [];
        this.data.forEach(item => {
            this.tableColumnList.push(Object.assign({}, item, {
                ifDisplay: !item.hideDownload ? (item.ifDisplay === undefined ? true : item.ifDisplay) : false
            }))
        });

        //最大选中的条数(ps: 申报下载时候一次性最多下载20条数据)
        // if(this.data.maxSelect) {
        //     this.tableColumnList.filter(item => item.ifDisplay).forEach((child,index) => child.ifDisplay = index < this.data.maxSelect ? true : false);
        // }

        this.isSelectedAll();
    }

    onReset() {
        this.setList();
    }

    onSave() {
        this.dialogRef.close(this.tableColumnList);
    }

    //选择所有
    checkedAll() {
        this.tableColumnList.forEach(item => {
            if(item.ifDisplay !== undefined)
            item.ifDisplay = this.checked;
        })
    }

    checkedItem(item) {
        this.isSelectedAll();
    }

    //判断为全选还是半选
    isSelectedAll() {
        let _all = this.tableColumnList.filter(item => item.ifDisplay !== undefined).length;
        let _selected = this.tableColumnList.filter(item => item.ifDisplay).length;

        if(_all === _selected) {
            this.indeterminate = false;
            this.checked = true;
        }else if(_selected === 0) {
            this.indeterminate = false;
            this.checked = false;
        }else {
            this.indeterminate = true;
            this.checked = false;
        }
    }
}
