var helper = {
    "isActive": function(thisPage, page){
        console.log(thisPage,page)
        if(thisPage == 1 && page == undefined)
            return "active";
        //默认第一页时加active

        else if(thisPage == page)
            return "active";
        //位于当前页即加上active

        else
            return "";
        }
}
//自定义helpers

module.exports = helper