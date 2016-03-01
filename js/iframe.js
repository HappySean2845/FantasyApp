   	
   	//iframe content height
   	var iframeHeight=$(window).height();
	$('.iframe_content').height(iframeHeight-5);
	$('.network_broken').height(iframeHeight);
	$('#nickname_checked').height(iframeHeight);
		
	//footer
	$("footer li").on('touchstart',function(e){
		$(this).addClass("selected").siblings().removeClass('selected');;
		e.stopPropagation();
	})

	$('footer li:eq(0)').on('touchstart',function(e){
		$('.iframe_content').attr('src','http://10.103.241.2/room/publicRoomList/')
	})
	$('footer li:eq(1)').on('touchstart',function(e){
		$('.iframe_content').attr('src','http://10.103.241.2/match/notBegin/')
	})
	$('footer li:eq(2)').on('touchstart',function(e){
		$('.iframe_content').attr('src','http://10.103.241.2/data/teamIndex')
	})
	$('footer li:eq(3)').on('touchstart',function(e){
		$('.iframe_content').attr('src','http://10.103.241.2/shop/shopIndex')
	})
	$('footer li:eq(4)').on('touchstart',function(e){
		$('.iframe_content').attr('src','http://10.103.241.2/player/playerInfoIndex')
	})