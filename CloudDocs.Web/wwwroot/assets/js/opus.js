
$.ajaxSetup({
    statusCode: {
        401: function () {
            location.href = "/Account/Login";
        }
    }
});
function AjaxPost(url, data, fnSuccess, fnError) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        cache: false,
        async: true,
        success: fnSuccess,
        error: fnError
    });
};

function block() {
    $.blockUI({
        message: '<h1><img src="/app-assets/images/icons/spinner.gif" /> Lütfen bekleyiniz...</h1>',
        css: { border: '0px' },
        overlayCSS: {
            backgroundColor: '#000',
            opacity: 0.3,
            cursor: 'wait'
        },
    });
}

function errorMessage(msg) {
    toastr.error(msg, '', {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "6000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    });
}

function successMessage(msg) {
    toastr.success(msg);
}

function unBlock() {
    $.unblockUI();
}

function unBlockWithSuccessMessage(msg) {
    $.unblockUI();
    successMessage(msg);
}

function unBlockWithErrorMessage(msg) {
    $.unblockUI();
    errorMessage(msg);
}

function FillSelect(elm, data) {
    $(elm).empty();
    $(elm).append("<option value=''>Seçiniz</option>")
    for (var i = 0; i < data.length; i++) {
        $(elm).append("<option " + (data[i].Selected ? "selected=\"selected\"" : "selected") + " value='" + data[i].Value + "'>" + data[i].Text + "</option>");
    }
    $(elm).trigger('change');
}

$('#ddlDivisions').change(function () {
    var divisionId = $(this).val();
    if (divisionId != undefined && divisionId != '')
        AjaxPost('/GenericForm/GetDivisionLocation', { divisionId: divisionId }, ddlLocationSuccess, ddlLocationError)
});

function ddlLocationSuccess(result) {
    FillSelect($('#ddlDivisionLocations'), result);
}

function ddlLocationError(error) {
    errorMessage('Hata oluştu ' + error);
}

$('#ddlEnergyInOutType').change(function () {
    var inOutTypeId = $(this).val();
    if (inOutTypeId == 1) {
        $('#dvConsumption').show();
        $('#dvAmount').hide();
    } else {
        $('#dvConsumption').hide();
        $('#dvAmount').show();
    }
    if (inOutTypeId != undefined && inOutTypeId != '')
        AjaxPost('/GenericForm/GetEnergySubTypes', { inOutTypeId: inOutTypeId }, ddlEnergyInOutTypeSuccess, ddlEnergyInOutTypeError)
});

function ddlEnergyInOutTypeSuccess(result) {
    FillSelect($('#ddlEnergySubTypes'), result);
}

function ddlEnergyInOutTypeError(error) {
    errorMessage('Hata oluştu ' + error);
}

$("#btnElectricForm").click(function () {
    block();
    var energyoutInType = $('#ddlEnergyInOutType').val();
    var model = {
        LocationID: $('#ddlDivisionLocations').val(),
        EnergySubTypeID: $('#ddlEnergySubTypes').val(),
        EnergyInOutTypeID: energyoutInType ,
        MeasuredValue: energyoutInType == '1' ? $('#txtConsumption').val() : $('#txtAmount').val(),
        Description: $('#txtDescription').val(),
        Year: $('#ddlYears').val(),
        Month: $('#ddlMonths').val()
    };

    AjaxPost('/GenericForm/SaveEnergyForm', { model: model }, SaveEnergyFormSuccess, SaveEnergyFormError)
});

function SaveEnergyFormSuccess(result) {
    if (!result.HasError) {
        unBlockWithSuccessMessage('İşleminiz başarılı olarak gerçekleştirildi');
        $('#ddlDivisions').val('');
        $('#ddlDivisions').change();
        $('#ddlDivisionLocations').val('');
        $('#ddlDivisionLocations').change();
        $('#ddlEnergySubTypes').val('');
        $('#ddlEnergySubTypes').change();
        $('#ddlEnergyInOutType').val('');
        $('#ddlEnergyInOutType').change();
        $('#txtDescription').val('');
        $('#txtAmount').val('');
        $('#txtConsumption').val('');
        $('#ddlYears').val('');
        $('#ddlYears').change();
        $('#ddlMonths').val('');
        $('#ddlMonths').change();
    }
    else {
        unBlockWithErrorMessage(result.ErrorMessage);
    }
}

function SaveEnergyFormError(error) {
    unBlockWithErrorMessage('Hata oluştu : ' + error);
}

$("#btnListElectricDashboard").click(function () {
    block();
    setTimeout(function () {
        unBlockWithSuccessMessage('İşleminiz tamamlandı');
    }, 6000);
});

function display_kendoui_grid_error(e) {
    if (e.errors) {
        if ((typeof e.errors) == 'string') {
            //single error
            //display the message
            alert(e.errors);
        } else {
            //array of errors
            //source: http://docs.kendoui.com/getting-started/using-kendo-with/aspnet-mvc/helpers/grid/faq#how-do-i-display-model-state-errors?
            var message = "The following errors have occurred:";
            //create a message containing all errors.
            $.each(e.errors, function (key, value) {
                if (value.errors) {
                    message += "\n";
                    message += value.errors.join("\n");
                }
            });
            //display the message
            alert(message);
        }
        //ignore empty error
    } else if (e.errorThrown) {
        alert('Error happened');
    }
}

function ToSeoUrl(url) {

    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');

    return encodedUrl;
}

function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

// CSRF (XSRF) security
function addAntiForgeryToken(data) {
    //if the object is undefined, create a new one.
    if (!data) {
        data = {};
    }
    //add token
    var tokenInput = $('input[name=__RequestVerificationToken]');
    if (tokenInput.length) {
        data.__RequestVerificationToken = tokenInput.val();
    }
    return data;
};