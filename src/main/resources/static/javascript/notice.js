var Notice = Backbone.Model.extend({
    idAttribute: 'noticeId',
    initialize: function () {
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },

    urlRoot: 'http://70.50.250.209:30001/portal-notice/notice'

});

var NoticeCollection = Backbone.Collection.extend({
    model: Notice,
    url: "http://70.50.250.209:30001/portal-notice/notices"
});

var NoticeView = Backbone.View.extend({
    el: $('#mainContents'),
    html: 'notice.html',
    noticeCollection: null,

    initialize: function() {
        _.bindAll(this, 'render', 'read');

        $("#noticeItems").empty();
        this.noticeCollection = new NoticeCollection();
    },
    events: {
        'click .notice-update-editor': function(){
            window.location.hash = 'notice/editor';
        }
    },
    render: function(){
         this.noticeCollection.fetch({
           success: function (collection, response){
                _.each(collection.models, function(model){
                    $('#noticeItems').append(noticeItemTemplate(model.toJSON()));
                });

                $("#noticeItems > .list-item .content").readmore({
                    collapsedHeight: 50,
                    moreLink: '<div class="btn-group btn-group-justified" role="group" aria-label="readMore-btn-group"> ' +
                    ' <a href="#" class="btn btn-default" role="button">더보기</a>' +
                    '</div>',
                    lessLink: '<div class="btn-group btn-group-justified" role="group" aria-label="readMore-btn-group"> ' +
                    ' <a href="#" class="btn btn-default" role="button">접기</a>' +
                    '</div>'
                });
            }
        });
    },
    read: function(){
        var notice = new Notice({ id: 40 });
        notice.fetch({
            success: function (response) {
                $('ul', this.el).append("<li> Read : "+bookResponse.get("bookName")+"</li>");
            }
        });
    }
});