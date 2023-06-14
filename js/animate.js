
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = ((target - obj.offsetLeft) / 10);
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //正值时到0.9以下变为1 往大了取整，   负值时-0.9 变为-1 ，往小了取整
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
            // console.log(obj.offsetLeft);
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 20)
}
