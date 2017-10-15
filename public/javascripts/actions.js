// helpers:
// Read a form values and return a JS object:
var formObject = function ($o) {
    var o = {};
    var real_value = function ($field) {
        var val = $field.val() || "";
        if (val === 'true') {
            val = true;
        }
        if (val === 'false') {
            val = false;
        }
        return val;
    };
    if (typeof o !== 'object') {
        $o = $(o);
    }
    $(":input[name]", $o).each(function (i, field) {
        var $field = $(field);
        var name = $field.attr('name');
        var value = real_value($field);
        if (o[name]) {
            if (!$.isArray(o[name])) {
                o[name] = [o[name]];
            }
            o[name].push(value);
        }
        else {
            if (name.includes('.')) {
                var names = name.split('.');
                if (!o[names[0]]) o[names[0]] = {};
                o[names[0]][names[1]] = value;
            } else {
                o[name] = value;
            }
        }
    });
    return o;
}


// Submit form in /request/new
$(document).ready(function () {
    $('#new-request form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var button = $(this).find('button');
        var alert =  $(this).find('.alert');
        var language = form.find('#id_language').val();
        button.attr('disabled', true);
        alert.removeClass('hidden alert-success alert-danger').addClass('alert-info').html(language == 'spanish' ? 'Enviando...' : 'Sending...');
        $.ajax({
            type: 'POST',
            url: '/api/request',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({ data: formObject($(this)) }),
        }).then(function (response) {
            if(language == 'spanish') {
                alert.removeClass('hidden alert-danger alert-info').addClass('alert-success').html('<strong>Se ha guardado su solicitud, pronto le responderemos.</strong>');
                alert.after('<h2><small>Su codigo de confirmación es: </small><br>' + response.doc.shortId + '</h2>');
            } else {
                alert.removeClass('hidden alert-danger alert-info').addClass('alert-success').html('<strong>Your request was recorded, we will respond soon.</strong>');
                alert.after('<h2><small>Your confirmation code is: </small><br>' + response.doc.shortId + '</h2>');
            }
            form.find('.form-group, .btn').addClass('hidden');
            window.location.replace('/request/' + response.doc.shortId);
            //TODO: redirect to details page when available
        }, function (response) {
            button.attr('disabled', false);
            alert.removeClass('hidden alert-info alert-success').addClass('alert-danger');
            $('.has-error .text-danger').remove();
            $('.has-error').removeClass('has-error');
            if (response.status === 400) {
                alert.html(language == 'spanish' ? 'Por favor complete la informacíon que falta' : 'Please complete the missing data');
                // validation failed for the Request
                // display the errors in the form
                if (response.responseJSON && response.responseJSON.errors) {
                    var errors = response.responseJSON.errors;
                    console.log(errors);
                    for (var error in errors) {
                        // TODO: abstract this somewhere else
                        if (errors.hasOwnProperty(error)) {
                            $('[name="'+error+'"]').parent('.form-group').addClass('has-error');
                            $('[name="'+error+'"]').after('<p class="text-danger">' + errors[error].message + '</p>');
                        }
                    }
                }
            } else {
                alert.html(language == 'spanish' ? 'Hubo un error al solicitar, por favor intente mas tarde.' : 'There was an error saving, please try again later.');
            }
        });
    });
});
