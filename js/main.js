// JavaScript Document
$(function() {
    var wjs = {
        lefttime: function() {
            // var endtime = new Date('2015 / 05 /27, 00: 00: 00');
            var endtime = new Date('2016 / 11 /17, 09: 00: 00');
            var nowtime = new Date();
            var leftsecond = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
            var _d = parseInt(leftsecond / 3600 / 24);
            var _h = parseInt((leftsecond / 3600) % 24);
            var _m = parseInt((leftsecond / 60) % 60);
            var _s = parseInt(leftsecond % 60);
            var timer;
            jQuery(".Date").show();


            if (leftsecond > 0) {
                jQuery('#lefttime').html('<span>' + _d + '</span><b>天</b><span>' + _h + '</span><b>时</b><span>' + '' + _m + '' + '</span><b>分</b><span>' + '' + _s + '' + '</span><b>秒</b>');
            } else {
                //wjs.$('lefttime').innerHTML = '<span class="timeout"></span>';
                clearTimeout(timer);
            }

            timer = setTimeout(wjs.lefttime, 1000);
        }
    };

    //倒计时
    wjs.lefttime();

    ;
    (function() {
        // 会议背景右边幻灯片播放
        var index = 1;
        var len = $(".pic_list li").length;
        $(".pic_list li:not(:first-child)").hide();

        function show() {
            $(".pic_list li").eq(index).stop(false, true).fadeIn(1000).siblings("li").stop(false, true).fadeOut(1000);
            $(".dot span").eq(index).addClass("on").siblings("span").removeClass("on");
            index++;
            if (index > len - 1) {
                index = 0;
            }
        }
        var timer = setInterval(show, 3000);
        $(".pic_list").hover(function() {
            clearInterval(timer);

        }, function() {
            timer = setInterval(show, 3000);
        });

        $(".dot span").mouseover(function() {
            index = $(this).index();
            show();
        });

    })();

    //导航固定
    function navfix() {
        var ntop = $("#nav").offset().top;
        $(window).scroll(function() {

            if ($(this).scrollTop() >= ntop) {
                $("#nav").addClass("fix");
            } else {
                $("#nav").removeClass("fix");

            }
        }).trigger("scroll")

    }
    navfix();
    //锚点跳转
    function gotoPos(element) {
        $('a[href$="' + element + '"]').click(function() {
            var dis = $("#" + element).offset().top;
            $("html,body").animate({ scrollTop: dis - 52 }, 500)
        });

    }

    gotoPos("content");
    gotoPos("jb");
    gotoPos("rc");
    gotoPos("active");
    gotoPos("bm");
    gotoPos("ticketForm");

    //日程
    $(".rc-tab").find("td:last-child,th:last-child").css("border-right", "none");
    $(".rc-tab").find("td:nth-child(2)").css({ "text-align": "left", 'padding-left': "44px" });

    $("#more-rc").click(function() {
        if ($(".section-rc table:first").is(":visible")) {
            $(this).val("收起议程");
        } else {
            $(this).val("更多议程");
        }

        $(".section-rc table").toggle();
    });


    $(".forum-list dl").hover(function() {
        $(this).addClass("active");
    }, function() {
        $(this).removeClass("active");
    });

    $("#nav li").has(".active-list").hover(function() {
        $(this).find(".active-list").show();
    }, function() {
        $(this).find(".active-list").hide();
    });

    $("#share").hover(function() {
        $(this).find(".jiathis_style").show();
    }, function() {
        $(this).find(".jiathis_style").hide();
    })




    //发票类型 切换
    $("input[name=invoiceType]").click(function() {
        var index = $("input[name=invoiceType]").index(this);
        $(".fp-con").hide().eq(index).show();
    });

    //下拉列表整体操作
    function pulldown() {
        $(".pulldown").click(function() {
            $(this).next().show();
            return false;
        });

        $(".pulldown-list li").click(function() {
            var id = $(this).data("id");
            $(this).closest(".pulldown-box").find(".select-txt").html($(this).html());
            $(this).parent().hide();
            if (id) {
                $(this).parent().next(":hidden").val(id);
            } else {
                $(this).parent().next(":hidden").val($(this).html());
            }
        });

        $(document).click(function() {
            $(".pulldown-list").hide();
        });

    }

    pulldown();

});


