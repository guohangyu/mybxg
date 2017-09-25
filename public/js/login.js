define(['jquery','cookie'],function($){
  // 登录功能
  $('#loginBtn').click(function(){
      $.ajax({
          type : 'post',
          url : '/api/login',
          data : $('#loginForm').serialize(),  //获取所有表单数据
          dataType : 'json',
          success : function(data){
              if(data.code == 200){
                  // 把用户的登录信息存储到cookie中，方便跨页面共享数据
                  //cookie可以跨页面共享数据
                  //JSON.stringify：转对象
                  //{path:'/'}：设置跟在别的页面都可以得到
                  $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                  // 登录成功，跳转到主页面
                  location.href = '/main/index'
              }
          }
      });

      return false;// 阻止按钮的默认行为
  });
});
