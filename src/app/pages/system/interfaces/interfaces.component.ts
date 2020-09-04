import { Component } from '@angular/core';
import { IndexDbService } from 'src/app/framework/core/services/indexDb.service';
//模型信息
import { MODEL } from './model';

import jt_web from 'jt-web';

@Component({
    selector: 'oms-interfaces',
    styleUrls: ['./interfaces.component.scss'],
    templateUrl: './interfaces.component.html'
})

export class OmsInterfacesComponent {
    // JT数据
    jtData: any;
    // JT数据转为map
    jtMap = new Map();
    // 模型map
    modelMap = new Map();
    // 记录已经赋值模型的产品id
    psIdMap = new Map();
    // 所有模型实例id
    instanceIds = [];

    constructor(
        private indexDbSrv: IndexDbService
    ) {}

    ngOnInit() {
        // 创建数据库
        this.createDB();

        // 获取模型基础数据
        this.getModelBaseData();        
    }

    // 创建数据库
    createDB() {
        this.indexDbSrv.createDb('jt');
    }

    // 基础数据,使用settimeout模拟后台返回
    getModelBaseData() {
        setTimeout(() => {
            this.jtData = MODEL.data;

            // 数据转为map, 后面会在每条数据上添加模型属性 mat64[模型]
            this.data2Map(this.jtData);

            // 在indexedDB数据库中查找模型
            this.indexDbSrv.read(this.instanceIds).subscribe(res => {

                // 设置模型map
                if(res.data && res.data.length ) {
                    this.setModelMap(res.data);
                }

                // 如果从indexedDB中未获取到数据，则从后台请求数据
                if(res.emptyModel && res.emptyModel.length) {
                    this.getModelByModelID(res.emptyModel);
                }else if(res) {
                    this.JTdataAddModel();
                }
            });
        }, 1000);
    }

    // 赋值模型
    setModel(data) {
        this.indexDbSrv.read([3, 4]).subscribe(res => {
            console.log(res);
        });
    }

    // 从后台获取模型, settimeout模拟后台
    getModelByModelID(ids) {
        setTimeout(() => {
            this.indexDbSrv.add(MODEL.models);

            MODEL.models.forEach(it => {
                this.modelMap.set(it.key, it.model);
            })

            this.JTdataAddModel();
        }, 1000);
    }

    // 给JT数据赋值模型信息
    JTdataAddModel() {
        this.psIdMap.clear();

        for(let [key, value] of this.jtMap){
            if(value.modelId) {
                let instanceId = this.psIdMap.get(value.modelId);
                if(this.psIdMap.get(value.modelId)) {
                    value.instanceId = instanceId;
                }else {
                    this.psIdMap.set(value.modelId, value.psId);
                    value.b64data = this.modelMap.get(value.modelId)
                }
            }
        }

        console.log(this.jtData)

        // 渲染模型
        jt_web({
            data: this.jtData,
            cameraPos: { pos: [], rot: [], tgt: [] }
        })
    }

    setModelMap(data) {
        if(Array.isArray(data)) {
            data.forEach(it => {
                this.modelMap.set(it.key, it.model);
            })
        }
    }

    // 将基础数据转为map
    data2Map(data) {
        if(Array.isArray(data)) {
            data.forEach(it => {
                this.data2Map(it);
            })
        }else {
            this.jtMap.set(data.psId, data);

            // 获取所有模型实例ID
            if(data.modelId !== undefined && !this.instanceIds.includes(data.modelId)) {
                this.instanceIds.push(data.modelId)
            }

            if(data.children && data.children.length) {
                this.data2Map(data.children);
            }
        }
    }

    ngOnDestroy() {
        this.indexDbSrv.closeDB();
    }

}