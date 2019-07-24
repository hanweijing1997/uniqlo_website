define(["jquery","./loaddata.js" , "./render.js"],function($,loaddata,render){	
	function Goodsdetail(){

      }
      $.extend(Goodsdetail.prototype , {
            init : function(){
                  this.gooodsdetail =$(".gd_detail");
                  this.addcarts_btn = $(".addcarts_btn");
                  console.log(1);
                  this.data = "";
                  var h = location.hash;
                  h = parseInt(h.split("#")[1]);
                  this.reRenderDetail(h);

                  
            },
            reRenderDetail : function(id){
                  loaddata.init("../data/alldata.json").done($.proxy(function(res){
                        this.data = this.getIdDetail(res.all.datalist, id);
                        // console.log(this.data);
                        let html = render.init(this.data,"detail");
                        this.gooodsdetail.html(html);

                        $(".addcarts_btn").on("click",$.proxy(function(evt){
                              let e = evt || window.event;
                              let target = e.target || e.srcElement;
                              let id = $(target).attr("data-id");
                              this.saveId(id);
                              this.changeCartsNum();
                        },this));
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
            },
            saveId : function(id){
                  console.log(id);
                  var s = localStorage.getItem("carts");
			if(s === null){
				//当前无相关localStorage，创建一个新的
				var a = [{
					id : id,
					count : 1
				}]
				localStorage.setItem("carts", JSON.stringify(a))
			}else{
				//当前已有localStorage，直接判断当前id是否存在
				var list = JSON.parse(s);
				var has_same_id = false;
				$.each(list , function(index,item){
					if(item.id === id){
						item.count ++;
						has_same_id = true;
					}
				})
				//不存在相同的id，则新增
				if(!has_same_id){
					list.push({
						id : id,
						count : 1
					})
				}
				localStorage.setItem("carts", JSON.stringify(list))
			}
            },
            changeCartsNum : function(){
                  var count = 0;
			var s = JSON.parse(localStorage.getItem("carts"));
			$.each(s, function(index , item){
				count += item.count;
			})
			$(".cartsNumber").html("("+count+")");
            }

      })
      return new Goodsdetail();
})