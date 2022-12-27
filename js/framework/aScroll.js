var aScroll = {
    padHome: null,
    padPicto: null,
    padMin: null,
    padMax: null,
    padSub: null,
    anyChapter: null,
    thisChapter: null,
    lastChapter: null,
    notFirstScreen: null,
    thisScreen: null,
    /* Scroll to next */
    init: function() {
        this.padHome =  this.checkHome();
        this.padPicto =  this.checkPicto();
        this.padMin =  this.checkMin();
        this.padMax = this.checkEl($('.maxMenu'));
        this.padSub = this.checkEl($('.subMenu.current'));
        if(this.padMax) {
            this.anyChapter = this.padMax.find('a');
            this.thisChapter = this.padMax.find('a.current');
            this.lastChapter = this.padMax.find('a:last-child');
        }
        if(this.padSub) {
            this.notFirstScreen = this.padSub.find('a:not(:first-child).current');
            this.thisScreen = this.padSub.find('a.current');
        }
        if(this.padMax && this.padMin && this.padHome) {
            if(this.thisChapter.length > 0) {
                if((this.thisChapter[0].offsetLeft + (this.thisChapter[0].clientWidth / 2)) > ((1024 - this.padMin[0].clientWidth - this.padHome[0].clientWidth) / 2)) {
                    var tillEnd = (this.thisChapter[0].clientWidth / 2) - parseInt(this.lastChapter[0].style["padding-right"]);
                    if(this.thisChapter.index() < (this.anyChapter.length - 1)) {
                        for(var i=(this.thisChapter.index()+1); i<this.anyChapter.length; i++) {
                            tillEnd = tillEnd + this.anyChapter[i].clientWidth;
                        }
                    }
                    if(tillEnd > ((1024 - this.padMin[0].clientWidth - this.padHome[0].clientWidth) / 2)) {
                        this.padMax[0].scrollLeft = (this.thisChapter[0].offsetLeft + (this.thisChapter[0].clientWidth / 2)) - ((1024 - this.padMin[0].clientWidth - this.padHome[0].clientWidth) / 2);
                    } else {
                        this.padMax[0].scrollLeft = this.padMax[0].scrollWidth;
                    }
                } else {
                    this.padMax[0].scrollLeft = 0;
                }
            }
        }
        if(this.padSub) {
            if(this.padSub[0].childElementCount > 1) {
                if(this.notFirstScreen.length > 0) {
                    if(this.padSub[0].clientWidth < this.padSub[0].scrollWidth) {
                        if(this.thisScreen[0].offsetLeft + this.thisScreen[0].clientWidth > this.padSub[0].scrollLeft + this.padSub[0].clientWidth) {
                            this.padSub[0].scrollLeft = this.thisScreen[0].offsetLeft + (this.thisScreen[0].clientWidth / 2) - (this.padSub[0].clientWidth / 2);
                        } else if(this.thisScreen[0].offsetLeft < this.padSub[0].scrollLeft + this.padSub[0].clientWidth) {
                            this.padSub[0].scrollLeft = this.thisScreen[0].offsetLeft + (this.thisScreen[0].clientWidth / 2) - (this.padSub[0].clientWidth / 2);
                        }
                    }
                }
            }
        }
    },
    /* Check if home exists */
    checkHome: function(){
        if($('#menu div[psd-name="home"]').length > 0) {
            return $('#menu div[psd-name="home"]');
        } else if($('#menu .home').length > 0) {
            return $('#menu .home');
        } else {
            return false;
        }
    },
    /* Check if subPicto exists */
    checkPicto: function(){
        if($('#menu div[psd-name="sub"]').length > 0) {
            return $('#menu div[psd-name="sub"]');
        } else if($('#menu .subPicto').length > 0) {
            return $('#menu .subPicto');
        } else {
            return false;
        }
    },
    /* Check if minMenu exists */
    checkMin: function(){
        if($('#menu div[psd-name="min_menu"]').length > 0) {
            return $('#menu div[psd-name="min_menu"]');
        } else if($('#menu .minMenu').length > 0) {
            return $('#menu .minMenu');
        } else {
            return false;
        }
    },
    /* Check if element exists */
    checkEl: function(el){
        if(el.length > 0) {
            return el;
        }
        else {
            return false;
        }
    },
}

AS = Object.create(aScroll);