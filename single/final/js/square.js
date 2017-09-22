var Square = function () {
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    this.origin = {
        x: 0,
        y: 0
    };
    this.dir = 0;
}
/**
 * 判断方块是否可以下移
 * @param isValid
 * @returns {*}
 */
Square.prototype.canRotate = function (isValid) {
    var d = (this.dir + 1)%4;
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
            test[i][j] = this.rotates[d][i][j];
        }
    }
    return isValid(this.origin, test);
}
/**
 * 方块下移
 */
Square.prototype.rotate = function (num) {
    if (!num) {
        num = 1;
    }
    this.dir = (this.dir + num) % 4;
    if (this.dir == 4) {
        this.dir = 0;
    }
    for (var i = 0; i < this.data.length; i++) {
        for (var j = 0; j < this.data[i].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
}
/**
 * 判断方块是否可以下移
 * @param isValid
 * @returns {*}
 */
Square.prototype.canDown = function (isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y
    return isValid(test, this.data)
}
/**
 * 方块下移
 */
Square.prototype.down = function () {
    this.origin.x = this.origin.x + 1;
}
/**
 * 判断方块是否可以下移
 * @param isValid
 * @returns {*}
 */
Square.prototype.canLeft = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data)
}
/**
 * 方块下移
 */
Square.prototype.left = function () {
    this.origin.y = this.origin.y - 1;
}
/**
 * 判断方块是否可以下移
 * @param isValid
 * @returns {*}
 */
Square.prototype.canRight = function (isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data)
}
/**
 * 方块下移
 */
Square.prototype.right = function () {
    this.origin.y = this.origin.y + 1;
}