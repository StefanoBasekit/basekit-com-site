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

    function getURL () {
        return el.find('[name="site-url"]:checked').val();
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

    function revealPreview () {
        if (!previewEl.find('.js-preview-site').length) {
            loadIframe();
        }

        el.off('click', 'button, input', revealPreview);
        el.find('.js-preview-overlay').remove();
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

    function loadIframe () {
        var matchMedia = window.matchMedia || window.msMatchMedia,
            mobile = matchMedia ? matchMedia('(max-width: 479px)').matches : window.innerWidth < 480;

        if (mobile) {
            return;
        }

        el.find('.js-site-preview').append('<iframe class="js-preview-site" src="' + getURL() + '"></iframe>');
    }

    function attachEvents () {
        el.find('.js-view-controls').on('click', '.js-device-switch', handleDeviceSwitch);
        el.find('.js-preview-selector').on('change', handleURLSwitch);
        el.on('click', 'button, input', revealPreview);
    }

    return {
        init: function () {
            loadIframe();
            attachEvents();
            handleMobileWebKit();
        }
    };

}());

$(function () {
    SitePreview.init();
});

