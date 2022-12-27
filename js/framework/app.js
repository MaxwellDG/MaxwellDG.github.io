var app = app || {};

app = function () {};

app.stage = {

	options:{
		events: null,
		eventsEnd: null,
		popup: null,
		currentScreen: 0,
		currentFlow: "flow1",
		eventsHandle: false,
		flowsMax: null,
		flow: null,
		flowTheme: null,
		flowjson: null,
		ref: null,
		refStyle: null,
        SmPC: ["SmPC Seroquel XR", "SmPC Seroquel"],
        SmPCLength: 2,
		dom:{
			content: null,
			stage: null,
			css: null,
			head: document.getElementsByTagName('head')[0],
			menu: null,
			menuCss: null
		},
		removeClass: [],
		removeTimeouts: [],
		removeInterval: [],
		tracking:{
			time: null,
			id: null,
			description: null
		},
		trackingData: {
            uuid: null,
            presentation_name: null,
            physician: {
                first_name: null,
                last_name: null
            },
            employee_name: null,
            start: null,
            end: null,
            isSynced: false,
            screens: []
        },
		flowExist:{},
		linkScreen:{},
		inSwipe: false,
		menuHidden: false
	},
	_construct_: function (){

		window.parent.alert = function (){return false}

        var _this = this,
            dom = this.options.dom,
            trackData = this.options.trackingData;

        trackData.uuid = _this.uuidv4();
        trackData.start = _this.getDate();

        try {
            var missingData = receiveFromMobile(message);
            this.options.trackingData.presentation_name = "a"; //missingData.presentation_name;
            this.options.trackingData.employee_name = "b"; //missingData.employee_name;
            this.options.trackingData.physician.first_name = "c"; //missingData.physician.first_name;
            this.options.trackingData.physician.last_name = "d"; //missingData.physician.last_name;
            this.options.trackingData.isSynced = false; //missingData.physician.last_name;
        } catch (err) {
            console.log('The variable can\'t be sent yet.');
        }

		dom.stage = $('<div>',{id: "stage"}).appendTo(document.body);
		dom.menu = $('<div>',{id: "menu"}).appendTo(dom.stage);
		dom.css = $('<style>',{type: "text/css","real": "preload"}).appendTo(dom.head);
		dom.menuCss = $('<style>',{type: "text/css"}).appendTo(dom.head);
		dom.mainJS = $('<script>',{type: "text/javascript"}).appendTo(dom.head);

		$.getJSON('js/framework/ref.json').done(function (_ref_){_this.ref = _ref_;});

		$.getJSON('js/framework/flows.json').done(function (_data_){
			_this.flowjson = _data_;
			_this.init(_this.options.currentFlow, _this.options.currentScreen);
		});
	},
	init: function (currentFlow, screen){

		var _this = this;

		this.options.flow = this.flowjson[0][currentFlow];
		this.options.flowsMax = Object.keys(_this.options.flow).length - 2;
		this.options.flowTheme = this.options.flow[0].theme;
		this.options.currentFlow = currentFlow;

		if ('ontouchstart' in window){
			this.options.events = "touchstart";
			this.options.eventsEnd = "touchend";
		}else{
			this.options.events = "mousedown";
			this.options.eventsEnd = "mouseup";
		}

		this.loadMenu(function (){
            _this.loadContent(currentFlow, screen);
            _this.menuBehavior(_this.options.flow[0].menu);
            //AL.init();
            ASDV.init();
        });

		for (flow in this.options.flow){

			var current = this.options.flow[flow];

			if (current.hasOwnProperty('id')){_this.options.linkScreen[current.id] = flow - 1;}

		}
		
		if(!this.options.eventsHandle) {
			this.options.eventsHandle = true;
        	_this.handleEvent();
		}
	},
	uuidv4: function (){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	loadMenu: function (callback){

		this.options.dom.stage.find('#menu').html("");

		var path = this.options.flowTheme,
			_this = this;
        
        this.loadMenuCss(function(){

            ARGO.ajax_('theme/' + path + '/index.html', 'html', function (data){
                _this.options.dom.menu.append(data);
                $.getScript('theme/' + path + '/main.js');
                callback();
            });
        });
	},
	loadMenuCss: function (callback){

		var path = this.options.flowTheme,
			_this = this;
        
		if (Object.keys(this.options.flowExist).length == 0){

			this.ajax_('theme/' + path + '/main.css', 'text', function (data){
				_this.options.dom.menuCss.empty();
                _this.options.dom.menuCss.append(data);
                var base = "[flows], [pdf] { width: 100%; height: 100%; position: absolute; top: 0; left: 0; display: none; opacity: 0; z-index: 600;}", 
                    lines = "[flows] ul li, [pdf] ul li { padding-bottom: 10px; color: #717073; font-family: 'AvenirNext-Regular';}", 
                    close = "[flows] [btn-flow-close], [pdf] [btn-pdf-close] { top: 313.5px; left: 827px; opacity: 1; z-index: 5; position: absolute; width: 22.5px; height: 23px; display: block; background: url('theme/theme1/images/template_rcp_btn.png') center center / 22.5px 23px no-repeat;}", 
                    scroller = "[flows] #flowScroller, [pdf] #pdfScroller { position: absolute; left: 656px; top: 371px; width: 240px; height: 240px; overflow: hidden; opacity: 1; z-index: 4;}", 
                    bkg = "[flows] #_bkg, [pdf] #_bkg { top: 249px; left: 474.5px; opacity: 1; z-index: 3; position: absolute; width: 486.5px; height: 453px; display: block; background: url('theme/theme1/images/template_rcp_bkg.png') center center / 486.5px 453px no-repeat;}", 
                    layer = "[flows] #_layer, [pdf] #_layer { top: 0; left: 0; opacity: 1; z-index: 2; position: absolute; width: 1024px; height: 743px; display: block; background: url('theme/theme1/images/template_rcp_layer.png') center center / 1024px 743px no-repeat;}";
                for(var fnd=0; fnd<_this.options.dom.menuCss[0].sheet.cssRules.length; fnd++) {
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference]") {
                        base = "[flows], [pdf] " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference] ul li") {
                        lines = " [flows] ul li, [pdf] ul li " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference] [btn-reference-close]") {
                        close = " [flows] [btn-flow-close], [pdf] [btn-pdf-close] " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference] #referenceScroller") {
                        scroller = " [flows] #flowScroller, [pdf] #pdfScroller " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference] #_bkg") {
                        bkg = " [flows] #_bkg, [pdf] #_bkg " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                    if(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText == "[reference] #_layer") {
                        layer = " [flows] #_layer, [pdf] #_layer " + _this.options.dom.menuCss[0].sheet.cssRules[fnd].cssText.substring(_this.options.dom.menuCss[0].sheet.cssRules[fnd].selectorText.length);
                    }
                }
                _this.options.dom.menuCss.append(base + lines + close + scroller + bkg + layer);
                callback();
            });
		}
	},
	loadContent: function (currentFlow, screen){

		var _this = this,
			path = [],
			requests = [];

		for (var key in this.options.flow){

			if (this.options.flow[key].hasOwnProperty('id')){

				if (this.options.flow[key]["id"] == this.options.flow[key]["original_id"]){
					path.push(this.options.flow[key].id);
				}
			}
		}

		if (_this.options.flowExist[currentFlow] != true){

			for (var e in path){
                console.log("Somehow got here??? Huh??", e);

				if (!$('[path="' + path[e] + '"]').length){

					requests.push($.ajax({
						url: 'screen/' + path[e] + '/index.html',
						success: function (html){
							_this.options.dom.stage.append(html)
						}
					}));

					requests.push($.ajax({
						url: 'screen/' + path[e] + '/main.css',
						success: function (css){
							_this.options.dom.css.append(css)
						}
					}));

				}
			}

			$.when.apply(undefined, requests).then(function (results){
                console.log("Applying huh???", screen);
				_this.loadScreen(screen);
				/*setTimeout(function (){$('.content').addClass('preload');}, 250)*/
			});

		}else{
            console.log("Loading screen normally from start: ", screen);
            _this.loadScreen(screen);
        }
	},
	getDate: function(){

		var date = new Date;
		return timestamp = date.getTime() + (- date.getTimezoneOffset() * 60 * 1000);
	},
	loadScreen: function (screenNum){

        var screen = parseInt(screenNum) ?? 0;

        console.log("Loading screen number: ", screen, screen + 1);
        console.log("Flow JSON: ", this.flowjson[0])
        console.log("More flow jSON: ", this.flowjson[0][this.options.currentFlow])
		
        var _this = this,
            trackData = this.options.trackingData,
            trackedFlow = this.flowjson[0][this.options.currentFlow],
            screenData = {
                "start": _this.getDate(),
                "end": 0,
                "id": trackedFlow[screen + 1].id,
                "name": trackedFlow[screen + 1].description
            };

        if (trackData.screens.length > 0) {
            trackData.screens[trackData.screens.length - 1].end = _this.getDate();
        }

        trackData.screens.push(screenData);
        trackData.end = _this.getDate();

        trackData.employee_name = "";
        trackData.physician.first_name = "";
        trackData.physician.last_name = "";

        try {
            var outgoing = JSON.stringify(trackData);
            webkit.messageHandlers.mobileAction.postMessage(outgoing);
        } catch (err) {
        	console.log(outgoing);
            console.log('The native context does not exist yet');
        }

        if (typeof EL == "object"){
            console.log("EL??? ", EL);
			EL.changeScreen(screen);
        }else{

            try{
                console.log("SC????")
                SC.logs.push({'Library event': "Not loaded"});
            }
            catch (e)
            {
                console.log("None of this EL SC garbage works")
                //console.log('Error library event not loaded');
            }

		}

		var screen = parseInt(screen);
		this.options.currentScreen = screen;
		var path = this.options.flow[screen + 1].original_id,
			current = this.options.dom.stage.find('.active'),
			news = this.options.dom.stage.find('[path="' + path + '"]'),
			chapter = this.options.flow[screen + 1].chapter;

		//Current slide remove active class
		current.removeClass('active').css({display: "none"});

		//New slide add class active
		news.addClass('active').css({display: "block","opacity": 1});

		// App screen start
		$.getScript('screen/' + path + '/main.js');

		//set menu
		$('.menuTempDisable').removeClass('menuTempDisable');
		this.setMenu(chapter, screen + 1);

		//Mi DataTracking
		//var trackingScreenID = this.options.linkScreen[this.options.flow[screen + 1].id];
		var trackingScreenID = screen;
		this.tracking(trackingScreenID);

		//Remove class/setTimeout/style
		this.removeAll(current);
	},
	setMenu: function (chapter, screen){

		var ref     = this.options.dom.menu.find('.ref'),
			_id     = this.options.flow[screen].id,
			chapt   = this.options.flow[screen].chapter,
			_this   = this;
			//dataScreen = this.options.flow[screen + 1];

		//Add class to menu
		this.options.dom.menu.find('.current').removeClass('current');
		this.options.dom.menu.find('[data-chapter = "' + chapter + '"]').addClass('current');

		//Add class to subMenu
		if (this.options.dom.menu.find('.subMenu').length > 0 &&
			!this.options.dom.menu.find('.subMenu').attr('hidden')){
			this.options.dom.menu.find('.subMenu .current').removeClass('current');
			this.options.dom.menu.find('.subMenu [data-sub="' + _id + '"]').addClass('current');
		}

		// Check for chapter if the primary/secondary are hidden
		this.hideMenu.hidePrimary(_this,this.options.flow[0].menu.chapter[chapt]["hidePrimary"]);

		if(this.options.flow[0].menu.chapter[chapt]["hideSecondary"]){
			this.hideMenu.hideSecondary(chapt);
		}


		//Set reference status
		if (this.options.flow[screen].ref.length <= 0){
			ref.css({"opacity": "0.5"});
			this.options.ref = false;
		}else{
			ref.css({"opacity": "1"});
			this.options.ref = true;
		}

		if(this.options.flow[screen]["hidePrimary"]){
			$('#menu').addClass('menuTempDisable');
		}

		if(this.options.flow[screen]["hideSecondary"]){
			$('.subMenu').addClass('menuTempDisable');
		}
	},
	menuBehavior: function(obj_menu){

		try{

			// Hide the primary nav
			if(obj_menu.hidePrimary){
				this.options.menuHidden = true;
				this.hideMenu.hidePrimary(this,true);	
			} 

			// Hide the secondary nav
			if(obj_menu.hideSecondary){
				this.hideMenu.hideSecondary("full");	
			} 

			// Hide the primary/secondary button
			for(var chapterID in obj_menu["chapter"]){

				// Hide primary button
				if(obj_menu["chapter"][chapterID]["hideBtnPrimary"])
					this.hideMenu.hideBtnPrimary(chapterID);

				// Hide secondary button
				for(var screenID in obj_menu["chapter"][chapterID]["screen"]){

					if(obj_menu["chapter"][chapterID]["screen"][screenID]["hideBtnSecondary"]){
						this.hideMenu.hideBtnSecondary(screenID);
					}
				}

			}

		}catch (e){
			console.log(e);
		}
	},
	hideMenu: {

		hidePrimary: function(_this,_hidePrimary){

			if(_hidePrimary){
				$("#menu").css({"display":"none"});		
			}
			if(!_hidePrimary && !_this.options.menuHidden){
				$("#menu").css({"display":"block"});
			}

		},
		hideSecondary: function(_chapter){

			var selector = _chapter == "full" ? "#menu .subMenu" : "#menu .subMenu[data-chapter='"+_chapter+"']"; 

			$(selector).css({"display":"none !important"});
			$(selector).attr("hidden","menu_behavoir");
		},
		hideBtnSecondary: function(_id){

			var selector = "#menu  [data-sub='"+_id+"']";

			$(selector).remove();
			//$(selector).attr({"hidden":"menu_behavoir"});
		},
		hideBtnPrimary: function(_chapter){

			var selector = "#menu .maxMenu [data-chapter='"+_chapter+"']";

			$(selector).css({"display":"none"});
			$(selector).attr({"hidden":"menu_behavoir"});
		}
	},
	handleEvent: function (){

		var _this = this,
			path = this.options.flowTheme;
        
		if (Object.keys(ARGO.options.flowExist).length <= 0){
			//Swipe
			this.options.dom.stage.swipe({
				swipe: function (event, direction){
                    
                    var screen = _this.options.currentScreen,
                        nameScreen = _this.options.flow[screen + 1].id,
                        swpNext = _this.options.flow[screen + 1]["swipeNext"],
                        swpBack = _this.options.flow[screen + 1]["swipeBack"],
                        min = 0,
                        max = _this.options.flowsMax;

                    if (direction === 'up' || direction === 'down') {
                        return false;
                    }

                    // Swipe left special behavior
                    if (direction == "left" && screen < max && swpNext != false) {

                        _this.inSwipe = true;
                        var key = _this.options.linkScreen[swpNext];
                        _this.loadScreen(key);
                        //AS.init();
                        return false;
                    }

                    // Swipe right special behavior
                    if (direction == "right" && screen > min && swpBack != false) {

                        _this.inSwipe = true;
                        var key = _this.options.linkScreen[swpBack];
                        _this.loadScreen(key);
                        //AS.init();
                        return false;
                    }
                    
                    if (direction == "left" && swpNext == false) {return false;}
                    if (direction == "right" && swpBack == false) {return false;}
				}
			});

			//Global link
			$(document).on(_this.options.eventsEnd, '[data-link]:not(".disable")', function (){
                    
                var padHome = $('[psd-name="home"]'),
                    padMinmenu = $('[psd-name="min_menu"]');
                if(padHome.length == 0) {
                    padHome = document.querySelector('.home');
                } else {
                    padHome = $('[psd-name="home"]')[0];
                }
                if(padMinmenu.length == 0) {
                    padMinmenu = document.querySelector('.minMenu');
                } else {
                    padMinmenu = $('[psd-name="min_menu"]')[0];
                }

                if (_this.inSwipe != true) {

                    if (typeof EL == "object") {
                        EL.closePopup();
                        EL.refClose();
                    }

                    var location = _this.options.linkScreen[$(this).attr('data-link')];
                    console.log("---- Problem here ----")
                    console.log("Linkscreen:", _this.options.linkScreen)
                    console.log("Data-link data: ", $(this).attr('data-link'))
                    _this.loadScreen(location);
                    
                    var chapterData = 0;
                    if($(this).attr('data-chapter') != undefined && $(this).attr('data-chapter') != "{chapterIndex}") {
                        chapterData = $('.maxMenu a[data-chapter=' + $(this).attr('data-chapter') + ']')[0];
                    } else if($(this).parent().attr('data-chapter') != undefined) {
                        chapterData = $('.maxMenu a[data-chapter=' + $(this).parent().attr('data-chapter') + ']')[0];
                    } else {
                        chapterData = undefined;
                    }
                    if(chapterData != undefined) {
                        if(chapterData.offsetLeft + (chapterData.clientWidth / 2) > ((1024 - padMinmenu.clientWidth - padHome.clientWidth) / 2)) {
                            $('#menu .maxMenu')[0].scrollLeft = (chapterData.offsetLeft + (chapterData.clientWidth / 2)) - ((1024 - padMinmenu.clientWidth - padHome.clientWidth) / 2);
                        } else {
                            $('#menu .maxMenu')[0].scrollLeft = 0;
                        }
                    } else {
                        $('#menu .maxMenu')[0].scrollLeft = 0;
                    }
                }
			});

			//Global link with ID
			$(document).on(_this.options.eventsEnd, '[data-id-link]:not(".disable")', function (){

				var _ID_ = $(this).attr('data-id-link');

				if (_this.inSwipe != true){

					if (typeof EL == "object"){
						EL.closePopup();
						EL.refClose();
					}

					//var location = _this.options.linkScreen[$(this).attr('data-link')];
					for (var e in _this.options.flow){

						if (_ID_ == _this.options.flow[e].id){_this.loadScreen(_this.options.flow[e].link);}
					}
				}
			});

			//Open reference
			$(document).on(_this.options.eventsEnd, '.ref.show', function (){

				if (_this.options.ref == true){
                    
                    if($('.ref').hasClass('show')) {
                        if (typeof EL == "object"){EL.refOpen();}

                        var screen = _this.options.currentScreen,
                            refID = _this.options.flow[screen + 1].ref.split('-'),
                            thisPicto = $(this),
							pdfLinks = {
								"R.1": "",
								"R.2": "",
								"R.3": "",
								"R.4": " pdfLink='R4 - Yatham LN'",
								"R.5": "",
								"R.6": " pdfLink='R6 - Zhu Y'",
								"R.7": "",
								"R.8": "",
								"R.9": "",
								"R.10": " pdfLink='R10 - Chue P'",
								"R.11": "",
								"R.12": "",
								"R.13": " pdfLink='R13 - Suppes T'",
								"R.14": "",
								"R.15": " pdfLink='R15 - Keefe RS'",
							}
							pdfLink = "",
                            ref = "";

                        thisPicto.removeClass('show');
                        if($('#menu div[psd-name="pdf"]').length == 1) {
                            $('#menu div[psd-name="pdf"]').addClass('show');
                        } else if($('#menu .doc').length == 1) {
                            $('#menu .doc').addClass('show');
                        }
                        $('#menu div[psd-name="vs"]').addClass('show');

                        if(_this.options.refStyle == "local") {
                            for (var e in refID){
								pdfLink = pdfLinks[refID[e]];
                                ref += "<li" + pdfLink + ">" + (parseInt(e) + 1) + ". " + _this.ref[refID[e]] + "</li>";
							}
                        } else if(_this.options.refStyle == "global") {
                            for (var e in refID){
								pdfLink = pdfLinks[refID[e]];
                                ref += "<li" + pdfLink + ">" + refID[e].substring(2) + ". " + _this.ref[refID[e]] + "</li>";
							}
                        }

                        $.ajax({
                            url: 'theme/' + _this.options.flowTheme + '/reference/reference.html',
                            dataType: "text",
                            success: function (data){

                                $('.content.active').append(data);
                                $('[reference] ul').html(ref);

                                _this.swipe('disable');

                                $('[reference]')
                                    .velocity({opacity: 1},{
                                        display: "block",
                                        duration: 300,
                                        begin: function () {},
                                        complete: function (){
                                            $('#stage [reference] li[pdfLink]').off('click').on('click', function() {
                                                if (window.parent.PDFHelper) {
                                                    window.parent.PDFHelper.OpenPDF('media/pdf/' + this.attributes.pdfLink.value + '.pdf', window, true);
                                                }
                                                else {
                                                    window.open('media/pdf/' + this.attributes.pdfLink.value + '.pdf');
                                                }
                                            })
                                            _this.scroller('referenceScroller');
                                            $('[btn-reference-close]').off('click').on('click', function() {

                                                if (typeof EL == "object"){EL.refClose();}
                                                $('[reference]')
                                                    .velocity({opacity: 0},{
                                                        display: "none",
                                                        duration: 300,
                                                        complete: function (){
                                                            $('[reference]').remove();
                                                            $('.ref').addClass('show');
                                                            if($('#menu div[psd-name="pdf"]').length == 1) {
                                                                $('#menu div[psd-name="pdf"]').removeClass('show');
                                                            } else if($('#menu .doc').length == 1) {
                                                                $('#menu .doc').removeClass('show');
                                                            }
                                                            $('#menu div[psd-name="vs"]').removeClass('show');
                                                            _this.swipe('enable');
                                                        }
                                                    });
                                            })
                                        }
                                    });
                            }
                        });
                    }
				}
			});
            
			// Open popup
			$(document).on(_this.options.eventsEnd, '[btn-popup]:not(.show)', function (e){

				e.stopPropagation();

				if (_this.inSwipe != true){
                    if(!$(this).closest('.content').find('[btn-popup]').hasClass('show')) {
                        $('.ref').removeClass('show');
                        if($('#menu div[psd-name="pdf"]').length == 1) {
                            $('#menu div[psd-name="pdf"]').addClass('show');
                        } else if($('#menu .doc').length == 1) {
                            $('#menu .doc').addClass('show');
                        }
                        $('#menu div[psd-name="vs"]').addClass('show');

                        var screen = _this.options.currentScreen,
                            id = _this.options.flow[screen + 1].id;

                        var name = $(this).attr('btn-popup'),
                            _parent = $(this).closest('.content'),
                            self = $(this);
                        
                        _parent.find('[btn-popup]').addClass('show');

                        _parent.find('[popup="' + name + '"]')
                            .velocity({opacity: 1},{
                                display: "block",
                                duration: 200,
                                complete: function (){
                                    _this.swipe('disable');
                                    $('#header_btn').css({"display": "none"});
                                    _parent.find('[btn-popup-close]').off('click').on('click', function() {
                                        
                                        e.stopPropagation();

                                        var _popup = $(this).closest('[popup]');

                                        if (typeof EL == "object"){EL.closePopup();}

                                        _popup
                                            .velocity({opacity: 0},{
                                                display: "none",
                                                duration: 200,
                                                complete: function (){
                                                    _this.swipe('enable');
                                                    $('.ref').addClass('show');
                                                    if($('#menu div[psd-name="pdf"]').length == 1) {
                                                        $('#menu div[psd-name="pdf"]').removeClass('show');
                                                    } else if($('#menu .doc').length == 1) {
                                                        $('#menu .doc').removeClass('show');
                                                    }
                                                    $('#menu div[psd-name="vs"]').removeClass('show');
                                                    _parent.find('[btn-popup]').removeClass('show');
                                                    $('#header_btn').css({"display": "block"});
                                                }
                                            });
                                    })
                                }
                            });

                        if (typeof EL == "object"){EL.openPopup($(this).attr('sc-popup-name'), id);}
                    }
				}
			});
            
			//Open PDF Window 1
            $(document).on(_this.options.eventsEnd, '#menu div[psd-name="pdf"]:not(show)', function (){
                if(ARGO.options.SmPCLength == 1) {
                    if (window.parent.PDFHelper) {
                        window.parent.PDFHelper.OpenPDF('media/pdf/' + ARGO.options.SmPC[0], window, true);
                    }
                    else {
                        window.open('media/pdf/' + ARGO.options.SmPC[0]);
                    }
                } else if(ARGO.options.SmPCLength > 1) {
                    if(!$('#menu div[psd-name="pdf"]').hasClass('show')) {
                        var pdfLines = "";
                        $('.ref').removeClass('show');
                        $('#menu div[psd-name="pdf"]').addClass('show');
                        $('#menu div[psd-name="vs"]').addClass('show');
                        for(var lg=0; lg<ARGO.options.SmPCLength; lg++) {
                            pdfLines += "<li>" + ARGO.options.SmPC[lg] + "<sup>®</sup></li>";
                        }
                        $.ajax({
                            url: 'theme/' + _this.options.flowTheme + '/SmPC/SmPC.html',
                            dataType: "text",
                            success: function (data){

                                $('.content.active').append(data);
                                $('[pdf] ul').html(pdfLines);

                                _this.swipe('disable');

                                $('[pdf]')
                                    .velocity({opacity: 1},{
                                        display: "block",
                                        duration: 300,
                                        begin: function () {},
                                        complete: function (){
                                            _this.scroller('pdfScroller');
                                            $('#stage .content.active div[pdf] #pdfScroller div ul li').off('click').on('click', function() {
                                                if (window.parent.PDFHelper) {
                                                    window.parent.PDFHelper.OpenPDF('media/pdf/' + this.innerHTML.replace('<sup>®</sup>', '') + '.pdf', window, true);
                                                }
                                                else {
                                                    window.open('media/pdf/' + this.innerHTML.replace('<sup>®</sup>', '') + '.pdf');
                                                }
                                            })
                                            $('[btn-pdf-close]').off('click').on('click', function() {

                                                $('[pdf]')
                                                    .velocity({opacity: 0},{
                                                        display: "none",
                                                        duration: 300,
                                                        complete: function (){
                                                            $('.ref').addClass('show');
                                                            $('[pdf]').remove();
                                                            $('#menu div[psd-name="pdf"]').removeClass('show');
                                                            $('#menu div[psd-name="vs"]').removeClass('show');
                                                            _this.swipe('enable');
                                                        }
                                                    });
                                            })
                                        }
                                    });
                            }
                        });
                    }
                }
            });
                
			//Open PDF Window 2
            $(document).on(_this.options.eventsEnd, '#menu .doc:not(show)', function (){
                if(ARGO.options.SmPCLength == 1) {
                    if (window.parent.PDFHelper) {
                        window.parent.PDFHelper.OpenPDF('media/pdf/' + ARGO.options.SmPC[0], window, true);
                    }
                    else {
                        window.open('media/pdf/' + ARGO.options.SmPC[0]);
                    }
                } else if(ARGO.options.SmPCLength > 1) {
                    if(!$('#menu .doc').hasClass('show')) {
                        var pdfLines = "";
                        $('.ref').removeClass('show');
                        $('#menu .doc').addClass('show');
                        $('#menu div[psd-name="vs"]').addClass('show');
                        for(var lg=0; lg<ARGO.options.SmPCLength; lg++) {
                            pdfLines += "<li>" + ARGO.options.SmPC[lg] + "</li>";
                        }
                        $.ajax({
                            url: 'theme/' + _this.options.flowTheme + '/SmPC/SmPC.html',
                            dataType: "text",
                            success: function (data){

                                $('.content.active').append(data);
                                $('[pdf] ul').html(pdfLines);

                                _this.swipe('disable');

                                $('[pdf]')
                                    .velocity({opacity: 1},{
                                        display: "block",
                                        duration: 300,
                                        begin: function () {},
                                        complete: function (){
                                            _this.scroller('pdfScroller');
                                            $('#stage .content.active div[pdf] #pdfScroller div ul li').off('click').on('click', function() {
                                                if (window.parent.PDFHelper) {
                                                    window.parent.PDFHelper.OpenPDF('media/pdf/' + this.innerHTML, window, true);
                                                }
                                                else {
                                                    window.open('media/pdf/' + this.innerHTML);
                                                }
                                            })
                                            $('[btn-pdf-close]').off('click').on('click', function() {

                                                $('[pdf]')
                                                    .velocity({opacity: 0},{
                                                        display: "none",
                                                        duration: 300,
                                                        complete: function (){
                                                            $('.ref').addClass('show');
                                                            $('[pdf]').remove();
                                                            $('#menu .doc').removeClass('show');
                                                            $('#menu div[psd-name="vs"]').removeClass('show');
                                                            _this.swipe('enable');
                                                        }
                                                    });
                                            })
                                        }
                                    });
                            }
                        });
                    }
                }
            });
            
			//Open Flow Window
            $(document).on(_this.options.eventsEnd, '#menu div[psd-name="vs"]:not(.show)', function (){
                if(Object.keys(ARGO.flowjson[0]).length == 2) {
                    if(Object.keys(ARGO.flowjson[0]).indexOf(ARGO.options.currentFlow) == 0) {
                        ARGO.init(Object.keys(ARGO.flowjson[0])[1], 0);
                    } else if(Object.keys(ARGO.flowjson[0]).indexOf(ARGO.options.currentFlow) == 1) {
                        ARGO.init(Object.keys(ARGO.flowjson[0])[0], 0);
                    }
                } else if(Object.keys(ARGO.flowjson[0]).length > 2) {
                    if(!$('#menu div[psd-name="vs"]').hasClass('show')) {
                        var flowLines = "";
                        $('.ref').removeClass('show');
                        if($('#menu div[psd-name="pdf"]').length == 1) {
                            $('#menu div[psd-name="pdf"]').addClass('show');
                        } else if($('#menu .doc').length == 1) {
                            $('#menu .doc').addClass('show');
                        }
                        $('#menu div[psd-name="vs"]').addClass('show');
                        for (var lg=0; lg<Object.keys(ARGO.flowjson[0]).length; lg++) {
                            if(Object.keys(ARGO.flowjson[0]).indexOf(ARGO.options.currentFlow) != lg) {
                                flowLines += "<li>" + Object.keys(ARGO.flowjson[0])[lg] + "</li>";
                            }
                        }
                        $.ajax({
                            url: 'theme/' + _this.options.flowTheme + '/flows/flows.html',
                            dataType: "text",
                            success: function (data){

                                $('.content.active').append(data);
                                $('[flows] ul').html(flowLines);

                                _this.swipe('disable');

                                $('[flows]')
                                    .velocity({opacity: 1},{
                                        display: "block",
                                        duration: 300,
                                        begin: function () {},
                                        complete: function (){
                                            _this.scroller('flowScroller');
                                            $('#stage .content.active div[flows] #flowScroller div ul li').off('click').on('click', function() {
                
                                                $('[flows]')
                                                    .velocity({opacity: 0},{
                                                        display: "none",
                                                        duration: 300,
                                                        complete: function (){
                                                            $('.ref').addClass('show');
                                                            $('[flows]').remove();
                                                            if($('#menu div[psd-name="pdf"]').length == 1) {
                                                                $('#menu div[psd-name="pdf"]').removeClass('show');
                                                            } else if($('#menu .doc').length == 1) {
                                                                $('#menu .doc').removeClass('show');
                                                            }
                                                            $('#menu div[psd-name="vs"]').removeClass('show');
                                                            _this.swipe('enable');
                                                        }
                                                    });
                                                ARGO.init(this.innerHTML, 0);
                                            })
                                            $('[btn-flow-close]').off('click').on('click', function() {
                
                                                $('[flows]')
                                                    .velocity({opacity: 0},{
                                                        display: "none",
                                                        duration: 300,
                                                        complete: function (){
                                                            $('.ref').addClass('show');
                                                            $('[flows]').remove();
                                                            if($('#menu div[psd-name="pdf"]').length == 1) {
                                                                $('#menu div[psd-name="pdf"]').removeClass('show');
                                                            } else if($('#menu .doc').length == 1) {
                                                                $('#menu .doc').removeClass('show');
                                                            }
                                                            $('#menu div[psd-name="vs"]').removeClass('show');
                                                            _this.swipe('enable');
                                                        }
                                                    });
                                            })
                                        }
                                    });
                            }
                        });
                    }
                }
            });
		};
	},
	removeAll: function (current){

		var Rclass = this.options.removeClass,
			Rtimeout = this.options.removeTimeouts,
			Rinterval = this.options.removeInterval,
			_this = this;

        /* Pas bien - Trouver un moyen de supprimer ce setTimeout */
		setTimeout(function (){
			_this.inSwipe = false;
			_this.swipe('enable');
			$('[data-link]').removeClass('disable');
		}, 50);

		$('*').removeClass('off on show');
		$('#layer').remove();
		$('.ref').addClass('show');

		current.find('*:not(span)').removeAttr('style');
		current.find('*').removeClass(Rclass[0]);
        current.find('.velocity-animating').velocity("stop", true);

		$('[popup]').removeAttr('style');

		for (key in Rtimeout){clearTimeout(Rtimeout[key]);}
		for (key in Rinterval){clearInterval(Rinterval[key]);}

		this.options.removeClass = [];
		this.options.removeTimeouts = [];
	},
	ajax_: function (path, type, callback){

		$.ajax({
			url: path,
			dataType: type,
			success: function (data){callback(data);}
		});
	},
	tracking: function (screen){
		try{
            console.log("Trying to turn on tracking...")
            window.parent.onEnterPage(this.options.flow[screen + 1].description);
            console.log("Tracking started!")
        }catch (e){
            console.log("Tracking failed", e);
            console.log(this.options.flow[screen + 1].description);
        }
	},
	old_tracking: function (screen){

		if (window.parent.trackingTime != undefined){

			try{
				var time = new Date().getTime() - window.parent.trackingTime;
				window.parent.addAsset(
					window.parent.trackingDescription,
					parseInt(window.parent.trackingTime),
					parseInt(time / 1000),
					window.parent.trackingId
				);
			}catch (e){
				console.log("Track: " + window.parent.trackingDescription +
					" / " + time / 1000 +
					" / " + window.parent.trackingId
				);
			}
		}

		window.parent.trackingTime = new Date().getTime();
		window.parent.trackingId = this.options.flow[screen + 1].id;
		window.parent.trackingDescription = this.options.flow[screen + 1].description;
	},
	scroller: function (el){

		var scroller = new iScroll(el,{
			vScroll: true,
			vScrollbar: false,
			hideScrollbar: false,
			bounce: false
		});
	},
	swipe: function (action){

		this.options.dom.stage.swipe(action);
	}
};

//document.addEventListener("DOMContentLoaded", function(){
ARGO = Object.create(app.stage);
//ARGO._construct_();
//});