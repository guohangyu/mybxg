define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
  // 依赖jquery ，template模版
// var tcId = util.qs('tc_id');
// console.log(tcId);  //将获取地址栏的参数；

//datepicker和language：把日期的语言种类引入和日期插件
//validate和form表单验证插件引入

  var tcId = util.qs('tc_id');  //获取地址栏参数tc_id 的值
  if(tcId){
    // 如果tcId存在 那么是编辑操作,因为点击编辑按钮
    $.ajax({
      type : 'get',
      url : '/api/teacher/edit',
      data : {tc_id : tcId},
      dataType : 'json',
      success : function(data){
        console.log(data);
        // 解析数据，渲染页面
        data.result.operate = '编辑讲师';
        /*目的是说明教室管理，告诉他显示编辑讲师，还是添加讲师*/
        

        var html = template('teacherTpl',data.result);
        $('#teacherInfo').html(html);
        // 处理表单提交
        submitForm('/api/teacher/update');  //渲染完页面提交
      }
    });
  }else{
    // 添加操作
    var html = template('teacherTpl',{operate:'添加讲师'});
     /*目的是说明教室管理，告诉他显示编辑讲师，还是添加讲师*/
    $('#teacherInfo').html(html);
    // 渲染完页面调用这个方法
    submitForm('/api/teacher/add');  //渲染完页面提交
  }

function submitForm(url){
    $('#teacherForm').validate({  //提交按钮
      sendForm : false,
      // 禁用默认提交
      valid : function(){   
        // valid有效的处理
        $(this).ajaxSubmit({
          type : 'post', 
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.href = '/teacher/list';
            }
          }
        });
      },
      description : {
        // description验证通过


        // 需要给html加入对应的class名字
        tcName : {
          required : '用户名不能为空'
        },
        tcPass : {
          required : '密码不能为空',
          pattern : '密码必须为6位数字'
        },
        tcJoinDate : {
          required : '日期不能为空'
        }
      }
    });
  }













  // // 实现表单提交
  // function submitForm(url){
  //   $('#teacherBtn').click(function(){
  //     $.ajax({
  //       type : 'post',
  //       url : url,
  //       data : $('#teacherForm').serialize(),
  //       dataType : 'json',
  //       success : function(data){
  //         if(data.code == 200){
  //           location.href = '/teacher/list';
  //         }
  //       }
  //     });
  //   });
  // }


});
