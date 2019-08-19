var postClass=0;
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
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
          <dd><a href="/user/loginOut/" style="text-align: center;">退出</a></dd>
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
function showPost() {
    postClass=GetQueryString("postClass");
    xmlHttp2.open("POST", "/post/showAllPostsByTime", true);
    xmlHttp2.onreadystatechange = function () {
        if (xmlHttp2.readyState == 4) {
            var data = xmlHttp2.responseText;
            var obj = JSON.parse(data);
            var listpost = '';
            var listtop='';
            if(postClass==null||postClass==0) {
                for (var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "";
                    if (classId == 1) {
                        board = "提问";
                    } else if (classId == 2) {
                        board = "分享";
                    } else if (classId == 3) {
                        board = "讨论";
                    } else if (classId == 4) {
                        board = "建议";
                    } else if (classId == 5) {
                        board = "公告";
                    }
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(obj[i].post_status_top==1) {
                        listtop+=`<li>
              <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
                <img src="../res/images/userheadimage/` + head_img + `">
              </a>
              <h2>
                <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
              </h2>
              <div class="fly-list-info">
                <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                  <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
                  <!--<i class="layui-badge fly-badge-vip">VIP+</i>-->
                </a>
                <span>` + time + `</span>

                <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
                <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
                <span class="fly-list-nums">
                  <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
                </span>
              </div>
              <div class="fly-list-badge">

                <span class="layui-badge layui-bg-black">置顶</span>

              </div>
            </li>`;
                    }
                    listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                }
            } else if(postClass==1) {
                for(var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "提问";
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(classId==1) {
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    } else continue;
                }
            } else if(postClass==2) {
                for(var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "分享";
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(classId==2) {
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    } else continue;
                }
            } else if(postClass==3) {
                for(var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "讨论";
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(classId==3) {
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    } else continue;
                }
            } else if(postClass==4) {
                for(var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "建议";
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(classId==4) {
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    } else continue;
                }
            } else if(postClass==5) {
                for(var i in obj) {
                    var post_id = obj[i].post_id;
                    var head_img = obj[i].head_img;
                    var classId = obj[i].post_board_id;
                    var board = "公告";
                    var post_title = obj[i].post_title;
                    var post_user_name = obj[i].post_user_name;
                    var post_update_time = obj[i].post_update_time;
                    var time = getMyDate(post_update_time);
                    var post_reply_count = obj[i].post_reply_count;
                    if(classId==5) {
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    } else continue;
                }
            }
            document.getElementById("stick").innerHTML=listtop;
            document.getElementById("allPosts").innerHTML = listpost;
        }
    }
    xmlHttp2.send();
}
function showJIa(chose) {
    xmlHttp3.open("POST", "/post/showAllPostsByTime", true);
    xmlHttp3.onreadystatechange = function () {
        if (xmlHttp3.readyState == 4) {
            var data = xmlHttp3.responseText;
            var obj = JSON.parse(data);
            var listpost = '';
            if(chose==0) {
                if (postClass == null || postClass == 0) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "";
                        if (classId == 1) {
                            board = "提问";
                        } else if (classId == 2) {
                            board = "分享";
                        } else if (classId == 3) {
                            board = "讨论";
                        } else if (classId == 4) {
                            board = "建议";
                        } else if (classId == 5) {
                            board = "公告";
                        }
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                    }
                } else if (postClass == 1) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "提问";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 1) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    }
                } else if (postClass == 2) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "分享";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 2) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    }
                } else if (postClass == 3) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "讨论";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 3) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    }
                } else if (postClass == 4) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "建议";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 4) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    }
                } else if (postClass == 5) {
                    for (var i in obj) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "公告";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 5) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    }
                }
                document.getElementById("allPosts").innerHTML = listpost;
            } else {
                if (postClass == null || postClass == 0) {
                    for (var i in obj) {
                        if(obj[i].post_status_jia == 1) {
                            var post_id = obj[i].post_id;
                            var head_img = obj[i].head_img;
                            var classId = obj[i].post_board_id;
                            var board = "";
                            if (classId == 1) {
                                board = "提问";
                            } else if (classId == 2) {
                                board = "分享";
                            } else if (classId == 3) {
                                board = "讨论";
                            } else if (classId == 4) {
                                board = "建议";
                            } else if (classId == 5) {
                                board = "公告";
                            }
                            var post_title = obj[i].post_title;
                            var post_user_name = obj[i].post_user_name;
                            var post_update_time = obj[i].post_update_time;
                            var time = getMyDate(post_update_time);
                            var post_reply_count = obj[i].post_reply_count;
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        }}
                } else if (postClass == 1) {
                    for (var i in obj) { if(obj[i].post_status_jia == 1) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "提问";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 1) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;}
                    }
                } else if (postClass == 2) {
                    for (var i in obj) { if(obj[i].post_status_jia == 1) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "分享";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 2) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    } }
                } else if (postClass == 3) {
                    for (var i in obj) { if(obj[i].post_status_jia == 1) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "讨论";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 3) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    } }
                } else if (postClass == 4) {
                    for (var i in obj) { if(obj[i].post_status_jia == 1) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "建议";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 4) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    } }
                } else if (postClass == 5) {
                    for (var i in obj) { if(obj[i].post_status_jia == 1) {
                        var post_id = obj[i].post_id;
                        var head_img = obj[i].head_img;
                        var classId = obj[i].post_board_id;
                        var board = "公告";
                        var post_title = obj[i].post_title;
                        var post_user_name = obj[i].post_user_name;
                        var post_update_time = obj[i].post_update_time;
                        var time = getMyDate(post_update_time);
                        var post_reply_count = obj[i].post_reply_count;
                        if (classId == 5) {
                            listpost += `<li>
            <a href="/html/adminDetail.html?post_id=` + post_id + `" class="fly-avatar">
              <img src="../res/images/userheadimage/` + head_img + `">
            </a>
            <h2>
              <a class="layui-badge">` + board + `</a>
              <a href="/html/adminDetail.html?post_id=` + post_id + `">` + post_title + `</a>
            </h2>
            <div class="fly-list-info">
              <a href="/html/adminDetail.html?post_id=` + post_id + `" link>
                <cite>` + post_user_name + `</cite>
                <!--
                <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                <i class="layui-badge fly-badge-vip">VIP3</i>
                -->
              </a>
              <span>` + time + `</span>

              <!--<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>-->
              <!--<span class="layui-badge fly-badge-accept layui-hide-xs">已结</span>-->
              <span class="fly-list-nums">
                <i class="iconfont icon-pinglun1" title="回答"></i> ` + post_reply_count + `
              </span>
            </div>
            <div class="fly-list-badge">
              <!--<span class="layui-badge layui-bg-red">精帖</span>-->
            </div>
          </li>`;
                        } else continue;
                    } }
                }
                document.getElementById("allPosts").innerHTML = listpost;
            }
        }
    }
    xmlHttp3.send();
}