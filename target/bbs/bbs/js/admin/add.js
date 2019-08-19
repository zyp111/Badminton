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
            }
        }

    }
    xmlHttp.send();
}
function edit() {
    var post_id=GetQueryString("post_id");
    if(post_id==null||post_id=="") {
        return;
    } else {
        xmlHttp2.open("POST", "/post/getAPostByID?post_id=" + post_id, true);
        xmlHttp2.onreadystatechange = function () {
            if (xmlHttp2.readyState == 4) {
                var data = xmlHttp2.responseText;
                var obj = JSON.parse(data);
                var classId = obj.post_board_id;
                var post_title = obj.post_title;
                var post_content = obj.post_content;
                document.getElementById("postForm").innerHTML = `<form action="/post/updatePost?post_id=` + post_id + `&classId=`+classId+`" method="POST">
                            <div class="layui-row layui-col-space15 layui-form-item">
                                <div class="layui-col-md9">
                                    <label for="L_title" class="layui-form-label">标题</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="L_title" name="L_title" required lay-verify="required" autocomplete="off" class="layui-input">
                                        <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <div class="layui-input-block">
                                    <textarea id="L_content" name="L_content" required lay-verify="required" placeholder="详细描述" class="layui-textarea fly-editor" style="height: 260px;"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <button class="layui-btn" lay-submit>立即修改</button>
                            </div>
                        </form>`;
                document.getElementById("L_title").value = post_title;
                document.getElementById("L_content").value = post_content;
            }
        }
    }
    xmlHttp2.send();
}