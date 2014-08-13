
/**搜索公用-Start**-------------------------------------------------------------*/
var search_mc;
function cleanTip(condition){
	var $go = $('#gosearch');
	var $gq = $('#wd');
	if($gq.val()==$gq.attr('title')){
		$gq.val('').removeClass('grey');
		//$go.addClass("typing");
	}else if($gq.val()==""&&condition=='blur'){
		$gq.val($gq.attr('title')).addClass("grey");
		//$go.removeClass("typing");
	}
}
function kKeyUp(e,v) {
	
	GetSearchResult(e,v,'search_tip','');
	
}
function kBlur() {
	Fid('search_tip').style.display = 'none';hiddenSelect('show');
}
function changeSearchTip(e){
	$('#inputtit').blur();
	if(Fid('search_tip').style.display == 'none'){kKeyUp(e,$('#wd').val());}else{$('#search_tip').hide();}

}

function clearChangeResultClass(num) {
	Fid('r_'+ num).className = 'searchResultli';
}
function changeResultClass(total,num) {
	for (var i = 0; i <= total ;i ++ )
	{
		if (i == num)
		{
			Fid('r_'+ i).className = 'resultFocusLi';
			Fid('key').value = Fid('text_'+ i).innerHTML;
		}
		else
		{
			Fid('r_'+ i).className = 'searchResultli';
		}
	}
}

function searchsubmit(){
	var typeid=getObjVal('#typeid');
	var wd = getObjVal('#wd');
	if(wd==$('#wd').attr('title')||wd=='')layerAlert('','请输入搜索的关键字');
	else top.location.href ='/search.shtml?wd='+ escape(wd)+'&typeid='+escape(typeid);
}


function searchList(tempid,tag,hotKey){
	
	var vt=Request("vt");
	var typeid=Request("typeid");
	var act=Request("act");
	var orderby=Request("order");
	var wd=Request("wd");
	var CurrentPage=Request("page");
	if (CurrentPage=="") {CurrentPage=1;}
	else{CurrentPage=parseInt(Request("page"));}
	var PageSize=12;
	var listNumStyle=8;
	var obj	= '#'+tag;
	if(typeid==''){typeid='0'}
	if(orderby==''){orderby='normal'}
	
	$(document).ready(function() {
		$('#type_menu li').each(function(){
			if($(this).attr('rel')==unescape(typeid)){$(this).attr('class','on');}else{$(this).attr('class','nor');}
		});
		$('#orderby_menu li').each(function(){
			if($(this).attr('rel')==unescape(typeid)){$(this).attr('class','on');}else{$(this).attr('class','nor');}
		});
		if(wd!=''){$('#wd').attr('value',unescape(wd));}
		if(typeid!=''){$('#typeid').attr('value',unescape(typeid));}
		if($('#search_key').length>0){$('#search_key').html('关键字:'+unescape(wd));}
		///重取参数
		typeid	= $('#typeid').val();
		wd		= $('#wd').val();
		var $gq = $('#wd');
		if($gq.val()!=$gq.attr('title')){
			$gq.removeClass('grey');
		}else{wd=''}
			
			
		if(wd==''){
			if (hotKey!=''){hotKey=unescape(hotKey);hotKey.replace(',','</b>,<b>');hotKey='<b>'+hotKey+'</b>'}
			$(obj).html('<div class="warningDiv"><img src="/statics/images/Titpic/tip.gif" alt="提示" class="picMiddle" /><span class="fontBold"> 你可以输入关键词如“'+hotKey+'”进行搜索</span>\
				<ol class="fontLarge" style="list-style-type:decimal;">\
				  <li>在保证满足搜索要求的前提下尽可能的缩短关键词。</li>\
				  <li>换用较常见的关键词。</li>\
				  <li>你可以我们的客服代表取得联系。反映您遇到的问题。</li>\
				</ol>\
			  </div>');
		}else{
			$('#locationtitle').html('关键字:'+unescape(wd));
			//$(obj).html('<img src="'+Config.webRoot+'/Lib/Images/Loading/Loading2.gif" align="absmiddle"/>'+'正在搜索，请稍后...');
			layerLoad("正在搜索，请稍后",0,null);	
			search_mc	= 	new Model();
			search_mc.AjaxComon('','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=searchlist','wd='+ escape(wd) +'&typeid='+typeid+'&order='+orderby+'&id='+ tempid+'&page='+CurrentPage,obj);
		}
	});
}

function GetSearchResult(e,val,id,typeid) {
	var Smodel	= new Model();
	var tag = Fid(id);
	var jtag='#'+id;
	var c;
	val = val.replace(/ /g,'');
	var k = e.keyCode;
	if (k != 13 && k != 16 && k != 17 && k != 27 && k != 37 && k != 38 && k != 39 && k != 40 && k != 144){
		c = function() {
			if (val != '' && val.length > 1){
				Smodel.AjaxComon('..','/Lib/Xml/Param/'+Config.xmlDefaultPage+'?action=GetSearchResult','val='+ escape(val) +'&id='+ id+'&typeid='+unescape(typeid),jtag);
				if (tag.innerHTML != '') {
					if (tag.style.display == 'none' && val.replace(/ /g,'') != '') {
						showTr(id);
						tag.style.opacity = 0.85;
						tag.style.filter = 'Alpha(opacity=85)';
						tag.style.zIndex = 7777;
					}
					hiddenSelect('hidden');
				}
			}
			else {tag.style.display = 'none';}
			clearTimeout(c);
		};
		setTimeout(c,500);
	}
	else if (k == 27|| k == 32){tag.style.display = 'none';}
	else if (k == 13){tag.style.display = 'none';searchsubmit();}
	else if (k == 38 || k == 40) {
		if (tag.style.display != 'none' && Fid('searchResultDiv')){
			var t = -1;
			var j = Fid('searchResultCount').value - 1;
			for (var i=0; i <= j; i++) {
				if (Fid('r_'+ i) && Fid('r_'+ i).className == 'resultFocusLi') {
					Fid('r_'+ i).className = 'searchResultli';
					t = i;
				}
			}
			if (k == 40) t = t + 1;
			if (k == 38) t = t - 1;
			if (t > j) t = 0;
			if (t < 0) t = j;
			if (Fid('r_'+ t)) {
				Fid('r_'+ t).className = 'resultFocusLi';
				Fid('wd').value = Fid('text_'+ t).innerHTML;
			}
		}
	}
}
/**搜索公用-End**-------------------------------------------------------------*/




/**编辑器-Start**-------------------------------------------------------------*/

function setCaret(textObj){
	if (textObj.createTextRange) textObj.caretPos = document.selection.createRange().duplicate();
}


