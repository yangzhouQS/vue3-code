# WebRTC实时互动直播技术入门与实战



## 第1章 学习指南

【老师是位答题狂，问答区的问题有问必答，学习困惑有人答，不用自己瞎摸索】本章首先为大家介绍什么是WebRTC，为什么学习WebRTC,学习WebRTC有哪些困难，课程是如何解决这些困难，让大家低门槛学好WebRTC，当然每门课程都有适用人群，大家选课程前可以通过试看来了解课程是否适合你。...

-  1-1 【学前必看】课程导学
-  1-2 【快来认识我】WebRTC介绍

> ffmpeg更多的是关注编解码，视频处理；WebRTC 更多的关注的实时通信。WebRTC 底层会使用ffmpeg



## 第2章 WebRTC原理与架构

本章首先带大家了解WebRTC 架构，并通过讲解WebRTC目录结构与各模块的作用，从整体上把握好WebRTC，为后面的实战学习打下坚实的理论基础。

### 2-1 【必备原理】webrtc架构

WebRTC（网络实时通信）它是一个支持网页浏览器进行实时语音对话或视频对话的技术,它为我们提供了视频会议的核心技术，包括音视频的采集、编解码、网络传输、显示等功能，并且还支持跨平台：windows，linux，mac，android，iOS。





### 2-2 【功能概要】WebRTC目录结构







### 2-3 【必备原理】WebRTC运行机制













## 第3章 Web服务器原理与Nodejs搭建

在开始正式学习 WebRTC前先将实验环境搭建好，为后面做各种实验准备好环境。

-  3-1 【基础铺垫，学前有概念】Web服务器工作原理
-  3-2 【来点实战】Nodejs环境搭建
-  3-3 【来点实战】最简单的http服务
-  3-4 【来点实战】创建https服务
-  3-5 【来点实战】实现一个真正的 Web服务器



## 第4章 JavaScript必备知识回顾

为了考虑到有些同学对JS不太熟悉，本章专门为大家补充了JS必备的基础知识回顾。简单回顾一下JavaScript语法，让不熟悉 Js的同学可以快速上手。在后面的实现中大量使用了 JavaScript语言，调用 WebRTC API，其流程与其它端调用 WebRTC API逻辑基本是一致的。...

-  4-1 【JS调试工具使用】JavaScript调试
-  4-2 【怕你不熟JS，补充一下】变量与基本运算
-  4-3 【怕你不熟JS，补充一下】判断循环与函数





## 第5章 WebRTC设备管理

本章带大家基于WebRTC实现音视频设备选择，包括音频设备、视频设备。通过本章的学习大家可以掌握好如何使用WebRTC实现音视频设备的选择。

### 5-1 【基础铺垫，学前有概念】WebRTC获取音视频设备



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
        console.log('浏览器不支持')
    }
    const ePromise = navigator.mediaDevices.enumerateDevices()
    ePromise.then(res=>{
        res.forEach(deviceInfo=>{
            console.log(`${deviceInfo.kind}, label=${deviceInfo.label}, deviceId = ${deviceInfo.deviceId},groupId = ${deviceInfo.groupId}`)
        })
    },onerror=>{
        console.log(onerror)
    })
</script>

</body>
</html>
```

![image-20201031220904109](WebRTC_note.assets/image-20201031220904109.png)





### 5-2 【来点实战】在页面中显示获取到的设备

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>audio input 音频输入: <select id="audioInput"></select></p>
<p>audio output音频输出: <select id="audioOutput"></select></p>
<p>video input: <select id="videoInput"></select></p>
<script>
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('浏览器不支持')
    }
    const ePromise = navigator.mediaDevices.enumerateDevices()
    const audioInput = document.querySelector('#audioInput')
    const audioOutput = document.querySelector('#audioOutput')
    const videoInput = document.querySelector('#videoInput')

    ePromise.then(res => {
        res.forEach(deviceInfo => {
            const {kind, label, deviceId} = deviceInfo
            const option = document.createElement('option')
            option.value = deviceId
            option.text = label
            if (kind === 'audioinput') {
                audioInput.appendChild(option)
            } else if (kind === 'audiooutput') {
                audioOutput.appendChild(option)
            } else if (kind === 'videoinput') {
                videoInput.appendChild(option)
            }
            console.log(`${deviceInfo.kind}, label=${deviceInfo.label}, deviceId = ${deviceInfo.deviceId},groupId = ${deviceInfo.groupId}`)
        })
    }, onerror => {
        console.log(onerror)
    })
</script>

</body>
</html>
```









