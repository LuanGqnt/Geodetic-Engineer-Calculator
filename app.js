const bearings = [];

class Bearing {
    constructor(directionA, degrees, minutes, seconds, directionB, distance) {
        this.directionA = directionA;
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
        this.directionB = directionB;
        this.distance = distance;

        bearings.push(this);
    }

    prettify() {
        return `${this.directionA.toUpperCase()}${this.degrees}°${this.minutes}'${this.seconds}"${this.directionB.toUpperCase()}`;
    }

    bearingToDecimal() {
        return Number((this.degrees + (this.minutes/60) + (this.seconds/3600)).toFixed(2));
    }

    latAndDep() {
        // Math.PI/180 makes it a radian insteaad of an angle.
        // Makes it the same value as using a scientific calculator 

        const decimalBearing = this.bearingToDecimal();

        let latitude = this.distance * (Math.cos(decimalBearing * (Math.PI/180)));
        let departure = this.distance * (Math.sin(decimalBearing * (Math.PI/180)));

        // Negative numbers
        // North +
        // South -
        // East +
        // West -
        if(this.directionA == "s")
            latitude = -latitude;
        if(this.directionB === "w")
            departure = -departure;


        return [Number(latitude.toFixed(2)), Number(departure.toFixed(2))];
    }
}

const calculateDMD = departures => {
    // delete departures[0]; however, this has adds an <Empty List> when printed
    departures = departures.splice(1, departures.length); // Removes the unnecessary first departure

    const dmd = [];

    for(let i = 0; i < departures.length; i++) {
        if(dmd.length === 0) {
            dmd.push(departures[i]);
            continue;
        } 

        const newDMD = dmd[i-1] + departures[i-1] + departures[i];
        dmd.push(Number(newDMD.toFixed(2)));
    }

    return dmd;
}

const calculateArea = (latitudes, dmd) => {
    // delete departures[0]; however, this has adds an <Empty List> when printed
    latitudes = latitudes.splice(1, latitudes.length); // Removes the unnecessary first departure

    const products = [];

    for(let i = 0; i < latitudes.length; i++) {
        const product = latitudes[i] * dmd[i];
        products.push(Number(product.toFixed(2))); 
    }

    let sum = 0;
    products.forEach(product => {
        sum += product;
    });

    return Number(Math.abs(sum / 2).toFixed(2));
}

const start = new Bearing("n", 81, 2, 0, "e", 301.71);
const point1 = new Bearing("n", 18, 1, 0, "e", 5);
const point2 = new Bearing("s", 75, 7, 0, "e", 10);
const point3 = new Bearing("s", 75, 7, 0, "e", 1.04);
const point4 = new Bearing("s", 18, 1, 0, "w", 5);
const point5 = new Bearing("n", 75, 7, 0, "w", 1.04);
const point6 = new Bearing("n", 75, 7, 0, "w", 10);

const latitudes = [];
const departures = [];

bearings.forEach(bearing => {
    const latAndDep = bearing.latAndDep();
    latitudes.push(latAndDep[0]);
    departures.push(latAndDep[1]);
});

const dmd = calculateDMD(departures);
const area = calculateArea(latitudes, dmd);

console.log(area);