function insertAtCaret(textObj,textFeildValue) {
	if(document.all) {
		if (textObj.createTextRange && textObj.caretPos) {
			var caretPos = textObj.caretPos;
			caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ''?textFeildValue + '' : textFeildValue;
		}
		else textObj.value = textFeildValue;
	}
	else{
		if(textObj.setSelectionRange){
			var rangeStart = textObj.selectionStart;
			var rangeEnd = textObj.selectionEnd;
			var tempStr1 = textObj.value.substring(0,rangeStart);
			var tempStr2 = textObj.value.substring(rangeEnd);
			textObj.value = tempStr1 + textFeildValue + tempStr2;
		}
		else alert("This version of Mozilla based browser does not support setSelectionRange");
	}
}


function GetLength(obj){
	var iLength ;
	if (getOs() == 'Opera') {
		iLength = Fid(obj).value.replace(/[^\x00-\xff]/g,"**").length;
	}
	else {
		var oEditor = CKEDITOR.instances[obj];
		var oDOM = oEditor.EditorDocument ;
		if ( document.all ) iLength = oDOM.body.innerText.length ;
		else{
			var r = oDOM.createRange() ;
			r.selectNodeContents( oDOM.body ) ;
			iLength = r.toString().length ;
		}
	}
	return iLength;
}
function getByteLen(val) {   
	var len = 0;   
	for (var i = 0; i < val.length; i++) {  
	 //全角
		if (val[i].match(/[^\x00-\xff]/ig) != null)   
		{len += 2;   }
		else{   
		len += 1;
		}   
	}   
	return len;   
}
//保存评论
function save_review(virtualRoot,module,modelid,newsID,pageNo,maxLength){
	var str = '';var module_txt='';
	if (getOs() == 'Opera') str = Fid('reviewCont_'+ newsID).value;
	else str = escape(getContents('reviewCont_'+ newsID));
	a	= getByteLen(str);
	switch(module){
		case "bbs":
			module_txt='帖子' ; break;
		default:
			module_txt='评论' ; break;
	
	}
	if (a == 0) alert('1、'+module_txt+'内容不能为空\n2、请不要使用纯表情或纯图片作为帖子内容');
	else if (a > maxLength) alert(''+module_txt+'内容超出字数限制');
	else {
		if (Fid('P_'+ newsID) && Fid('reviewTempId_'+ newsID)) {
			var data='id='+ newsID +'&modelid='+ modelid +'&pageNo='+ pageNo +'&tempid='+ $('#reviewTempId_'+ newsID).val() +'&reviewcont='+ str;
			var tagObj='#P_'+ newsID;
			new Model().AjaxComon('正在提交您的'+module_txt+'，请稍后','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getReviewList',data,tagObj);
			
			setContents('reviewCont_'+ newsID,'');
			location.href = '#P_'+ newsID;
		}
		else alert('出现意外错误，'+module_txt+'无法提交');
	}
}
//清除评论框内内容
function review_reset(obj){
	if (getOs() == 'Opera') Fid(obj).value='';
	else setContents(obj,'');
}
function CheckReviewLength(virtualRoot,modelid,PublicID,pageNo,maxLength) {
	//var a = GetLength('reviewCont_'+ PublicID);
	var str = '';
	if (getOs() == 'Opera') str = Fid('reviewCont_'+ PublicID).value;
	else str = escape(getContents('reviewCont_'+ PublicID));
	a	= getByteLen(str);
	
	if (a == 0) alert('1、帖子内容不能为空\n2、请不要使用纯表情或纯图片作为帖子内容');
	else if (a > maxLength) alert('帖子内容超出字数限制');
	else {
		if (Fid('P_'+ PublicID) && Fid('reviewTempId_'+ PublicID)) {
			var data='id='+ PublicID +'&modelid='+ modelid +'&pageNo='+ pageNo +'&tempid='+ $('#reviewTempId_'+ PublicID).val() +'&reviewcont='+ str;
			var tagObj='#P_'+ PublicID;
			new Model().AjaxComon('正在提交您的帖子，请稍后','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getReviewList',data,tagObj);
			
			setContents('reviewCont_'+ PublicID,'');
			location.href = '#P_'+ PublicID;
		}
		else alert('出现意外错误，帖子无法提交');
	}
}

function createReviewEditor(virtualRoot,toolBarSet,wid,hei,tagObj,showType) {
	//checkLoadEditor();
	if(toolBarSet==undefined||toolBarSet==''){toolBarSet='Basic';}
	if(wid==undefined||wid==''){wid='98%'}
	if(hei==undefined||hei==''){hei=100;}
	if (showType == 0){ oFCKeditor.Create() ;
		CKEDITOR.appendTo( 'reviewCont_'+tagObj, {customConfig : '/lib/ckeditor/user_config.js',toolbar:toolBarSet,width:wid,height:hei}, '' );
	}else{
		CKEDITOR.replace('reviewCont_'+tagObj,{customConfig : '/lib/ckeditor/user_config.js',toolbar:toolBarSet,width:wid,height:hei} ); }
}
function createEditor(virtualRoot,toolBarSet,wid,hei,tagObj,showType) {
	//checkLoadEditor();
	if(toolBarSet==undefined||toolBarSet==''){toolBarSet='Basic';}
	if(wid==undefined||wid==''){wid='98%'}
	if(hei==undefined||hei==''){hei=100;}

	if (showType == 0){ oFCKeditor.Create() ;
		CKEDITOR.appendTo(tagObj, {customConfig : '/lib/ckeditor/user_config.js',toolbar:toolBarSet,width:wid,height:hei}, '' );
	}else{
		CKEDITOR.replace(tagObj,{customConfig : '/lib/ckeditor/user_config.js',toolbar:toolBarSet,width:wid,height:hei} ); }
}

function checkLoadEditor(){
	if ( window.CKEDITOR ){
		(function(){
			var showCompatibilityMsg = function(){
				var env = CKEDITOR.env;
				var html = '<p><strong>Your browser is not compatible with CKEditor.</strong>';
				var browsers = {
					gecko : 'Firefox 2.0',
					ie : 'Internet Explorer 6.0',
					opera : 'Opera 9.5',
					webkit : 'Safari 3.0'
				};
				var alsoBrowsers = '';
				for ( var key in env ){
					if ( browsers[ key ] ){
						if ( env[key] )
							html += ' CKEditor is compatible with ' + browsers[ key ] + ' or higher.';
						else
							alsoBrowsers += browsers[ key ] + '+, ';
					}
				}
				alsoBrowsers = alsoBrowsers.replace( /\+,([^,]+), $/, '+ and $1' );
				html += ' It is also compatible with ' + alsoBrowsers + '.';
				html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';
				var alertsEl = Fid( 'alerts' );
				alertsEl && ( alertsEl.innerHTML = html );
			};
			var onload = function()	{
				// Show a friendly compatibility message as soon as the page is loaded,
				// for those browsers that are not compatible with CKEditor.
				if ( !CKEDITOR.env.isCompatible )
					showCompatibilityMsg();
			};
			// Register the onload listener.
			if ( window.addEventListener )
				window.addEventListener( 'load', onload, false );
			else if ( window.attachEvent )
				window.attachEvent( 'onload', onload );
		})();
	}
}

