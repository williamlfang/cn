window.webDomain	= 'bzdcms.com';
window.Domains = {
	main:'www.'+webDomain,
	cookies:webDomain,
	api: 'api'+webDomain,
	root: 'www.'+webDomain,
	img: 'img.'+webDomain,
	search: 'search'+webDomain,
	user:'www.'+webDomain
};

window.Config ={
	webRoot:'',
	Charset:'utf-8',
    webLogo: 'http://' + Domains.main + '/Logo/logo.jpg',
	xmlDefaultPage:'dn.asp',
	ajaxTimeOut:90,
	userPath:'/User',
	buserPath:'/Buser',
        IconUrl:'/logo/favicon.ico',
	codeXml:'/Lib/XmL/RandCode/?w=100&h=35'
};
window.Config.userPath = Config.webRoot+'/User';
window.Config.buserPath = Config.webRoot+'/Buser';
window.Config.codeXml = Config.webRoot+'/Lib/XmL/RandCode/'+Config.xmlDefaultPage+'?w=100&h=35';
