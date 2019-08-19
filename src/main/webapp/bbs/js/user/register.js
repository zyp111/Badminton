function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function getStatus() {
    var exist=GetQueryString("Exist");
    if(exist==null||exist=="") {
        return;
    } else if(exist==1) {
        //说明用户名已存在
        var dom1=document.getElementById("thisName");
        dom1.innerHTML += "<br><b style='color: red'>该用户名已被注册！</b>";
    } else if(exist==2) {
        //说明邮箱已经存在
        var dom1=document.getElementById("thisEmail");
        dom1.innerHTML += "<br><b style='color: red'>该邮箱已被注册！</b>";
    }else if(exist==3) {
        //说明用户名和邮箱都已经存在
        var dom1=document.getElementById("thisName");
        dom1.innerHTML += "<br><b style='color: red'>该用户名已被注册！</b>";
        var dom12=document.getElementById("thisEmail");
        dom12.innerHTML += "<br><b style='color: red'>该邮箱已被注册！</b>";
    }
}