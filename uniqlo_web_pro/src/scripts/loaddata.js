define(["jquery"],function($){	
	return {
		init : function(url){
                  return $.ajax(url,{
                        dataType : "json"
                  });  
		}
	}
})