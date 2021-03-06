import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// 返回信息状态
const STATUS = {
    SUCCESS: 200,
    ERROR: 1
};

@Injectable()

export class IndexDbService {
    // 当前仓库名称
    storeName: string = 'jtModels';
    // 数据库名称
    dbName: string = '';
    // 主键
    keyPath: string = 'key';
    // 数据库
    indexedDB;
    // 数据仓库
    db;

    // 订阅模式返回数据
    cb: BehaviorSubject<any> = new BehaviorSubject('');


    constructor() {}


    // 创建数据库
    createDb(dbName, storeName = 'jtModels', version = 1){
        let indexedDB = window['indexedDB'] || window['webkitIndexedDB'] || window['mozIndexedDB'] || window['msIndexedDB'];
        this.indexedDB = indexedDB;

        if(!indexedDB){
		    console.log("你的浏览器不支持IndexedDB");
		}else{
            // 设置当前仓库名称
            this.storeName = storeName;
            // 设置数据库名称
            this.dbName = dbName;

			let request=indexedDB.open(dbName, version);

		    request.onsuccess = (e) => {
		    	if(!this.db){
                    this.db = e.target.result;
		    	}
            };
            
            // 错误提示
            this.errorHandle(request);

            //创建一个存储仓库
		    request.onupgradeneeded = (e) => {
		        this.db = e.target.result;
		        if (!this.db.objectStoreNames.contains(storeName)) {
		            //如果表格不存在，创建一个新的表格
                    let store = this.db.createObjectStore(storeName, { keyPath: this.keyPath, autoIncrement: false });
                    store.createIndex('version', 'version', { unique: false });
                    store.createIndex('title', 'title', { unique: false });
		        }
			};
        }
        
        return this.cb;
    } 


    // 删除数据库
	deleteDB(name){
        this.indexedDB.deleteDatabase(name);
        this.callBack({message: '成功删除数据库'});
        return this.cb;
    }


    // 关闭数据库
    closeDB() {
        this.db.close(this.dbName);
    }
    

    // 添加数据
	add(data){
		let objStore = this.db.transaction([this.storeName], 'readwrite')
		    .objectStore(this.storeName)

        if(Array.isArray(data)) {
            for(let i=0; i<data.length; i++){
                objStore.add(data[i]);
            }
        }else {
            objStore.add(data);
        }
        
        return this.cb;
	}


    // 读取数据
	read(instanceData, updateKeys) {
	    let objectStore = this.db.transaction([this.storeName]).objectStore(this.storeName);
        // 未查询到或需要跟新的模型数据
        let emptyModelData, updateModelData;
        // 查询到模型的数据
        let data;

        if(Array.isArray(instanceData)) {
            data = [];
            emptyModelData = [];
            updateModelData = [];

            for(let i=0; i<instanceData.length; i++) {
                let request = objectStore.get(instanceData[i].modelId);

                request.onsuccess = (e) => {
                    if(request.result) {
                        let flag = true;
                        for(let i=0; i < updateKeys.length; i++) {
                            if(request.result[updateKeys[i]] !== instanceData[i][updateKeys[i]]) {
                                updateModelData.push(Object.assign({}, request.result, {
                                    [updateKeys[i]]: instanceData[i][updateKeys[i]]
                                }));
                                flag = false;
                            }  
                        }

                        if(flag) {
                            data.push(request.result);
                        }
                        // if(request.result.version !== instanceData[i].version) {
                        //     updateModelData.push(Object.assign({}, request.result, {
                        //         version: instanceData[i].version
                        //     }));
                        // }else {
                            
                        // }
                    }else {
                        emptyModelData.push(instanceData[i].modelId)
                    }

                    // 读取完成 返回数据
                    if(i === instanceData.length - 1) {
                        this.callBack({ data: data, emptyModel: emptyModelData, updateModel: updateModelData });
                    }
                } 
            }
        }else {
            // 通过物理主键获取单条数据
            let request = objectStore.get(instanceData);
            data = {};
            emptyModelData = '';
            updateModelData = '';

            request.onsuccess = (e) => {
                if(request.result) {
                    if(request.result.version !== instanceData.version) {
                        updateModelData = instanceData.modelId
                    }else {
                        data = Object.assign({}, request.result);
                    }
                }else {
                    emptyModelData = instanceData.modelId;
                }

                this.callBack({ data: data, emptyModel: emptyModelData, updateModel: updateModelData });
            }
        }
        return this.cb;
    }


    // 删除模型
	remove(keys) {
        let objectStore = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);
        
        if(Array.isArray(keys)) {
            for(let i=0; i < keys.length; i++) {
                objectStore.delete(keys[i]);
            }
        }else {
            objectStore.delete(keys);
        }

        this.callBack({message: '数据删除成功'});
	}
    

    // 跟新模型
    update(data) {
        var objectStore = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);

        if(Array.isArray(data)) {
            for(let i=0; i<data.length; i++) {
                objectStore.put(data[i]);
            }
        }else {
            objectStore.put(data);
        }

        return this.cb;
    }


    // 设置回调信息
    callBack(obj) {
        if(obj.status === undefined)
            obj.status = STATUS.SUCCESS;
        
        if(obj.message === undefined) 
            obj.message = '';

        this.cb.next(obj);
    }


    // request错误提示
    errorHandle(request) {
        request.onerror = (e) => {
            console.log(e.currentTarget.error.message);
        }
    }
}