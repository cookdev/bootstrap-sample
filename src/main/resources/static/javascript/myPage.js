/**
 * Created by Hahn on 2015-11-26.
 */
var MyPageModel = Backbone.Model.extend({
    urlRoot: 'http://70.50.214.48:30002/user'
});
var MyPageView = Backbone.View.extend({
    htmlPage: 'my-page.html',
    htmlStr: null,
    model: null,
    data: null,
    form: '.my-page form',
    modal: null,
    passwordValidationPopupView: null,
    userId: null,

    initialize: function(userId){
        this.userId = userId;
        this.model = new MyPageModel({id: userId});
        this.getUserInfo();
    },
    render: function(){
        if(this.htmlStr == null){
            this.htmlStr = GetHtml(this.htmlPage);
        }
        $(this.el).html(this.htmlStr);

        if(this.data == null){
            this.getUserInfo();
        }else{
            this.setUser();
        }
        return this;
    },
    events: {
        'click #btnUserModify': function (e) {
            e.preventDefault();
            this.passwordValidation();
        },
        'click #okBtn': function(e){
            e.preventDefault();
            this.ok();
        },
        'click #backBtn': function(e){
            e.preventDefault();
            this.back();
        }
    },
    getUserInfo: function(){
        var that = this;
        this.model.fetch({
            success: function (collection, response){
                that.data = response;
                that.setUser();
            }
        });
    },
    setUser: function(){
        $('.my-page-form').find('input[name="userId"]').val(this.data.userId);
        $('.my-page-form').find('input[name="userName"]').val(this.data.userName);
        $('.my-page-form').find('input[name="email"]').val(this.data.email);
    },
    passwordValidation: function(){
        if(this.modal == null){
            this.passwordValidationPopupView = new PasswordValidationPopupView(this.userId, this);
            this.modal = new Backbone.BootstrapModal({
                content: this.passwordValidationPopupView,
                title: 'Password Confirm',
                animate: true,
                allowHeaderCancel: true,
                showFooter: false,
                height: '300px'
            });
        }else{
            this.passwordValidationPopupView.delegateEvents();
        }
        this.modal.open();
    },
    modalClose: function(){

        this.modal.close();
    },
    changeViewForModify: function() {

        //View mode change
        $('.my-page-form fieldset').removeProp('disabled');
        $('#btnGroupMyInfo').removeClass('hidden');

        this.userId = $('.my-page-form').find('input[name="userId"]').val();
        this.userName = $('.my-page-form').find('input[name="userName"]').val();
        this.email = $('.my-page-form').find('input[name="email"]').val()
    },
    ok: function(){
        var that = this;
        var data = this.$el.find(this.form).serializeObject();
        this.model.set(data);
        this.model.save({}, {
            success: function(a,b,c){
                alert('회원정보가 수정되었습니다.');
                that.back();
                that.getUserInfo();
            },
            error: function(a,b,c){
                alert("Error");
            }
        });
    },
    back: function(){
        $('.my-page-form').find('input[name="userId"]').val(this.userId);
        $('.my-page-form').find('input[name="userName"]').val(this.userName);
        $('.my-page-form').find('input[name="email"]').val(this.email);

        $('.my-page-form fieldset').prop('disabled', true);
        $('#btnGroupMyInfo').addClass('hidden');

        this.userId = null;
        this.userName = null;
        this.email = null;
    }
});

var PasswordValidationModel = Backbone.Model.extend({
    url: 'http://70.50.214.48:30002/password/validation'
});
var PasswordValidationPopupView = Backbone.View.extend({
    el: '#popup',
    model: null,
    htmlPage: 'popup/password-validation.html',
    htmlStr: null,
    form: '.password-validation .password-form',
    userId: null,
    myPage: null,

    initialize: function(userId, parent){
        this.myPage = parent;
        this.userId = userId;
        this.model = new PasswordValidationModel({id: userId});
    },
    render: function(){
        if(this.htmlStr == null){
            this.htmlStr = GetHtml(this.htmlPage);
        }
        $(this.el).html(this.htmlStr);

        this.$el.find(this.form).find('input[name="userId"]').val(this.userId);
        $('.password-validation input[name="password"]').focus();
        return this;
    },
    events: {
        'click #validatePassword': function (e) {
            e.preventDefault();
            this.passwordValidation();
        },
        'click #closePopup': function (e) {
            e.preventDefault();
            this.closePopup();
        }
    },
    passwordValidation: function(){
        var that = this;
        var data = this.$el.find(this.form).serializeObject();
        this.model.set(data);
        this.model.save({},{
            success: function(a,b,c){
                alert("정상적으로 인증되었습니다.");
                that.closePopup(true);
            },
            error: function(a,b,c){
                alert("잘못된 Password 입니다.");
                $('.password-validation input[name="password"]').val('');
                $('.password-validation input[name="password"]').focus();
            },
            type: "POST"
        });
    },
    closePopup: function(isSuccess){
        this.myPage.modalClose();
        if(isSuccess){
            this.myPage.changeViewForModify();
        }
    }
});


$.fn.serializeObject = function ( ) {
    var modelData = {};
    var formArray = this.find('input');
    $.each(formArray, function(idx, obj){
        var $obj = $(this), value;

        if('checkbox' === $obj.attr('type')){
            value = $obj.is(':checked');
        }else{
            value = $obj.val();
        }
        modelData[$obj.attr('name')] = value;
    })
    return modelData;
};