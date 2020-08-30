<!--
 * @Author: zhouyong
 * @Date: 2020-06-12 22:48:24
 * @Description: 前端程序开发文档
--> 
# Oms

## 安装vscode插件
请按照右下角提示，安装插件；

作者信息配置步骤：
a、点击编辑器左下角设置
b、搜索设置中输入"header",并点击"在settings.json中编辑";
c、在"fileheader.customMade"中配置作者信息,
    "fileheader.customMade":{
        "Author":"zhouyong",
        "Date":"Do not edit",
        "Description":"Modify here please",
    }


## 支持的browserPlat 
    Safari >= 10
    Chrome >= 55
    Edge >= 13
    iOS 10


## 打包设置
    --aot  为了代码更高效，更安全
    --build-optimizer 对文件进一步压缩

    本系统打包两种模式均开启，打包速度会变慢，但是页面访问速度会大幅度提高。

## 路由
    1.路由中是否需要#，在app.routing.ts中设置useHash属性；
    2.考虑到首页信息量较大，采用预加载模式; 其它页面采用懒加载模式！

## img-view组件
    1.安装oms-img-view
    2.安装viewerjs
    3.demo
        `
            <div class="test">
                <img-view
                [imgs]="images"
                ></img-view>
            </div>
        `

## 工作流
    1、npm install --save ey-activiti-designer bpmn-js


    