define(['jquery','template','cookie'],function($,template){
  // NProgress.start();
  // NProgress.done();

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });

  // 实现退出功能
  $('#logoutBtn').click(function(){
    $.ajax({
      type : 'post',
      url : '/api/logout',
      dataType : 'json',
      success : function(data){
        if(data.code == 200){
          // 重新跳转到登录页
          location.href = '/main/login';
        }
      }
    });
  });

  // 检测用户是否登录，不能让用户通过URL（地址栏）访问
  // 每一次登陆就会生成PHPSESSID，退出浏览器销毁
  //检测用户是否登录，如果flag存在说明就是跳转index主页，每当登陆成功，就会主页生成PHPSESSID（session：用户登陆的转态）
  var flag = $.cookie('PHPSESSID');
  //如果flag不存在，就是main页面 不跳转
  if(!flag && location.pathname != '/main/login'){
    // 如果cookie不存在，跳转到登录页
    location.href = '/main/login';
  }

  // 设置用户头像信息
  var loginInfo = $.cookie('loginInfo');
  loginInfo = loginInfo && JSON.parse(loginInfo);  //转成对象
  // 设置用户的头像信息
  // $('.aside .profile img').attr('src',loginInfo.tc_avatar);
  // $('.aside .profile h4').html(loginInfo.tc_name);
  var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
  var html = template.render(tpl,loginInfo);
  $('.aside .profile').html(html);
});
