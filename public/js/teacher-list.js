define(['jquery', 'template', 'bootstrap'],function ($,template) {
  // 调用接口获取所有的讲师数据
//bootstrap 查看老师弹出框需求
//设置导航栏选中
//location.pathname获取域名后的那片地址
 // $('.aside .navs a[href="'+location.pathname+'"]').addclass('active');



  $.ajax({
    type: 'get',
    url: '/api/teacher',
    dataType: 'json',
    success: function (data) {
      // 解析数据，渲染页面
      var html = template('teacherTpl', {list: data.result});
      // data.result在接口文档是个数组
      $('#teacherInfo').html(html);

      // 启用注销功能必须等模版加载完再执行 等模版内容填充到页面才有按钮
      $('.eod').click(function () {
        var that = this;
        var td = $(this).closest('td');    //得到讲师的id 和 状态 要往后台传数据，跟对应启用和注销一一对应
        var tcId = td.attr('data-tcId');
        var status = td.attr('data-status');
        $.ajax({
          type: 'post',
          url: '/api/teacher/handle',
          data: { tc_id: tcId, tc_status: status },
          dataType: 'json',
          success: function (data) {
            console.log(data);
            // 返回的是0，传过去的是1；
            if (data.code == 200) { //修改成功
              td.attr('data-status', data.result.tc_status); //设置td属性的状态；
             

              if (data.result.tc_status == 0) {
                $(that).text('注销');  //该按钮文字
              } else {
                $(that).text('启用');
              }
            }
          }
        });
      });

      // 查看讲师
      $('.preview').click(function () {
        // 后台需要传个数据 tc_id  ,告诉他查看哪个老师，所以需要写下边2个
        var td = $(this).closest('td');  
        var tcId = td.attr('data-tcId');
        $.ajax({
          type: 'get',
          url: '/api/teacher/view',
          data: { tc_id: tcId },  //后台需要tc_id，查看对应的老师
          dataType: 'json',
          success: function (data) {
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);

           
            $('#teacherModal').modal();  
            /*bootstarp模态框显示，需要加入booserpa.js，bootsterp.js用到的jquery不是标准模块，没有deine*/
          
          }
        });
      });

    }
  });


});
