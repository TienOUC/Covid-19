module.exports = function compare (key) {
    return function (value1, value2) {
        var a = value1[key];
        var b = value2[key];
        return b - a;
    }
}
