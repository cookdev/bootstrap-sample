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
    signup: null,
    privacyPolicyPopup: null,
    projectOverview: null,
    projectCore: null,
    projectCodeGenerator: null,
    projectQueryManager: null,
    projectOden: null,
    projectLogManager: null,
    projectBatch: null,
    projectIam: null,
    projectMonitoring: null,
    notice: null,
    educationSchedule: null,

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
        "sign-up": "handlePortalSignupView",
        "privacy-policy": "handlePrivacyPolicyPopupView",
        "project": "handleProjectOverviewView",
        "project/core": "handleProjectCoreView",
        "project/code-generator": "handleProjectCodeGeneratorView",
        "project/query-manager": "handleProjectQueryManagerView",
        "project/oden": "handleProjectOdenView",
        "project/log-manager": "handleProjectLogManagerView",
        "project/batch": "handleProjectBatchView",
        "project/iam": "handleProjectIamView",
        "project/monitoring": "handleProjectMonitoringView",
        "notice": "handleNoticeView",
        "education-schedule": "handleEducationScheduleView"

    },
    handlePortalMainView: function() {
        if(this.portalMain == null){
            this.portalMain = new PortalMainView();
        }
        this.container.contents = this.portalMain;
        this.container.render();
    },
    handlePortalSignupView: function(){
        if(this.signup == null){
            this.signup = new SignupView();
        }
        this.container.contents = this.signup;
        this.container.render();
    },
    handlePrivacyPolicyPopupView: function(){
        var isDirectLink = false;
        if(this.privacyPolicyPopup == null){
            this.privacyPolicyPopup = new PrivacyPolicyPopupView();
        }
        if(this.container.contents == null){
            this.handlePortalMainView();
            isDirectLink = true;
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
            if(isDirectLink){
                window.location.hash = "#";
            }else{
                window.history.back();
            }
        });
    },
    handleProjectOverviewView: function(){
        if(this.projectOverview == null){
            this.projectOverview = new ProjectOverviewView();
        }
        this.container.contents = this.projectOverview;
        this.container.render();
    },
    handleProjectCoreView: function(){
        if(this.projectCore == null){
            this.projectCore = new ProjectCoreView();
        }
        this.container.contents = this.projectCore;
        this.container.render();
    },
    handleProjectCodeGeneratorView: function(){
        if(this.projectCodeGenerator == null){
            this.projectCodeGenerator = new ProjectCodeGeneratorView();
        }
        this.container.contents = this.projectCodeGenerator;
        this.container.render();
    },
    handleProjectQueryManagerView: function(){
        if(this.projectQueryManager == null){
            this.projectQueryManager = new ProjectQueryManagerView();
        }
        this.container.contents = this.projectQueryManager;
        this.container.render();
    },
    handleProjectOdenView: function(){
        if(this.projectOden == null){
            this.projectOden = new ProjectOdenView();
        }
        this.container.contents = this.projectOden;
        this.container.render();
    },
    handleProjectLogManagerView: function(){
        if(this.projectLogManager == null){
            this.projectLogManager = new ProjectLogManagerView();
        }
        this.container.contents = this.projectLogManager;
        this.container.render();
    },
    handleProjectBatchView: function(){
        if(this.projectBatch == null){
            this.projectBatch = new ProjectBatchView();
        }
        this.container.contents = this.projectBatch;
        this.container.render();
    },
    handleProjectIamView: function(){
        if(this.projectIam == null){
            this.projectIam = new ProjectIamView();
        }
        this.container.contents = this.projectIam;
        this.container.render();
    },
    handleProjectMonitoringView: function(){
        if(this.projectMonitoring == null){
            this.projectMonitoring = new ProjectMonitoringView();
        }
        this.container.contents = this.projectMonitoring;
        this.container.render();

    },
    handleNoticeView: function(){
        if(this.notice == null){
            this.notice = new NoticeView();
        }
        this.container.contents = this.notice;
        this.container.render();
    },
    handleEducationScheduleView: function(){
        if(this.educationSchedule == null){
            this.educationSchedule = new EducationScheduleView();
        }
        this.container.contents = this.educationSchedule;
        this.container.render();
    }

});

// Drawing HeaderView
var CommonHeaderView =  Backbone.View.extend({
    el: $('.common-header'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('common-header.html'));
    }
});

// Drawing HeaderView
var PortalHeaderView =  Backbone.View.extend({
    el: $('.portal-header'),
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('portal-header.html'));
    }
});

// Drawing FooterView
var FooterView = Backbone.View.extend({
    el: $('.portal-footer'),
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
        this.$el.html(this.contents.$el);
        $(document).scrollTop(0);
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


_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});

var SignUpModel = Backbone.Model.extend({
    validation: {
        userId: {
            required: true
        },
        userName: {
            required: true
        },
        emailAddress: {
            required: true,
            pattern: 'email'
        },
        password: {
            minLength: 10
        },
        repeatPassword: {
            equalTo: 'password',
            msg: 'The passwords does not match'
        }
    }
});

// Drawing SignUp View
var SignupView = Backbone.View.extend({
    initialize: function(){
        this.el = 'form';
        this.model = new SignUpModel();
        this.render();
        Backbone.Validation.bind(this);
    },
    render: function(){
        $(this.el).append(GetHtml('sign-up_bak.html'));
    },

    events: {
        'click #signUpBtn': function (e) {
            e.preventDefault();
            this.signUp();
        }
    },

    signUp: function () {
        var data = this.$el.serializeObject();

        this.model.set(data);

        // Check if the model is valid before saving
        // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
        if(this.model.isValid(true)){
            // this.model.save();
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

// https://github.com/hongymagic/jQuery.serializeObject
$.fn.serializeObject = function () {
    "use strict";
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(this.serializeArray(), b), a
};

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


// Project Views
var ProjectOverviewView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-overview.html'));
    }
});
var ProjectCoreView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-core.html'));
    }
});
var ProjectCodeGeneratorView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-code-generator.html'));
    }
});
var ProjectQueryManagerView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-query-manager.html'));
    }
});
var ProjectOdenView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-oden.html'));
    }
});
var ProjectLogManagerView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-log-manager.html'));
    }
});
var ProjectBatchView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-batch.html'));
    }
});
var ProjectIamView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-iam.html'));
    }
});
var ProjectMonitoringView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('project-monitoring.html'));
    }
});


// Notice View
var NoticeView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('notice.html'));
    }
});


// Education Schedule View
var EducationScheduleView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        $(this.el).append(GetHtml('education-schedule.html'));
    }
});


// Routing Views
$(document).ready(function(){
    var router = new Router();
    Backbone.history.start();
});