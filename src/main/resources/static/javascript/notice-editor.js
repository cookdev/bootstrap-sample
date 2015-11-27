var NoticeEditorView = Backbone.View.extend({
    el: $('#mainContents'),
    html: 'notice-editor.html',
    noticeId: null,
    initialize: function(noticeId) {
        _.bindAll(this, 'render', 'create', 'remove', 'cancel');

        if (noticeId){
            this.noticeId = noticeId;
            this.read(this.noticeId);
        } else {
            $('#noticeRemoveBtn').css("display", "none");
        }
    },
    events: {
        'click #noticeAddBtn': 'create',
        'click #noticeRemoveBtn': 'remove',
        'click #noticeCancelBtn': 'cancel'
    },
    render: function(){
        $('#txtEditor').Editor();
    },
    read: function (noticeId) {
        $('#noticeRemoveBtn').css("display", "inline");
        var notice = new Notice({ noticeId: noticeId });
        notice.fetch({
            success: function(response){
                $('#noticeEditorTitle').val(response.get("title"));
                $('#txtEditor').Editor("setText", response.get("content"));
            }
        });
    },
    create: function(){
        var notice = new Notice({
            title: $('#noticeEditorTitle').val(),
            content: $('#txtEditor').Editor("getText"),
            date: new Date("yyyy/MM/dd hh:mm:ss")
        });
        if (this.noticeId) {
            notice.noticeId = this.noticeId;
        }
        notice.save({},
            {
                success: function (response) {
                },
                error: function () {
                },
                complete: function () {
                    this.noticeId = null;
                    window.location.hash = 'notice';
                }
            }
        );
    },
    remove: function(){
        var notice = new Notice({ id: this.noticeId });
        if (confirm("삭제하시겠습니까?")) {
            notice.destroy({},
                {
                    success: function (response) {
                    },
                    error: function () {
                    },
                    complete: function(){
                        window.location.hash = 'notice';
                        this.noticeId = null;
                    }
                }
            );
        }
    },
    cancel: function(){
        this.noticeId = null;
        window.location.hash = 'notice';
    }
})