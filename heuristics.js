/*Plugin to change the fontsize on window resize*/
$(document).ready(function(){
(function($) {
    $.fn.changeFontSize = function() {	
    var $el = this;
	var width = $el.width();
	var fontSize=$el.css("font-size");

	fontSize=width/50*.3;	
    $el.css({"font-size": fontSize + "em", "line-height":"120%"});
    }
})( jQuery );



/*Plugin to create a draggable and resizeable testing window*/
(function($) {
    $.fn.draggableTesting= function() {
	
		
		var position={top:0,left:0};
		if( localStorage.getItem(location.pathname+"_heur_position") && localStorage.getItem(location.pathname+"_heur_position")!='undefined' && localStorage.getItem(location.pathname+"_heur_position")!="null")
		{
			position=JSON.parse(localStorage.getItem(location.pathname+"_heur_position"));
		}
		var $el = this.css({'width':'160px','background':'rgb(168, 168, 168)','top':position.top,'left':position.left,'position':'relative','resize':'both','overflow':'auto'});		
		var $condition= '<input type="checkbox" name="conditions" class="checkboxes"';
		var condition_data={name:["info","term","undo","consistent","error","memory","efficient","minimal","messages","help"], text:["what's happening?","Simple terminology?","Undo/Redo?","Adheres to standards?","Minimal Error Scope?","No memorization?","Efficient?","Minimalistic?","Sensible messages?","Help provided?"]};
		
		var result="";
		
		var storage={};
		
		for(var i=0;i<condition_data.name.length;i++)
		{
			var inputCheckBox=$condition+"value='"+condition_data.name[i]+"'><a href='javascript:void(0)' onClick='div_"+condition_data.name[i]+"' id='link_"+condition_data.name[i]+"' class='open_textArea'>"+condition_data.text[i]+"</a><br>";
			var inputTextArea="<div class='condition_div' id='div_"+condition_data.name[i]+"'><textarea style='width:95%' class='condition_textarea' val='"+condition_data.name[i]+"' id='text_"+condition_data.name[i]+"' ></textarea></div>";
			temp=inputCheckBox+inputTextArea;
			result=result+temp;
			storage[condition_data.name[i]]={"checked":"n","text":""};
		}
		if( localStorage.getItem(location.pathname+"_heur_data") && localStorage.getItem(location.pathname+"_heur_data")!='undefined' && localStorage.getItem(location.pathname+"_heur_data")!="null")
			storage=JSON.parse(localStorage.getItem(location.pathname+"_heur_data"));			
		
		$el.html(result);		
		$el_textArea=$(".condition_div").hide();
		
		$('.checkboxes').change(function(){			
			var val=$(this).val();
			var c = this.checked ? 'line-through' : 'none';
			storage[val].checked =this.checked ? "y":"n";
			$("#link_"+val).css('text-decoration', c);
			localStorage.setItem(location.pathname+"_heur_data",JSON.stringify(storage)); 
			
		});
		
		for(var i=0;i<condition_data.name.length;i++)
		{
			if(storage[condition_data.name[i]].checked=="y")
			{
				$("input[value='"+condition_data.name[i]+"']").trigger('click');;
			}
			if(storage[condition_data.name[i]].text.length>0)
			{
				$("#text_"+condition_data.name[i]).val(storage[condition_data.name[i]].text);
				$("#div_"+condition_data.name[i]).show()
				
			}
		}
		
		
		$el_wrap=$el.wrap('<div class="heur_wrap"></div>');
		$el_wrap.css({"position":"fixed","z-index":100});
		$el_wrap.prepend('<div class="heur_movable">Heuristic Principles</div>');
		$(this).changeFontSize();
		$el.on("mouseup",function(){
			$(this).changeFontSize();
		});
		
		$(".open_textArea").on("click",function(){
			$("#"+$(this).attr("onClick")).toggle();	
		});
		
		
		$(".condition_textarea").on("change keyup paste", function() {
			var val=$(this).attr("val");
			storage[val].text=$(this).val();
			localStorage.setItem(location.pathname+"_heur_data",JSON.stringify(storage)); 
		});
		
        return $(".heur_movable").css({"cursor":"move","background":"rgb(123, 120, 120)","font-weight":"bold"}).on("mousedown", function(e) {	
		    var $drag = $el.addClass('draggable'); 
			drg_h = $drag.outerHeight(),
			drg_w = $drag.outerWidth(),
			pos_y = $drag.offset().top + drg_h - e.pageY,
			pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css({'z-index':1000}).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                })				
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
		
		localStorage.setItem(location.pathname+"_heur_position",JSON.stringify($('.draggable').position())); 
		$el.removeClass('draggable');
		});

    }
})(jQuery);


$('.heuristics').draggableTesting();
})


