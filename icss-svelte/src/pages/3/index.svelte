<h1>3. 层叠顺序与堆栈上下文</h1>

先 inline-block 后 float
<div class="container">
    <div class="inline-block"><br />#divA display: inline-block</div>
    <div class="float">#divB float: left ... end</div>
</div>

先 float 后 inline-block
<div class="container">
    <div class="float">#divB float: left ... end</div>
    <div class="inline-block"><br />#divA display: inline-block</div>
</div>

<hr />
加了 opacity (形成堆叠上下文)
<br />

先 inline-block 后 float
<div class="container opacity">
    <div class="inline-block"><br />#divA display: inline-block</div>
    <div class="float">#divB float: left ... end</div>
</div>

先 float 后 inline-block
<div class="container opacity">
    <div class="float">#divB float: left ... end</div>
    <div class="inline-block"><br />#divA display: inline-block</div>
</div>

<style>
    .container {
        position: relative;
        background: #ddd;
    }

    .container.opacity > div {
        opacity: .9;
    }

    .container > div {
        width: 200px;
        height: 200px;
    }

    .float {
        float: left;
        background: deeppink;
    }

    .inline-block {
        display: inline-block;
        background: yellowgreen;
        margin-left: -100px;
    }
</style>