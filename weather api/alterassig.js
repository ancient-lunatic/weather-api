var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var weather = /** @class */ (function () {
    function weather() {
        this.unit = 'm';
        this.temp_unit = "Celsius";
        this.temp = document.getElementById("temp");
        this.mains = document.getElementById("mainn");
        this.mag = document.getElementById("imge");
        this.locate = (document.getElementById("place").value);
        this.loc = document.getElementById("name");
        this.wind = document.getElementById("wind");
        this.press = document.getElementById("pressure");
        this.humid = document.getElementById("humid");
    }
    weather.prototype.temperature_unit = function () {
        var x = document.getElementById("dropdown1");
        var i;
        for (i = 0; i < x.options.length; i++) {
            if (x.options[i].selected === true) {
                break;
            }
        }
        if (i === 0) {
            this.unit = 'm';
            this.temp_unit = "Celsius";
        }
        else if (i === 1) {
            this.unit = 's';
            this.temp_unit = "Kelvin";
        }
        else if (i === 2) {
            this.unit = 'f';
            this.temp_unit = "fahrenheit";
        }
        this.find();
    };
    weather.prototype.current_loc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response1, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('https://extreme-ip-lookup.com/json/')];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        data = _a.sent();
                        document.getElementById("place").value = data.city;
                        this.locate = data.city;
                        this.find();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Request failed');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    weather.prototype.find = function () {
        var _this = this;
        return fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit)
            .then(function (response) {
            return response.json();
        }).then(function (dataa) {
            console.log(dataa);
            {
                var name_1 = dataa["location"]["region"];
                var tempValue = dataa['current']['temperature'];
                var imga = dataa['current']['weather_icons'];
                var hum = dataa["current"]["humidity"];
                var pre = dataa["current"]["pressure"];
                var win = dataa["current"]["wind_speed"];
                var des = dataa["current"]["weather_descriptions"];
                var dir = dataa["current"]["wind_dir"];
                _this.mains.innerHTML = "It's " + des[0];
                _this.loc.innerHTML = "your city is  " + name_1;
                _this.temp.innerHTML = "Temp => " + tempValue + " " + _this.temp_unit;
                _this.wind.innerHTML = "wind speed => " + win + "kmph";
                _this.press.innerHTML = "wind pressure => " + pre + "mb";
                _this.humid.innerHTML = "humidity =>   " + hum;
                _this.mag.src = imga[0];
                return dataa;
            }
        })["catch"](function (error) {
            alert("valid not");
        });
    };
    return weather;
}());
