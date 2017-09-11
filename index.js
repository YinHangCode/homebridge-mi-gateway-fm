var fs = require('fs');
const miio = require('miio');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
    if(!isConfig(homebridge.user.configPath(), "accessories", "MiGatewayFM")) {
        return;
    }

    Accessory = homebridge.platformAccessory;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;

    homebridge.registerAccessory('homebridge-mi-gateway-fm', 'MiGatewayFM', MiGatewayFM);
}

function isConfig(configFile, type, name) {
    var config = JSON.parse(fs.readFileSync(configFile));
    if("accessories" === type) {
        var accessories = config.accessories;
        for(var i in accessories) {
            if(accessories[i]['accessory'] === name) {
                return true;
            }
        }
    } else if("platforms" === type) {
        var platforms = config.platforms;
        for(var i in platforms) {
            if(platforms[i]['platform'] === name) {
                return true;
            }
        }
    } else {
    }
    
    return false;
}

function MiGatewayFM(log, config) {
    if(null == config) {
        return;
    }

    this.log = log;
    this.config = config;

    var that = this;
    this.device = new miio.Device({
        address: that.config.ip,
        token: that.config.token
    });
}

MiGatewayFM.prototype = {
    identify: function(callback) {
        callback();
    },

    getServices: function() {
        var services = [];

        var infoService = new Service.AccessoryInformation();
        infoService
            .setCharacteristic(Characteristic.Manufacturer, "XiaoMi")
            .setCharacteristic(Characteristic.Model, "Gateway")
            .setCharacteristic(Characteristic.SerialNumber, "Undefined");
        services.push(infoService);

        var fmService = new Service.Switch(this.config['name']);
        fmService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getFMStatus.bind(this))
            .on('set', this.setFMStatus.bind(this));
        services.push(fmService);

        return services;
    },

    getFMStatus: function(callback) {
        var that = this;
        this.device.call("get_prop_fm", [null]).then(result => {
            callback(null, result['current_status'] === 'pause' ? false : true);
        }).catch(function(err) {
            that.log.error("[MiGatewayFM][ERROR]getFMStatus Error: " + err);
            callback(err);
        });
    },

    setFMStatus: function(value, callback) {
        var that = this;
        if(value) {
            if(this.config['url']) {
                this.device.call("play_specify_fm", {"type": 0, "id": 0, "url": this.config['url']}).then(result => {
                    if(result[0] === "ok") {
                        callback(null);
                    } else {
                        callback(new Error(result[0]));
                    }
                }).catch(function(err) {
                    that.log.error("[MiGatewayFM][ERROR]setFMStatus Error: " + err);
                    callback(err);
                });
            } else {
                this.device.call("play_fm", ['on']).then(result => {
                    if(result[0] === "ok") {
                        callback(null);
                    } else {
                        callback(new Error(result[0]));
                    }
                }).catch(function(err) {
                    that.log.error("[MiGatewayFM][ERROR]setFMStatus Error: " + err);
                    callback(err);
                });
            }
        } else {
            this.device.call("play_fm", ['off']).then(result => {
                if(result[0] === "ok") {
                    callback(null);
                } else {
                    callback(new Error(result[0]));
                }
            }).catch(function(err) {
                that.log.error("[MiGatewayFM][ERROR]setFMStatus Error: " + err);
                callback(err);
            });
        }
    }

}

