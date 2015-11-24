/**
 * Created by Hahn on 2015-11-04.
 */
var GetHtml = function(url){
    var getFile = $.ajax({
        url: url,
        async: false,
        success: function (data) {
            return data;
        }
    });

    return getFile.responseText;
}
// Backbone CORS Settings


// Dropdown 활성화시 Collapse 안 닫히는 현상 컨트롤
$(document).ready(function(){
    $('.dropdown').on('show.bs.dropdown', function () {
        $('#navbar-collapse').collapse('hide')
    });
    $('input[type="checkbox"]').on('change', function(e){
        if($(e.target).is(':checked')){
            $(e.target).val('on');
        }else{
            $(e.target).val('off');
        }
    });
    (function() {

        var proxiedSync = Backbone.sync;

        Backbone.sync = function(method, model, options) {
            options || (options = {});

            if (!options.crossDomain) {
                options.crossDomain = true;
            }

            if (!options.xhrFields) {
                options.xhrFields = {withCredentials:true};
            }

            return proxiedSync(method, model, options);
        };
    })();
});

/* 반응형WEB 구현을 위해
 * Window Resize에 따른 주요 컴포넌트 CSS조정 */
window.onresize = function WriteScreen(){
    var width = $(document).width();
    var height = $(document).height();

    // 공통헤더 Collapse 접기(.in 제거)
    $('#navbar-collapse').collapse('hide');

    // 공통네비게이션 검색창
    //if($('.navbar-form input')){
    //    if (width < 883){
    //        $('.navbar-form input').addClass('hide-with-animation');
    //    }else{
    //        $('.navbar-form input').removeClass('hide-with-animation');
    //    }
    //}

    // 팝업
    if($('.modal-body')){
        if(width < 1140){
            $('.modal-body').css('height', window.innerHeight - 125 + 'px');
        }else{
            $('.modal-body').css('height', window.innerHeight - 165 + 'px');
        }
    }
}
