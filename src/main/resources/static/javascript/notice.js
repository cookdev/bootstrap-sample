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
});

var NoticeView = Backbone.View.extend({
    el: $('#mainContents'),
    initialize: function() {
        _.bindAll(this, 'render', 'read', 'tempRead');

        //$("#noticeItems").empty();
        this.render();
    },
    events: {
    },
    render: function(){
        var noticeCollection = new NoticeCollection();
        noticeCollection.fetch({
            success: function (response){
                response.models.forEach(
                    function writeNotice(value) {
                        $('#noticeItems').append("<article class='list-item panel panel-default'>" +
                            "  <div class='item-body panel-body'>" +
                            "      <div class='title'>" +
                            "          <h2>"+ value.get('title') +"</h2>" +
                            "      </div>" +
                            "      <div class='date'>"+ value.get('date') +"</div>" +
                            "      <div class='content'>"+ value.get('content') +"</div>" +
                            "  </div>" +
                            "</article>");
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
    },
    tempRead: function(){
        var tempNotice = new Notice({ id: 40, title: '[알림] 서버 정기 작업 일정 알려드립니다. ( 10/1(수) 15:00 ~ 10/1(수) 18:00 )', content: '10/1(수) 15:00 ~ 10/1(수) 18:00 로 예정된 서버 정기 작업 일정을 알려드립니다. <br/> 이 시간 동안 Anyframe Java 오픈소스 커뮤니티 사용을 포함하여 Anyframe Java 개발 서버를 통해 제공하는 개발 환경에 접근이 제한되므로 사용에 참고하시기 바랍니다.<br/><br/> [작업 일시]<br/>10/1(수) 15:00 ~ 10/1(수) 18:00<br/><br/>[사용 제한 대상]<br/>1) Anyframe Java 오픈소스 커뮤니티 사이트(다운로드 페이지, 매뉴얼 사이트, Forum 등 모두 제한됨)<br/>2) Subversion(형상관리 서버)<br/>3) CTIP(빌드 서버)<br/>4) JIRA(이슈 관리 시스템)<br/>5) Anyframe Maven Repository(라이브러리 저장소)<br/><br/>문의사항이 있으신 경우 관리자 이메일(anyframe@samsung.com)로 연락주시기 바랍니다.<br/><br/>감사합니다.', date: '2015-10-01 15:00' });
        $('#noticeItems').append("<article class='list-item panel panel-default'>" +
                                 "  <div class='item-body panel-body'>" +
                                 "      <div class='title'>" +
                                 "          <h2>"+ tempNotice.get("title") +"</h2>" +
                                 "      </div>" +
                                 "      <div class='date'>"+ tempNotice.get("date") +"</div>" +
                                 "      <div class='content'>"+ tempNotice.get("content") +"</div>" +
                                 "  </div>" +
                                 "</article>");
        $('#noticeItems').append("<article class='list-item panel panel-default'>" +
                                "  <div class='item-body panel-body'>" +
                                "      <div class='title'>" +
                                "          <h2>"+ tempNotice.get("title") +"</h2>" +
                                "      </div>" +
                                "      <div class='date'>"+ tempNotice.get("date") +"</div>" +
                                "      <div class='content'>"+ tempNotice.get("content") +"</div>" +
                                "  </div>" +
                                "</article>");
        $('#noticeItems').append("<article class='list-item panel panel-default'>" +
                                "  <div class='item-body panel-body'>" +
                                "      <div class='title'>" +
                                "          <h2>"+ tempNotice.get("title") +"</h2>" +
                                "      </div>" +
                                "      <div class='date'>"+ tempNotice.get("date") +"</div>" +
                                "      <div class='content'>"+ tempNotice.get("content") +"</div>" +
                                "  </div>" +
                                "</article>");
    }
});
var noticeView = new NoticeView();