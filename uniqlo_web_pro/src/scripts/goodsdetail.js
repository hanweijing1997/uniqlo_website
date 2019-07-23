define(["jquery","./loaddata.js" , "./render.js"],function($,loaddata,render){	
	function Goodsdetail(){

      }
      $.extend(Goodsdetail.prototype , {
            init : function(){
                  this.gooodsdetail =$(".gd_detail");
                  this.data = "";
                  var h = location.hash;
                  h = parseInt(h.split("#")[1])
                  this.reRenderDetail(h);
            },
            reRenderDetail : function(id){
                  loaddata.init("../data/alldata.json").done($.proxy(function(res){
                        console.log
                        this.data = this.getIdDetail(res.datalist, id);
                        console.log(this.data);
                        let html = render.init(this.data,"detail");
                        this.gooodsdetail.html(html);
                  },this))
            },
            getIdDetail : function(list ,id){
                  let data = "";
                  $.each(list , function(index,item){
                        if(item.dataid == id ){
                              data = item;
                        }
                  })
                 return data;
            }

      })
      return new Goodsdetail();
})