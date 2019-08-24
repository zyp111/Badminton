function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
    return oTime;
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function showNewsDetail() {
    var news_id=GetQueryString("newsId");
    xmlHttp4.open("POST", "/news/selectNewsById?newsId="+news_id, true);
    xmlHttp4.onreadystatechange = function () {
        if (xmlHttp4.readyState == 4) {
            var data = xmlHttp4.responseText;
            if(data=="") {
                return;
            } else {
                var obj = JSON.parse(data);

                var newsTitle=obj.news1_title;
                var newsContent=obj.news1_content;
                var newsCreateTime=obj.news1_create_time;
                var time = getMyDate(newsCreateTime);
                var newsImg=obj.news1_img;

                document.getElementById("main_newsdate").innerHTML = `<div class="layui-container">
      <p class="news"><a href="news.html">相关新闻</a> > 新闻详情</p>
      <h1>`+newsTitle+`</h1>
      <p class="pushtime">发布时间：<span>`+time+`</span></p>
      <div><img src="`+newsImg+`" alt="新闻详情图"></div>
      <p class="introBott">`+newsContent+`</p>
    </div> `;
            }

        }

    }
    xmlHttp4.send();
}