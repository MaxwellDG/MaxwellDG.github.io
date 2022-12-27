var aLink = {
    padHome: null,
    padPicto: null,
    padMin: null,
    padMax: null,
    padSub: null, 
    padFirstMax: null,
    padLastMax: null,
    padFirstSub: null,
    padLastSub: null,
    homeZ: null,
    homeLeft: null,
    homeTop: null,
    homeWidth: null,
    homeHeight: null,
    pictoZ: null,
    pictoLeft: null,
    pictoTop: null,
    pictoWidth: null,
    pictoHeight: null,
    minZ: null,
    minLeft: null,
    minTop: null,
    minWidth: null,
    minHeight: null,
    maxZ: null,
    maxLeft: null,
    maxTop: null,
    maxWidth: null,
    maxHeight: null,
    subZ: null,
    subLeft: null,
    subTop: null,
    subWidth: null,
    subHeight: null,
    thisMax: null,
    thatMax: null,
    maxRightPad: null,
    maxLeftPad: null,
    thisSub: null,
    thatSub: null,
    subRightPad: null,
    subLeftPad: null,
    init: function(menuContent) {
        this.padHome =  this.checkHome();
        this.padPicto =  this.checkPicto();
        this.padMin =  this.checkMin();
        this.padMax = this.checkEl($('#menu .maxMenu'));
        this.padSub = this.checkEl($('#menu .subMenu'));
        if(this.padHome) {
            this.homeZ = parseInt(this.padHome.css('z-index')),
            this.homeLeft = parseInt(this.padHome.css('left')),
            this.homeWidth = parseInt(this.padHome.css('width')),
            this.homeHeight = parseInt(this.padHome.css('height'));
            if(this.padHome.selector == '#menu div[psd-name="home"]') {
                this.homeTop = parseInt(this.padHome.css('top'));
            } else {
                this.homeTop = 768 - parseInt(this.padHome.css('bottom')) - this.homeHeight;
            }
            if(this.padMax) {
                this.obsoleteLink = $('#menu .maxMenu a[data-chapter="10"]');
                if(this.obsoleteLink.length == 1 && !(this.obsoleteLink.hasClass('obsolete'))) {
                    this.obsoleteLink.addClass('obsolete');
                }
            }
        }
        if(this.padPicto) {
            this.pictoZ = parseInt(this.padPicto.css('z-index')),
            this.pictoLeft = parseInt(this.padPicto.css('left')),
            this.pictoWidth = parseInt(this.padPicto.css('width')),
            this.pictoHeight = parseInt(this.padPicto.css('height'));
            if(this.padPicto.selector == '#menu div[psd-name="sub"]') {
                this.pictoTop = parseInt(this.padPicto.css('top'));
            } else {
                this.pictoTop = 768 - parseInt(this.padPicto.css('bottom')) - this.pictoHeight;
            }
        }
        if(this.padMin) {
            this.minZ = parseInt(this.padMin.css('z-index')),
            this.minLeft = parseInt(this.padMin.css('left')),
            this.minWidth = parseInt(this.padMin.css('width')),
            this.minHeight = parseInt(this.padMin.css('height'));
            if(this.padMin.selector == '#menu div[psd-name="min_menu"]') {
                this.minTop = parseInt(this.padMin.css('top'));
            } else {
                this.minTop = 768 - parseInt(this.padMin.css('bottom')) - this.minHeight;
            }
        }
        if(this.padMax) {
            this.oneMax = $('.maxMenu a');
            for(var i=0; i<this.oneMax.length; i++) {
                if(this.oneMax[i].innerHTML == ".") {
                    $(this.oneMax[i]).addClass('obsolete')
                }
            }
            this.maxZ = parseInt(this.padMax.css('z-index')),
            this.maxLeft = parseInt(this.padMax.css('left')),
            this.maxWidth = parseInt(this.padMax.css('width')),
            this.maxHeight = parseInt(this.padMax.css('height')),
            this.thisMax = $($('#menu .maxMenu a:not(.obsolete)')[0]),
            this.thatMax = $('#menu .maxMenu a:last-child'),
            this.maxRightPad = parseInt(this.thisMax.css('padding-right')),
            this.maxLeftPad = parseInt(this.thatMax.css('padding-left'));
            if($('#menu .maxMenu a.obsolete').length > 1) {
                this.maxTop = 768 - parseInt(this.padMax.css('bottom')) - this.maxHeight;
            } else {
                this.maxTop = parseInt(this.padMax.css('top'));
            }
        }
        if(this.padSub) {
            this.subZ = parseInt(this.padSub.css('z-index')),
            this.subLeft = parseInt(this.padSub.css('left')),
            this.subTop = parseInt(this.padSub.css('top')),
            this.subWidth = parseInt(this.padSub.css('width')),
            this.subHeight = parseInt(this.padSub.css('height')),
            this.thisSub = $('#menu .subMenu a:first-child'),
            this.thatSub = $('#menu .subMenu a:last-child'),
            this.subRightPad = parseInt(this.thisSub.css('padding-right')),
            this.subLeftPad = parseInt(this.thatSub.css('padding-left'));
            if(parseInt(this.subTop) <= 0 || isNaN(this.subTop)) {
                this.subTop = 768 - parseInt(this.padSub.css('bottom')) - this.subHeight;
            }
        }
        this.padFirstMax = this.firstMaxBehavior();
        this.padLastMax = this.lastMaxBehavior();
        this.padFirstSub = this.firstSubBehavior();
        this.padLastSub = this.lastSubBehavior();
        this.finish();
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
    /* Position first link of maxMenu */
    firstMaxBehavior: function(){
        if(this.padHome && this.padMax) {
            if(this.homeZ >= this.maxZ) {
                if((this.homeLeft + this.homeWidth) > this.maxLeft) {
                    if(this.homeLeft < (this.maxLeft + this.maxWidth)) {
                        if((this.homeTop + this.homeHeight) > this.maxTop) {
                            if(this.homeTop < (this.maxTop + this.maxHeight)) {
                                return this.maxRightPad + this.homeLeft + this.homeWidth - this.maxLeft;
                            }
                        }
                    }
                }
            }
        }
    },
    /* Position last link of maxMenu */
    lastMaxBehavior: function() {
        if(this.padMin && this.padMax) {
            if(this.thisMax != this.thatMax && this.minZ >= this.maxZ) {
                if((this.minLeft + this.minWidth) > 512) {
                    if((this.minLeft + this.minWidth) > this.maxLeft) {
                        if(this.minLeft < (this.maxLeft + this.maxWidth)) {
                            if((this.minTop + this.minHeight) > this.maxTop) {
                                if(this.minTop < (this.maxTop + this.maxHeight)) {
                                    return this.maxLeftPad + this.maxLeft + this.maxWidth - this.minLeft;
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    /* Check necessary margin for subMenu */
    subRelPicto: function() {
        var toReturn = 0
        if(this.padPicto && this.padSub) {
            if(this.pictoZ >= this.subZ) {
                if((this.pictoLeft + this.pictoWidth) > this.subLeft) {
                    if(this.pictoLeft < (this.subLeft + this.subWidth)) {
                        if((this.pictoTop + this.pictoHeight) > this.subTop) {
                            if(this.pictoTop < (this.subTop + this.subHeight)) {
                                toReturn = this.pictoLeft + this.pictoWidth;
                            }
                        }
                    }
                }
            }
        } else if(this.padHome && this.padSub) {
            if(this.homeZ >= this.subZ) {
                if((this.homeLeft + this.homeWidth) > this.subLeft) {
                    if(this.homeLeft < (this.subLeft + this.subWidth)) {
                        if((this.homeTop + this.homeHeight) > this.subTop) {
                            if(this.homeTop < (this.subTop + this.subHeight)) {
                                toReturn = this.homeLeft + this.homeWidth;
                            }
                        }
                    }
                }
            }
        }
        return toReturn;
    },
    /* Position first links of subMenu */
    firstSubBehavior: function() {
        if(this.padSub) {
            var overlapTrue = this.subRelPicto(),
                firstSubTemp;
            for(var i=0; i<this.padSub.length; i++) {
                var overlapTemp = 30;
                $(this.padSub[i]).addClass('testing');
                for(var j=0; j<$(this.padSub[i]).find('a').length; j++) {
                    var jLeft = parseInt($(this.padSub[i]).find('a:nth-child(' + (j+1) + ')').css("padding-left")), 
                        jWidth = parseInt($(this.padSub[i]).find('a:nth-child(' + (j+1) + ')').css("width")), 
                        jRight = parseInt($(this.padSub[i]).find('a:nth-child(' + (j+1) + ')').css("padding-right"));
                    overlapTemp = overlapTemp + jLeft + jWidth + jRight;
                }
                $(this.padSub[i]).removeClass('testing');
                if(this.subWidth > overlapTemp) {
                    if(firstSubTemp == undefined) {
                        firstSubTemp = [[i, this.subWidth - overlapTemp + this.subRightPad, overlapTrue - this.subWidth + overlapTemp - this.subLeft]];
                    } else {
                        firstSubTemp.push([i, this.subWidth - overlapTemp + this.subRightPad, overlapTrue - this.subWidth + overlapTemp - this.subLeft]);
                    }
                } else {
                    if(firstSubTemp == undefined) {
                        firstSubTemp = [[i, "wrong", overlapTrue]];
                    } else {
                        firstSubTemp.push([i, "wrong", overlapTrue]);
                    }
                }
            }
            return firstSubTemp;
        }
    },
    /* Position last links of subMenu */
    lastSubBehavior: function() {
        if(this.padMin && this.padSub) {
            var lastSubTemp;
            for(var i=0; i<this.padSub.length; i++) {
                var firstChild = $(this.padSub[i]).find('a:first-child'),
                    lastChild = $(this.padSub[i]).find('a:last-child');
                if(firstChild.index() != lastChild.index() && this.minZ >= this.subZ) {
                    if(!isNaN(this.padFirstSub[i][2])) {
                        if((this.minLeft + this.minWidth) > 512) {
                            if((this.minLeft + this.minWidth) > this.subLeft + this.padFirstSub[i][2]) {
                                if(this.minLeft < (this.subLeft + this.subWidth + this.padFirstSub[i][2])) {
                                    if((this.minTop + this.minHeight) > this.subTop) {
                                        if(this.minTop < (this.subTop + this.subHeight)) {
                                            if(lastSubTemp == undefined) {
                                                lastSubTemp = [[i, this.subRightPad + this.subLeft + this.subWidth + this.padFirstSub[i][2] - this.minLeft]];
                                            } else {
                                                lastSubTemp.push([i, this.subRightPad + this.subLeft + this.subWidth + this.padFirstSub[i][2] - this.minLeft]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if((this.minLeft + this.minWidth) > 512) {
                            if((this.minLeft + this.minWidth) > this.subLeft) {
                                if(this.minLeft < (this.subLeft + this.subWidth)) {
                                    if((this.minTop + this.minHeight) > this.subTop) {
                                        if(this.minTop < (this.subTop + this.subHeight)) {
                                            if(lastSubTemp == undefined) {
                                                lastSubTemp = [[i, this.subRightPad + this.subLeft + this.subWidth - this.minLeft]];
                                            } else {
                                                lastSubTemp.push([i, this.subRightPad + this.subLeft + this.subWidth - this.minLeft]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(lastSubTemp == undefined) {
                        lastSubTemp = [[i, "wrong"]];
                    }
                    if(lastSubTemp[i] == undefined) {
                        lastSubTemp.push([i, "wrong"]);
                    }
                } else {
                    if(lastSubTemp == undefined) {
                        lastSubTemp = [[i, "wrong"]];
                    } else {
                        lastSubTemp.push([i, "wrong"]);
                    }
                }
            }
            return lastSubTemp;
        }
    },
    /* Writing the collected data */
    finish: function() {
        if(!isNaN(this.padFirstMax)) {
            this.thisMax.css({
                'padding-left': this.padFirstMax
            })
        }
        if(!isNaN(this.padLastMax)) {
            this.thatMax.css({
                'padding-right': this.padLastMax
            })
        }
        for(var z=0; z<this.padFirstSub.length; z++) {
            if(!isNaN(this.padFirstSub[z][2])) {
                $(this.padSub[z]).css({
                    'margin-left': this.padFirstSub[z][2]
                })
            }
            if(!isNaN(this.padFirstSub[z][1])) {
                $(this.padSub[z]).find('a:first-child').css({
                    'padding-left': this.padFirstSub[z][1]
                })
            }
            if(!isNaN(this.padLastSub[z][1])) {
                $(this.padSub[z]).find('a:last-child').css({
                    'padding-right': this.padLastSub[z][1]
                })
            }
        }
    }
}
AL = Object.create(aLink);