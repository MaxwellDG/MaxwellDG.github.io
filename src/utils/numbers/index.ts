export function numberWithCommas(x: string) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}