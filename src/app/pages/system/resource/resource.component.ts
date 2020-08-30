import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/framework/core/component/base/base.component';
import { DialogUploadComponent } from 'src/app/framework/core/common/dialog-upload/dialog-upload.component';


@Component({
    selector: 'oms-resource',
    styleUrls: ['./resource.component.scss'],
    templateUrl: './resource.component.html'
})

export class OmsResourceComponent extends BaseComponent {

    xml: string = '';
    
    test() {
        this.dialog.open(DialogUploadComponent, {
            width: '40%',
            height: 'auto',
            data: {
                historyUpload: [
                    { 
                        fileCode: '5f39ecc685597321b0803c71', 
                        filePath: "http://192.168.8.156:8091//home/tms/gfs/20200817/一键报税测试数据0731_5f39ecc685597321b0803c70.xlsx",
                        name: '一键报税测试数据0731_5f39ecc685597321b0803c70.xlsx'
                    }
                ]
            }
        })
    }

    save(data) {
        console.log(data);
    }

    ngOnInit() {
        setTimeout(() => {
            this.xml = `
            
            <?xml version="1.0" encoding="UTF-8"?>
            <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://activiti.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
              <bpmn2:process id="Process_1" isExecutable="true">
                <bpmn2:startEvent id="StartEvent_1" />
                <bpmn2:startEvent id="StartEvent_1lmchr5" />
              </bpmn2:process>
              <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
                  <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                    <dc:Bounds x="412" y="240" width="36" height="36" />
                  </bpmndi:BPMNShape>
                  <bpmndi:BPMNShape id="StartEvent_1lmchr5_di" bpmnElement="StartEvent_1lmchr5">
                    <dc:Bounds x="1022" y="240" width="36" height="36" />
                  </bpmndi:BPMNShape>
                </bpmndi:BPMNPlane>
              </bpmndi:BPMNDiagram>
            </bpmn2:definitions>
            `
        }, 1000)
    }

    // 模板下载
    downloadTemp() {
        alert("开始模板下载")
    }
}