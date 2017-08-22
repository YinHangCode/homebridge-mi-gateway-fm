var miioDevice = require('./miio/device');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
    Accessory = homebridge.platformAccessory;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;

    homebridge.registerAccessory('homebridge-mi-gateway-fm', 'MiGatewayFM', MiGatewayFM);
}

function MiGatewayFM(log, config) {
    if(null == config) {
        return;
    }

    this.log = log;
    this.config = config;

    var that = this;
    this.device = new miioDevice({
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
        this.device.call("get_prop_fm", [null])
            .then(result => {
                callback(null, result['current_status'] === 'pause' ? 0 : 1);
            });
    },

    setFMStatus: function(value, callback) {
        if(value) {
            if(this.config['url']) {
                this.device.call("play_specify_fm", {"type":0,"id":0,"url":this.config['url']});
            } else {
                this.device.call("play_fm", ['on']);
            }
        } else {
            this.device.call("play_fm", ['off']);
        }

        callback(null);
    }

}

