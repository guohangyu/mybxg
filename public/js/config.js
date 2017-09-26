require.config({
  // 以这个为搜索路径
  baseUrl : '/public/assets',    
  paths : {
    // 导入jquery
    jquery : 'jquery/jquery',
    // 导入jquery.cookie的插件(获取地址栏参数)
    cookie : 'jquery-cookie/jquery.cookie',
    // 导入模版引擎
    template : 'artTemplate/template-web',

    // bootstrap的js  //查看老师的弹出框需求
    bootstrap : 'bootstrap/js/bootstrap.min',

    //加入日期插件
    datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
    
    // 日期插件语言
    language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',

    // 引入表单验证插件
    validate : 'validate/jquery-validate',  
      form : 'jquery-form/jquery.form',

      // 引入图片上传插件
      uploadify :'uploadify/jquery.uploadify.min',

        // 导入三级联动插件 (这里用到的jquery是标准的模块，不需要做兼容)
        region: 'jquery-region/jquery.region',

          //富文本
          ckeditor:'ckeditor/ckeditor',

    util : '../js/util',
    // 带入地址栏api

    common : '../js/common', //退出功能和头像（登陆信息）上传

    login : '../js/login',    //登陆js
    teacherlist : '../js/teacher-list',   //老师js
    teacheradd : '../js/teacher-add',  //添加js
    //头像上传js
    settings:'..js/settings',
    index:'../js/index',   //index主页js
    courselist:'../js/course-add'  //course的js
  },
  shim : {
    // bootsterp.js用到的jquery不是标准模块，没有deine，变标准
    bootstrap : {
      deps : ['jquery']
    },

    // 日历插件juqery datepicker是日期插件不是模块化，转化成模块化，依赖jquery，也需要转化成jquery
    language : {
      deps : ['jquery','datepicker']
    },

    // 表单验证插件
    validate:{
      deps : ['jquery']
    },


//图片上传的jquery插件
     uploadify : {
      deps : ['jquery']
    },

    //富文本 把变成标准模块
    ckeditor:{
     exports:'CKEDITOR'    // CKEDITOR富文本插件导出全局成员CKEDITOR
    }
  }
});
