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

if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

var submitNewForm = function (dest) {
    var form = $(this);
    var button = $(this).find('button');
    var alert =  $(this).find('.alert');
    var language = form.find('#id_language').val() || 'english';
    button.attr('disabled', true);
    alert.removeClass('hidden alert-success alert-danger').addClass('alert-info').html(language == 'spanish' ? 'Enviando...' : 'Sending...');
    $.ajax({
        type: 'POST',
        url: '/api/' + dest,
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
        window.location.replace('/' + dest + '/' + response.doc.shortId);
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
                for (var error in errors) {
                    // TODO: abstract this somewhere else
                    if (errors.hasOwnProperty(error)) {
                        $('[name="'+error+'"]').parent('.form-group').addClass('has-error');
                        $('[name="'+error+'"]').after('<p class="text-danger">' + errors[error].message + '</p>');
                    }
                }
            }
        } else {
            alert.html(language == 'spanish' ? 'Hubo un error en la solicitud, por favor intente mas tarde.' : 'There was an error saving, please try again later.');
        }
    });
}

// Submit form in /request/new and /delivery/new
$(document).ready(function () {
    $('#new-request form').on('submit', function (e) {
        e.preventDefault();
        submitNewForm.bind(this)('request');
    });

    $('#new-delivery form').on('submit', function (e) {
        e.preventDefault();
        submitNewForm.bind(this)('delivery');
    });
});

var getResource = function (resource, filter) {
    return $.ajax({
        type: 'GET',
        url: '/api/' + resource,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: (filter || ''),
    }).then(function (response) {
        return response;
    });
};

var getRequests = function (filter) {
    return getResource('requests', filter);
};

var getDeliveries = function(filter) {
    return getResource('deliveries', filter);
}

var createRequestsTable = function (docs) {
    if (!Array.isArray(docs)) return '';
    var result = '<table class="table table-striped">';
    result += '<tbody>';
    result += '<thead><tr><th>Name</th><th>City</th><th># of People</th><th>Details</th></tr></thead>'
    for (var i = 0; i < docs.length; i++) {
        result += '<tr>';
        result += '  <td>' + (docs[i].name || '') + '</td>';
        result += '  <td>' + (docs[i].city || '') + '</td>';
        result += '  <td>' + (docs[i].questions.amountOfPeople || '') + '</td>';
        result += '  <td><a href="/request/' + docs[i].shortId + '">' + (docs[i].shortId || '') + '</a></td>';
        result += '</tr>';
    }
    result += '</tbody>';
    result += '</table>';
    return result;
};

var createDeliveriesTable = function (docs) {
    if (!Array.isArray(docs)) return '';
    var result = '<table class="table table-striped">';
    result += '<tbody>';
    result += '<thead><tr><th>District Name</th><th>Agency</th><th>Last Day of Delivery</th><th># of Meals Delivered</th><th>Details</th></tr></thead>'
    for (var i = 0; i < docs.length; i++) {
        result += '<tr>';
        result += '  <td>' + (docs[i].districtName || '') + '</td>';
        result += '  <td>' + (docs[i].agency || '') + '</td>';
        result += '  <td>' + (docs[i].lastDayOfDeliveryParsed || '') + '</td>';
        result += '  <td>' + (docs[i].numberOfMealsDelivered || '') + '</td>';
        result += '  <td><a href="/delivery/' + docs[i].shortId + '">' + (docs[i].shortId || '') + '</a></td>';
        result += '</tr>';
    }
    result += '</tbody>';
    result += '</table>';
    return result;
};

$(document).ready(function () {
    var getFilter = function () {
        var status = $('#changeStatus').val();
        var date = $('#changeDate').val();
        var filter = '' + (status ? 'status=' + status : '');
        filter = filter + (date ? 'createdAt=' + date : '');
        return filter;
    }
    if (window.location.pathname === '/') {
        $('#trackRequest').on('click', function () {
            window.location.replace('/request/' + $('#requestId').val());
        });
    }
    if (window.location.pathname === '/requests') {
        getRequests().then(function (docs) {
            $('#request-list').html(createRequestsTable(docs));
        });
        $('#changeStatus, #changeDate').on('change', function () {
            var filter = getFilter();
            getRequests(filter).then(function (docs) {
                $('#request-list').html(createRequestsTable(docs));
            }, function () {
                $('#request-list').html('<h2>No Requests found matching the criteria.</h2>');
            });
        });
    }
    if (window.location.pathname === '/deliveries') {
        getDeliveries().then(function (docs) {
            $('#deliveries-list').html(createDeliveriesTable(docs));
        });
        $('#changeStatus, #changeDate').on('change', function () {
            var filter = getFilter();
            getDeliveries(filter).then(function (docs) {
                $('#deliveries-list').html(createDeliveriesTable(docs));
            }, function () {
                $('#deliveries-list').html('<h2>No Requests found matching the criteria.</h2>');
            });
        });
    }
});
