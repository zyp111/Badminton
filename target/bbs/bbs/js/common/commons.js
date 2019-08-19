var xmlHttp = false;
var xmlHttp2=false;
var xmlHttp3=false;
function initAJAX() {
    if(window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                window.alert("不支持ajax")
            }
        }
    }
}
function initAJAX2() {
    if(window.XMLHttpRequest) {
        xmlHttp2 = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{
            xmlHttp2 = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            try{
                xmlHttp2 = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                window.alert("不支持ajax")
            }
        }
    }
}
function initAJAX3() {
    if(window.XMLHttpRequest) {
        xmlHttp3 = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{
            xmlHttp3 = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            try{
                xmlHttp3 = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                window.alert("不支持ajax")
            }
        }
    }
}