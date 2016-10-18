$(document).ready(function() {
    $(window).on("load", function() {                                   //监听load事件
        imgLocation();
        var dataImg = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }] }; //模仿网络加载事件//
        window.onscroll = function() {                                  //给滚轮加上监听事件
            if (scrollside()) {                                         //满足条件加载
                $.each(dataImg.data, function(index, val) {             //遍历dataimg集合 ，获取到data，需要位置index和数值val
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", "./img/" + $(val).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });
});


function scrollside() {
    var box = $(".box");                                             //创建盒子对象  
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2); //获取底部最后一张图片到顶端的高度
    var documentHeight = $(document).width();                   //当前容器高度
    var scrollHeight = $(window).scrollTop();                    //鼠标滚动高度
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;       //最后一张图片到顶端的高度如果小于当前容器高度加鼠标滚动高度，允许滚动返回ture否则返回false；
}

function imgLocation() {
    var box = $(".box");                                    //创建盒子对象
    var boxWidth = box.eq(0).width();                       //获得盒子宽度   eq获取第一张图片宽度
    var num = Math.floor($(window).width() / boxWidth);     //一排能摆放的图片数量  
    var boxArr = [];                                        //数组承载储存列中所有的盒子高度
    box.each(function(index, val) {                         //each循环遍历  index获取位置  val获取元素对象
        var boxHeight = box.eq(index).height();             //获取所有盒子的高度，
        if (index < num) {                                  //作判断
            boxArr[index] = boxHeight;                      //获取所有盒子的高度储存在数组中
        } else {
            var minboxHeight = Math.min.apply(null, boxArr);//获取盒子中最小一个高度
            var minboxIndex = $.inArray(minboxHeight, boxArr);//设置图片最小位置，从0开始索引
            $(val).css({                                    //通过得到jq对象，进行css操作
                "position": "absolute",
                "top": minboxHeight,                        //顶端距离为最小图片高度
                "left": box.eq(minboxIndex).position().left, //居左距离为最小图片的位置
            });
            boxArr[minboxIndex] += box.eq(index).height(); //当前图片高度重新记录   x+=y 等价于 x=x+y
        }
    });
};
