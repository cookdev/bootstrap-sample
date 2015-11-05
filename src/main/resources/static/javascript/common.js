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

/* 반응형WEB 구현을 위해
 * Window Resize에 따른 주요 컴포넌트 CSS조정 */
window.onresize = function WriteScreen(){
    var width = $(document).width();
    var height = $(document).height();

    // 공통네비게이션 검색창
    if($('.navbar-form input')){
        if (width < 883){
            $('.navbar-form input').addClass('hide-with-animation');
        }else{
            $('.navbar-form input').removeClass('hide-with-animation');
        }
    }

    // 팝업
    if($('.modal-body')){
        if(width < 1140){
            $('.modal-body').css('height', window.innerHeight - 125 + 'px');
        }else{
            $('.modal-body').css('height', window.innerHeight - 165 + 'px');
        }
    }
}