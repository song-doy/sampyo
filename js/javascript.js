$(function(){
    //header 함수 선언
    const $gnb = $('header>nav>.gnb>li');
    const $sub = $gnb.children('ol');

    //배너 슬라이드 함수 선언
    const $banr = $('section>.slides>.slides-container');
    const $banr_pagination = $('section>.slides>.slides-pagination>li>a');
    const $banr_left = $('section>.slides>.slides-nav.left');
    const $banr_right = $('section>.slides>.slides-nav.right');

    //story 슬라이드 함수 선언
    const $storyTit = $("section>article.story>.cont>ul>li>h2+a");
    const $storyslides = $('section>article.story>.cont>ul>li');
    const $storybtnPlay = $("section>article.story>.cont>a.btn_play");
    const $storybtnStop = $("section>article.story>.cont>a.btn_stop");
    
    let banrnowIdx = 0;
    let storynowIdx = 0;
    let banrintervalKey = null;
    let storyintervalKey = null;


    //공통함수
    const slide_action = function(){
        $banr.stop().animate({
            left : -940 * banrnowIdx
        });
        $banr_pagination.eq(banrnowIdx).parent().addClass('on').siblings().removeClass('on');
    }; 
    const story_action = function(){
        $storyslides.eq(storynowIdx).stop().fadeOut();
        if(storynowIdx==0){
            storynowIdx=1;
        }else{
            storynowIdx=0;
        }
        $storyslides.eq(storynowIdx).stop().fadeIn();
    };

    //header - gnb 
    $gnb.on('mouseenter', function(){
        banrnowIdx = $gnb.index(this);
        $sub.eq(banrnowIdx).show();
    });
    $gnb.on('mouseleave',function(){
        $sub.hide();
    });

    //section - banr
    $('section>.slides').on('mouseover',function(){
        $banr_left.stop().animate({
            left:0
        });
        $banr_right.stop().animate({
            right:0
        });
    });
    $('section>.slides').on('mouseout',function(){
        $banr_left.stop().animate({
            left: '-42px'
        });
        $banr_right.stop().animate({
            right: '-42px'
        });
    });
    $banr_pagination.on('click', function(evt){
        evt.preventDefault();
        banrnowIdx = $banr_pagination.index(this);
        slide_action();
    });
    $banr_left.on('click',function(evt){
        evt.preventDefault();
        if(banrnowIdx>0){
            banrnowIdx--;
        }else{
            banrnowIdx=2;
        }
        slide_action();
    });
    $banr_right.on('click',function(evt){
        evt.preventDefault();
        if(banrnowIdx<2){
            banrnowIdx++;
        }else{
            banrnowIdx=0;
        }
        slide_action();
    });
    
    $('section>.slides>.slides-auto').on('click',function(evt){
        evt.preventDefault();
        if($(this).hasClass('pause')){ 
            clearInterval(banrintervalKey);
            $(this).removeClass('pause');
        }else{
            banrintervalKey = setInterval(function(){
                if(banrnowIdx<2){
                    banrnowIdx++;
                }else{
                    banrnowIdx=0;
                }
                slide_action();
            },4000);
            $(this).addClass('pause');
        }
    });
    
    //section - story
    $storyTit.on('click', function(evt){
        evt.preventDefault();
        $(this).parent().stop().fadeOut();
        $(this).parent().siblings().stop().fadeIn();
    });
    $storybtnPlay.on('click',function(evt){
        evt.preventDefault();
        clearInterval(storyintervalKey);
        storyintervalKey = setInterval(function(){
            story_action();
        },4000);
        $(this).addClass('on').siblings().removeClass('on');
    });
    $storybtnStop.on('click',function(evt){
        evt.preventDefault();
        clearInterval(storyintervalKey);
        $(this).addClass('on').siblings().removeClass('on');
    });

    //window 로드 이벤트
    $(window).on('load',function(){
        // clearInterval(intervalKey);
        banrintervalKey = setInterval(function(){
            if(banrnowIdx<2){
                banrnowIdx++;
            }else{
                banrnowIdx=0;
            }
            slide_action();
        },4000);
        storyintervalKey = setInterval(function(){
            story_action();
        },4000);
        $storybtnPlay.addClass('on');  
    });

    const $list = $('.list');
    const $groupList = $('.group.list>ul>li>a');
    const $subsidiary = $('.select_subsidiary');
    const $companySelect = $('.company_select>input');

    //그룹, 계열사 
    $('input, button').on('click',function(){
        $(this).parent().next().toggle();
    });
    $('.group').on('mouseleave',function(){
        $list.hide();
    });

    $list.find('a').on('click',function(evt){
        evt.preventDefault();
        const sitename = $(this).text();
        $(this).parents('.list').prev().children('input').val(sitename);
        $list.hide();
    });
    
    $groupList.on('click',function(evt){
        evt.preventDefault();
        $companySelect.val('선택하세요');
        nowIdx = $groupList.index(this);
        // console.log('nowIdx = ', nowIdx);
        $subsidiary.eq(nowIdx).show().siblings().hide();
    });

    //footer
    const $family = $('footer>.footer_container>.footer_container_content>ul>.family>a');
    const $top = $('footer>.footer_container>.footer_container_content>ul>.top>a');
    const $allMnu = $('footer>.allmnu');
    const $mnuList = $('.mnulist');

    $family.on('click',function(evt){
        evt.preventDefault();
        $('footer>.footer_container>.footer_container_content>ul>.family>ol').toggle();
    });

    $mnuList.on('click',function(evt){
        evt.preventDefault();
        $('.mnulist.close').toggle();
        $allMnu.toggle();
        $('html,body').stop().animate({
            scrollTop : $(document).height()
        },1000);
    });

    $top.on('click',function(evt){
        evt.preventDefault();
        $('html,body').stop().animate({
            scrollTop : 0
        });
    });
});