input

<ul>
    <li>
        <input type="radio" name="a" id="1" />
        <label for="1">focus-within 文本1</label>
    </li>
    <li>
        <input type="radio" name="a" id="2" />
        <label for="2">focus-within 文本2</label>
    </li>
    <li>
        <input type="radio" name="a" id="3" />
        <label for="3">focus-within 文本3</label>
    </li>
</ul>

<style>
    ul {
        list-style: none;
    }

    ul > li {
        margin-bottom: 20px;
        border: 1px solid transparent;
    }

    ul > li:last-of-type {
        margin-bottom: 0;
    }

    ul > li > label {
        padding: 0 20px;
    }

    input {
        accent-color: blue;
    }

    ul > li:focus-within {
        border: 1px dashed blue;
    }
</style>
