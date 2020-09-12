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
    // 哪些属性变化需要更新indexedDB
    updateKeys = ['version', 'title'];

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
            this.indexDbSrv.read(this.instanceIds, this.updateKeys).subscribe(res => {
                console.log(res)
                // 设置模型map
                if(res.data && res.data.length ) {
                    this.setModelMap(res.data);
                }

                // 如果从indexedDB中未获取到数据，则从后台请求数据
                if(res.emptyModel && res.emptyModel.length) {
                    this.getModelByModelID(res.emptyModel);
                }
                if(res.updateModel && res.updateModel.length){
                    this.updateModelByModelID(res.updateModel);
                }
                if(res && !res.updateModel.length && !res.emptyModel.length) {
                    this.JTdataAddModel();
                }
            });
        }, 1000);
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

    // 跟新模型, 往后台传入id和版本信息
    updateModelByModelID(models) {
        setTimeout(() => {
            this.indexDbSrv.update(models);

            models.forEach(it => {
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

        // 渲染模型
        jt_web({
            data: this.jtData,
            points: MODEL.points,
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
            if(data.modelId !== undefined && this.instanceIds.indexOf(it => it.modelId === data.modelId) === -1) {
                let instanceData = { modelId: data.modelId };

                for(let i=0; i< this.updateKeys.length; i++){
                    let key = this.updateKeys[i];

                    instanceData[key] = data[key];
                }
                
                this.instanceIds.push(instanceData)
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