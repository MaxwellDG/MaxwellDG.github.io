var aStatus = {
    allFlows: null,
    thisFlow: null,
    menu: null,
    flowbuttons: null,
    /* Add flow buttons and ref style */
    init: function() {
        $.getJSON('js/framework/config.json').done(function (_status_) {
            this.allFlows = Object.keys(ARGO.flowjson[0]).length;
            this.thisFlow = Object.keys(ARGO.flowjson[0]);
            this.menu = document.querySelector('#menu');
            ARGO.options.refStyle = _status_.reference;
            if(_status_.status == "inProgress") {
                if(this.allFlows > 1) {
                    if(!document.querySelector('#stage .flowButtons')) {
                        this.menu.insertAdjacentHTML('afterend', '<div class="flowButtons" data-prevent-tap="true"></div>');
                        this.flowbuttons = document.querySelector('#stage .flowButtons');
                        for(var i=0; i<this.allFlows; i++) {
                            this.flowbuttons.insertAdjacentHTML('beforeend', '<div data-flow="' + this.thisFlow[i] + '"><span>' + (i+1) + '</span></div>');
                        }
                    }
                    $('#stage .flowButtons div.inReview').removeClass('inReview');
                    $('#stage .flowButtons div[data-flow=' + ARGO.options.currentFlow + ']').addClass('inReview');
                }
                $('#stage .flowButtons div:not(.inReview)').off('click').on('click', function() {
                    ARGO.init($(this).attr('data-flow'), 0);
                });
            }
            if(_status_.SmPC.length > 0) {
                ARGO.options.SmPCLength = _status_.SmPC.length;
                ARGO.options.SmPC = [];
                for(var lg=0; lg<_status_.SmPC.length; lg++) {
                    ARGO.options.SmPC.push(_status_.SmPC[lg]);
                }
            }
        });
    }
}

ASDV = Object.create(aStatus);