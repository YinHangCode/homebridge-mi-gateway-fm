# homebridge-mi-gateway-fm
[![npm version](https://badge.fury.io/js/homebridge-mi-gateway-fm.svg)](https://badge.fury.io/js/homebridge-mi-gateway-fm)

XiaoMi Gateway FM plugin for HomeBridge.   
   
Thanks for [nfarina](https://github.com/nfarina)(the author of [homebridge](https://github.com/nfarina/homebridge)), [OpenMiHome](https://github.com/OpenMiHome/mihome-binary-protocol), [aholstenson](https://github.com/aholstenson)(the author of [miio](https://github.com/aholstenson/miio)), all other developer and testers.   
   
**Note: If you find bugs, please submit them to [issues](https://github.com/YinHangCode/homebridge-mi-gateway-fm/issues) or [QQ Group: 107927710](//shang.qq.com/wpa/qunwpa?idkey=8b9566598f40dd68412065ada24184ef72c6bddaa11525ca26c4e1536a8f2a3d).**   

![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-gateway-fm/master/images/Gateway.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-gateway-fm/master/images/mi-acpartner.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-gateway-fm/master/images/aqara-acpartner.jpg)

## Installation
1. Install HomeBridge, please follow it's [README](https://github.com/nfarina/homebridge/blob/master/README.md).   
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.   
3. Install packages.   
```
npm install -g homebridge-mi-gateway-fm
```

## Configuration
```
"accessories": [{
    "accessory": "MiGatewayFM",
    "name": "MiGatewayFM",
    "ip": "192.168.88.xx",
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}]
```
If you want play your own channel, you can set the following in the config.   
```
"accessories": [{
    "accessory": "MiGatewayFM",
    "name": "MiGatewayFM",
    "ip": "192.168.88.xx",
    "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "url": "http://live.xmcdn.com/live/1005/64.m3u8"
}]
```

## Get token
### Get token by miio2.db
setup MiJia(MiHome) app in your android device or android virtual machine.   
open MiJia(MiHome) app and login your account.   
refresh device list and make sure device display in the device list.   
get miio2.db(path: /data/data/com.xiaomi.smarthome/databases/miio2.db) file from your android device or android virtual machine.   
open website [[Get MiIo Tokens By DataBase File](http://miio2.yinhh.com/)], upload miio2.db file and submit.    
### Get token by network
Open command prompt or terminal. Run following command:   
```
miio --discover
```
Wait until you get output similar to this:   
```
Device ID: xxxxxxxx   
Model info: Unknown   
Address: 192.168.88.xx   
Token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx via auto-token   
Support: Unknown   
```
"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" is token.   
If token is "???", then reset device and connect device created Wi-Fi hotspot.   
Run following command:   
```
miio --discover --sync
```
Wait until you get output.   
For more information about token, please refer to [OpenMiHome](https://github.com/OpenMiHome/mihome-binary-protocol) and [miio](https://github.com/aholstenson/miio).   

## Version Logs
### 0.2.5
1.optimized code.   
### 0.2.4
1.update 'package.json'.   
### 0.2.3
1.optimized code.   
### 0.2.2
1.optimized code.   
### 0.2.1
1.optimized code.   
### 0.2.0
1.fixed bug that homebridge not works when device is not responding.   
2.add support for aqara ac partner FM.   
### 0.1.1
1.optimized code.   
### 0.1.0
1.add support for mi ac partner FM.   
### 0.0.3
1.optimized code.   
### 0.0.2
1.optimized code.   
### 0.0.1
1.Switch on/off XiaoMi Gateway FM.   
