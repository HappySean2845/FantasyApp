	/**
		Author
		Time 16/02/24
	**/
	iconLoginPhone=$('#icon_login_phone');        					 //icon登陆手机
	iconLoginEmail=$('#icon_login_email');	       					 //icon登陆邮箱
	iconLoginPassWord=$('#icon_login_password');	   				 //icon登陆密码
	iconVerifyEmail=$('#icon_verify_email');						 //icon注册邮箱
	iconVerifyPhone=$('#icon_verify_phone');       		 			 //icon注册手机
	iconVerifyVode=$('#icon_verify_code');	      					 //icon注册验证码
	iconVerifyPassword=$('#icon_verify_password');					 //icon注册密码
	iconVerifyPasswordConfirm=$('#icon_verify_passwordconfirm');	 //icon注册二次密码
	verifyCode=$('#get_verify_code');		           				 //获取验证码按钮
	var msg='';
	user_token = window.localStorage['user_token'];
	user_name = window.localStorage['user_name'];
	//手机号正则
	regphone = /^1[34578][0-9]{9}$/;
	//邮箱正则
	regEmail= /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
	//密码正则 
	regPassword = /^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"0-9a-zA-Z]{6,15}$/;
	
	//开关 显示邮箱或手机账号
	function ShowPhoneEmail(){
		$.ajax({
			url:'http://10.103.252.77:86/Switchcfg/getRegType',
			type:'GET',
			data:{},
			success:function(data){
				data = eval('('+data+')');
				//console.log(data);
				 //手机1  //邮箱2
				if(data.status=='success'){
					if(data.type==1){
						$('#phone_box').show();
						$('#email_box').hide();
						ShowLoginPhone();
						ShowRegPhone();
						
					}else if(data.type==2){
						$('#phone_box').hide();
						$('#email_box').show();
						ShowLoginEmail();
						ShowRegEmail();
					}
			   }
			}
		})	
	}
	ShowPhoneEmail();
	
	//错误执行
	function showNotPassed(element,msg){
		$('.tips_red').show().html(msg);
		$('.icon_verify').show();
		element.show().addClass('icon_wrong').removeClass('icon_right');
	}
	
	//正确执行
	function showPassed(element){
		$('.tips_red').hide();
		element.show().addClass('icon_right').removeClass('icon_wrong');
	}
	
	//焦点触发
	$('input').focusin(function() {
	  $('.icon_wrong').hide();
	  $('.tips_red').hide();
	});
	
	/****************************************注册手机号+验证码****************************************/
	//手机号验证
	function VerifyUserAccount(val){
		if(val==""){
			msg='手机号不能为空！';
			showNotPassed(iconVerifyPhone,msg);
			return false;
		}else if(!regphone.test(val)){
			msg='请输入正确的手机号码！';
			showNotPassed(iconVerifyPhone,msg);
			return false;
		}else{
			showPassed(iconVerifyPhone);
			return true;
		}
	}
	
	//获取验证码
	function postVerifyCode(user_account){
		$.ajax({
			url:'http://10.103.241.113/App/getVerification',
			type:'GET',
			data:{
				user_account:user_account
			},
			success:function(data){
				data = eval('('+data+')');
				console.log(data);
				if(data.status=='error'){
					msg = errCodeToMsg(data.message);
					showNotPassed(iconVerifyPhone,msg);
				}else{
					showPassed(iconVerifyPhone);
					var t=59;
					timer = setInterval(function(){
						if(t>0){
							verifyCode.css('pointer-events','none');
							verifyCode.addClass('code_gray').removeClass('code_blue').html('重新获取('+t--+')');
							
						}else{
							clearInterval(timer);
							timer = null;
							verifyCode.css('pointer-events','auto');
							verifyCode.addClass('code_blue').removeClass('code_gray').html('获取验证码');
						}
					},1000);
				}
			}
		})	
	}
	
	//验证验证码
	function validateVerifyCode(user_account,password_code){
		$.ajax({
			url:'http://10.103.241.113/App/verify',
			type:'GET',
			data:{
				user_account:user_account,
				password_code:password_code	  //验证验证码
			},
			success:function(data){
				data = eval('('+data+')');
				console.log(data);
				if(data.status=='success'){
				  window.location.href='set_password.html'
				}
 				if(data.status=='error'){
					msg = errCodeToMsg(data.message);
					showNotPassed(iconVerifyVode,msg);
				}
			}
		})	
	}
	
	//显示注册手机号码
	function ShowRegPhone(){
		//点击发送验证码执行
		verifyCode.click(function(){
			var user_account=$('#phone_number').val()
			VerifyUserAccount(user_account);
			if(VerifyUserAccount(user_account)==true){
				postVerifyCode(user_account);
			}
		})
		//点击下一步按钮执行
		$('#reg').click(function(){
			var user_account=$('#phone_number').val()
			var password_code = $('#validate_code').val();
			if(VerifyUserAccount(user_account)==false){
				VerifyUserAccount(user_account);
			}else{
				validateVerifyCode(user_account,password_code)
			}
			//存储手机号
			window.localStorage['user_account'] = user_account;
		})
	}
	
	/****************************************注册邮箱+验证码****************************************/
	
	//邮箱规则
	function VerifyEmailAccount(emailval){
		if(emailval==""){
			msg='邮箱不能为空！';
			showNotPassed(iconVerifyEmail,msg);
			return false;
		}else if(!regEmail.test(emailval)){
			msg='请输入正确的邮箱格式！';
			showNotPassed(iconVerifyEmail,msg);
			return false;
		}else{
			showPassed(iconVerifyEmail);
			return true;
		}
	}
	
	//获取邮箱验证码
	function postVerifyCodeEmail(user_account){
		$.ajax({
			url:'http://10.103.241.113/App/sendVerificationMail',
			type:'GET',
			data:{
				user_account:user_account
			},
			success:function(data){
				data = eval('('+data+')');
				console.log(data);
				if(data.status=='error'){
					msg = errCodeToMsg(data.message);
					showNotPassed(iconVerifyEmail,msg);
				}else{
					showPassed(iconVerifyEmail);
					var t=59;
					timer = setInterval(function(){
						if(t>0){
							verifyCode.css('pointer-events','none');
							verifyCode.addClass('code_gray').removeClass('code_blue').html('重新获取('+t--+')');
							
						}else{
							clearInterval(timer);
							timer = null;
							verifyCode.css('pointer-events','auto');
							verifyCode.addClass('code_blue').removeClass('code_gray').html('获取验证码');
						}
					},1000);
				}
			}
		})	
	}
	
	//验证验证码
	function validateVerifyCodeEmail(user_account,verification_code){
		$.ajax({
			url:'http://10.103.241.113/App/checkVerificationMail',
			type:'GET',
			data:{
				user_account:user_account,
				verification_code:verification_code	  //验证验证码邮箱
			},
			success:function(data){
				data = eval('('+data+')');
				console.log(data);
				if(data.status=='success'){
					window.location.href='set_password.html'
				}
 				if(data.status=='error'){
					msg = errCodeToMsg(data.message);
					showNotPassed(iconVerifyVode,msg);
				}
			}
		})	
	}
	
	//显示邮箱注册账号
	function ShowRegEmail(){
		//点击发送验证码执行
		verifyCode.click(function(){
			var user_account=$('#email').val();
			console.log($('#email').val());
			VerifyEmailAccount(user_account);
			if(VerifyEmailAccount(user_account)==true){
				showPassed(iconVerifyEmail);
				postVerifyCodeEmail(user_account);
			}
		})
		//点击下一步按钮执行
		$('#reg').click(function(){
			var user_account=$('#email').val()
			var password_code = $('#validate_code').val();
			if(VerifyEmailAccount(user_account)==false){
				VerifyEmailAccount(user_account);
			}else{
				validateVerifyCodeEmail(user_account,password_code)
			}
			//存储邮箱账号
//			window.localStorage['email_account'] = email_account;
			window.localStorage['user_account'] = user_account;
		})
	}
	/****************************************设置密码****************************************/
	
	//验证密码
	function validatePassword(passWord){
		if(regPassword.test(passWord)==false){
			msg = "密码必须为6-15位英文、数字！";
			showNotPassed(iconVerifyPassword,msg);
			return false;
		}else{
			showPassed(iconVerifyPassword);
			return true;
		}
	}
	
	//验证二次密码
	function validatePasswordAg(passWordConfirm){
		var passWord=$('#password_set').val();
		var passWordConfirm=$('#password_confirm').val();
		if(passWordConfirm==""){
			msg = "确认密码不能为空！";
			showNotPassed(iconVerifyPasswordConfirm,msg);
			return false;
		}else if(passWordConfirm!=passWord){
			msg = "两次输入密码不同！";
			showNotPassed(iconVerifyPassword,msg);
			showNotPassed(iconVerifyPasswordConfirm,msg);
			return false;
		}else{
			showPassed(iconVerifyPasswordConfirm);
			return true;
		}	
	}
	
	//请求注册接口，返回user_token
	function registerUserAccount(user_account,password){
		$.ajax({
			url:'http://10.103.241.113/app/registerGeneral',
			type:'GET',
			data:{
				user_account:user_account,
				password:password
			},
			success:function(data){
				data = eval('('+data+')');
				console.log(data);
				if(data.status=='error'){
					msg = errCodeToMsg(data.message);
					showNotPassed(iconVerifyPhone,msg);
				}
				if(data.status=='success'){
					user_token = data.user_token;
					$.ajax({
						url:'http://10.103.252.77:86/room/publicRoomList/',
						type:'GET',
						data:{user_token:user_token},
						success:function(data){
							console.log(data);	
						}
					})
					window.localStorage['user_token'] = user_token;
			  		window.location.href='nickname.html';
				}
			}
		})	
	}
	
	//点击确认密码输入框
	$('#password_confirm').click(function(){
		var passWord=$('#password_set').val();
		 validatePassword(passWord);
	})
	
	//点击
	$('#next_password').click(function(){
		var user_account=window.localStorage['user_account'];
		//本地存储账号
		console.log(window.localStorage['user_account']);
		var passWord=$('#password_set').val();
		var passWordConfirm=$('#password_confirm').val();
		validatePassword(passWord);
		if(validatePassword(passWord)==true){
			validatePasswordAg(passWordConfirm);
			if(validatePasswordAg(passWordConfirm)==true){
				registerUserAccount(user_account,passWord);
			}
		}
		//本地存储密码
		window.localStorage['passWord'] = passWord;
	})
	
	/****************************************账号登陆****************************************/
	//手机号登陆验证
	function LoginUserAccount(val){
		if(val==""){
			msg='手机号不能为空！';
			showNotPassed(iconLoginPhone,msg);
			return false;
		}else if(!regphone.test(val)){
			msg='请输入正确的手机号码！';
			showNotPassed(iconLoginPhone,msg);
			return false;
		}else{
			showPassed(iconLoginPhone);
			return true;
		}
	}
	
	//邮箱登陆验证
	function LoginEmailAccount(emailval){
		if(emailval==""){
			msg='邮箱不能为空！';
			showNotPassed(iconLoginEmail,msg);
			return false;
		}else if(!regEmail.test(emailval)){
			msg='请输入正确的邮箱格式！';
			showNotPassed(iconLoginEmail,msg);
			return false;
		}else{
			showPassed(iconLoginEmail);
			return true;
		}
	}
	
	//验证密码
	function LoginPassword(passWord){
		if(passWord==''){
			msg = "请输入密码！";
			showNotPassed(iconLoginPassWord,msg);
			return false;
		}if(regPassword.test(passWord)==false){
			msg = "密码必须为6-15位英文、数字！";
			showNotPassed(iconLoginPassWord,msg);
			return false;
		}else{
			showPassed(iconLoginPassWord);
			return true;
		}
	}
	
	//显示手机登陆
	function ShowLoginPhone(){
		
		$('#password').click(function(){
			var phone_number=$('#phone_number').val();
			LoginUserAccount(phone_number);
		})	
		//点击登陆按钮
		$('#login').click(function(){
			var phone_number=$('#phone_number').val();
			var password=$('#password').val();
			LoginUserAccount(phone_number);
			if(LoginUserAccount(phone_number)==true){			
				LoginPassword(password);
				if(LoginPassword(password)==true){
//					user_token = checkLogin(phone_number,password);			//登陆错误的话token = 0;
//					if(user_token!=0){
//						window.localStorage('user_token') = user_token;
//						window.localStorage('user_name') = "设置的昵称";
//						window.location.href = "../../into.html";	
//					}
					/*
					if(phone_number==window.localStorage['user_account']||password==window.localStorage['passWord']){
						//window.location.href='../../into.html';
					}else{
						msg = "手机号码或密码不正确！";
						
					}
					*/
					
				}
				//else if(phone_number==window.localStorage['user_account']||password==window.localStorage['passWord']){
	//			
	//			}
			}
		})	
	}
	
	//显示邮箱登陆
	function ShowLoginEmail(){
		$('#password').click(function(){
			var email_account=$('#email').val();
			LoginEmailAccount(email_account);
		})	
		
		$('#login').click(function(){
			var email_account=$('#email').val();
			var password=$('#password').val();
			LoginEmailAccount(email_account);
			if(LoginEmailAccount(email_account)==true){			
				LoginPassword(password);
				if(LoginPassword(password)==true){
					checkLogin(email_account,password);	
					/*if(email_account==window.localStorage['user_account']||password==window.localStorage['passWord']){
						HaveNickNameToken();
						//window.location.href='../../into.html';
					}*///else{
//						msg = "邮箱或密码不正确！";
//						showNotPassed(iconLoginEmail);
//						showNotPassed(iconLoginPassWord,msg);
//					}
				}
				//else if(phone_number==window.localStorage['user_account']||password==window.localStorage['passWord']){
	//			
	//			}
			}
		})	
	}
	
	
	
	/****************************************我的信息****************************************/
	/*昵称*/
	iconVerifyNickname=$('#icon_verify_nickname');
	
	MaskWord={text:["毛泽东","周恩来","刘少奇","朱德","彭德怀","林彪"]}
	
	function VerifynickName(){
		var user_name=$('#nickname').val();
		if(user_name==""){
			msg = "昵称不能为空！";
			showNotPassed(iconVerifyNickname,msg);
			return false;
		}/*else if(user_name.length!=''){
			for(var i=0,len=MaskWord["text"].length;i<len;i++){
				var a=MaskWord["text"][i];
				var nickNameReg=new RegExp(a,"gi");
				if(nickNameReg.test(user_name)){
					var msg='昵称中有敏感词，请重新设置！';
					showNotPassed(iconVerifyNickname,msg);
					return false;
				}
			}			
		}*/else if(user_name.length>16){
			msg = "昵称不能超过八位数！";
			showNotPassed(iconVerifyNickname,msg);
			return false;
		}else{
			return true;
		}	
	}
	
	//下一步进入
	$('#sub_nickname').click(function(){
		var user_name=$('#nickname').val();
		VerifynickName();
		if(VerifynickName()==true){
			//本地存储昵称
			window.localStorage['user_name'] = user_name;
			intoGame(user_token,user_name);
			window.location.href='../../into.html';
		}
	})	


	/****************************************进入大厅****************************************/
	//是否有设置昵称
	function HaveNickNameToken(user_token){
		$.ajax({
			url:'http://10.103.241.113/App/checkPlayerName',
			type:'GET',
			data:{user_token:user_token},
			success:function(data){
				data = eval('('+data+')');
				console.log("检查昵称返回"+data);
				 //1有昵称  //2无
				if(data.status=='success'){
					//有昵称直接进入页面
					window.location.href='into.html';

				}else{
					//alert('没有昵称！');
					window.location.href='nickname.html';
				}
			}
		})	
	}	

		

