window.addEventListener('load', function () {

    /**
     * 轮播图
     */

    //1、显示隐藏左右按钮(timer后加的)
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var lunbo = document.querySelector('.lunbo');
    lunbo.addEventListener('mouseenter', function () {
        left.style.display = 'block'
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    lunbo.addEventListener('mouseleave', function () {
        left.style.display = 'none'
        right.style.display = 'none';
        timer = setInterval(function () {
            right.click();
        }, 2000)
    })


    //2、根据轮播图片数动态生成小方格
    var ul = lunbo.querySelector('ul');
    var ul2 = document.querySelector('.lunbo-nav');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.className = 'dot';
        //记录当前小方格索引号，生成自定义属性，给点击小方格移动图片做准备
        li.setAttribute('index', i);
        ul2.appendChild(li);
    }
    ul2.children[0].className = 'dot current';


    //3、点击小方格显示特定颜色、实现点击小方格移动图片
    var dot = ul2.querySelectorAll('.dot');
    // console.log(dot);
    // console.log(ul2.children.length);
    //获取图片的宽度
    var li1 = lunbo.querySelector('.li1');
    var li2Width = li1.offsetWidth;
    for (var i = 0; i < dot.length; i++) {
        dot[i].addEventListener('click', function () {
            for (var i = 0; i < ul2.children.length; i++) {
                dot[i].className = 'dot';
            }
            this.className = 'dot current';
            //当点击了某个小方格，打印index值
            var index = this.getAttribute('index');
            num1 = index;  //解决点击某个小方格再点击右按钮无法跳转下一个的问题
            circle = index; // 解决上一个代码遗留的问题。
            animate(ul, -index * li2Width)
        })
    }

    //4、点击右按钮 移动图片
    var right = lunbo.querySelector('.right');
    var num1 = 0;
    //克隆第一个li，放到ul孩子的最后位置.目的是实现图片无缝循环。 也可把num1改为-1， ul.style.left 改为 -li2Width，则无需克隆操作
    var first = ul.children[0].cloneNode(true); //true深克隆 false 浅克隆
    ul.appendChild(first);
    //circle
    var circle = 0;
    //节流阀
    var flag = true;
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果走到最后一张，此时ul快速复原 left改为0
            if (num1 == ul.children.length - 1) {
                ul.style.left = 0;
                num1 = 0;
            }
            num1++;
            animate(ul, -num1 * li2Width, function () {
                flag = true;
            });
            //小方格跟着变化
            circle++;
            if (circle == ul2.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ul2.children.length; i++) {
                ul2.children[i].className = 'dot';
            }
            ul2.children[circle].className = 'dot current';
        }
    })

    //5、点击左按钮移动图片
    var left = lunbo.querySelector('.left');
    left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num1 == 0) {
                ul.style.left = -(ul.children.length - 1) * li2Width + 'px';
                num1 = ul.children.length - 1;
            }
            num1--;
            animate(ul, -num1 * li2Width, function () {
                flag = true;
            });
            //小方格跟着变化
            circle--;
            if (circle < 0) {
                circle = ul2.children.length - 1;
            }
            for (var i = 0; i < ul2.children.length; i++) {
                ul2.children[i].className = 'dot';
            }
            ul2.children[circle].className = 'dot current';
        }
    })
    //定时播放轮播图
    var timer = setInterval(function () {
        right.click();
    }, 2000)


    /**
     * 实现顶部导航条点击后滑块固定在当前点击的条目上
     */
    let nav3_a = document.querySelectorAll('.nav3 ul li a')
    for (let i = 0; i < nav3_a.length; i++) {
        nav3_a[i].addEventListener('click', (e) => {
            for (let i = 0; i < nav3_a.length; i++) {
                nav3_a[i].style.borderBottom = ''
            }
            if (e.target.tagName == 'A') {
                e.target.style.borderBottom = '2px solid #cccdf0'
            }
        })
    }


    /**
     * 实现底部导航条点击后下划线固定在当前点击的条目上
     */
    let footerNav = document.querySelectorAll('.nav2')
    let footerA = document.querySelectorAll('.nav2 ul li a')
    for (let i = 0; i < footerNav.length; i++) {
        footerNav[i].addEventListener('click', (e) => {
            for (let i = 0; i < footerA.length; i++) {
                footerA[i].style.textDecoration = 'none'
            }
            if (e.target.tagName === 'A') {
                e.target.style.textDecoration = 'underline'
            }
        })
    }
})


















