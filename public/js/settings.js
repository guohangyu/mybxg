define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'],function($,template,CKEDITOR){
// uploadify图片上传插件
// region 三级联动插件
//ckeditor  富文本的插件
// CKEDITOR 富文本的插件
//datepicker和language 2个插件是日历插件
//form和validate是表单提交插件 (记住一定要html改成submit)
$.ajax({//validate
  type:'get',
  url: '/api/teacher/profile',
  dataType:'json',
  success:function(data){
    console.log(data);
    var html = template('settingsTpl',data.result)
    $('#settingsInfo').html(html);
    //异步，所以写里边
    $('#upfile').uploadify({
        width : 120,
        height : 120,
        buttonText : '',  //文字信息清空
        itemTemplate : '<span></span>',   //进度条清空
        swf : '/public/assets/uploadify/uploadify.swf',   //插件必写的
        uploader : '/api/uploader/avatar',  //上传的后台地址
        fileObjName : 'tc_avatar',   //图片格式
        onUploadSuccess : function(a,b){    //具体见插件详解

            console.log(b);  //得到字符串
 
          var obj = JSON.parse(b);  //转成对象
          $('.preview img').attr('src',obj.result.path);
    });

      //处理三级联动 html改成 class名字
    $('#pcd').region({
             url : '/public/assets/jquery-region/region.json'
    });
    CKEDITOR.region('editor',{
// /加入html中的textarea加入id名字edito

      //富文本功能
        toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
        ]
    });  //加入html中的textarea加入id名字editor
  $('#settingsForm').validate({    //(更新个人资料
      sendForm:false, //禁用默认提交

      //得到家乡的值 (value的值：地址的详细信息)
      valid:function(){
        var p = $('#p').find('option:selected').text();
        var c = $('#c').find('option:selected').text();
        var d = $('#d').find('option:selected').text();
 
       var hometown = p+ '|'+ c +'|'+d;  //得到地址信息

for(var instance in CKEDITOR.instance){
  CKEDITOR.instances[instance].updateElement();
  //把所有实例都跟新一遍
}
}
    valid:function(){  //验证通过后再去提交
      $(this).ajaxSubmit({
        type:'post',
        url:'/api/teacher/modify',
    data:{tc_hometown:hometown}, //把地址信息发个后台
        dataType:'json',
        success:function(data){
          if (data.code == 200) {
            //修改成功重新刷新页面
            location.reload()
          }
        }
      })
    }
  })


  }
})



})
