define('jquery','template','util',function($,template,util){
  util.setMenu(location.pathname);
  $.ajax({
    type:'get',
    url:'/api/course',
    dataType:'json',
    success:function(data){
      var html = template('courseTpl',{list:data.result});
      // 如果模版写data,那html就的写这样遍历each result;
      // 如果模版写list：data.result，那html写就得each list
      $('#courseInfo').html(html);
    }
  })
})