/*
			for(var i=0,len=MaskWord["text"].length;i<len;i++){
				var a=MaskWord["text"][i];
				var nickNameReg=new RegExp(a,"gi");
				if(nickNameReg.test(user_name)){
					var msg='昵称中有敏感词，请重新设置！';
					showNotPassed(iconVerifyNickname,msg);
					return false;
				}
				else{
					window.location.href='login.html';
					return true;
				}
*/




/***************************************/
//登录请求服务器验证账号密码
function checkLogin(user_account,password){
	var user_token = "";
	$.ajax({
		url:'http://10.103.241.113/app/login',
		type:'GET',
		async:false,
		data:{user_account:user_account,password:password},
		success:function(data){
			data = eval("("+data+")");
			console.log("登录返回信息"+data);
			if(data.status=="success"){
				user_token = data.user_token;
				console.log("user_token"+user_token);
				window.localStorage['user_token'] = user_token;
				HaveNickNameToken(user_token);
			}else{
				window.location.href='login.html';
//				msg = errCodeToMsg(data.message);
//				user_token = 0;
//				showNotPassed(iconLoginEmail);
//				showNotPassed(iconLoginPassWord,msg);
//				alert(msg);	
			}
		}
	})
	return user_token;
}

//进入游戏
function intoGame(user_token,user_name){
	$(".iframe_content").attr("src","http://10.103.241.113/room/publicRoomList?user_token="+user_token+"&user_name="+user_name);
}