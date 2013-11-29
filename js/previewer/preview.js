var SitePreview = (function () {

    var el = $('.js-preview-interface'),
        previewEl = el.find('.js-preview-container');

    function handleMobileWebKit () {
        var ua = navigator.userAgent,
            isAndroidChrome = RegExp(" AppleWebKit/").test(ua) && RegExp(" Android").test(ua) && RegExp(" Mobile").test(ua),
            isWebKitMobile = RegExp(" AppleWebKit/").test(ua) && RegExp(" Mobile/").test(ua);

        if (!isWebKitMobile && !isAndroidChrome) {
            return;
        }

        previewEl.addClass('mobile-webkit');
    }

    function handleRotation () {
        previewEl.removeClass('no-delay').toggleClass('rotate');
        el.find('.js-device-switch .device-icon').toggleClass('rotate'); 
    }

    function setURL (URL) {
        previewEl.find('.js-preview-site').attr('src', URL);
    }

    function setActiveDevice (device) {
        if (device !== 'auto' && previewEl.hasClass('no-transition')) {
            setTimeout(function () {
                previewEl.removeClass('no-transition');
            }, 150);
        } else if (device === 'auto') {
            previewEl.addClass('no-transition');
        }   

        previewEl.removeClass('iphone tablet auto no-delay').addClass('no-delay ' + device);

        el.find('.js-device-switch').removeClass('selected');
        el.find('.js-' + device).addClass('selected');
    }

    function handleURLSwitch (evt) {
        var URL = $(evt.currentTarget).find('[name="site-url"]:checked').val();

        setURL(URL);
    }

    function handleDeviceSwitch (evt) {
        var ctrl = $(evt.currentTarget);

        if (ctrl.hasClass('js-iphone')) {
            newDevice = 'iphone';
        } else if (ctrl.hasClass('js-tablet')) {
            newDevice = 'tablet';
        } else if (ctrl.hasClass('js-auto')) {
            newDevice = 'auto';
        }   

        if (previewEl.hasClass(newDevice) && newDevice !== 'auto') {
            handleRotation();
            return;
        }   

        setActiveDevice(newDevice);
    }

    function attachEvents () {
        el.find('.js-view-controls').on('click', '.js-device-switch', handleDeviceSwitch);
        el.find('.js-preview-selector').on('change', handleURLSwitch);
    }

    return {
        init: function () {
            attachEvents();
            handleMobileWebKit();
        }
    };

}());

SitePreview.init();

