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
        alert("您尚未登录，请登录后再进行回复！");
    }
}
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
                if(obj.user_type==1) {
                    alert("警告：权限请求错误！即将返回正常页面...");
                    window.location.href="/html/index.js";
                    return;
                }
                var username=obj.user_name;
                var userlevel=obj.user_level;
                var headimage=obj.head_img;
            }
            document.getElementById("nav2").innerHTML= `<li class="layui-nav-item">
        <a class="fly-nav-avatar" href="javascript:;">
          <cite class="layui-hide-xs">`+username+`</cite>
          <i class="layui-badge fly-badge-vip layui-hide-xs">VIP`+userlevel+`</i>
          <img src="../res/images/userheadimage/`+headimage+`">
        </a>
        <dl class="layui-nav-child">
          <hr style="margin: 5px 0;">
          <dd><a href="/user/loginOut" style="text-align: center;">退出</a></dd>
        </dl>
      </li>`;
        }

    }
    xmlHttp.send();
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
};
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}
function showPost2() {
    var post_id=GetQueryString("post_id");
    xmlHttp2.open("POST", "/post/getAPostByID?post_id="+post_id, true);
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState == 4) {
            var data = xmlHttp2.responseText;
            var obj = JSON.parse(data);
            var post = '';
            var post_id=obj.post_id;
            var head_img = obj.head_img;
            var classId = obj.post_board_id;
            var post_status_top=obj.post_status_top;
            var post_status_jia=obj.post_status_jia;
            var caozuo1="";
            var caozuo2="";
            if(post_status_top==0) {
                caozuo1="置顶";
            } else {
                caozuo1="取消置顶";
            }
            if(post_status_jia==0) {
                caozuo2="加精";
            } else {
                caozuo2="取消加精";
            }
            var board="";
            if(classId==1) {
                board="提问";
            } else if(classId==2) {
                board="分享";
            } else if(classId==3) {
                board="讨论";
            } else if(classId==4) {
                board="建议";
            } else if (classId == 5) {
                board = "公告";
            }
            var post_title = obj.post_title;
            var temp="";
            if(classId == 5) {
                temp = "（公告）";
            }
            var post_user_name=obj.post_user_name;
            var post_create_time=obj.post_create_time;
            var post_update_time=obj.post_update_time;
            var time=getMyDate(post_create_time);
            var time2=getMyDate(post_update_time);
            var post_reply_count=obj.post_reply_count;
            var post_content=obj.post_content;

            post += `<h1>`+post_title+`<b style="color: red;">`+temp+`<b></h1>
                <div class="fly-detail-info">
                  <span class="layui-badge layui-bg-green fly-detail-column">`+board+`</span>
                  <div class="fly-admin-box" data-id="123">
            <span class="layui-btn layui-btn-xs"><a href="/post/deleteAPost?post_id=`+post_id+`">删除</a></span>
            
            <span class="layui-btn layui-btn-xs" ><a href="/post/topPost?post_id=`+post_id+`">`+caozuo1+`</a></span> 
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span> -->
            
            <span class="layui-btn layui-btn-xs"><a href="/post/jiaPost?post_id=`+post_id+`">`+caozuo2+`</a></span> 
            <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span> -->
          </div>
                  <span class="fly-list-nums"> 
                    <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> `+post_reply_count+`</a>
                  </span>
                </div>
                <div class="detail-about">
                  <a class="fly-avatar">
                    <img src="../res/images/userheadimage/`+head_img+`">
                  </a>
                  <div class="fly-detail-user">
                    <a class="fly-link">
                      <cite>`+post_user_name+`</cite>
                    </a>
                    <span>`+time+`</span>
                  </div>
                  <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
                  <span style="padding-right: 10px; color: #FF7200">最近更新时间`+time2+`</span>  
                  <span class="layui-btn layui-btn-xs jie-admin" type="edit"><a href="/bbs/html/admin/add.html?post_id=`+post_id+`">编辑此贴</a></span>
                  </div>
                </div>
                <div class="detail-body photos">
                    `+post_content+`
                </div>`;
            var replyinput='';
            replyinput+=`<div class="layui-form layui-form-pane" id="sendReply">
<form action="/reply/storeReply?reply_post_id=`+post_id+`" method="post">
                  <div class="layui-form-item layui-form-text">
                    <a name="comment"></a>
                    <div class="layui-input-block">
                      <textarea id="reply_content" name="reply_content" required lay-verify="required" placeholder="请输入内容"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <input type="hidden" name="jid" value="123">
                    <button class="layui-btn" lay-submit>提交回复</button>
                  </div>
                </form>
</div>`;
            document.getElementById("post2").innerHTML = post;
            document.getElementById("sendReply").innerHTML=replyinput;
        }
    }
    xmlHttp2.send();
}
function showReply() {
    var post_id=GetQueryString("post_id");
    xmlHttp3.open("POST", "/reply/getReplyByPostID?post_id="+post_id, true);
    xmlHttp3.onreadystatechange = function () {
        if (xmlHttp3.readyState == 4) {
            var data = xmlHttp3.responseText;
            if(data=="") {
                var replyes=`<li class="fly-none">消灭零回复</li>`;
            } else {
                var obj = JSON.parse(data);
                var replyes = '';
                for (var i in obj) {
                    var head_img=obj[i].head_img;
                    var reply_user_name=obj[i].reply_user_name;
                    var reply_create_time=obj[i].reply_create_time;
                    var reply_id=obj[i].reply_id;
                    var time=getMyDate(reply_create_time);
                    var reply_content=obj[i].reply_content;
                    replyes += `<li data-id="111">
                  <a name="item-1111111111"></a>
                  <div class="detail-about detail-about-reply">
                    <a class="fly-avatar">
                      <img src="../res/images/userheadimage/`+head_img+`">
                    </a>
                    <div class="fly-detail-user">
                      <a class="fly-link">
                        <cite>`+reply_user_name+`</cite>
                      </a>
                    </div>
                    <div class="detail-hits">
                      <span>`+time+`</span>
                    </div>
                  </div>
                  <div class="detail-body jieda-body photos">
                    `+reply_content+`
                  </div>
                  <div class="jieda-reply">
                    <span class="jieda-zan" type="zan">
                      <i class="iconfont icon-zan"></i>
                      <em>0</em>
                    </span>
                    <span type="reply"onclick="javascript:inputTo('`+reply_user_name+`'.toString())">
                      <i class="iconfont icon-svgmoban53"></i>
                      回复
                    </span>
                    <div class="jieda-admin">
                      <!--<span type="edit">编辑</span>-->
                      <span type="del"><a href="/reply/deleteAReply?reply_id=`+reply_id+`&post_id=`+post_id+`">删除</a></span>
                      <!--<span class="jieda-accept" type="accept">采纳</span>-->
                    <!--</div>-->
                  </div>
                </li>`;
                }
            }
            document.getElementById("replyes").innerHTML = replyes;
        }
    }
    xmlHttp3.send();
}
function inputTo(some) {
    var abc="@";
    abc=abc+some+" ";
    document.getElementById("reply_content").value=abc;
}