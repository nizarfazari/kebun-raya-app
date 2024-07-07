export default function FormatCurrency(value: number | string) {
    if (!value) {
        return 0
    }
    const rupiah = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return `Rp. ${rupiah}`;

}