## 第6章 WebRTC音视频数据采集

本章讲解WebRTC如何实现音视频数据采集，其中包括：1.通过 WebCam 获取视频流，2.采集音频流，3.设置Camera分辨率 ，4.视频渲染。

### 6-1 【基础铺垫，学前有概念】WebRTC音视频数据采集

adapter.js







### 6-2 【浏览器适配方法】WebRTC_API_适配





### 6-3 【安全管理】获取音视频设备的访问权限





### 6-4 【视频参数调整】视频约束





### 6-5 【音频参数调整】音频约束



### 6-6 【来点实战】视频特效



### 6-7 【来点实战】从视频中获取图片





### 6-8 【来点实战】WebRTC只采集音频数据





### 6-9 【来点实战】MediaStreamAPI及获取视频约束











## 第7章 WebRTC音视频录制实战

本章讲解WebRTC录制相关的知识，除了可以录制音视频之外，还可以录制桌面。

-  7-1 【基础铺垫，学前有概念】WebRTC录制基本知识
-  7-2 【来点实战】录制音视频实战-1**试看**
-  7-3 【来点实战】录制音视频实战-2
-  7-4 【来点实战】WebRTC采集屏面数据

## 第8章 WebRTC信令服务器实现

本章为大家讲解WebRTC信令服务器实现，WebRTC规范本身不包括服务器部分，但要想实现正的互通，又必须要有信令服务器。通过本章的讲解你将了解到如何实现一个最简单的信令服务器，以配合我们最终实现 1V1实时音视频互动直播系统。...

-  8-1 【基础铺垫，学前有概念】如何使用socket.io发送消息
-  8-2 【基础铺垫，学前有概念】WebRTC信令服务器原理
-  8-3 【来点实战】WebRTC信令服务器的实现
-  8-4 【来点实战】利用socket.io实现简单聊天室-1
-  8-5 【来点实战】利用socket.io实现简单聊天室-2

## 第9章 WebRTC网络基础补充：P2P/STUN/TURN/ICE知识

本章补充WebRTC网络的基本知识，要想知道WebRTC是如何选择端到端通路的，就必须对这部分知识有深入的理解，否则在后期深入学习 WebRTC时，你会感到非常迷茫。

-  9-1 【基础铺垫，学前有概念】WebRTC网络传输基本知识
-  9-2 【基础铺垫，学前有概念】NAT打洞原理
-  9-3 【基础铺垫，学前有概念】NAT类型检测
-  9-4 【协议规范】STUN协议一
-  9-5 【协议规范】STUN协议二
-  9-6 【协议规范】TURN协议
-  9-7 【协议规范】ICE框架
-  9-8 【基础铺垫，学前有概念】网络分析方法 tcpdump 与 wireshark讲解
-  9-9 【来点实战-抓包工具使用】网络分析方法 tcpdump 与 wireshark实战-1
-  9-10 【来点实战-抓包工具使用】网络分析方法 tcpdump 与 wireshark实战-2

## 第10章 端对端1V1传输基本流程

本章讲解端对端传输如何进行媒体能力的协商，以及其处理的基本流程。这部分知识非常重要，了解了这部分知识基本上就撑握了WebRTC的一半，它们是实现真正的 1V1实时互动直播的基础。

-  10-1 【必备原理】媒体能力协商过程一
-  10-2 【必备原理】媒体能力协商过程二
-  10-3 【必备原理】1:1连接的基本流程
-  10-4 【来点实战】本机内的1:1音视频互通-1
-  10-5 【来点实战】本机内的1:1音视频互通-2
-  10-6 【来点实战】获取 offer/answer 创建的 SDP

## 第11章 WebRTC核心之SDP详解

SDP可以说是 WebRTC 的核心，因为双方进行通信的参数都在其中，如使用的编解码器是多少，码流是多大，有多少个媒体流等等这些都在 SDP中描述着。所以必须要非常清楚每一行的含义。而往往这部分知识很复杂，能了解清楚的人少之又少，从而导致对 WebRTC的理解很难深入下去...

-  11-1 【协议规范】SDP规范
-  11-2 【协议规范】WebRTC中的SDP
-  11-3 【详解】WebRTC中Offer_AnswerSDP

## 第12章 实现1V1音视频实时互动直播系统

本章将带你学习真正的1V1音视频实时互动直播系统的实现。这部分内容比较重，里边有大量的实现，相信同学位可以从本章收获大量的知识。

