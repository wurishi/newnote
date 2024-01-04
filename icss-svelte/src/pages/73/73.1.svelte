<div class="container">
    <div class="dotted">dotted</div>
    <div class="dashed">dashed</div>
    <div class="solid">solid</div>
    <div class="double">double</div>
    <div class="groove">groove</div>
    <div class="ridge">ridge</div>
    <div class="inset">inset</div>
    <div class="outset">outset</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
    }

    .container div {
        width: 100px;
        height: 100px;
        margin: 10px;
        text-align: center;
        line-height: 100px;
        border: 5px solid grey;
    }

    .container .dotted {
        border-style: dotted;
    }

    .container .dashed {
        border-style: dashed;
    }

    .container .solid {
        border-style: solid;
    }

    .container .double {
        border-style: double;
    }

    .container .groove {
        border-style: groove;
    }

    .container .ridge {
        border-style: ridge;
    }

    .container .inset {
        border-style: inset;
    }

    .container .outset {
        border-style: outset;
    }
</style>
