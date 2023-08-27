const bearingToDecimal = (degrees, minutes, seconds) => {
    return Number((degrees + (minutes/60) + (seconds/3600)).toFixed(2));
}

export const latAndDep = (bearing) => {
    // Math.PI/180 makes it a radian insteaad of an angle.
    // Makes it the same value as using a scientific calculator 

    const decimalBearing = bearingToDecimal(bearing.degrees, bearing.minutes, bearing.seconds);

    let latitude = bearing.distance * (Math.cos(decimalBearing * (Math.PI/180)));
    let departure = bearing.distance * (Math.sin(decimalBearing * (Math.PI/180)));

    // Negative numbers
    // North +
    // South -
    // East +
    // West -
    if(bearing.directionA === "s")
        latitude = -latitude;
    if(bearing.directionB === "w")
        departure = -departure;

    return [Number(latitude.toFixed(2)), Number(departure.toFixed(2))];
}

export const calculateDMD = departures => {
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

export const calculateArea = (latitudes, dmd) => {
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
