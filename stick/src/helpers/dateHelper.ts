export function convertTimestampFormat(inputTimestamp: string): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [, day, monthStr, year, time] = inputTimestamp.match(/(\d{2}) (\w{3}) (\d{4}) (\d{2}:\d{2}:\d{2})/);
    const month = months.indexOf(monthStr) + 1;
    const formattedTimestamp = `${year}-${month.toString().padStart(2, '0')}-${day} ${time}`;

    return formattedTimestamp;
}
