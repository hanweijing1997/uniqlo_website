define(["jquery"],function($){	
	function Render(){
	}
	$.extend(Render.prototype , {
		init : function(list,type){
			switch(type){
				case "goods":
					return this.goodsListShow(list);
                              break;
                        case "detail":
                              return this.detailListShow(list);
                              break;
				case "carts":
					return this.cartsListShow(list);
					break;
			}
            },
            goodsListShow : function(list){
                  let html = "";
                  $.each(list , function(index,item){
                        html += `
                              <li class="gl_li">
                                    <a class="gl_a" href="./goodsdetail.html?gid=${item.dataid}#${item.dataid}">
                                          <div class="gl_item_con">
                                                <ul class="gl_item_tag">
                                                      <li> <img style="width:90%;margin-right:5px;" src="https://www.uniqlo.cn/cms/b11ef5e69f0e7edac050452a5e534406.jpg" > </li>
                                                </ul>
                                                <div style="position: relative; margin-bottom: 10px;">
                                                      <img style="width:225px; height: 225px; text-align: center;" src="${item.imgurl}" >
                                                </div>
                                                <p>${item.cate} <span class="gl_item_size">XS - XXXL</span> </p>
                                                <p style="font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</p>
                                                <p>初上市价格 : ￥${item["origin-price"]}.00</p>
                                                <div class="gl_item_p">￥${item["now-price"]}.00</div>
                                          </div>
                                    </a>
                              </li>`;
                  })
                 return html;
            },
            detailListShow : function(list){
                  let html = "";
                        html += `  
                              <div class="gd_img">
                              <div class="gd_img_small">
                                    <ul class="gd_smallimg_list">
                                    ${this.getDetailImgList(list.cover)}
                                    </ul>
                              </div>
                              <div class="gd_img_mid">
                                    <img src="${list.cover.cover1['s-img']}">
                                    <div class="cursor-div"></div>
                                    <div style="width: 100%; height: 100%; position: absolute;top: 0;left: 0;z-index: 999;"></div>
                              </div>
                              <div class="gd_img_big">
                                    <img style="width: 1000px;height: 1000px;position: absolute;" src="${list.cover.cover1['b-img']}">
                              </div>
                        </div>
                  
                        <div class="gd_con_list">
                              <h4>${list.cate} ${list.title}</h4>
                              <p class="gd_con_orisize"> <a href="javacript:;">初上市尺码范围: ${list["min-size"]}-${list["max-size"]}</a> </p>
                              <p class="gd_con_price"> ￥${list["now-price"]}.00 <span>初上市价格 : ￥${list["origin-price"]}.00</span> </p>
                              <p class="gd_con_activity">活动 : <span>订单满200元免运费（门店急送领券免邮）</span> </p>
                              <div class="gd_con_color">
                                    <p>颜色 : </p>
                                    <ul>
                                          ${this.getDetailColorList(list.colorList)}
                                    </ul>
                              </div>
                              <div class="gd_con_size">
                                    <p>尺码 : </p>
                                    <ul class="">
                                          ${this.getDetailSizeList(list.sizelist)}
                                    </ul>
                              </div>
                              <div  class="gd_con_getmethod">
                                    配送方式 : 
                                    <label> <input type="radio" name="getmethod"> 快递配送 </label>
                                    <label> <input type="radio" name="getmethod"> 门店自提 </label>
                              </div>
                              <div  class="gd_con_buy">
                                    <button class="buynow_btn" type="button" data-id="${list.dataid}">立即购买</button>
                                    <button class="addcarts_btn" type="button" data-id="${list.dataid}">添加至购物车</button>
                              </div>
                              <p style="margin-top: 20px;height: 20px;">
                                    支持30天无理由退换货
                                    分享商品
                                    收藏
                              </p>
                        </div>`;
                  return html;
            },
            getDetailImgList : function(list){
                  let html = "";
                  $.each(list , function(index,item){
                        html += `  
                                    <li class="active">
                                          <img src="${item["s-img"]}">
                                    </li>`;
                  })
                  return html;
                 
            },
            cartsListShow : function(list){
                  
                  var s = localStorage.getItem("carts");
			var ls = JSON.parse(s === null ? "[]":  s);
			
      
			list = list.filter(function(goods){
				return ls.some(function(item,index){
					if(item.id == goods.dataid){
						goods.count = item.count;
						return true;
					}
				})
                  })
                  
                  let html = "";
                  $.each(list , function(index,item){
                        html += `
                              <li class="sc_con_item">
                                    <div class="sc_con_method">
                                          <input type="checkbox">修改配送方式
                                          
                                    </div>
                                    <div class="sc_con_img">
                                          <img src="${item.imgurl}" alt="">
                                    </div>

                                    <div class="sc_con_detail">
                                          <p style="width:220px;font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.cate}  ${item.title}</p>
                                          <p>支持30天无理由退换货</p>
                                    </div>
                                    <div class="sc_con_detail">
                                          <p>尺码 : 160/76/M</p>
                                          <p>颜色 : 54 绿色</p>
                                    </div>
                                    <div class="sc_con_detail">
                                          <p class="price_bold">￥${item["now-price"]}.00</p>
                                          <p>初上市价格 </p>
                                          <p>￥${item["origin-price"]}.00</p>
                                    </div>
                                    <div class="sc_con_count">
                                          <span> <i class="iconfont" style="float:left;margin-left:-3px">&#xe723;</i> ${item.count}  <i class="iconfont" style="float:right;margin-right:-3px;">&#xe71e;</i></span>
                                    </div>
                                    <div class="sc_con_price">
                                          <p class="price_bold">￥${item.count * item["now-price"]}.00</p>
                                    </div>
                              </li>`;
                  })
                  return html;
            },
            getDetailSizeList : function(list){
                  let html = "";
                  $.each(list , function(index,item){
                        html += `
                        <li class="">${item}</li> `;
                  })
                  return html;
            },
            getDetailColorList : function(list){
                  let html = "";
                  $.each(list , function(index,item){
                        html += `
                        <li>
                              <img style="width:100%" src="${item}">
                        </li> `;
                  })
                  return html;
            }

      })
      return new Render();

})