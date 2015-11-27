var noticeItemTemplate = _.template ("\
    <article class='list-item panel panel-default'>\
        <div class='item-body panel-body'>\
            <div class='title'><h2><%= title %></h2></div>\
            <div class='date'><%= date %></div>\
            <div class='content'><%= content %></div>\
        </div>\
    </article>\
    ")

var noticeEditorLink = _.template("\
<a href='#notice/editor/<%= noticeId %>' class='notice-update-editor'>")