function insertLocalFileToEditer(filename,extname,filepath,filesize,tag) {
	switch(extname){
	case 'jpg': case 'gif': case 'jpeg': case 'bmp': case 'png':
		insertHTML(tag,'<img alt="'+ filename +'" title="'+ filename +'" src="'+ filepath +'" />');
		break;
	default :
		insertHTML(tag,'<img src="/Lib/Images/File/'+ extname +'.gif" style="border:0px; vertical-align:middle;" alt="" /> <a href="'+ unescape(filepath) +'" rel="external">'+ unescape(filename) +'.'+ extname +'</a> ['+ filesize +']');
		break;
	}
	
}

function insertHTML(obj,str){
	var oEditor	= CKEDITOR.instances[obj];
	//if (!oEditor){alert('编辑器载入失败,请重刷')}
	//checkLoadEditor();
	if (oEditor.mode == 'wysiwyg'){
		oEditor.insertHtml( str );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}

function insertText(obj,str){
	var oEditor	= CKEDITOR.instances[obj];
	//if (!oEditor){alert('编辑器载入失败,请重刷')}
	if ( oEditor.mode == 'wysiwyg' ){
		oEditor.insertText( str );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}

function setContents(obj,str){
	//if (!oEditor){alert('编辑器载入失败,请重刷')}
	var oEditor	= CKEDITOR.instances[obj];
	oEditor.setData(str);
}

function getContents(obj){
	//if (!oEditor){alert('编辑器载入失败,请重刷')}
	var oEditor	= CKEDITOR.instances[obj];
	return oEditor.getData();
}
function executeCommand(obj,commandName ){
	var oEditor	= CKEDITOR.instances[obj];
	if ( oEditor.mode == 'wysiwyg' ){
		oEditor.execCommand( commandName );
	}
	else
		alert( 'You must be in WYSIWYG mode!' );
}

/**搜索公用-End**-------------------------------------------------------------*/










/**页面常用XML请求-Start**-------------------------------------------------------------*/
/*sys类ajax引用，分离出来方便以后改AJAX框架时更改*/
function sysAjax(loadTxt,postUrl,dataStr,tag){
	model.AjaxComon('<img style="border:0px;" align="absmiddle" src="' + Config.webRoot + '/Lib/Images/Loading/Loading2.gif" alt="Loading..." />'+loadTxt,postUrl,dataStr,tag);
}
function GetServerData(resultType,virtualRoot,act,val1,val2,val3,val4,tagObj) {
	new Model().AjaxComon('','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getserverdata','obj='+ act +'&val1='+ val1 +'&val2='+ val2 +'&val3='+ val3 +'&val4='+ val4,'#'+ tagObj,1,'POST',resultType);	
}

var mc_ch_rg;
function CheckReadGroup(virtualRoot,modelid,infoid,pageNo) {
	layerLoad("请稍后..");
	clearTimeout(mc_ch_rg);
	mc_ch_rg=setTimeout(function(){$.ajax({
		type: "POST",
		url: '/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=checkReadGroup&'+Math.random(),
		data: 'infoid='+ infoid +'&modelid='+ modelid +'&pageNo='+ pageNo,
		cache:false,
		async:true,
		timeout: 5000,
		success: function(msg){
			layerClose('load_wait');
			if(msg=='err_needlogin'){
				layerResult('阅读当前内容需要登录会员',1500,function(){loginForm();});
				return true;
			}
			else{
				$('#Info_'+infoid).html(unescape(msg));
				return true;
			}
			
			},
		error: function(msg){return false;}
		});},100);
	
}

function user_point_read(modelid,infoid,pageNo) {
	layerLoad("请稍后..");
	new Model().AjaxComon('','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=point_read','infoid='+ infoid +'&modelid='+ modelid +'&pageNo='+ pageNo,'#Info_'+infoid);		
			
}

function GetUserLoginForm(virtualRoot,tempId,formId) {
	xmlHttpPost(false,'','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=checkUser','tempid='+ tempId +'&id='+ formId,0,0,'LoginForm_'+ formId);
}

function ChkUserLogin(virtualRoot,action,formId) {
	var tempid = Fid('tempId').value;
	var usn = Fid('usn').value;
	var psw = Fid('psw').value;
	var code = Fid('code').value;
	var saveCookie = Fid('savecookie').checked;
	if (saveCookie) saveCookie = 1;
	xmlHttpPost(true,'身份验证中，请稍后...','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action='+ action,'tempid='+ tempid +'&usn='+ usn +'&psw='+ psw +'&code='+ code +'&savecookie='+ saveCookie +'&id='+ formId,0,0,'LoginForm_'+ formId);
}
function GetActionFlagCont(virtualRoot,resultType,flagID,pageNo) {
	var ajaxType = true;
	if (resultType == 3) ajaxType = false;
	xmlHttpPost(ajaxType,'Loading...','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=changePage','id='+ flagID +'&page='+ pageNo,0,0,'P_'+ flagID)
}


function changePage(virtualRoot,resultType,action,pCount,pButton,pPlace,pType,tagObj,condition) {
	var pNo = '';
	var ajaxType = true;
	if (resultType == 3) ajaxType = false;
	if (pButton == 'First') pNo = 1;
	else if (pButton == 'Previous'){
		if (Fid('P_'+ tagObj +'_No0')) pNo = Number(Fid('P_'+ tagObj +'_No0').innerHTML) - 1;
		if (Fid('P_'+ tagObj +'_No1')) pNo = Number(Fid('P_'+ tagObj +'_No1').innerHTML) - 1;
		if (pNo < 1) pNo = 1;
	}
	else if (pButton == 'Next'){
		if (Fid('P_'+ tagObj +'_No0')) pNo = Number(Fid('P_'+ tagObj +'_No0').innerHTML) + 1;
		if (Fid('P_'+ tagObj +'_No1')) pNo = Number(Fid('P_'+ tagObj +'_No1').innerHTML) + 1;
		if (pNo > pCount) pNo = pCount;
	}
	else if (pButton == 'Last') pNo = pCount;
	else pNo = Number(pButton);
	if(action=='searchlist'){
		var urltemp=location.search;
		var arrTemp = urltemp.split("&page=");
		var url	= arrTemp[0]+'&page='+pNo;
		location.href	= url;
		
		return true;
	}
	
	if (pType == 0){
		for (var i = 1;i <= pCount;i ++ ){
			if (i == pNo) {
				if (Fid('P_'+ tagObj +'_'+ i)) Fid('P_'+ tagObj +'_'+ i).style.display = 'block';
			}
			else {
				if (Fid('P_'+ tagObj +'_'+ i)) Fid('P_'+ tagObj +'_'+ i).style.display = 'none';
			}
		}
	}
	else{
		new Model().AjaxComon('','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action='+ action,'id='+ tagObj +'&page='+ pNo +'&condition='+ unescape(condition).replace(" ","%20"),'#P_'+ tagObj,1,'POST',ajaxType);	
	}
	if (Fid('P_'+ tagObj +'_No0')) Fid('P_'+ tagObj +'_No0').innerHTML = pNo;
	if (Fid('P_'+ tagObj +'_No1')) Fid('P_'+ tagObj +'_No1').innerHTML = pNo;
}

function setWeather(e,virtualRoot,id) {
	var coll = document.getElementsByTagName('div');
	if(!coll) return;
	if(coll.length){
		for(var i = 0;i < coll.length;i++){
			if (coll.item(i).className == 'setWeather'){
				coll.item(i).style.display = 'none';
			}
		}
	}
	if (!Fid(id)) {
		createDiv(e,id,'setWeather');
		xmlHttpPost(true,'','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=setweather','result=show&id='+ id,0,0,id);
	}
	else {
		Fid(id).style.display = '';
		if ((returnXY(e,'x') + Fid(id).scrollWidth) > document.documentElement.scrollWidth) {
			Fid(id).style.left = (document.documentElement.scrollWidth - Fid(id).scrollWidth) - 20 +'px';
		}
		else {
			Fid(id).style.left = returnXY(e,'x') +'px';
		}
		if ((returnXY(e,'y') + Fid(id).scrollHeight) > document.documentElement.scrollHeight) {
			Fid(id).style.top = (document.documentElement.scrollHeight - Fid(id).scrollHeight) - 20 +'px';
		}
		else {
			Fid(id).style.top = (returnXY(e,'y') + 6) +'px';
		}
	}
}

function selfLink(e, virtualRoot, id, text) {
    var coll = document.getElementsByTagName("div");
    if (!coll) {
        return;
    }
    if (coll.length) {
        for (var i = 0; i < coll.length; i++) {
            if (coll.item(i).className == "selfLink") {
                coll.item(i).style.display = "none";
            }
        }
    }
    if (!Fid(id)) {
        createDiv(e, id, "selfLink");
        Fid(id).style.opacity = 0.85;
        Fid(id).style.filter = "Alpha(opacity=85)";
        xmlHttpPost(true, '',  '/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=showSelfLink', 'title=' + text + '&id=' + id, 0, 0, id);
    } else {
        Fid(id).style.display = "";
        Fid(id).style.left = returnXY(e, "x") + "px";
        Fid(id).style.top = returnXY(e, "y") + 6 + "px";
    }
}

function showRandCode(Codew,Codeh,Tag) {
	$.ajax({
		type: "POST",
		url: Config.webRoot+"/Lib/Xml/Param/"+Config.xmlDefaultPage+"?action=showRandCode&r="+Math.random(),
		data: "Codew="+encodeURIComponent(Codew)+"&Codeh="+encodeURIComponent(Codeh),
		beforeSend: function(XMLHttpRequest){
			$(Tag).html('<img src="'+Config.webRoot+'/Lib/Images/Loading/Loading2.gif" align="absmiddle"/>'+"&nbsp;&nbsp;loading..");	
		},
		timeout: 50000,
        error: function(msg){
			$(Tag).html("&nbsp;&nbsp;读取失败");	
			$(Tag).attr("class","hint check_warning");
			return false;
			},    
		success: function(msg){
			$(Tag).html('<img src="'+unescape(msg)+'" onclick="showRandCode(\''+Codew+'\',\''+Codeh+'\',\''+Tag+'\');" alt="看不清楚？点击一下换一个" style="cursor:pointer;" class="picMiddle" />');
			return true;
		}
	});
}

/*会员公用*/
function getOperaPath(){
	var arrpath="";var opera_path;
	var domainurl = document.location.href.match(/^http:\/\/(.+?)\//i)[0].toLowerCase();
	var file_path = document.location.href.substring(0,document.location.href.lastIndexOf("/")+1).toLowerCase();
	if(domainurl!=''&&file_path!=''){opera_path=file_path.replace(domainurl,'');arrpath=opera_path.split("/");}
	return arrpath[0];
	


}
function validatorUser(getType,obj){
	var p=getOperaPath();
	var postUrl;var dataStr;
	switch(getType){
		case "s":
			postUrl="/lib/xml/buser/"+Config.xmlDefaultPage+"?action=validatoruser";
			dataStr="getType=s&p="+p;
			break;
		case "b":
			postUrl="/lib/xml/buser/"+Config.xmlDefaultPage+"?action=validatoruser";
			dataStr="getType=b&p="+p;
			break;
		case "u":
			postUrl="/Lib/Xml/User/"+Config.xmlDefaultPage+"?action=validatoruser";
			dataStr="getType=u&p="+p;
			break;
		}
	getvalidatorUser(postUrl,dataStr,false,false,"#user_status");
	return true;
	}
function getvalidatorUser(postUrl,dataStr,asyncTF,cacheTF,tagObj){
	var historyLink=document.location.href;
	$.ajax({
		type: "POST",
		url: postUrl+"&r="+Math.random(),
		data: dataStr,
		cache:false,
		async:true,
		timeout: 5000,
		success: function(msg){
			if(unescape(msg)=='False'){location.href='/login.shtml?url='+historyLink;return false;}else if(unescape(msg)=='isb'){location.href='/buser';return false;}
			else if(unescape(msg)=='1'){$(tagObj).html('');return true;}
			else{$(tagObj).html('');return true;}
			},
        error: function(msg){//alert(msg);
		$(tagObj).html('');return false;}

	});
}	
function loginForm(){
	var option = {
        no_cancel: false,
        no_submit: false,
        zIndex: 3500
    };
    var aid = 15000102;
    option.wid = 'layer_login';
    option.div_width = 350;
	option.submit_button_name =  '登录';
    option.div_height = 0;
    option.time_out = 0;
    option.submit_not_close = true;
	var _callback = function(userName,password,userType,isSave,isLayer){
		userLogin(userName,password,userType,isSave,isLayer);
	};
    var f_callback = function() {
        var userName='';
		var password='';
		var userType=0;
		var isSave=1;
       if (checkUserName('#UserName','#UserName_info')&&checkPasswords('#userpwd','#userpwd_info')){
			userName=getObjVal('#UserName');
			password=getObjVal('#userpwd');
			userType=getUserType('#UserName','#UserName_info');
			isSave=getBoxVal('save_login');
		}else{
			alert('您所填写的登录信息有误');
			return;
		}
		_callback(userName,password,userType,isSave,true);
    };
    option.submit_callback = f_callback;
	$(document).ready(function(){if($('#UserName').length>1||$('#userpwd').length>1){location.href='/login.shtml';}});
	var html='<div id="layer_login_form" class="layer_login">\
	  <p>\
		<label for="UserName">账号：</label>\
		<input type="text" id="UserName" size="30" onblur="checkUserName(this,\'#UserName_info\');" onkeydown="javascript: if(event.keyCode == 13) Fid(\'layer_login_submit\').click();" class="input" /> </p>\
		  <div class="line_txt"> <span class="hint" id="UserName_info">企业账号、个人会员E-Mail</span></div>\
	  <p>\
		<label for="userpwd">密码：</label>\
		<input type="password" id="userpwd" size="30" onblur="checkPasswords(this,\'#userpwd_info\');" onkeydown="javascript: if(event.keyCode == 13) Fid(\'layer_login_submit\').click();" class="input"/> </p>\
		 <div class="line_txt"> <span class="hint" id="userpwd_info">请输入您的密码</span></div>\
	  <p class="displayNone" id="showcooksave">\
		<label for="save">保存：</label>\
		<input type="checkbox" id="save" value="1" class="picMiddle" name="save_login"/>\
		<span class="hint">保存登录状态，下次直接登录。</span>\
	  </p>\
	  <p class="splitDiv"></p>\
	  <p style="text-align:left; padding-left:30px;">\
		 <a href="javascript:void(0)" onclick="userReg()">注册新用户</a>\
		  <a href="/login.shtml?act=getvcod" target="_blank">补发激活码</a> <a href="/login.shtml?act=findpwd" target="_blank">找回密码</a>\
	  </p>\
	</div>';
	 layerConfig('会员登录', html, option);
}


function userLogin(userName,password,userType,isSave,isLayer) {
		var d = document.domain;
		if (userName == undefined||userName=='')return false;
		if (password == undefined||password=='')return false;
		if (userType == undefined||userType=='')return false;
		isLayer = (isLayer)?isLayer=true:isLayer=false;
		isSave = (isSave)?isSave=1:isSave=0;
		var u = userName;
		var p = password;
		var s = isSave;
		var t = userType;
		layerLoad("正在登录..");
		var c = function(){
			$.ajax({type: "POST",url: Config.webRoot+"/Lib/Xml/Param/"+Config.xmlDefaultPage+"?action=login&go=ok&r="+Math.random(),data: "u="+ u +"&psw="+ p +"&s="+ s +"&t="+ t,cache:false,async:true,timeout: 5000,error: function(msg){layerError('温馨提示','操作失败！');return false;},timeout: function(msg){layerConfirm('温馨提示','当前操作超过响应时间!,',function(){logout();},function(){clearTimeout(c);},{submit_button_name:'重试'});return false;},   
			success: function(msg){
				var url = location.href.toLowerCase().split('login.shtml?url=');
				var refererUrl = '';
				for (var i = 1;i < url.length ;i ++ ){
					refererUrl += url[i];
				}
				layerClose('load_wait');
				switch(msg){
					
					case '0':
						if(isLayer){layerClose('layer_login',function(){layerResult('登录成功..',1500,function(){location.reload();})});}else{
							layerResult('登录成功..');
							if (refererUrl == '') location.href = Config.userPath;
							else location.href = refererUrl;
						}
						
						break;
					case '1':
						if(isLayer){layerClose('layer_login',function(){layerResult('登录成功..',1500,function(){location.reload();})});}else{
							layerResult('登录成功..');
							if (refererUrl == '') location.href = Config.buserPath;
							else location.href = refererUrl;
						}
						break;
					case '2':
						layerError('温馨提示','登录失败,您的账号当前未审核，请耐心等待客服审核！');
						break;
					case '3':
						layerError('温馨提示','登录失败,系统中查找不到此帐户！');
						break;
					case '4':
						layerError('温馨提示','登录失败,您输入的密码错误！');
						break;
					case '5':
						layerError('温馨提示','登录失败,您的账号尚未激活,激活邮件在您注册时已经发出，请到您的邮箱查收！');
						break;
					case '6':
						layerError('温馨提示','登录失败,无法写入Cookie，请清空您浏览器的Cookie后重试！');
						break;
					case '7':
						layerError('温馨提示','您的会员卡号尚未激活！');
						location.href = '/CardNoActiv.Shtml?v='+ u ;
						break;
					default :
						layerError('温馨提示','登录失败,密码或用户名错误！');
						break;
				}
				return true;
				}
			});
		};
		setTimeout(c,1000);
}

function logout() {
	var d = document.domain;
	var returnurl='0';
	if(arguments[0]!=undefined)	returnurl		= arguments[0];
	layerLoad("正在退出..");
	var c = function(){
			$.ajax({
			type: "POST",url: Config.webRoot+'/Lib/Xml/Param/'+Config.xmlDefaultPage+'?action=logout&r='+Math.random(),data: 'go=ok',cache:false,async:true,timeout: 5000,	error: function(msg){layerError('温馨提示','操作失败！');return false;},timeout: function(msg){
				layerConfirm('温馨提示','当前操作超过响应时间!,',function(){logout();},function(){clearTimeout(c);},{submit_button_name:'重试'});return false;},   
			success: function(msg){
				if(unescape(msg) == '1'){
					if(returnurl!='0'){
						var url = location.href.toLowerCase().split('&url=');
						var refererUrl = '';
						for (var i = 1;i < url.length ;i ++ ){
							refererUrl += url[i];
						}
						if(refererUrl.indexOf('/login.shtml')!=-1){location.href='/login.shtml';}else{location.href = refererUrl;}
						
						return true;
					}else{
						location.reload();return true;
					}
				}
				else{ layerError('温馨提示','操作失败！');return false;}
				}
			});
		};
	setTimeout(c,1000);
}

function checkLogin() {
	var Lmodel	= new Model();
	$(document).ready(function(){
	if($('#loginstate').length>0){
		Lmodel.AjaxComon('..','/Lib/Xml/Param/'+Config.xmlDefaultPage+'?action=checkMemberLogin','','#loginstate');
		}
	 });
}

/*会员注册*/
function checkUserReg(){
	if(( checkPwd("#userpwd","#password_info")&&checkTwoPwd("#userpwd","#userpwd2","#password_info2") && checkAgree('#agreement','#agreement_info') &&$("#email_info").attr("class") == "hint check_ok" )){	
		return true;
	}else{ alert("你资料未填完整，请您填写完整后再提交");	return false;}
}

function userReg(){
	if(checkUserReg()){
	layerLoad("注册提交中..");
	setTimeout("userReg_Send('RandCode','email','userpwd')",500);
	return true;}else{return false;}
}
function userReg_Send() {
	
	var aIdArray=new Array("flag="+Math.random());
	var argLen=arguments.length;
	for(i=0;i<argLen;i++)
	{
		aIdArray[i+1]="&"+arguments[i]+"="+escape(getObjVal(arguments[i]));
	}
	$.ajax({
		type: "POST",
		url: "/Lib/Xml/Param/"+Config.xmlDefaultPage+"?action=userReg&r="+Math.random(),
		data: aIdArray.join('')+"&go=ok",
		success: function(msg){
			layerClose('load_wait');
			if (unescape(msg)=="1"){
				var mailtemp=getObjVal("#email");
				var mailArray = mailtemp.split('@');
				clearForm();
				layerSuccess('','<span class="focusBold">恭喜您！'+ mailtemp+'：</span>您已成功提交了注册信息！',function(){location.href='/login.shtml';});
				return true;
			}
			else if(unescape(msg)=="0"){
				layerError('','你资料未填完整，请您填写完整后再！');
			}
			else if(unescape(msg)=="2"){
			layerError('',"你输入的用户名已被人注册了，请重新选择其它的用户名！");
			}
			else if(unescape(msg)=="3"){
			layerError('',"验证码错误，请您重新输入!");
			$("#RandCode_info").html('<img src="'+Config.webRoot+'/Lib/Images/Loading/Loading2.gif" align="absmiddle"/>');setTimeout(function(){ showRandCode(100,30,"#randCodeSpan"); },50);
			}
			else if(unescape(msg)=="code_past"){
				layerError('',"验证码过期请刷新重试");
				$("#RandCode_info").html('<img src="'+Config.webRoot+'/Lib/Images/Loading/Loading2.gif" align="absmiddle"/>');setTimeout(function(){ showRandCode(100,30,"#randCodeSpan"); },50);
				return false;
			}
			else if(unescape(msg)=="code_err"){
				layerError('',"验证码错误");
				$("#RandCode_info").html('<img src="'+Config.webRoot+'/Lib/Images/Loading/Loading2.gif" align="absmiddle"/>');setTimeout(function(){ showRandCode(100,30,"#randCodeSpan"); },50);
				return false;
			}
			else
			{
			layerError('',"注册失败！请与客服联系！");
			}
			
		},
		error:function(msg){
			layerClose('load_wait');layerError('',"系统出错！请与客服联系！");
		},
		timeout:function(msg){
			layerClose('load_wait');layerError('',"网络超时!请与客服联系！");
		}
	});
}
var mc_indexB;
function loadIndexBetaInfo(){
	
	if($('#login_beta').length>0){
		clearTimeout(mc_indexB);
		mc_indexB=setTimeout(function(){$.ajax({
			type: "POST",
			url: Config.webRoot+postUrl+'/Lib/Xml/Param/'+Config.xmlDefaultPage+'?action=loadindexbeata&r='+Math.random(),
			data: 'go=ok',
			cache:false,
			async:true,
			timeout: 5000,
			success: function(msg){
				if(msg!=''){
					var Data=(new Function('return ['+msg+']'))();
					$('#login_beta').show();$('#logout_beta').hide();
					$('#login_beta').html('<div class="user_head"><img class="headimg" src="'+unescape(Data[0].nIconBig)+'" /></div>\
					<div class="user_info">\
					<p class="lo_text"><strong>Hi.'+unescape(Data[0].nNickName)+'</strong></p><span >欢迎回来！</span>\
					<p class="lo_text2"><a target="_blank" href="/cart.shtml">会员中心</a> | <a href="/user/orders/">我的订单</a></p>\
					</div>\
						<div class="user_link"><p class="lo_text2"><a target="_blank" href="/cart.shtml">我的购物车['+unescape(Data[0].CartNum)+']</a> | <a href="javascript:logout();void(0);">退出</a></p></div>');
					return true;
				}
				else{
					$('#login_beta').hide();$('#logout_logout').show();return false;
				}
				
				},
			error: function(msg){return false;}
			});},100);
	}
}



//点击次数等
function getFieldVal(virtualRoot,act,modelid,key,PublicID,tagObj,updateTF){
	new Model().AjaxComon('','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getFieldVal','obj='+ act +'&modelid='+ modelid +'&key='+ key +'&id='+ PublicID +'&updateTF='+ updateTF,'#'+tagObj);
}
//相关记录
function relate_news(virtualRoot,tempType,modelid,tempName,condition,topNum,picOrText,infoid) {
	var data='tempType='+ tempType +'&modelid='+ modelid +'&tempName='+ tempName +'&condition='+ unescape(condition).replace(/,/g,'|').replace(/ /g,'|') +'&pic='+ picOrText +'&topNum='+ topNum+'&infoid='+infoid;
	var tagObj='#relate_news_'+ infoid;
	new Model().AjaxComon('载入中','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=relate_news',data,tagObj);
}
//评论调取
function getReview(virtualRoot,module,modelid,PublicID,pageNo,tempId,reviewCont) {
	var data='id='+ PublicID +'&module='+module+'&modelid='+ modelid +'&pageNo='+ pageNo +'&tempid='+ tempId;
	var tagObj='#P_'+ PublicID;
	if($(tagObj).length>0){	new Model().AjaxComon('载入中','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getReviewList',data,tagObj);}
}
function getReNum(virtualRoot,module,modelid,PublicID,tagObj) {
	var data='module='+module+'&modelid='+modelid+'&id='+ PublicID;
	var tagObj='#'+ tagObj;
	new Model().AjaxComon('载入中','/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getReviewNum',data,tagObj);
}


/*上一页，下一页*/
function GetNextOrForwardInfoLink(virtualRoot,modelid,classid,infoid,showtype,option) {
	option = option ? option: {};
	var op = {
		cutnum: 40,
		endstr:'...',
		thumbtf:0,
		width:80,
		height:72
    };
	
    $.extend(op, option);
	var temp='';
	var data='modelid='+modelid+'&classid='+classid+'&infoid='+infoid+'&cutnum='+op.cutnum+'&endstr='+op.endstr+'&showtype='+ showtype +'&thumbtf='+ op.thumbtf;
	$.ajax({
			type: 'POST',
			url: '/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=GetBackOrForwardInfoLink&r='+Math.random(),
			data: data,
			cache:false,
			async:true,
			timeout: 5000,
			success: function(msg){
				var cjson	= (new Function("return "+ msg +";"))();
				if (cjson.result){
					var json=cjson.data;
					
					if(op.thumbtf){
						
						var tit = "下一组"; var tit2 = "最后一组";
						if (showtype=="Forward"){tit = "上一组"; tit2 = "最上一页";}
						if (cjson.data==''){
							temp='<div class="img_wrap"><a href="javascript:alert(\''+tit2+'\');" title="'+tit2+'"><img src="/Lib/Images/nopic_small.gif" class="nopic_small"/></a></div><a href="javascript:alert(\''+ tit2 +'\');">'+ tit +'</a>';
							}else{
								
								temp	='<div class="img_wrap"><a href="'+unescape(json.url)+'" title="'+unescape(json.title)+'"><img src="/Lib/Xml/?action=smallpic&width='+op.width+'&height='+op.height+'&url='+unescape(json.thumb)+'"  /></a></div><a href="'+unescape(json.url)+'" title="'+unescape(json.title)+'">'+tit+'</a>';
								
						}
					}else{
							if (cjson.data==''){temp='';}else{
							temp='<a href="'+unescape(json.url)+'" title="'+unescape(json.title)+'">'+unescape(json.title)+'</a>';}
					}
					$('#'+showtype +'Info_'+ infoid).html(temp);
				}
			},
			error: function(msg){
			return false;}
		});	
			
}


/**页面常用XML请求-End**-------------------------------------------------------------*/


/**其它应用-Start**-------------------------------------------------------------*/
function historyUrl() {
	var url= location.href.toLowerCase();var urlarr= url.split('?url=');var tempurl = urlarr[urlarr.length - 1];
	if(url.indexOf("/login.shtml")!=-1){location.href='/login.shtml';}else{location.href='/Login.shtml?url='+ tempurl;}
}

/**系统常用-Start**-------------------------------------------------------------*/
/*发布*/

function publicInfo(wid,aTag) {
	location.href = '#'+ aTag;
	if (parent.document.getElementById('progress')) parent.document.getElementById('progress').style.width = wid;
	if (document.getElementById('progress')) document.getElementById('progress').style.width = wid;
}
/*menu*/
function changetree_css(obj){
	var id=$(obj).attr('id').replace('pic_','');
	$('.sub_menu').removeClass("on fb blue");
	$('.class_menu').removeClass("con fb blue");
	$('.class_menu .class_child').each(function(){
		var id2	= $(this).attr('id').replace('tr_','');
		if(id2!=id){
			$(this).hide();
			$('#menu_'+id2).attr('class','menu');
			$('#pic_'+id2).attr('src',Config.webRoot+'/style/Default/Images/Folder/Closed.gif');
		}
	});
	$('#cm_'+id).addClass("con fb blue");
}
/*系统栏目节点选择*/
function layerClass(showType,eObj,cObj,option){
	option = option ? option: {};
	var op = {
		div_width: 350,
		remove:'',
		parentid:'0',
		iheight:200,
		modelid:'',
		objtype:'input',
		enable_parent:'1',
		classtype:'0'
    };
    $.extend(op, option);

	var title = (showType=='checkbox') ? '温馨提示：请选择一个或多个栏目':'温馨提示：请选择一个栏目';
	var _callback = function(){
		if (showType == 'checkbox'){
			var val	= getBoxVal('classid','#layer_class_cont');
			if (val!=''){xmlHttpPost(false,'','/Lib/Xml/System/XmlHttp.asp','action=showclasslist&target='+ eObj + '&classid='+ val,0,0,cObj); }
		}
		else{
			var val	= getRadioVal('classid','#layer_class_cont');
			if(op.objtype=='html'){$('#'+eObj).html(val);}else{$('#'+eObj).val(val);}
			if (val!=''){ xmlHttpPost(false,'','/Lib/Xml/System/XmlHttp.asp','action=showclasstitle&classid='+ val,0,1,cObj);}
		}
	};
	
	layerHtml(title,'<div id="layer_class_cont" class="frame_contain"></div>',_callback,null,op);
	$('#layer_class_cont').css('height',op.iheight+'px');
	$("#layer_class_cont").load('../Lib/SelectClass.asp?showType='+ showType +'&tag='+ eObj +'&tagname='+ cObj +'&parentid='+ op.parentid +'&modelid='+op.modelid+'&enable_parent='+op.enable_parent+'&remove='+op.remove+'&classtype='+op.classtype, {limit: 25});
}
/*同步到其它栏目*/
function getOtherClass(uiObj,option){
	option = option ? option: {};
	var op = {
		div_width: 350,
		remove:'',
		parentid:'0',
		iheight:200,
		modelid:'',
		objtype:'checkbox',
		enable_parent:'1',
		classtype:'0'
    };
    $.extend(op, option);
	var title = '请选择要同步的分类';
	var _callback = function(){
		
			var val	= getBoxVal('classid','#layer_class_cont');
			if (val!=''){xmlHttpPost(false,'','/Lib/Xml/System/XmlHttp.asp','action=showotherclassid&classid='+ val,0,0,uiObj); }
		
		
	};
	
	layerHtml(title,'<div id="layer_class_cont" class="frame_contain"></div>',_callback,null,op);
	$('#layer_class_cont').css('height',op.iheight+'px');
	$("#layer_class_cont").load('../Lib/SelectClass.asp?showType=checkbox&parentid='+ op.parentid +'&modelid='+op.modelid+'&enable_parent='+op.enable_parent+'&remove='+op.remove+'&classtype='+op.classtype, {limit: 25});
}
/*系统菜单节点选择*/
function layerSysMenu(showType,eObj,cObj,option){
	var title = (showType=='checkbox') ? '温馨提示：请选择一个或多个栏目':'温馨提示：请选择一个栏目';
	var _callback = function(){
		if (showType == 'checkbox'){
			return false;
		}
		else{
			var val	= getRadioVal('classid','#layer_class_cont');
			$('#'+eObj).val(val);
			if (val!=''){ xmlHttpPost(false,'','/Lib/Xml/System/XmlHttp.asp','action=showsysmenutitle&classid='+ val,0,1,cObj);}
		}
	};
	option = option ? option: {};
	var op = {
		div_width: 350,
		remove:'',
		parentid:'0',
		iheight:200
    };
    $.extend(op, option);
	layerHtml(title,'<div id="layer_class_cont" class="frame_contain"></div>',_callback,null,op);
	$('#layer_class_cont').css('height',op.iheight+'px');
	$("#layer_class_cont").load('../Lib/SelectSysMenu.asp?showType='+ showType +'&tag='+ eObj +'&tagname='+ cObj +'&parentid='+ op.parentid +'&remove='+op.remove, {limit: 25});
}
/*模板分类选择*/
function layerTempClass(showType,eObj,cObj,option){
	var title = (showType=='checkbox') ? '温馨提示：请选择一个或多个栏目':'温馨提示：请选择一个栏目';

	var _callback = function(){
		if (showType == 'checkbox'){
			return false;
		}
		else{
			var val	= getRadioVal('classid','#layer_class_cont');
			$('#'+eObj).val(val);
			if (val!=''){ xmlHttpPost(false,'','/Lib/Xml/System/XmlHttp.asp','action=showtempclasstitle&classid='+ val,0,1,cObj);}
		}
	};
	option = option ? option: {};
	var op = {
		div_width: 350,
		remove:'',
		parentid:'0',
		iheight:200
    };
    $.extend(op, option);
	layerHtml(title,'<div id="layer_class_cont" class="frame_contain"></div>',_callback,null,op);
	$('#layer_class_cont').css('height',op.iheight+'px');
	$("#layer_class_cont").load('../Lib/SelectTempClass.asp?showType='+ showType +'&tag='+ eObj +'&tagname='+ cObj +'&parentid='+ op.parentid +'&remove='+op.remove, {limit: 25});
}




/*文件上传*/
function layerUpload(title,formurl,option){
	 var motitle = (title ? title: '文件上传');
	option = option ? option: {};
	var op = {
		no_cancel: true,
		wid: 'layer_upload',
        no_submit: true,
		div_width: 350
    };
    $.extend(op, option);
	layerHtml(title,'<div id="layer_upload_cont"></div>',null,null,op);
	$("#layer_upload_cont").load(formurl, {limit: 25});
}
/*标签选择*/
function layerLable1(showType,Obj,option){
	var title = '请选择您要插入到模板中的标签';
	var _callback = null;
	option = option ? option: {};
	var op = {
		div_width: 600
    };
    $.extend(op, option);
	layerHtml(title,'<div id="layer_lable_cont"></div>',_callback,null,op);
	$("#layer_lable_cont").load('../Lib/SelectLable.asp?edittype='+ showType +'&tagname='+ Obj, {limit: 25});

}
function layerLable(showType,tagobj,option) {
	var title = '请选择您要插入到模板中的标签';
	option = option ? option: {};
	var op = {
		width: 500,
		height:420
    };
    $.extend(op, option);
	
	var lableid	= 'layerlable';
	var _callback=function(lableid,tagobj){
		var d = window.top.art.dialog({id:lableid}).data.iframe;
		var val = d.$("#label_val").html();
		setLable(showType,tagobj,val);
		};
	var op_param	= 'edittype='+ showType +'&tagname='+ tagobj;
	
	window.top.art.dialog({title:title,id:lableid,iframe:'../lable/index.asp?'+op_param,width:op.width,height:op.height}, function(){ _callback(lableid,tagobj);}, function(){window.top.art.dialog({id:lableid}).close()});
}
//function submit_ckeditor(uploadid,textareaid){
//	var d = window.top.art.dialog({id:uploadid}).data.iframe;
//	var val = d.$("#label_val").html();
//	setLable(showType,textareaid,val);
//}

function setLable(editType,tag,val){
	if(editType=='1'){
		insertHTML(tag,val); }
	else{
		insertAtCaret(Fid(tag),val);
	}
	layerClose();
}
function changeModelLable(modelid,obj){
	var val	= $(modelid).val();
	var _obj = returnObj(obj);
	model.Select(_obj,'/Lib/Xml/SysFlag/'+Config.xmlDefaultPage+'?action=getmodelfiled','modelid='+val,'选择模型字段');
}
function showOfficeUrl(tag){
	model.AjaxComon('请稍后','/Lib/Xml/'+Config.xmlDefaultPage+'?action=showlogin','a=0',tag);	
}
/*属性选择*/

function fileUpLoad(uploadid, name, textareaid, funcName, option, module, classid, auth_key) {
	option = option ? option: {};
	var op	= {
		watermark:0,
		selectimage:1,
		allowext:'jpg|gif|png|bmp|jpeg',
		uploadlimit:1,
		uploadtype:0
		};
	$.extend(op, option);

	var op_param	= '&watermark='+op.watermark+'&selectimage='+op.selectimage+'&allowext='+op.allowext+'&uploadlimit='+op.uploadlimit;
	var setting = op_param+'&module='+module+'&classid='+classid+'&auth_key='+auth_key;
	window.top.art.dialog({title:name,id:uploadid,iframe:'/Lib/swfupload/file/index.asp?m=attachment&uploadtype='+op.uploadtype+setting,width:'500',height:'420'}, function(){ if(funcName) {funcName.apply(this,[uploadid,textareaid]);}else {submit_ckeditor(uploadid,textareaid);}}, function(){window.top.art.dialog({id:uploadid}).close()});

}
/*打开内容编辑窗口*/
function openEditWin(url,name,w,h) {
	if(!w) w=screen.width-4;
	if(!h) h=screen.height-95;
	if(name==undefined){name='';}
	//url = url+'&pc_hash='+pc_hash;
	window.open(url,name,"top=100,left=400,width=" + w + ",height=" + h + ",toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
}
var fav_mc;
function fav_info(mid,id,option){
	option = option ? option: {};
	var op = {
		infotype:'信息'
    };
	clearTimeout(fav_mc);
    $.extend(op, option);
	fav_mc=setTimeout(function(){$.ajax({
		type: "POST",
		url: "/Lib/Xml/User/"+Config.xmlDefaultPage+"?action=AddFav&r="+Math.random(),
		data: "mid="+mid+"&id="+escape(id)+"&go=ok",
		success: function(msg){
		if(unescape(msg)=='False'){ loginForm();return false;}		
		if(msg=="1"){
			layerResult(op.infotype+'收藏成功!');
			return true;
			}
		else if(msg=="2"){
			layerError('','您已经收藏过了！');return false;
			}
		},
		error: function(msg){return false;}
		});},100);
	
}
	
//弹出对话框
function omnipotent(id,linkurl,title,close_type,w,h) {
	if(!w) w=700;
	if(!h) h=500;
	art.dialog({id:id,iframe:linkurl, title:title, width:w, height:h, lock:true},
	function(){
		if(close_type==1) {
			art.dialog({id:id}).close()
		} else {
			var d = art.dialog({id:id}).data.iframe;
			var form = d.document.getElementById('dosubmit');form.click();
		}
		return false;
	},
	function(){
	art.dialog({id:id}).close()
	});void(0);
}

/**系统常用-End**-------------------------------------------------------------*/