-  12-1 【来点实战】STUN_TURN服务器搭建
-  12-2 【参数介绍】再论RTCPeerConnection
-  12-3 【必备原理】直播系统中的信令及其逻辑关系
-  12-4 【来点实战】实现1:1音视频实时互动信令服务器
-  12-5 【参数介绍】再论CreateOffer
-  12-6 【必备原理】WebRTC客户端状态机及处理逻辑
-  12-7 【来点实战-基本结构】-WebRTC客户端的实现
-  12-8 【来点实战-增加PeerConnecton逻辑】WebRTC客户端的实现-1
-  12-9 【来点实战-增加PeerConnecton逻辑】WebRTC客户端的实现-2
-  12-10 【来点实战-增加媒体协商的逻辑】WebRTC客户端的实现-3
-  12-11 【阶段作业，练练手吧】共享远程桌面

## 第13章 WebRTC核心之RTP 媒体控制与数据统计

WebRTC提供了非常精细化的管理。大家除了可以使用非常方便的上层接口来使用 WebRTC之外，还可以通过对 Sender/Receiver的控制，对网络流量进行控制。另外还可以通过 WebRTC统计数据进行网络质量分析。这些知识你都可以通过本章的内容学习到。...

-  13-1 【基础铺垫，学前有概念】RTPRReceiver发送器
-  13-2 【基础铺垫，学前有概念】RTPSender发送器
-  13-3 【来点实战】传输速率的控制-1
-  13-4 【来点实战】传输速率的控制-2
-  13-5 【来点实战】WebRTC统计信息-1
-  13-6 【来点实战】WebRTC统计信息-2

## 第14章 WebRTC非音视频数据传输

本章带大家基于WebRTC实现多端非音视频数据传输，其中包括：1.文本聊天，2.传输文件，通过本章的学习大家可以掌握好如何用WebRTC的数据通道，传输非音视频数据。

-  14-1 【基础铺垫，学前有概念】传输非音视频数据基础知识
-  14-2 【来点实战】端到端文本聊天
-  14-3 【练手的机会来了】文件实时传输

## 第15章 WebRTC实时数据传输网络协议详解

本章为大家讲解 基于WebRTC实现实时数据传输相关网络协议知识，RTP/RTCP协议详解，DTSL/SRTP，最后通过 WireShark 分析数包，让大家真正掌握好WebRTC实时数据传输这块的核心技术。

-  15-1 【协议规范】RTP-SRTP协议头讲解
-  15-2 【协议规范】RTCP中的SR与RR报文
-  15-3 【协议规范】DTSL
-  15-4 【来点实战】wireshark分析rtp-rtcp包

## 第16章 Android端与浏览器互通

浏览器与移动端之间的互通是行业痛点，很多公司，很多工程师都搞不定这块，本章将通过Android与浏览器的互通来让你了解其它端与浏览器之间是如何实现互通的。知道了Android端，其它端的流程也是一样的。

-  16-1 Android与浏览器互通基本知识
-  16-2 WebRTCNative开发逻辑
-  16-3 实战-权限申请-库的引入与界面
-  16-4 实战-通过socket.io实现信令收发
-  16-5 实战-Andorid与浏览器互通

## 第17章 iOS端与浏览器互通

本章将向你讲解iOS App与浏览器之间的互通，来让你了解iOS是如何使用WebRTC的。当本章讲解完后，我们就实现了浏览器与浏览器、Android App 与浏览器、iOS App与浏览器、iOS与Android App 之间的互通。这样就实现了一套完整的1对1通话Demo ...

-  17-1 iOS权限获取
-  17-2 iOS引入WebRTC库
-  17-3 iOS端SocketIO的使用
-  17-4 iOS界面布局
-  17-5 iOS本地视频采集与展示
-  17-6 iOS端RTCPeerConnection
-  17-7 iOS媒体协商
-  17-8 iOS远端视频渲染

- 

  ##### 第18章 课程总结

  恭喜大家都坚持到了最后，相信大家都收获满满。最后让我们一起来进行下本课程的总结与回顾，看看大家掌握了多少，记住了多少，应用了多少，最后课程结束我们不说再见，大家有问题依然可以到课程问答区提问题，我会继续为大家解答问题。你也可以加入课程QQ交流群和同学们进行交流探讨，一起进步。...

  -  18-1 课程总结





# 参考文档

https://blog.csdn.net/kyl282889543/category_9327113_2.html





