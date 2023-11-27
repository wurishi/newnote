import * as $ from 'jquery';

function Attributes() {
    $('#attributes1').attr('href', './name.html');

    $('#attributes2').attr({
        title: 'my title',
        href: './ready.html',
    })
    console.log($('#attributes1').attr('data-words'));
}

function SelectingElements() {
    console.log('input like', $('#SelectingElements :input'));
    console.log('div:visible', $('#SelectingElements2 div:visible'));
}

export default (() => {
    Attributes();
    SelectingElements();
})()