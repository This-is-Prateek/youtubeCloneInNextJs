export const formatNumber = (number: number) => {
    if (number >= 1_000_000_000) {
        return (number / 1_000_000_000).toFixed(1) + 'B'; // Billion
    } else if (number >= 1_000_000) {
        return (number / 1_000_000).toFixed(1) + 'M'; // Million
    } else if (number >= 1_000) {
        return (number / 1_000).toFixed(1) + 'K'; // Thousand
    } else {
        return number.toString(); // For less than 1,000
    }
};
