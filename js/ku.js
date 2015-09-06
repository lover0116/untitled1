(function(){
    xFun = {
	    rollFn:function(opation){
			/*
			var opation = {
				oObj:移动元素外层class
				speed:移动速度
				is:是否无缝
				page:当前页
			};
			
			*/
		    var _this = this,dir = ["left","right"],isWufeng = true;
			_this.leftbtn = $("."+opation.oObj).find(".aleftbtn");
			_this.rightbtn = $("."+opation.oObj).find(".arightbtn");
			_this.ul = $("."+opation.oObj).find("ul");
			_this.page = $("."+opation.oObj).find("."+opation.page);
			_this.speed = opation.speed;
			_this.is = opation.is;
			_this.isNum = opation.isNum;
			_this.isAuto = opation.isAuto;
			
			if(_this.isNum){
				var _pointStr = '<div class="rollboxPointer">';
				$.each(_this.ul.find("li"),function(i,n){
					if(i==0){
						_pointStr += '<span class="n"></span>';return ;
					}
					_pointStr += '<span></span>';
				});
				_pointStr += '</div>';
				var _p = _this.ul.parent();
				_p.append(_pointStr);
				
				var _liw = _this.ul.find("li").width();
				_p.find(".rollboxPointer").find("span").bind("mouseover",function(){
					var _pind = $(this).index();
					_this.ul.animate({left:-_pind*_liw});
					$(this).addClass("n").siblings().removeClass("n");
					
				});
				
				
			}
			var _timer ;
			if(_this.isAuto){
				_timer = setInterval(function(){
					_this.rightbtn.click();
				},2000);
				_this.ul.parent().hover(function(){
					clearInterval(_timer);
				},function(){
					_timer = setInterval(function(){
						_this.rightbtn.click();
					},2000);
				});
			}
			
			var pubInit = function(o,s){
			    if(o.is(":animated")){return ;}
			    var _w = o.find("li").width(),
				    _l = o.position().left,
					_lw = 0;
				if(s==dir[0]){
				    _lw = _l + _w;
				}else if(s==dir[1]){
				    _lw = _l -_w;
				};
				if(!isWufeng){
				    if(_lw > 0){
					    _lw = (1-o.find("li").length)*_w;
					};
					if(_lw < (1-o.find("li").length)*_w){
					    _lw = 0;
					};
				};
				o.animate({left:_lw},_this.speed,function(){
				    if(o.position().left == -(o.find("li").length/2)*_w && isWufeng){
					    o.css("left",0);
					}
					if(_lw >= 0 && isWufeng){
					    o.css("left",-(o.find("li").length/2)*_w);
					}
					var num = o.position().left/o.find("li").width();
					num = Math.abs(num)+1;
					//console.log(_this.page);
					if(_this.page.length > 0){
					    _this.page.text(num);
					};
					if(_this.isNum){
						var n1 = Math.abs(_lw/_w),n2 = _this.ul.find("li").length;
						console.log(n1,n2/2);
						if(n1 >= n2/2){
							n1 = 0;
							}
						_this.ul.parent().find(".rollboxPointer").find("span").eq(n1).addClass("n").siblings().removeClass("n");
						
					}
					
					
				});
			};
			//左
			_this.leftbtn.bind("click",function(){
			    var ul = _this.ul;
				if(_this.is==0){
				    ul.html(ul.html()+ul.html());
					_this.is = 2;
				}
				if(_this.is==1){
				    isWufeng = false;
				};
				if(ul.position().left == 0 && isWufeng){
				    ul.css("left",-(ul.find("li").length/2)*ul.find("li").width());
				};
			    pubInit(ul,dir[0]);
			});
			
			//右
			_this.rightbtn.bind("click",function(){
			    var ul = _this.ul;
				if(_this.is==0){
				    ul.html(ul.html()+ul.html());
					_this.is = 2;
				}
				if(_this.is==1){
				    isWufeng = false;
				};
				if(ul.position().left <= -(ul.find("li").length/2)*ul.find("li").width() && isWufeng){
				    ul.css("left",0);
				};
			    pubInit(ul,dir[1]);
			});
		},
		selectFn:function(o){//下拉框
			var o = $("."+o);
			/*
			<em></em>
			<span>百度</span>
			<ul>
				<li><a href="#">谷歌</a></li>
				<li><a href="#">搜狗</a></li>
				<li><a href="#">微软</a></li>
				<li><a href="#">百度</a></li>
			</ul>
			*/
			var s = '<em></em>';
			s+='<span>'+o.find("select").val()+'</span>';
			s+='<ul>';
			$.each(o.find("option"),function(i,n){
				
				s += '<li><a href="#">'+$(n).text()+'</a></li>';
				
			});
			s+='</ul>';
			o.html(s);
			var ul = o.find("ul");
			o.find("span").bind("mouseover",function(){
				ul.slideDown(300);
			});
			o.bind("mouseleave",function(){
				ul.slideUp(300);
			});
			ul.find("li").bind("click",function(){
				o.find("span").text($(this).text());
				ul.hide();
			});
			
		},
		tabFn:function(o1,o2){
			$("."+o1).find("li").bind("mouseover",function(){
				var ind = $(this).index(),oo = $(this).parent(),oocon = oo.nextAll("."+o2);
				$(this).addClass("xTabFocus").siblings().removeClass("xTabFocus");
				oo.nextAll(".xTabCon").hide();
				oo.nextAll(".xTabCon").eq(ind).show();
			});
		}
	};
	
}).call(this);