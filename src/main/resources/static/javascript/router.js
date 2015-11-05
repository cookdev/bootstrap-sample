/**
 * Created by Hahn on 2015-11-04.
 */


// Drawing Portal Main
// Set Router
var Router = Backbone.Router.extend({

    header: null,
    footer: null,
    container: null,
    portalMain: null,
    privacyPolicyPopup: null,

    initialize: function(){
        this.header = new HeaderView();
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
        var modal = new Backbone.BootstrapModal({
            content: this.privacyPolicyPopup,
            title: '개인정보 취급방침',
            animate: true,
            allowHeaderCancel: true,
            allowCancel: false,
            okText: '확인',
            template: _.template('\
                <div class="modal-dialog privacy"><div class="modal-content">\
                <% if (title) { %>\
                  <div class="modal-header">\
                    <% if (allowHeaderCancel) { %>\
                      <a class="close">&times;</a>\
                    <% } %>\
                    <h4><%=title%></h4>\
                  </div>\
                <% } %>\
                <div class="modal-body">{{content}}</div>\
                <% if (showFooter) { %>\
                  <div class="modal-footer">\
                    <% if (allowCancel) { %>\
                      <% if (cancelText) { %>\
                        <a href="#" class="btn cancel">{{cancelText}}</a>\
                      <% } %>\
                    <% } %>\
                    <a href="#" class="btn ok btn-primary"><%=okText%></a>\
                  </div>\
                <% } %>\
                </div></div>\
            ')
        });
        modal.open(function(){
            if(this.portalMain != null){
                history.back();
            }else{
                window.location.hash = "#";
            }
        });

    }
});

// Drawing HeaderView
var HeaderView =  Backbone.View.extend({
    el: $('header'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('header.html'));
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
        $(this.el).append(GetHtml('privacy-policy-popup.html'));
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