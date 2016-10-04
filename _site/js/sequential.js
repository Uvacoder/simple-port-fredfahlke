// OFA Donate - Sequential Asks JS
//      Created By Manik Rathee on 2012-05-08
//      Copyright 2012 Obama for America. All rights reserved.

if ( $('body').hasClass('sequential') ) {

// (function($, win) {
    var win = $('window');
    var current              = 1;

    var donateForm           = $('#donate-form');
    var group1               = $('#select-amount-header, #amounts-cont');
    var group2               = $('#firstname-cont, #lastname-cont, #addr1-cont, #city-cont, #state_cd-cont, #zip-cont, #email-cont, #phone-cont');
    var group3               = $('.qd-info.cc_number_related.cc_expir_group_related, #cc-type-cont, #cc-number-cont, #cc-expiration-cont, #recurring-cont');
    var group4               = $('#personalized-content, .employer_related.occupation_related, #employer-cont, #occupation-cont, #employer-occupation-helper, #ovf-switch');
    var personalizedContent  = $('#personalized-content');
    var next                 = $('#next');
    var replacementSubmit    = $('#submit-button');
    var inputFields          = $(":input");
    var amountInputs         = $('#amounts input');
    var amountOther          = $('#amount-cont-8 input');
    var breadcrumb           = $('#breadcrumbs');
    var breadcrumbItem       = $('.breadcrumb-item');
    var breadcrumbName       = $('#breadcrumb-name');
    var breadcrumbPayment    = $('#breadcrumb-payment');
    var breadcrumbEmployment = $('#breadcrumb-employment');
    var premature            = $('span.premature');
    var goNext;
    var overLimit;
    var underLimit;
    var hasSavedPayment;
    var errorFullForm;
    var inputTel             = $('#amount-other, #phone, #zip, #cc_number');
    var inputEmail           = $('#email');
    var inputChanges         = $('#amount-other, #zip, #cc_number, #phone, #email');
    var $formContent         = $('#donate-form-content');
    var runValidation        = true;
    var minDonationLimit;
    var amountOtherClean;
    var keycode = false;
    // Enables Sequential To Fire
    $('body').addClass('sequential-active');


    // Mobile Input Types
    function adjustInputTypes(){
        if ($(window).width() < 769 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
            // inputNumber.prop('type','number');
            inputTel.prop('type','tel');
            inputEmail.prop('type','email');
        }
        else{
            inputChanges.prop('type','text');
        }
    }
    $(window).resize(function() {
        adjustInputTypes();
    });
    $(document).ready(function() {
        adjustInputTypes();
    });

    //Set min and max if it doesnt exist or is not a number
    win.minDonationLimit = (!minDonationLimit || typeof minDonationLimit !== "number") ? 3 : win.minDonationLimit;

    if ( $('body').hasClass('ovf-gateway') || (win.ofaOvfSwitch && donateForm.data('bsd_ovf_slug')) ) {
        win.maxDonationLimit = ( win.maxDonationLimit && (typeof( win.maxDonationLimit ) === "number") && (!win.ofaOvfSwitch) ) ? win.maxDonationLimit : 73300 ;
    } else {
        win.maxDonationLimit = (win.maxDonationLimit && typeof( win.maxDonationLimit ) === "number") ? win.maxDonationLimit : 2500 ;
    }

    // Toggles .hide on current group
    function showContent(){
        $('.group' + current).toggleClass('hide');
    }

    // Animate Next Button
    var noPulse;
    var animateFrames = function(color) {

        var colors = ['#00abeb','#085775'];
        var newColor =  color ? 0 : 1;

        if (current === 1){
            next.animate({backgroundColor: colors[color]}, 140, 'linear', function(){
                noPulse = setTimeout(function(){
                    animateFrames(newColor);
                }, 500);
            });
        }
        else{
            next.css('background-color','#1297c9');
        }
    };

    // Get current value and set old breadcrumbs to completed
    function updateBreadcrumb(i){
        var increment = i;
        breadcrumbItem.removeClass('current');
        // goNext = true;
        while (increment){
            increment--;
            $('[data-breadcrumb-number='+increment+']').addClass('completed');
        }
        $('[data-breadcrumb-number='+i+']').addClass('completed').addClass('current');
    }

    //Update breadcrumbs based on Saved Payment Info
    function savePaymentBreadcrumbs(){
        if (hasSavedPayment){
            breadcrumbEmployment.find('span').html('<hr>2');
            breadcrumbName.hide();
            breadcrumbPayment.hide();
            breadcrumbItem.addClass('saved-payment');
        }
        else{
            breadcrumbItem.removeClass('saved-payment');
            breadcrumbName.fadeIn('500');
            breadcrumbPayment.fadeIn('500');
            breadcrumbEmployment.find('span').delay(2000).html('<hr>4');
        }
    }


    // Serve up client-side validation errors
    function clientErrors(){
        if (!goNext){
            premature.removeClass().addClass('premature');

            if (current === 1){
                premature.addClass('first');
                $('#amount-header').addClass('error');
                if (underLimit){
                    if (win.minDonationLimit && !win.minDonationLimit.isNaN){
                        premature.text('Please choose an amount higher than $' + win.minDonationLimit + '.').fadeIn('800');
                    }
                    else{
                        premature.text('Please choose an amount higher than $3.').fadeIn('800');
                    }
                }
                else if (overLimit ){
                    if(win.maxDonationLimit && !win.minDonationLimit.isNaN){
                        premature.text('Please choose an amount less than $' + win.maxDonationLimit +  '.').fadeIn('800');
                    }
                    else{
                        premature.text('Please choose an amount less than $2500.').fadeIn('800');
                    }
                }
                else{
                    premature.text('Please choose an amount.').fadeIn('800');
                }
            }
            else if (current === 2){
                premature.addClass('second').text('Please correct the errors shown above.').fadeIn('800');
            }
            else if (current === 3){
                premature.addClass('third').text('Please correct your payment information').fadeIn('800');
            }
            else if (current === 4){
                premature.addClass('fourth').text('Please correct your employment information.').fadeIn('800');
            }
            else {
                premature.text('Please correct the errors shown above.').fadeIn('800');
            }
        }
    }


    //Validation
    function validateForm(){
        if (!runValidation){
            return;
        }
        runValidation = false;
        currentInputs = $('.group' + current).find('input');
        var arrLength = currentInputs.length;
        goNext = false;
        overLimit = false;
        underLimit = false;
        var i;

        if (!$('body').hasClass('error')) {

            if (current === 1){

                for (i=0; i < arrLength; i++) {
                    if (currentInputs.eq(i).attr('checked')) {
                        goNext = true;
                        break;
                    }
                }
                if ($('#other-amount-radio').attr('checked')){

                    if (/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val()) && amountOther.val() > win.maxDonationLimit){
                        goNext = false;
                        overLimit = true;
                        amountOther.addClass('error');
                    }
                    if (/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val()) && amountOther.val() < win.minDonationLimit && amountOther.val() !== ''){
                        goNext = false;
                        underLimit = true;
                        amountOther.addClass('error');
                    }
                    if (amountOther.val() === ''){
                        goNext = false;
                        amountOther.addClass('error');
                    }
                    if (!/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val())) {
                        goNext = false;
                        amountOther.addClass('error');
                    }

                }
            }

            if  (current === 2){
                for (i=0; i < arrLength; i++) {
                    if (currentInputs.eq(i).val() !== '') {
                        goNext = true;
                        break;
                    }
                }

                var firstName = $('#firstname');
                if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(firstName.val())) {
                    goNext = false;
                    firstName.addClass('error');
                }

                var lastName = $('#lastname');
                if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(lastName.val())) {
                    goNext = false;
                    lastName.addClass('error');
                }

                var address = $('#addr1');
                if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(address.val())) {
                    goNext = false;
                    address.addClass('error');
                }

                var city = $('#city');
                if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(city.val())) {
                    goNext = false;
                    city.addClass('error');
                }

                if ($('#state_cd').val() === '') {
                    goNext = false;
                    $('#state_cd').addClass('error');
                }

                var zip = $('#zip');
                if (!/^(\d{5}-\d{4}|\d{5}\+\d{4}|\d{5}|\d{9})$/.test(zip.val())) {
                    goNext = false;
                    zip.addClass('error');
                }

                var email = $('#email');
                if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
                    goNext = false;
                    email.addClass('error');
                }

                var phone = $('#phone');
                // if (!/^([\(]{1}[0-9]{3}[\)]{1}[\.| |\-]{0,1}|^[0-9]{3}[\.|\-| ]?)?[0-9]{3}(\.|\-| )?[0-9]{4}$/.test(phone.val())) {
                //  goNext = false;
                //  phone.addClass('error');
                //  // next.addClass('inactive');
                // }

                // Looser restrictions for phone regex
                // phone.val(phone.val().replace(/[^0-9]/g,''));

                phone.val(phone.val().replace(/\D/g,''));

                if (phone.val().length > 11 || phone.val().length < 10) {
                    goNext = false;
                    phone.addClass('error');
                    // next.addClass('inactive');
                }

            }

            if (current === 3){

                for (i=0; i < arrLength; i++) {
                    if (currentInputs.eq(i).val() !== '') {
                        goNext = true;
                        break;
                    }
                }

            }

            if (current === 4){
                replacementSubmit.focus();
                goNext = true;

                // if (hasSavedPayment = false){
                    var employ = $('#employer');
                    if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(employ.val())) {
                        goNext = false;
                        employ.addClass('error');
                    }

                    var occup = $('#occupation');
                    if (!/([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(occup.val())) {
                        goNext = false;
                        occup.addClass('error');
                    }
                // }
            }
            if (goNext){
                currentInputs.find('input').removeClass('error');
            }
            if (!goNext){
                clientErrors();
            }
        } // end, if body has class errors
        runValidation = true;
    }

    // // ERROR HIJACK
    // window.customError = function(errorObj){
    //     errorFullForm = true;
    //     amountOther.off('blur.otherField');
    //     hasSavedPayment = false;

    //     $('body').addClass('error');
    //     if ($(window).width() > 767){
    //         breadcrumb.fadeOut(800);
    //         premature.fadeOut(700);
    //         group1.removeClass('hide').fadeIn(1000);
    //         group2.removeClass('hide').fadeIn(1000);
    //         group3.removeClass('hide').fadeIn(1000);
    //         group4.not('#ovf-switch').removeClass('hide').fadeIn(1000);
    //         replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Resubmit').removeClass('processingform').addClass('fullform');
    //     }

    //     // Takes an object with two properties field and message. It finds the appropriate error element
    //     // for that form field and puts the message into it
    //     function displayErrorMessage( errorPair ){
    //         var $self = $('#donate-form');
    //         var $errorFields = $self.find('[class*="_error"]');
    //         var $relatedFields = $self.find('[class*="_related"]');
    //         var $currentField = $errorFields.filter('.' + errorPair.field + '_error');

    //         if ( $currentField.length === 0 ) {
    //             $self.find('[name="' + errorPair.field + '"]').before('<p class="error ' + errorPair.field + '_error"></p>');
    //             $currentField = $self.find('.' + errorPair.field + '_error');
    //         }

    //         $currentField.html( errorPair.message ).removeClass('hidden').addClass('error');
    //         $self.find('#' + errorPair.field)
    //             .add( $relatedFields.filter('.' + errorPair.field + '_related') )
    //                 .addClass('error');
    //     }

    //     function errorifyForm( donateError ){

    //         var numErrors, i;
    //         var ofaAPI = new win.ODonateAPIWrapper('');

    //         if ( donateError.code ) {
    //             switch ( donateError.code ) {
    //                 case ofaAPI.VALIDATION_FAILURE :
    //                     numErrors = donateError.field_errors.length;
    //                     for ( i=0; i < numErrors; i++ ) {
    //                         displayErrorMessage( donateError.field_errors[i] );
    //                     }
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please correct the problems marked in the form and submit your donation again.'
    //                     });
    //                     break;
    //                 case ofaAPI.CONFIRMATION_FAILURE :
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please try to submit your donation again.'
    //                     });
    //                     break;
    //                 case ofaAPI.INVALID_SLUG_ERROR :
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please try to submit your donation again.'
    //                     });
    //                     break;
    //                 case ofaAPI.NO_SLUG_ERROR :
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please try to submit your donation again.'
    //                     });
    //                     break;
    //                 case ofaAPI.SERVER_ERROR :
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please try to submit your donation again.'
    //                     });
    //                     break;
    //                 case ofaAPI.GATEWAY_ERROR :
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> The transaction was declined. Please verify the information below or try a different credit card.'
    //                     });
    //                     break;
    //                 default:
    //                     displayErrorMessage({
    //                         field : 'general',
    //                         message : '<strong>Error:</strong> Please try to submit your donation again.'
    //                     });
    //                     break;
    //             }
    //             $('body').addClass('error');
    //         }
    //     }
    //     errorifyForm($.parseJSON(errorObj.responseText));
    // };

    // Check browser width and enable  for widths higher than 768
    if ($(window).width() > 767 && $('body').hasClass('sequential-active')){
        $('.row.content-area-bg').removeClass('no-js');
        group1.addClass('group1');
        group2.addClass('group2');
        group3.addClass('group3');
        group4.addClass('group4');
        $('#personalized-content').addClass('hide');
        // Adds numeric data attributes to breadcrumbs
        breadcrumbItem.each(function(){
            $(this).attr('data-breadcrumb-number', ($(this).index() + 1));
        });
        // Runs hide & show content functions
        $('.group1, .group2, .group3, .group4').addClass('hide');
        showContent();
        replacementSubmit.hide();
        next.attr('tabindex','19');
        var currentInputs = $('.group' + current).find('input');
        group1.find('input').attr('checked', false);

        // Disable enter key and backspace key outside of form fields
        $(document).keydown(function(e) {
            var nodeName = e.target.nodeName.toLowerCase();

            if (e.which === 8) {
                if (nodeName === 'input') {
                    // do nothing
                } else {
                    e.preventDefault();
                }
            }
            if (e.which === 13 && current <=  3) {
                if (current === 1){
                    $('#amount-other').val($('#amount-other').val().replace(/ +/g,'')).blur();
                    win.ofa.ee.emitEvent( 'amount:change', [$('#amount-other').val()] );
                }
                if (current === 2){
                    $('#zip').val($('#zip').val().replace(/ +/g,''));
                }
                next.click();
                return false;
            }
            if (e.which === 13 && current === 4) {
                replacementSubmit.click();
                return false;
            }
        });



        // Restore form fields if QD info not you is clicked
        $('#personalized-content').on("click", "#qd-edit-info", function(){
            showContent();
            $('.employer_related.occupation_related, #employer-cont, #occupation-cont').show();
            $('#personalized-content').fadeOut(800);
            replacementSubmit.fadeOut(400);
            next.show();
            hasSavedPayment = false;
            savePaymentBreadcrumbs();
            breadcrumbPayment.removeClass('completed');
            breadcrumbEmployment.removeClass('completed');
            replacementSubmit.removeClass('saved-payment');
            $('#employer-occupation-helper').show();
            current = 1;
            current++;
            updateBreadcrumb(current);
            showContent();
        });




        // Set active states on amount button and populate amount banner
        // Mark hidden radios active and inactive with the label
        $('.amount-cont').click(function(){
            $(this).removeClass('active');
            amountInputs.attr('checked', false);
            premature.fadeOut('1200');
            $('#amount-header').removeClass('error');
            $('.amount-cont').find('input').removeClass('error');

            if ($(this).attr('id') === 'amount-cont-8') {
                $(this).find("input").attr('checked', true);
                $('#other-amount-radio').attr('checked' , true);
                amountOther.val('');
                if (!errorFullForm){
                    next.fadeIn(400);
                }
            }
        });

        $('.amount-cont').find('label').click(function(){
            var $this = $(this),
                $theInput = $this.parent().find("input");
            amountOther.val('');
            $('#other-amount-radio').attr('checked' , false);
            $this.addClass('active');
            $theInput.attr('checked', true);
            if (!errorFullForm){
                next.click();
                if (!hasSavedPayment){
                    next.fadeIn(600);
                }
                replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Donate  $' + $this.parent().find("label").html().replace('$', ''));
            }
        });


        amountOther.change(function(){
            var $this = $(this);

            premature.fadeOut('1200');
            $('#amount-header').removeClass('error');
            $('.amount-cont').find('input').removeClass('error');

            // Kill spaces in Other amount field
            $this.val($this.val().replace(/ +/g,''));
            if ($this.val() === ""){
                $this.attr('checked' , false);
                $('#other-amount-radio').attr('checked' , false);
            }
            if (!errorFullForm){
                amountOther.on('blur.otherField', function(){
                    amountOtherClean = amountOther.text($(this).val().replace('$', '')).text();
                    replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Donate  $' + amountOtherClean);
                });
            }
        });
        $('#zip').focus(function(){
            $('#zip').removeClass('error');
        });
        $('#zip').change(function(){
            $(this).val($(this).val().replace(/ +/g,''));
        });
        $('#email, #phone').change(function(){
            $(this).val($(this).val().replace(/ +/g,''));
        });
        $('#email, #phone').focus(function(){
            $(this).removeClass('error');
        });
        $('#cc_number').change(function(){
            $(this).val($(this).val().replace(/-/g,''));
        });

        // Fade out premature error if fields are focused
        inputFields.focus(function(){
            premature.fadeOut('1200');
            $(this).removeClass('error');
        });
        inputFields.change(function(){
            premature.fadeOut('1200');
            $(this).removeClass('error');
        });

        // ##BREADCRUMBS
        breadcrumbItem.click(function(){
            var index;
            var allGroups = $('.group1, .group2, .group3, .group4, .group5, .group6');

            $('this').focus();

            if (current < index){
                validateForm();
            }

            if ($(this).hasClass('completed')){
                index = $(this).attr('data-breadcrumb-number');

                if (current < index){
                    validateForm();
                }
                if (goNext){
                    allGroups.addClass('hide');
                    $('.group' + index).removeClass('hide');
                    updateBreadcrumb(index);
                    current = parseInt(index, 10);
                }
                if (current < 4){
                    next.show();
                    replacementSubmit.hide();
                }
            }

            if (!goNext){
                validateForm();
                // revalidate just to make sure, and if go next is true, run breadcrumb actions
                if (goNext){
                    index = $(this).attr('data-breadcrumb-number');
                    allGroups.addClass('hide');
                    $('.group' + index).removeClass('hide');
                    updateBreadcrumb(index);
                    current = parseInt(index, 10);
                }
            }
            // Set proper tab index for continue button and focus on first form field in the group
            if (current === 1){
                next.attr('tabindex','19');
                if (keycode){
                    personalizedContent.addClass('hide');
                }
            }
            if (current === 2){
                next.attr('tabindex','10');
                if (keycode){
                    personalizedContent.removeClass('hide');
                }
            }
            if (current === 3){
                next.attr('tabindex','26');
                if (keycode){
                    personalizedContent.addClass('hide');
                }
            }
            if (current === 4){
                next.hide();
                replacementSubmit.fadeIn(1800);
                if (keycode){
                    personalizedContent.removeClass('hide');
                }
                $formContent.addClass('ovfSwitch');
            }
            if (current !== 4){
                next.show();
                replacementSubmit.hide();
                $formContent.removeClass('ovfSwitch');
            }
            if (goNext){
                premature.fadeOut(800);
            }
        });

        // ##NEXT
        next.unbind('click').click(function(i){
            i.preventDefault();
            next.focus();
            validateForm();


            if (goNext) {
                premature.fadeOut('1200');
                showContent();
                current++;
                if (current >= 4){
                    current = 4;
                }
                showContent();
                updateBreadcrumb(current);

                if (current === 1){
                    next.attr('tabindex','19');
                    if (keycode){
                        personalizedContent.addClass('hide');
                    }
                }
                if (current === 2){
                    $("#firstname").focus();
                    next.attr('tabindex','10');
                    if (keycode){
                        personalizedContent.removeClass('hide');
                    }
                }
                if (current === 3){
                    $("#cc_number").focus();
                    next.attr('tabindex','26');
                    if (keycode){
                        personalizedContent.addClass('hide');
                    }
                }
                if (current === 4){
                    $("#employer").focus();
                    next.hide();
                    replacementSubmit.fadeIn(1000);
                    if (keycode){
                        personalizedContent.removeClass('hide');
                    }
                }
            }
            if (current !== 4){
                next.show();
                replacementSubmit.hide();
            }
            if (goNext){
                premature.fadeOut(800);
            }
        });

        // Validated last screen with submit button then submit form
        replacementSubmit.click(function(i){
            i.preventDefault();
            if (!$("body").hasClass("error")) {
                validateForm();
                if (!goNext){
                    premature.css('bottom', bottomPx).text('Please correct your employment information.').fadeIn('800');
                }
                else{
                    replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Processing').addClass('processingform');
                }
            }
            else{
                replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Processing').addClass('processingform');
            }
        });
    } // END 768 WIDTH CHECK
// })(jQuery, window);

}
