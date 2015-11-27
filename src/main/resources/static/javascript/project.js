/**
 * Created by Hahn on 2015-11-26.
 */
// Project Views
var ProjectOverviewView = Backbone.View.extend({
    html: 'project-overview.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectCoreView = Backbone.View.extend({
    html: 'project-core.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectCodeGeneratorView = Backbone.View.extend({
    html: 'project-code-generator.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectQueryManagerView = Backbone.View.extend({
    html: 'project-query-manager.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectOdenView = Backbone.View.extend({
    html: 'project-oden.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectLogManagerView = Backbone.View.extend({
    html: 'project-log-manager.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectBatchView = Backbone.View.extend({
    html: 'project-batch.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectIamView = Backbone.View.extend({
    html: 'project-iam.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});
var ProjectMonitoringView = Backbone.View.extend({
    html: 'project-monitoring.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});