$(function() {
    $(".section-baom .ticket-list").load("http://www.ofweek.com/seminar/2016/high_tech/ticket_list.html dl");

    //在线报名票价悬停时显示即刻报名
    $(".ticket-list").on('mouseenter', 'dl', function() {
        $(this).addClass("active").find(".ticket-price").addClass("active").html("即刻报名");
    }).on('mouseleave', 'dl', function() {
        $(this).removeClass("active").find(".ticket-price").removeClass("active").html($(this).find(".ticket-price").data("price"));

    });

    //在线报名票价悬停时按钮定位
    $(".ticket-list").on('click', 'a', function() {
        $("html,body").animate({ 'scrollTop': $("#ticketForm").offset().top - 120 })
    });


});



$(function() {

    var ticketTip = [{
            "name": "嘉宾票",
            "right": '可参与闭门论坛及所有开放论坛',
            "service": "享受服务权益：优先座位，大会会刊，精美礼品，茶歇交流机会。"
        }, {
            "name": "全场票",
            "right": '可参与全部活动，与核心嘉宾深入交流，获得全部服务权益',
            "service": "享受服务权益：优先座位，大会会刊，精美礼品，自助午餐、茶歇及晚宴交流机会。"


        }, {
            "name": "媒体票",
            "right": '可参与部分闭门及所有开放论坛，获得部分服务权益。',
            "service": ""

        }, {
            "name": "福利票",
            "right": '可参与部分闭门及所有开放论坛，获得部分服务权益',
            "service": "合作企业凡是预约注册报名参会，经组委会审核通过，便可获得免费参会名额！名额有限，预约从速！"

        }, {
            "name": "会员票",
            "right": '所有开放论坛均可自主注册免费参与',
            "service": "每个开放论坛仅限100名，先到先得。"

        }



    ]


    //最新购票
    $("#ticketForm").on("mouseover", '.ico-explain', function() {
            var i = $(".ico-explain").index(this),
                html = '<div class="explain">\
 <h4>' + ticketTip[i].right + '</h4>\
 <p>' + ticketTip[i].service + '</p>\
 <i class="up"></i>\
</div>';
            $(html).insertAfter($(this)).css('left', $(this).parent().width() - 32);

        })
        .on('mouseout', '.ico-explain', function() {
            $(".explain").remove();
        });





    //计算价格
    var price = 0;

    function getPrice() {

        $(".td-tname span.active").each(function() {
            var sp = $(this).closest("tr").find(".price").html(),
                zhe = $(this).closest("tr").find(".zhe").html() / 10,
                num = $(this).closest("tr").find("input[name=ticketNumber]").val();

            price += sp * zhe * num;

        });
        $("#money").html(price);
    }


    function fillNum(obj) {
        var numhtml = '<div class="num-opera">\
                      <span class="cut"></span>\
                      <input type="text" name="ticketNumber" value="1">\
                      <span class="add"></span>\
                  </div>';
        obj.html(numhtml);

    }

    //复选框操作
    $("#ticketForm").on('click', '.tname', function() {
        var $tdnum = $(this).closest("tr").find(".td-num");

        $(this).find(".chk").toggleClass("active");
        if ($(this).find(".chk").hasClass("active")) {
            $(".rdo").removeClass("active");
            $(".fname").closest("tr").find(".num-opera").remove();
            fillNum($tdnum);

        } else {
            $tdnum.html("");
        }
        price = 0;
        getPrice();

        if ($(".chk").hasClass("active")) {
            //按钮变为可点击
            $("#sub-btn").addClass("active").removeAttr("disabled");
        } else {
            $("#sub-btn").removeClass("active").attr("disabled", "disabled");
        }

    })

    //单选框操作
    $("#ticketForm").on('click', '.fname', function() {
        var $tdnum = $(this).closest("tr").find(".td-num");

        $(".rdo").removeClass("active")
        $(this).find(".rdo").addClass("active");
        $(".chk").removeClass("active");
        $(".td-num").html("");
        fillNum($tdnum);
        //按钮变为可点击
        $("#sub-btn").addClass("active").removeAttr("disabled");
        price = 0;
        getPrice();
    })

    //数量操作
    function numOpera(addobj, cutobj, inputobj) {
        var minNum = 1,
            maxNum = 999;
        $("#ticketForm").on('change keyup', inputobj, function() {
            $val = $(this).val();
            if (isNaN($val) || $val.indexOf(".") >= 0) {
                $(this).val(1);
                return false;
            }
            if ($val < minNum) {
                $(this).val(minNum);
            } else if ($val > maxNum) {
                $(this).val(maxNum);
            } else if ($val == 1) {
                $(this).prev().removeClass("active");

            } else {
                $(this).prev().addClass("active");

            }
            price = 0;
            getPrice();
        });

        $("#ticketForm").on('click', addobj, function() {
            $(this).prev().prev().addClass("active");

            var $input = $(this).prev(),
                cur = $input.val();
            cur++;
            if (cur > maxNum) {
                return;
            }
            $input.val(cur);
            price = 0;
            getPrice();

        });


        $("#ticketForm").on('click', cutobj, function() {
            var $input = $(this).next(),
                cur = $input.val();
            if (cur == 1) {
                $(this).removeClass("active");
                return;
            }
            cur--;
            $input.val(cur);
            if (cur == 1) {
                $(this).removeClass("active");
            }
            price = 0;
            getPrice();
        });

    }

    numOpera(".add", ".cut", "input[name=ticketNumber]");

    //ajax读取票种信息

 //ajax读取票种信息

    $.getJSON('http://www.ofweek.com/queryTicketAjax.do?meetingType=1', function(data) {
        $("#ticketForm .tab-hd").after($("#temp").render(data));
    });

    //表单提交时把门票信息传到支付确认页
    $("#ticketForm").submit(function() {
        var url = "";
        if ($(".chk").hasClass("active")) {
            url = "http://www.ofweek.com/seminar/2016/payment/jb_payment.html?";
            $(".chk.active").each(function(i) {
                var ticketTypeName = $(this).parent().text(),
                    remark = $(this).parent().next().text(),
                    discount = $(this).closest("tr").find(".zhe").text() + "折优惠",
                    ticketNumber = $(this).closest("tr").find("input[name=ticketNumber]").val(),
                    price = "¥ "+$(this).closest("tr").find(".price").text() + ".00",
                    ticketTypeId=$(this).attr("ticketTypeId"),
                    totalPrice=$("#money").html();
                    if(ticketTypeId==105){ //全场票则去掉备注
                     remark="";
  
                    }
                    surl = ticketTypeName + "," + remark + "," + discount + "," + ticketNumber + "," + price+","+ticketTypeId+","+totalPrice;


                //把票信息组装成 "ticket1=a,b,c&ticket2=a,b,c"形式(把每种票的值用逗号连接放在一个name上)
                 url += "ticket"+(i+1)+'='+ surl + "&";
            });

        } else {
            url="http://www.ofweek.com/seminar/2016/payment/media_payment.html?ticket=";
            var $ardo = $(".rdo.active"),
                ticketTypeName = $ardo.parent().text(),
                ticketNumber = $ardo.closest("tr").find("input[name=ticketNumber]").val(),
                price = "免费",
                 ticketTypeId=$ardo.attr("ticketTypeId");
                url+=ticketTypeName + "," + ticketNumber + "," + price+","+ticketTypeId;

        }
        $(this).attr("action", encodeURI(encodeURI(url)));

    });

});


$(function(){
    //banner切换
  (function() {
        // 会议背景右边幻灯片播放
        var index = 1;
        var len = $(".banner li").length;
        $(".banner li:not(:first-child)").hide();

        function show() {
            $(".banner li").eq(index).fadeIn(1500).siblings("li").fadeOut(1500);
            index++;
            if (index > len - 1) {
                index = 0;
            }
        }
        clearInterval(timer);
        var timer = setInterval(show, 8000);

    })();
});