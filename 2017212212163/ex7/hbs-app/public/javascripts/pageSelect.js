var Handlebars = require('handlebars');

//注册自定义helper
Handlebars.registerHelper('IsActive', function (Id) {
    console.log('pageId: ',Id)
    console.log('this: ',this);
    if(this==Id){
        return 'active'
    }
})



