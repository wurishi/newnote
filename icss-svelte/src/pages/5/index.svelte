<h1>5. 文本单行居中，多行居左，超过两行用省略号结尾</h1>

<div class="container">
    <h2>
        <p class="single">单行居中，标题居中</p>
    </h2>
    <h2>
        <p>两行标题，两行标题，两行标题居左</p>
    </h2>
    <h2>
        <p>超过两行，最后省略号。超过两行，最后省略号。超过两行，最后省略号。</p>
    </h2>
</div>

<style>
    .container {
        width: 300px;
        background: #f8f9fa;
    }

    h2 {
        text-align: center;
    }

    p.single {
        display: inline-block;
    }

    p {
        display: -webkit-box;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>