define(["jquery","./render.js","./loaddata.js"],function($,render,loaddata){	
	loaddata.init("../data/alldata.json").done(function(res){
            let html = render.init(res.all.datalist,"carts");
            $(".sc_con_list").html(html);
      })
})