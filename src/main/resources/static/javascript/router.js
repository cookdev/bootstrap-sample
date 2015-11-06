/**
 * Created by Hahn on 2015-11-04.
 */


// Drawing Portal Main
// Set Router
var Router = Backbone.Router.extend({

    commonHeader: null,
    portalHeader: null,
    footer: null,
    container: null,
    portalMain: null,
    privacyPolicyPopup: null,

    initialize: function(){
        this.commonHeader = new CommonHeaderView();
        this.portalHeader = new PortalHeaderView();
        this.footer = new FooterView();
        this.container = new ContainerView({
            el: $("#mainContents")
        });
    },
    routes: {
        "": "handlePortalMainView",
        "privacy-policy": "handlePrivacyPolicyPopupView"
    },
    handlePortalMainView: function() {
        if(this.portalMain == null){
            this.portalMain = new PortalMainView();
        }
        this.container.contents = this.portalMain;
        this.container.render();
    },
    handlePrivacyPolicyPopupView: function(){
        if(this.privacyPolicyPopup == null){
            this.privacyPolicyPopup = new PrivacyPolicyPopupView();
        }
        if(this.portalMain == null){
            this.handlePortalMainView();
        }
        var modal = new Backbone.BootstrapModal({
            content: this.privacyPolicyPopup,
            title: '개인정보 취급방침',
            animate: true,
            allowHeaderCancel: true,
            allowCancel: false,
            okText: '확인',
            template: ReadOnlyPopupTemplate
        });
        modal.open(function(){
            window.location.hash = "#";
        });

    }
});

// Drawing HeaderView
var CommonHeaderView =  Backbone.View.extend({
    el: $('#commonHeader'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('common-header.html'));
    }
});

// Drawing HeaderView
var PortalHeaderView =  Backbone.View.extend({
    el: $('#portalHeader'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('portal-header.html'));
    }
});

// Drawing FooterView
var FooterView = Backbone.View.extend({
    el: $('footer'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('footer.html'));
    }

});

var ContainerView = Backbone.View.extend({
    contents: null,
    render: function(){
        this.$el.append(this.contents.$el);
        return this;
    }
});

// Drawing Portal Main
var PortalMainView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('portal-main.html'));
    }
});

var PrivacyPolicyPopupView = Backbone.View.extend({
    render: function(){
        $(this.el).append(GetHtml('popup/privacy-policy-popup.html'));
        return this;
    }
});


var ModalView = function(popupView) {
    var modal = new Backbone.BootstrapModal({
        animate: true,
        content: popupView
    });
    return modal;
};








// Routing Views
$(document).ready(function(){
    var router = new Router();
    Backbone.history.start();
});