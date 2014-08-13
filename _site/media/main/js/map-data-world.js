// JavaScript Document 

// Location Data - Full - World 
// UPDATE: JULY 2013 
// http://www.dandyweng.com 

//$('#map').vectorMap({map: 'cn_merc_en'});
$('#map').vectorMap({
	map: 'world_mill_en',
	backgroundColor: 'transparent',
	zoomMin: 0.9,
	zoomMax: 3.9, 
	focusOn: {
		  x: 0.55,
		  y: 2,
		  //scale: 1.6
		  scale: 0.9
		},
	regionStyle: {
		initial: {
			fill: '#e5e5e5',
			"fill-opacity": 1,
			stroke: 'none',
			"stroke-width": 0,
			"stroke-opacity": 1
		},
		hover: {
			fill: '#ccc',
			"fill-opacity": 0.8
		},
		selected: {
			fill: 'yellow'
		},
		selectedHover: {}
	},
	/*series: {
		regions: [{
			values: tourData,
			scale: ['#C8EEFF', '#0071A4'],
			normalizeFunction: 'polynomial'
		}]
	},
	onRegionLabelShow: function(e, el, code) {
		el.html(el.html() + ' (最后到达 - ' + tourData[code] + ')');
	},*/
	markerStyle: {
            initial: {
            	fill: '#fd8888',
            	stroke: '#fff'
            },
			hover: {
				fill: '#fd3838',
				stroke: '#fff',
				"fill-opacity": 0.8
			},
          },
	onRegionClick: function(event, code){
                        if(code == "CN") {
							var obj = document.getElementById('link-to-china');
							if(document.all){
								obj.click();
							} else {
								var evt = document.createEvent("MouseEvents");
								evt.initEvent("click", true, true);
								obj.dispatchEvent(evt);
							}
						}
	},
	onRegionOver: function(event, code){
						if(code == "CN") {	
							$('#map').css({cursor:'pointer'});
						}
　　　　},
	onRegionOut: function(event, code){
						if(code == "CN") {	
							$('#map').css({cursor:'auto'});
						}
　　　　},
	markers: [
			// 中华人民共和国 PRC / China 
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            	// Fujian Province 1988 - 
            		//谷歌地图：26.7846941180,120.0017738342
            		{latLng: [26.78, 120.00], name: '福建 霞浦 我的故乡: 1988.06 ~ 2003.08'},
			//经度:118.09141874313354 纬度:24.438339515392173
			{latLng: [24.44, 118.09], name: '福建 厦门 厦门大学 WISE: 2010.07 ~ 2014.07'},
			//经度:118.70900194648743 纬度:24.676548792499577
			//{latLng: [24.67, 118.70], name: '福建 石狮 - 2006.07'},
			// 24.87520, 118.67541

            	// Shandong Province 2006 - 2010
			//谷歌地图：36.6507925250,117.1307373047
			{latLng: [36.65, 117.13], name: '山东 济南 山东大学 SOM: 2006.09 ~ 2010.05'},
			//谷歌地图：36.8180802278,118.0645751953
			{latLng: [36.81, 118.06], name: '山东 淄博 骑行: 2008.04'},
			//谷歌地图：35.5811370000,116.9865320000
			{latLng: [35.58, 116.98], name: '山东 曲阜 孔子故里: 2009.05'},
			//谷歌地图：36.0612420000,120.3352850000
			{latLng: [36.06, 120.33], name: '山东 青岛 中国海洋大学: 2009.11'},

            	// Tianjin 2006 - 2010
			//谷歌地图：39.1820307000,117.1307234000
			{latLng: [39.18, 117.13], name: '天津 天津商业大学: 2007.10, 2008.03, 2008.06, 2008.11, 2010.04'},

            	// Guandong Province 2003 -2006
			//谷歌地图：22.9234764731,113.2695043087
			{latLng: [22.92, 113.26], name: '广东 顺德 国华纪念中学: 2003.09 ~ 2006.07'},
			//谷歌地图：23.4860764000,113.0661392000
			{latLng: [23.48, 113.06], name: '广东 清远 假日半岛: 2004.04'},


            	// Sichuan Province 2013
			//谷歌地图：30.7323927340,107.2155761719
			{latLng: [30.73, 107.21], name: '四川 大竹 咪豆出生: 2013.03'},
			

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

          ]
});