function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function getStatus() {
    var status=GetQueryString("status");
    if(status==null||status=="") {
        return;
    } else if(status==1) {
        var dom1=document.getElementById("email");
        dom1.innerHTML += "<br><b style='color: red'>该邮箱未被注册！</b>";
    } else if(status==2) {
        var dom2=document.getElementById("password");
        dom2.innerHTML += "<br><b style='color: red'>密码错误!</b>";
    }
}