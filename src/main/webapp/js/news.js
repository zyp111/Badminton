function processStr(str) {
    var str1 = "看不到您的原稿，这样对空发议论，估计对您的指导性是不大的。建议您将原稿贴出来，好让老师们针对指导。这里简单给出意见这里简单给出意见";
    var l = str.length;
    var n = str1.length;
    if (l <= n) return str;
    return str.slice(0, n - 6) + "......";
}
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
function showNews() {
    xmlHttp4.open("POST", "/news/selectAllNews", true);
    xmlHttp4.onreadystatechange = function () {
        if (xmlHttp4.readyState == 4) {
            var data = xmlHttp4.responseText;
            if(data=="") {
                return;
            } else {
                var obj = JSON.parse(data);
                var newsList = "";
                for(var i in obj) {
                    var newsId = obj[i].news1_id;
                    var newsTitle=obj[i].news1_title;
                    var newsContent=obj[i].news1_content;
                    var newsCon = processStr(newsContent);
                    var newsCreateTime=obj[i].news1_create_time;
                    var time = getMyDate(newsCreateTime);
                    var newsImg=obj[i].news1_img;

                    newsList += `<div class="layui-col-lg6 content">
          <div>
            <div class="news-img"><a href="newsDetail.html?newsId="`+newsId+`><img src="`+newsImg+`"></a></div><div class="news-panel">
              <strong><a href="newsDetail.html?newsId=`+newsId+`">`+newsTitle+`</a></strong>
              <p class="detail"><span>`+newsCon+`</span><a href="newsDetail.html?newsId=`+newsId+`">[详细]</a></p>
              <p class="read-push">发布时间：<span>`+time+`</span></p>
            </div>
          </div>
        </div>`;
                }
            }
            document.getElementById("newsContent").innerHTML = newsList;
        }

    }
    xmlHttp4.send();
}