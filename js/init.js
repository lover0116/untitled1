// Generated by IcedCoffeeScript 1.6.3-g
(function() {


}).call(this);

//# sourceMappingURL=init.map
//多次点击验证
function isTapClicks(){
    var oo = new Object();
    oo.t1 = (new Date()).getTime();
    oo.fn = function(){
        var t2  = (new Date()).getTime();
        if(t2 - this.t1 < 200){
            return false;
        }else{
            this.t1 = t2;
            return true;
        }
    }
    return oo;
}