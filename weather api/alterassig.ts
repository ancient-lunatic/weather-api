class weather {
    temp;
    mains;
    mag;
    locate: string;
    loc;
    wind;
    press;
    humid;
    unit = 'm';
    temp_unit: string = "Celsius";


    constructor() {
        this.temp = document.getElementById("temp");
        this.mains = document.getElementById("mainn") as HTMLParagraphElement;
        this.mag = document.getElementById("imge") as HTMLImageElement;
        this.locate = ((document.getElementById("place") as HTMLInputElement).value);
        this.loc = document.getElementById("name");
        this.wind = document.getElementById("wind");
        this.press = document.getElementById("pressure");
        this.humid = document.getElementById("humid");

    }

    temperature_unit() {
        let x = document.getElementById("dropdown1") as HTMLSelectElement;
        let i;
        for (i = 0; i < x.options.length; i++) {
            if (x.options[i].selected === true) {
                break
            }
        }
        if (i === 0) {
            this.unit = 'm'
            this.temp_unit = "Celsius";
        }
        else if (i === 1) {
            this.unit = 's'
            this.temp_unit = "Kelvin"
        }
        else if (i === 2) {
            this.unit = 'f'
            this.temp_unit = "fahrenheit";
        }
        this.find();

    }

    async current_loc() {

        try {
            let response1 = await fetch('https://extreme-ip-lookup.com/json/')
            let data = await response1.json();

            (document.getElementById("place") as HTMLDataElement).value = data.city;
            this.locate = data.city;
            this.find();
        }
        catch (err) {
            console.log('Request failed');
        }

    }



    find() {
        return fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit)
            .then(response => {
                return response.json()
            }).then(dataa => {

                console.log(dataa)
                {
                    let name = dataa["location"]["region"]
                    var tempValue = dataa['current']['temperature'];
                    var imga = dataa['current']['weather_icons'];
                    let hum = dataa["current"]["humidity"];
                    let pre = dataa["current"]["pressure"];
                    let win = dataa["current"]["wind_speed"];
                    let des = dataa["current"]["weather_descriptions"];
                    let dir = dataa["current"]["wind_dir"];



                    this.mains.innerHTML = "It's " + des[0];
                    this.loc.innerHTML = "your city is  " + name;
                    this.temp.innerHTML = "Temp => " + tempValue + " " + this.temp_unit;
                    this.wind.innerHTML = "wind speed => " + win +"kmph";
                    this.press.innerHTML = "wind pressure => " + pre +"mb";
                    this.humid.innerHTML = "humidity =>   " + hum;



                    this.mag.src = imga[0];
                    return dataa
                }
            })
            .catch((error: Error) => {
                alert("valid not");
            })
    }
}
