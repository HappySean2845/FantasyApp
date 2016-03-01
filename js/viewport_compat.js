var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
			return { //移动终端浏览器版本信息
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	document.write('<meta name="viewport" content="width=640,target-densitydpi=device-dpi, minimum-scale=0.5,maximum-scale=2,user-scalable=no" />');
}
if (browser.versions.AppleWebKit) {
	document.write('<meta name="viewport" content="width=640,target-densitydpi=device-dpi, minimum-scale=0.5,maximum-scale=2,user-scalable=no" />');
}
if (browser.versions.android) {
	document.write('<meta name="viewport" content="width=640,target-densitydpi=high-dpi,user-scalable=no" />');
}
//<link rel="stylesheet" type="text/css" href="css/android.css">
//target-densitydpi = 640/ device-width * window.devicePixelRatio * 160
//target-densitydpi=high-dpi

