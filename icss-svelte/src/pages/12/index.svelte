<div class="demo">
    <ul>
        <li>
            <div>1</div>
        </li>
        <li>
            <div>&nbsp;</div>
        </li>
        <li>
            <div />
        </li>
    </ul>
</div>

<a>a link</a>
<table class="table">
    <tr>
        <th><a>title1</a></th>
        <th><a>title2</a></th>
        <th>title3</th>
        <th>title4</th>
    </tr>
    <tr>
        <td><a>A</a></td>
        <td><a>B</a></td>
        <td><span>C</span></td>
        <td>D</td>
    </tr>
</table>

<style>
    .demo div {
        height: 20px;
        background: blue;
        border: 1px solid red;
    }

    .demo div:empty {
        display: none;
    }

    table a {
        color: yellowgreen;
    }

</style>
