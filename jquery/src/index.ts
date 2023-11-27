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
    console.log('input:visible', $('#SelectingElements2 input:visible'));
    console.log('input:hidden', $('#SelectingElements2 input:hidden'));
    console.log('input:gt(2)', $('#SelectingElements2 input:gt(2)'));
}

function SelectingForm() {
    $('#SelectingForm1').find('div').eq(2).html('set html')
    $('#SelectingForm2')
        .find('div')
        .eq(2)
            .html('set html')
            .end()
        .eq(0)
            .html('first F')
}

export default (() => {
    Attributes();
    SelectingElements();
    SelectingForm();
})()