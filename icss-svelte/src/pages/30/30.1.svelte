三角形
<div class="traingle" />
切角
<br />
《CSS Secret》里的方法，采用多重线性渐变实现切角。
<div class="notching" />
梯形
<br />
利用伪元素加旋转透视实现梯形
<div class="trapezoid"></div>
还有一种是利用 border 实现，借助构造三角形的方法构造两个透明的三角形
<div class="trapezoid-border"></div>
五边形
<br />
梯形加三角形很容易组合成一个五边形
<div class="pentagon"></div>
六边形
<br />
两个反方向且底边同样大小的梯形叠加在一起就能得到一个六边形
<div class="hexagonal"></div>
八边形
<div class="octagon"></div>
五角星
<br />
使用 3 个三角形叠加旋转实现
<div class="star"></div>
六角星
<br />
一个向上的三角形叠加上一个向下的三角形就可以得到一个六边形
<div class="sixstar"></div>
八角星
<br />
直接使用两个矩形进行旋转拼接就可以了
<div class="eightstar"></div>
十二角星
<div class="twelvestar"></div>
椭圆
<div class="ellipse"></div>

<style>
    .traingle {
        width: 0;
        height: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid yellowgreen;
    }

    .notching {
        width: 40px;
        height: 40px;
        padding: 40px;
        background: linear-gradient(135deg, transparent 15px, yellowgreen 0) top left,
            linear-gradient(-135deg, transparent 15px, yellowgreen 0) top right,
            linear-gradient(-45deg, transparent 15px, yellowgreen 0) bottom right,
            linear-gradient(45deg, transparent 15px, yellowgreen 0) bottom left;
        background-size: 50% 50%;
        background-repeat: no-repeat;
    }

    .trapezoid {
        position: relative;
        width: 60px;
        padding: 60px;
    }
    .trapezoid::before {
        content: "";
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
        transform: perspective(20px) scaleY(1.3) rotateX(5deg);
        transform-origin: bottom;
        background-color: yellowgreen;
    }

    .trapezoid-border {
        position: relative;
        width: 60px;
        border-bottom: 60px solid yellowgreen;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
    }

    .pentagon {
        margin: 50px;
        position: relative;
        width: 60px;
        border-bottom: 60px solid yellowgreen;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
    }
    .pentagon::before {
        content: "";
        position: absolute;
        top: 60px;
        left: -40px;
        border-top: 60px solid yellowgreen;
        border-left: 70px solid transparent;
        border-right: 70px solid transparent;
    }

    .hexagonal {
        margin: 50px;
        position: relative;
        width: 60px;
        border-bottom: 60px solid yellowgreen;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
    }
    .hexagonal::before {
        content: "";
        position: absolute;
        width: 60px;
        height: 60px;
        top: 60px;
        left: -40px;
        border-top: 60px solid yellowgreen;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
    }

    .octagon {
        position: relative;
        width: 40px;
        height: 100px;
        background: yellowgreen;
        margin-left: 50px;
    }
    .octagon::before {
        content: "";
        height: 60px;
        position: absolute;
        top: 0;
        left: 40px;
        border-left: 30px solid yellowgreen;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
    }
    .octagon::after {
        content: "";
        height: 60px;
        position: absolute;
        top: 0;
        left: -30px;
        border-right: 30px solid yellowgreen;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
    }

    .star {
        margin: 50px 0;
        position: relative;
        width: 0;
        border-right: 100px solid transparent;
        border-bottom: 70px solid yellowgreen;
        border-left: 100px solid transparent;
        transform: rotate(35deg) scale(.6);
    }
    .star::before {
        content: '';
        position: absolute;
        border-bottom: 80px solid yellowgreen;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        top: -45px;
        left: -65px;
        transform: rotate(-35deg);
    }
    .star::after {
        content: '';
        position: absolute;
        top: 3px;
        left: -105px;
        border-right: 100px solid transparent;
        border-bottom: 70px solid yellowgreen;
        border-left: 100px solid transparent;
        transform: rotate(-70deg);
    }

    .sixstar {
        position: relative;
        width: 0;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-bottom: 100px solid yellowgreen;
        margin: 20px;
    }
    .sixstar::after {
        content: "";
        position: absolute;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        border-top: 100px solid yellowgreen;
        top: 30px;
        left: -50px;
    }

    .eightstar {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        transform: rotate(30deg);
        margin: 20px;
    }
    .eightstar::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        transform: rotate(45deg);
    }

    .twelvestar {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 20px;
        background: yellowgreen;
        transform: rotate(30deg);
    }
    .twelvestar::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        transform: rotate(30deg);
        background-color: yellowgreen;
    }

    .twelvestar::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        transform: rotate(60deg);
        background-color: yellowgreen;
    }

    .ellipse {
        width: 120px;
        height: 160px;
        background-color: yellowgreen;
        border-radius: 50% 50% 50% 50%/60% 60% 40% 40%;
    }
</style>
