function showUser() {
    xmlHttp.open("POST", "/login/isLogin", true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            var data = xmlHttp.responseText;
            if(data=="") {
                return;
            } else {
                var obj = JSON.parse(data);
                var user = '';
                if(obj.user_type==0) {
                    document.getElementById("turn1").innerHTML = `<h3>新帖子发布成功！<br>请<a href="../adminIndex.html" style="color:#007DDB">点击</a>返回主页...</h3>`;
                    return;
                } else {
                    document.getElementById("turn1").innerHTML=`<h3>新帖子发布成功！<br>请<a href="../index.html" style="color:#007DDB">点击</a>返回主页...</h3>`;
                }
            }
        }

    }
    xmlHttp.send();
}