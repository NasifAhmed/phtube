function formatSeconds(s) {
    sec = parseInt(s);
    const hour = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);

    if (hour > 0 && min > 0) {
        return `${hour}hrs ${min} min ago`;
    } else if (hour > 0 && min <= 0) {
        return `${hour}hrs ago`;
    } else if (hour <= 0 && min > 0) {
        return `${hour}hrs ago`;
    } else {
        return `${sec} seconds ago`;
    }
}

console.log(formatSeconds("16278"));
console.log(formatSeconds("13885"));
console.log(formatSeconds("1672656000"));
console.log(formatSeconds("15147"));
console.log(formatSeconds("16950"));
console.log(formatSeconds("16090"));
console.log(formatSeconds("14800"));
console.log(formatSeconds("15400"));
console.log(formatSeconds("16450"));
