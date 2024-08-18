export function validateRUT(rut) {
    if (!/^[0-9]+-[0-9Kk]$/.test(rut)) {
        return false;
    }
    const cleanRUT = rut.replace("-", "");
    const rutBody = cleanRUT.slice(0, -1);
    let checkDigit = cleanRUT.slice(-1).toUpperCase();
    if (!/^[0-9]+$/.test(rutBody)) {
        return false;
    }
    let sum = 0;
    let multiplier = 2;
    for (let i = rutBody.length - 1; i >= 0; i--) {
        sum += multiplier * parseInt(rutBody.charAt(i));
        multiplier = (multiplier < 7) ? multiplier + 1 : 2;
    }
    const mod11 = 11 - (sum % 11);
    let calculatedCheckDigit = (mod11 === 11) ? "0" : (mod11 === 10) ? "K" : mod11.toString();

    return checkDigit === calculatedCheckDigit;
}