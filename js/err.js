//错误处理模块
function errCodeToMsg(code){
	var msg = ""
	switch(code){
		case "1001":
			msg = "该账号不存在";
			break;
		case "1002":
			msg = "密码输入错误";
			break;
		case "1003":
			msg = "该账号已被注册";
			break;
		case "1004":
			msg = "登录失败，请稍后再试";
			break;
		case "1005":
			msg = "用户凭证不合法";
			break;
		case "1006":
			msg = "用户凭证过期";
			break;
		case "1007":
			msg = "验证码不正确或已过期";
			break;
		case "1008":
			msg = "请重发验证邮件";
			break;
		case "1009":
			msg = "请输入正确手机号或邮箱";
			break;
		case "1010":
			msg = "密码不符合规则";
			break;
		case "1011":
			msg = "来源不存在";
			break;
		case "1012":
			msg = "校验失败";
			break;
		case "1013":
			msg = "时间戳超时";
			break;
		case "1014":
			msg = "绑定账号错误";
			break;
		case "1015":
			msg = "无法找回密码";
			break;
		case "1016":
			msg = "邮件发送失败";
			break;
		case "1017":
			msg = "验证码不能为空";
			break;
		case "1018":
			msg = "系统处理失败";
			break;
		case "1019":
			msg = "请稍后请求验证码";
			break;
		case "1020":
			msg = "短信发送失败";
			break;
		case "1021":
			msg = "请输入正确验证码";
			break;
		case "1022":
			msg = "不能和原密码相同";
			break;
		case "1023":
			msg = "用户无法验证邮箱";
			break;
		case "1024":
			msg = "安全问题校验失败";
			break;
		case "1025":
			msg = "该账号已被绑定过";
			break;
		case "1026":
			msg = "该邮箱未绑定";
			break;
		case "验证码发送时间限制":
			msg = "验证码发送时间限制";
			break;
		default:
			msg = "系统错误";
	}
	return msg;
}