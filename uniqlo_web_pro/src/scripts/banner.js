
      function Banner(seletor,options){
            this.nowIndex = 0;
            this.option = Object.assign({
                  effect : "slide"
            },options);
            this.state = "normal";
            this.mainPart = $(seletor);
            this.wrapper = $(options.wrapper);
            this.sliders = $(options.sliders);
            this.btn_next = $(options.btn_next);
            this.btn_prev = $(options.btn_prev);
            this.timer = null;
            this.init();
      }
      $.extend(Banner.prototype , {
            init : function(){
              
                  //根据效果进行布局
                  this.animateLayout();
                  this.option.pagination ? this.padinationLayout() : "";
                  
                  this.btn_next.on("click" ,$.proxy( this.goNext ,this));
                  this.btn_prev.on("click" , $.proxy(this.goPrev ,this));
                  
                  this.mainPart.on("click" , $.proxy(this[this.option.effect],this) );
                  this.option.pagination ? this.mainPart.on("click" , $.proxy(this.changePagition ,this) ) : "";
                  this.option.pagination ? this.mainPart.on("click" , $.proxy(this.clickPagition ,this) ) : "";
                  
                  this.timer = setInterval( $.proxy(function(){
                        this.goNext();
                        this[this.option.effect]();
                        this.option.pagination ? this.changePagition(): "";
                  },this),3000)
                  
                  this.mainPart.on("mouseenter" , $.proxy(function(){
                        clearInterval(this.timer);
                  },this));
                  this.mainPart.on("mouseleave" , $.proxy(function(){
                        this.timer = setInterval( $.proxy(function(){
                              this.goNext();
                              this[this.option.effect]();
                        },this),2000);
                  },this));
            },
            animateLayout : function(){
                  switch(this.option.effect){
                        case "slide" :
                              this.wrapper.css("left",0);
                              this.mainPart.addClass("container-slide");
                              var cloneSlide = this.sliders[0].cloneNode(true);
                              this.sliders = [].slice.call(this.sliders);
                              this.sliders.push(cloneSlide);
                              this.wrapper.append(cloneSlide);
                              this.wrapper.css("width",this.mainPart.width() * this.sliders.length);
                              break;
                        case "fade" :
                              this.mainPart.addClass("container-fade");
                              break;
                  }
            },
            padinationLayout : function(){
                  var pagiCount = this.sliders.length - ( this.option.effect === "slide" ? 1 : 0);
                  this.paginations = $(this.option.pagination);
                  var html = "";
                  for(var i = 0 ; i < pagiCount ; i++){
                        if(i === 0){
                              html += "<div class='pagination-bullet pagination-bullet-active'></div>";
                        }else{
                              html += "<div class='pagination-bullet'></div>";
                        }
                  }
                  this.paginations.html(html);
            },
            changePagition : function(){
                  for(var i = 0 , bullet; bullet = this.paginations.children()[i++]; ){
                        bullet.className = "pagination-bullet";
                  }
                  var pagiList = this.paginations.children();
                  
                  var index = 0;	
                  setTimeout(function(){
                              if(this.option.effect === "slide" && (this.nowIndex === this.sliders.length - 1) ){		
                                    index =  0 ;
                                    this.paginations.children()[index].className += " pagination-bullet-active";
                              }else{
                                    this.paginations.children()[this.nowIndex].className += " pagination-bullet-active";
                              }	
                  }.bind(this),0);
            },
            clickPagition : function(evt){
                  var e = evt || window.event;
                  var target = e.target || e.srcElement ;
                  if($(target).parent()[0] == this.paginations[0]){
                        this.toIndex($(target).index());	
                        this[this.option.effect]();
                  }
            },
            goNext : function(){
                  if(this.nowIndex === this.sliders.length - 1){
                        this.state = "goFirst";
                        this.nowIndex = 0;
                  }else{
                        this.nowIndex++;
                        this.state = "normal";
                  }
            },
            goPrev : function(){
                  if(this.nowIndex === 0){
                        this.state = "golast";
                        this.nowIndex = this.sliders.length - 1;
      
                  }else{
                        this.nowIndex--;
                        this.state = "normal";
                  }
            },
            slide : function(){
                  switch(this.state){
                        case "normal" :
                              this.wrapper.css({
                                    "transition" : "left 1s",
                                    "left" : -(this.mainPart.width() * this.nowIndex) 
                              });
                              break;
                        case "goFirst" :
                              this.wrapper.css({
                                    "transition" : "top 1s",
                                    "left" : 0 
                              });
                              setTimeout(function(){
                                    this.nowIndex = 1;
                                    this.state = "normal";
                                    this.slide();
                              }.bind(this),0)
                              break;
                        case "golast" :
                              this.wrapper.css({
                                    "transition" : "top 1s",
                                    "left" :  - (this.mainPart.offsetWidth *( this.sliders.length-1)) 
                              });
                              setTimeout(function(){
                                    this.nowIndex = 4;
                                    this.state = "normal";
                                    this.slide();
                              }.bind(this),0)
                              break;
                  }
            
            },
            fade : function(){
                  for(var i = 0 , sli ; sli = this.sliders[i++];){
                        sli.style.opacity = 0;
                        sli.style.transition = "all 1s";		
                  }
                  this.sliders[this.nowIndex].style.opacity = 1 ;
                  
            },
            toIndex : function(index){
                  this.nowIndex = index;
             }
      })

      
      new Banner(".container_one" , {
            wrapper : ".wrapper_one_list",
            sliders : ".wo_item",
            btn_next : ".button-next",
            btn_prev : ".button-prev",
      });

      new Banner(".container_three" , {
            wrapper : ".wrapper_three_list",
            sliders : ".wt_item",
            btn_next : ".button-next-t",
            btn_prev : ".button-prev-t",
            pagination : ".pagination"
      });


