<div class="g-table">
    <table>
        <thead>
            <tr>
                <td>日期</td>
                <td>姓名</td>
                <td>地址</td>
            </tr>
        </thead>
    </table>
    <div class="g-scroll">
        <table>
            <tbody>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
                <tr>
                    <td>2021-01-01</td>
                    <td>XXXXX</td>
                    <td>DDDDD</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style>
    .g-table {
        margin: 50px auto;
        width: 450px;
    }

    table {
        position: relative;
        width: 450px;
        border: 1px solid #ccc;
        text-align: center;
    }
    tbody {
        border-collapse: separate;
        height: 200px;
    }

    td,
    th {
        width: 150px;
        padding: 5px;
        border: 1px solid #ccc;
    }

    .g-scroll {
        top: -1px;
        position: relative;
        height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
        background: linear-gradient(#fff, transparent) top / 100% 100px,
            radial-gradient(at 50% -15px, rgba(0, 0, 0, 0.8), transparent 70%)
                top / 100000% 12px;
        background-repeat: no-repeat;
        background-attachment: local, scroll;
    }
</style>
