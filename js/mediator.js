$(function () {
    $('[data-toggle="popover-upload"]').popover({
        html: true, 
        content: function() {
            return $('#popover-content-upload').html();
        }
    });

        $('body').on('click', 
        function (e) {
            //did not click a popover toggle, or icon in popover toggle, or popover
            if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('[data-toggle="popover"]').length === 0
            && $(e.target).parents('.popover.in').length === 0) { 
                $('[data-toggle="popover"]').popover('hide');
            }
    });
});