/* ***** Reset Functions ***** */

// Reset Modal
export function resetModal(){
    $('.modal-header').removeClass().addClass('modal-header');
    $('.modal-title').text('');
    $('#data-body').html('').removeClass();
    $('.modal-footer button').removeClass().addClass('btn btn-outline-secondary btn-default');   
}
