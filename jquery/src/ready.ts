import * as $ from 'jquery';

export default (() => {
    $(document).ready(() => {
        console.log('document ready (ready)');
    })
    $(() => {
        console.log('document ready');
    });
    $(window).on('load', () => {
        console.log('window load');
    })
})()