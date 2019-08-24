var xmlHttp4=false;
function initAJAX4() {
    if(window.XMLHttpRequest) {
        xmlHttp4 = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){
        try{
            xmlHttp4 = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e){
            try{
                xmlHttp4 = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                window.alert("不支持ajax")
            }
        }
    }
}