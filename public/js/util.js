// 因为每个页面都需要URL参数，所以 单独抽取处来
//得到tc_id的值
define(['jquery'],function($){
  /*依赖jquery ，所以导入*/
  return {
    qs : function(key){
      // 获取URL参数中的指定的参数值
      //location.search ：获取到URL地址栏的？后面的参数
      //第一个？没用
      var param = location.search.substr(1);  //从第二个开始截取
      var result = null;
      if(param){ //如果存在
        var ps = param.split('&'); //分隔，按&分隔 转数组
        $.each(ps,function(index,item){
          var kv = item.split('=');  
          if(kv[0] == key){
            result = kv[1];
            return false;// 终止each循环
          }
        });
      }
      return result;
      //当传过来是tc_id ,那就是tc_id的值
    },

    //设置导航菜单选中
    setMenu:function(path){
    $('.aside .navs a[href="'+path+'"]').addclass('active');
    }
  }
});


// 以下是详细说明
//  var param = location.search.substr(1)   //得到所有地址栏参数，并且把第一个？去掉
// console.log(param)；
  // mybxg.com/teacher/add?tcid =5&flag = 123  把地址栏的？去掉了得到tcid =5&flag = 123 
// var tcId = null;
// if (param) {
//   var ps = param.split('&');
//   $.each(ps,function(index,item){
//     //console.log(item); 输出 shtcid =5   flag = 123
//     var kv = item.split("=");
//     if (kv[0] =='tc_id') {
//      tcId = kv[1];
//      return false; 
//     }
//   })
// }
// console.log(tcId);
