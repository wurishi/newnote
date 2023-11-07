<div class="container">
    <fieldset>
        <legend>CSS fieldset</legend>
    </fieldset>
    <fieldset>
        <legend>HTML element</legend>
    </fieldset>
    <fieldset>
        <legend>JavaScript</legend>
    </fieldset>
    <fieldset>
        <legend>TypeScript</legend>
    </fieldset>
</div>

<style>
    .container {
        position: relative;
        width: 300px;
        height: 300px;
    }
    fieldset {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        border: 10px solid transparent;
        border-top-color: #000;
        box-sizing: border-box;
    }
    legend {
        padding: 0 10px;
    }

    fieldset:nth-of-type(2) {
        transform: rotate(90deg);
    }
    fieldset:nth-of-type(3) {
        transform: rotate(180deg);
    }
    fieldset:nth-of-type(3) > legend {
        transform: rotate(180deg);
    }
    fieldset:nth-of-type(4) {
        transform: rotate(-90deg);
    }
</style>
