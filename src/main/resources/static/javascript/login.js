var LoginModel = Backbone.Model.extend({
    url: 'https://forum.ssc.com/api/user/register',
    validation: {
        username: [
            {
                required: true,
                msg: 'ID를 입력하십시오.'
            },{
                isExistedID: false,
                msg: '이미 존재하는 ID입니다.'
            }
        ]
    }
});

// Drawing Login View
var LoginView = Backbone.View.extend({
    model: new LoginModel(),
    form: '.login form',
    html: 'login.html',

    initialize: function(){
        Backbone.Validation.bind(this);
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    },
    //render: function(){
    //    $(this.el).html(GetHtml(this.html));
    //},

    events: {
        'click #loginBtn': function (e) {
            e.preventDefault();
            this.login();
        }
    },

    login: function () {
        var data = this.$el.find(this.form).serializeObject();

        this.model.set(data);

        // Check if the model is valid before saving
        // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
        if(this.model.isValid(true)){
            this.model.save();
            alert('Great Success!');
        }


    },

    remove: function() {
        // Remove the validation binding
        // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});