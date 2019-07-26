define(["jquery","./loaddata.js" , "./render.js" , "./magnifying.js"],function($,loaddata,render , magnifying){	
	function Goodsdetail(){

      }
      $.extend(Goodsdetail.prototype , {
            init : function(){
                  this.data = "";
                  var h = location.hash;
                  h = parseInt(h.split("#")[1]);
                  loaddata.init("../data/alldata.json").done($.proxy(function(res){
                        this.data = this.getIdDetail(res.all.datalist, h);
                        
                        let html = render.init(this.data,"detail");
                        this.gooodsdetail.html(html);
                        magnifying.init();

                        $(".addcarts_btn").on("click",$.proxy(function(evt){
                              let e = evt || window.event;
                              let target = e.target || e.srcElement;
                              let id = $(target).attr("data-id");
                              this.saveId(id);
                              this.changeCartsNum();
                        },this));
                  },this))

                  this.gooodsdetail =$(".gd_detail");
                  this.addcarts_btn = $(".addcarts_btn");
                  this.chartTab = $(".g_chart_tab");
                  this.chartCon = $(".g_chart_con");
                  this.ul = $(".staris_nav");
                  this.stairsList = $(".chart_stairs").children();
                  this.heightList = [];
                  this.minHei = 0;
                 
                  
                  this.getHeightList();

                  this.chartTab.on("click","h4",$.proxy(function(evt){
                        let e = evt || window.event;
                        let target = e.target || e.srcElement;
                        $(target).parent().addClass("active")
                        .siblings().removeClass("active");
                        let index = $(target).parent().index();
                        this.chartConChange(index);
                  },this))

                  $(window).on( "scroll" , $.proxy(function(){
                        let scrolltop = $("body,html").scrollTop();
                        if(scrolltop > this.minHei){
                              this.ul.addClass("fixed_ul");
                        }else{
                              this.ul.removeClass("fixed_ul");
                        }                       
                        this.changeStairs(scrolltop);
                  },this))

                  this.ul.on("click" , "li" , $.proxy(function(evt){
                        let e = evt || window.event;
                        let target = e.target || e.srcElement;
                        let index = $(target).index();
                        this.changeStairs(index);
                        let s_top = this.heightList[index].min;
                        $("body,html").animate({
                              "scrollTop":s_top
                        },500);
                  },this));
                  
            },
            getHeightList : function(){
                  let topHei = $(".g_chart_con").offset().top ;
                  $.each(this.stairsList , $.proxy(function(index,ele){             
                        let min = $(ele).offset().top + topHei;
                        let max = min + $(ele).outerHeight();
                        this.heightList.push({
                              min,
                              max
                        });
                        if(index === 0){
                              this.minHei = min;
                        }
                  },this))
            },
            changeStairs : function(st){
                  $.each(this.heightList , $.proxy(function(index,item){
                        if(st >= item.min && st < item.max){
                              this.ul.children().eq(index).addClass("arrive_this")
                              .siblings().removeClass("arrive_this");
                        }
                  },this));
            },
            chartConChange : function(index){
                  switch(index + 1){
                        case 1 :
                              $(".g_chart_con>div:nth-child(1)").addClass("active").removeClass("g_chart_item")
                              .siblings().removeClass("active").addClass("g_chart_item");
                              break;
                        case 2 :
                              $(".g_chart_con>div:nth-child(2)").addClass("active").removeClass("g_chart_item")
                              .siblings().removeClass("active").addClass("g_chart_item");
                              break;
                        case 3 :
                              $(".g_chart_con>div:nth-child(3)").addClass("active").removeClass("g_chart_item")
                              .siblings().removeClass("active").addClass("g_chart_item");
                              break;
                  }
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