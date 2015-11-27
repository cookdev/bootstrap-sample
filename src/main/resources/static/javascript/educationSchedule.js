/**
 * Created by Hahn on 2015-11-26.
 */

// Education Schedule View
var EducationScheduleView = Backbone.View.extend({
    html: 'education-schedule.html',
    initialize: function(){
    },
    render: function(){
        $(this.el).html(GetHtml(this.html));
    }
});