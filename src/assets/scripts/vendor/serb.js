const serbWidgetTakeChildren = true;
let serbWidget;
let sJQ;

const serbDetection = {
    isPhone: false,
    isTablet: false,
    fancyboxLoaded: false,

    init: function () {
        console.log('SERB');
        const obj = this;
        const windowWidth = window.screen.width < window.outerWidth
            ? window.screen.width
            : window.outerWidth;

        //console.log(serbWidgetTakeChildren);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Is a 'mobile' device
            if (windowWidth < 500) {
                obj.isPhone = true;
            } else {
                obj.isTablet = true;
            }
        }

        // JQuery Load
        function getScript(url, success) {

            console.log('SERB getScript');

            const script = document.createElement('script');
            script.src = url;
            let head = document.getElementsByTagName('head')[0],
                done = false;

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                    // callback function provided as param
                    success();
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };
            head.appendChild(script);

        }

        getScript('//ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js', function () {
            if (typeof jQuery == 'undefined') {

                // Super failsafe - still somehow failed...

            } else {
                if (!obj.isPhone && !obj.isTablet) {
                    // Load lightwindow, then initialise
                    loadLightWindow();
                } else {
                    // Just initialise
                    doActualInitialisation();
                }
            }
        });

        function doActualInitialisation() {
            console.log('doActualInitialisation');
            sJQ = jQuery.noConflict(true); // Grab JQuery into our own variable and return jQuery and $ variables back to their previous state
            sJQ(document).ready(function () {
                serbWidget = new SerbWidgetClass();
                serbWidget.Init();
            });
        }

        function loadLightWindow() {
            console.log('loadLightWindow');
            // Check for existing fancybox
            if (!jQuery.fancybox) {
                // Get the CSS
                const fileref = document.createElement('link');
                fileref.setAttribute('rel', 'stylesheet');
                fileref.setAttribute('type', 'text/css');
                fileref.setAttribute('href', '//www.simpleerb.com/theme/widget/fancybox.min.css');
                document.getElementsByTagName('head')[0].appendChild(fileref)

                // Get the JS
                getScript('//www.simpleerb.com/js/fancybox/jquery.fancybox-1.3.1.pack.js', function () {
                    if (jQuery.fancybox) {
                        serbDetection.fancyboxLoaded = true;
                    }
                    doActualInitialisation();
                });
            } else {
                // already loaded
                serbDetection.fancyboxLoaded = true;
                doActualInitialisation();
            }
        }
    }
};

serbDetection.init();

