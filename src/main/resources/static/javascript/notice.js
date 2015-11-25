var Notice = Backbone.Model.extend({
    idAttribute: 'id',
    initialize: function () {
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },

    urlRoot: 'http://localhost:8080/portal-notice/notice'
});

var NoticeCollection = Backbone.Collection.extend({
    model: Notice,
    url: "http://localhost:8080/portal-notice/notices"

    // TODO
    // 화면 처음 생성시(render?)
    // var noticesCollection = new NoticeCoolection();
    // noticesColllection.fetch()
    // fetch 하면 정해놓은 url로 리스트 요청함
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
    },
    render: function(){
        $('#txtEditor').Editor();
        this.noticeCollection.fetch({
            success: function (collection, response){
                //debugger;
                _.each(collection.models, function(model){
                    $('#noticeItems').append(noticeItemTemplate(model.toJSON()));
                });

                $("#noticeItems > .list-item .content").readmore({
                    collapsedHeight: 50,
                    // moreLink: '<a href="#">더보기</a>',
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

var NoticePopupModel = Backbone.Model.extend({
    validation: {
        title: {
            required: true,
            msg: 'title을 입력하십시오.'
        },
        content: {
            required: true
        }
    }
});