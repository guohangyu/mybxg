define(['jquery','template','util'],function(){

var tcId = util.qs('tc_id');
if (tcId) {
  $.ajax({
    type:'get',
    url:'/api/teacher/edit',
    data:{tc_id:tcId},
    dataType:'json',
    success:function(data){
      data.resilt.operate = '编辑将试卷';
      var html = template('teacherTp1',data.result);
      $('#teacher').html(html);
    }
  })
}else{
var html = template('template',{operate:'添加见识'})
$('#teacherInfo').html(html);
submitForm('api/teacher/add');
}
function submitform(url){
$('#teacher').click(function(){
  $.ajax({
    type:'post',
    url:url,
    data:$('#teacher').serialize();
    dataType:'json',
    success:function(data){
      if (data.code == 200) {
        location.href = '/teacher/list';
        
      }
    }
  })
})
}



})