function SerbWidgetClass() {

    // Variables

    // Private Functions
    this.Init = function () {
        console.log('init SerbWidgetClass');
        SetupWidgetLinks();
    }
    console.log('here');

    function CheckOptions(lnk) {
        console.log('CheckOptions', lnk);
        let params = {};

        // Check iFrame
        const iFrm = sJQ(lnk).attr('data-targetiframe');
        if (iFrm && iFrm.length > 0) {
            // Has specified an iframe to target
            if (sJQ(iFrm).length === 1) {
                // Target is valid
                params = sJQ.extend(params, {
                    iFrame: iFrm
                });

                // Check for hide link option
                const nHide = sJQ(lnk).attr('data-hidelink');
                if (nHide && nHide.length > 0 && nHide === 'true') {
                    params = sJQ.extend(params, {
                        hideLink: true
                    });
                }
            }
        }

        // Check for form display
        const nTarget = sJQ(lnk).attr('data-formtarget'); // Selector for form location
        const nMode = sJQ(lnk).attr('data-formtargetmode'); // Mode for form, either 'hor' or 'ver'
        const reqWidth = sJQ(lnk).attr('data-formtargetwidth');
        const reqHeight = sJQ(lnk).attr('data-formtargetheight');

        if (nTarget && nTarget.length > 0) {
            // Has specified an iframe to target
            let nOrientation = 0; // Default to Horizontal
            if (nMode === 'ver') {
                nOrientation = 1;
            }
            // Target is valid
            params = sJQ.extend(params, {
                form: nTarget,
                formMode: nOrientation
            });
            if (reqWidth) {
                const nW = parseInt(reqWidth, 10);
                params = sJQ.extend(params, {
                    formWidth: nW
                });
            }
            if (reqHeight) {
                const nH = parseInt(reqHeight, 10);
                params = sJQ.extend(params, {
                    formHeight: nH
                });
            }
        }



        return params;
    }

    function SetupWidgetLinks() {
        console.log('SetupWidgetLinks');
        sJQ('.serbwidget').each(function (index, value) {
            const lnk = this;
            const wCode = Math.random().toString().replace('.', '');
            let options = CheckOptions(lnk);
            // Set up the widget instance
            const lnkParams = [];
            let isEmbed = false;

            lnkParams.push({ name: '__src', val: 'wdgt' });
            if (serbDetection.isPhone) {
                lnkParams.push({ name: '__type', val: 'phone' });
            } else if (serbDetection.isTablet) {
                lnkParams.push({ name: '__type', val: 'tablet' });
            } else {
                lnkParams.push({ name: '__type', val: 'desk' });
            }


            if (options.iFrame) {
                // Open into an iframe
                lnkParams.push({ name: '__target', val: 'ifrm' });
            } else if (options.form) {
                // showing widget
                lnkParams.push({ name: '__target', val: 'form' });
                lnkParams.push({ name: 'mode', val: options.formMode });
                isEmbed = true;
            } else {
                if (!serbDetection.isPhone) {
                    console.log('Lightwindow');
                    // Not Phone, so open in light window
                    lnkParams.push({ name: '__target', val: 'lw' });
                } else {
                    // Leave for new window
                    lnkParams.push({ name: '__target', val: 'nw' });
                }
            }
            lnkParams.push({ name: '__wid', val: wCode });
            if (serbDetection.isPhone || serbDetection.isTablet) {
                // On a mobile device, we don't want a callback from iframe
                lnkParams.push({ name: '__ncb', val: '1' });
            }

            // get widget link from A tag in supplied markup
            let curURL = sJQ(lnk).attr('href');
            if (curURL.substring(0, 16) !== "http://localhost") { //TODO ONLY TESTING, dont switch to https mode
                // ensure calling https version
                curURL = sJQ(lnk).attr('href').toLowerCase().replace('http:', 'https:');
            }

            let sep = '?';
            let embedURL = curURL + 'embed/';
            if (curURL.indexOf("?") > -1) {
                // already has URL params
                sep = '&';
            }
            for (let i = 0; i < lnkParams.length; i++) {
                curURL = curURL + sep + lnkParams[i].name + '=' + lnkParams[i].val;
                embedURL = embedURL + sep + lnkParams[i].name + '=' + lnkParams[i].val;
                sep = '&';
            }
            sJQ(lnk).attr('href', curURL);

            if (isEmbed) {
                // Create embed URL as well
                options = sJQ.extend(options, {
                    formURL: embedURL
                });
            }

            const takeChildren = serbWidgetTakeChildren;

            if (options.iFrame) {
                // Open into an iframe
                sJQ(options.iFrame).attr('src', sJQ(lnk).attr('href'));
                if (options.hideLink) {
                    sJQ(lnk).hide();
                }
            } else if (options.form) {
                // Add iframe for initial form
                let nWidth = 780;
                let nHeight = 80;

                if (takeChildren) {
                    nWidth = 910;
                    nHeight = 100;
                }

                if (options.formMode === 1) {
                    nWidth = 220;
                    nHeight = 300;

                    if (takeChildren) {
                        nWidth = 220;
                        nHeight = 350;
                    }
                }

                if (options.formWidth) {
                    nWidth = options.formWidth;
                }
                if (options.formHeight) {
                    nHeight = options.formHeight;
                }
                sJQ('<iframe></iframe>').attr('frameborder', 0)
                    .attr('title', 'Book a table')
                    .attr('id', 'serbwdgtFrm' + index)
                    .width(nWidth)
                    .height(nHeight)
                    .css({
                        'background-color': 'transparent',
                        'max-width': '100%'
                    })
                    .insertAfter(lnk);
                //.appendTo(options.form);
                const nURL = options.formURL;

                sJQ('#serbwdgtFrm' + index).attr('src', nURL);
                sJQ(lnk).hide();

                function receiveMessage(event) {
                    if (event.data && event.data.src === 'serbwidget' && event.data.wid === wCode) {
                        if (event.data.targetURL) {
                            sJQ(lnk).attr('href', event.data.targetURL);
                            if (!serbDetection.isPhone && !serbDetection.isTablet) {
                                // Not Phone, so open in light window
                                // Set up the light window
                                sJQ(lnk).fancybox({
                                    'centerOnScroll': 'true',
                                    type: 'iframe',
                                    width: '90%',
                                    height: '90%',
                                    showNavArrows: false
                                });
                                sJQ(lnk).click();
                            } else {
                                // window.open will not be reliable here, since this action cannot be traced to a 'click' event (this is lost through the Message event system)
                                window.location = event.data.targetURL;
                            }
                        } else if (event.data && event.data.updateSize) {
                            sJQ('#serbwdgtFrm' + index).height(event.data.updateSize);
                        }
                    }

                }

                // Set Listen Handlers
                window.addEventListener("message", receiveMessage, false);

            } else {
                if (!serbDetection.isPhone && !serbDetection.isTablet) {
                    // Not Phone, so open in light window
                    // Set up the light window
                    sJQ(lnk).fancybox({
                        'centerOnScroll': 'true',
                        type: 'iframe',
                        width: '90%',
                        height: '90%',
                        showNavArrows: false
                    });
                } else {
                    // Leave for new window
                }
            }
        });
        console.log('SetupWidgetLinks end');
    }
}
