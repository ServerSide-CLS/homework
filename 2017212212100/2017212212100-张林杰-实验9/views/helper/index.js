/**
 * 序号+1，为了解决each {{@index}}从0开始的问题
 * @param {Integer} index 当前序号
 */
function addOne(index) {
    return index + 1;
}



module.exports = {
    addOne
}