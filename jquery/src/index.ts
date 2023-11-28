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

function ManipulatingElements() {
    const el = $('#ManipulatingElements').attr('data-b', 'b');
    console.log(el.attr('data-a'));
    console.log(el.attr('data-b'));
    console.log(el.attr('data-c'));
    console.log(el.attr('id'));
    console.log(el.width());
    console.log(el.height(100));
    console.log(el.position());
    console.log(el.val());
    console.log($('#ManipulatingElements :input').eq(1).val());

    const el2 = $('#ManipulatingElements2');
    const container = el2.find('#container');
    const flag = container.find('div');
    el2.find('#item1').html('item1').after(container);
    container.insertAfter(el2.find('#item2').html('item2'));
    const item3 = el2.find('#item3').attr('data', 'item3').html('item3')
    item3.on('click', () => console.log('click3'));
    item3.remove().insertBefore(flag);
    const item4 = el2.find('#item4').attr('data', 'item4').html('item4')
    item4.on('click', () => console.log('click4'));
    item4.detach().insertBefore(flag);

    console.log($('#ManipulatingElements2 span').html());
}

export default (() => {
    Attributes();
    SelectingElements();
    SelectingForm();
    ManipulatingElements();
})()