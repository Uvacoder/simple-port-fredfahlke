function trackEvent(a, b, c) {
    if (a && b && c) try {
        ga("send", "event", a, b, c);
    } catch (d) {
        logMyErrors(d);
    }
}

function adjustInputTypes() {
    $(window).width() < 769 && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? (inputTel.prop("type", "tel"), 
    inputEmail.prop("type", "email")) : inputChanges.prop("type", "text");
}

function showContent() {
    $(".group" + current).toggleClass("hide");
}

function updateBreadcrumb(a) {
    var b = a;
    for (breadcrumbItem.removeClass("current"); b; ) b--, $("[data-breadcrumb-number=" + b + "]").addClass("completed");
    $("[data-breadcrumb-number=" + a + "]").addClass("completed").addClass("current");
}

function savePaymentBreadcrumbs() {
    hasSavedPayment ? (breadcrumbEmployment.find("span").html("<hr>2"), breadcrumbName.hide(), 
    breadcrumbPayment.hide(), breadcrumbItem.addClass("saved-payment")) : (breadcrumbItem.removeClass("saved-payment"), 
    breadcrumbName.fadeIn("500"), breadcrumbPayment.fadeIn("500"), breadcrumbEmployment.find("span").delay(2e3).html("<hr>4"));
}

function clientErrors() {
    goNext || (premature.removeClass().addClass("premature"), 1 === current ? (premature.addClass("first"), 
    $("#amount-header").addClass("error"), underLimit ? win.minDonationLimit && !win.minDonationLimit.isNaN ? premature.text("Please choose an amount higher than $" + win.minDonationLimit + ".").fadeIn("800") : premature.text("Please choose an amount higher than $3.").fadeIn("800") : overLimit ? win.maxDonationLimit && !win.minDonationLimit.isNaN ? premature.text("Please choose an amount less than $" + win.maxDonationLimit + ".").fadeIn("800") : premature.text("Please choose an amount less than $2500.").fadeIn("800") : premature.text("Please choose an amount.").fadeIn("800")) : 2 === current ? premature.addClass("second").text("Please correct the errors shown above.").fadeIn("800") : 3 === current ? premature.addClass("third").text("Please correct your payment information").fadeIn("800") : 4 === current ? premature.addClass("fourth").text("Please correct your employment information.").fadeIn("800") : premature.text("Please correct the errors shown above.").fadeIn("800"));
}

function validateForm() {
    if (runValidation) {
        runValidation = !1, currentInputs = $(".group" + current).find("input");
        var a = currentInputs.length;
        goNext = !1, overLimit = !1, underLimit = !1;
        var b;
        if (!$("body").hasClass("error")) {
            if (1 === current) {
                for (b = 0; a > b; b++) if (currentInputs.eq(b).attr("checked")) {
                    goNext = !0;
                    break;
                }
                $("#other-amount-radio").attr("checked") && (/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val()) && amountOther.val() > win.maxDonationLimit && (goNext = !1, 
                overLimit = !0, amountOther.addClass("error")), /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val()) && amountOther.val() < win.minDonationLimit && "" !== amountOther.val() && (goNext = !1, 
                underLimit = !0, amountOther.addClass("error")), "" === amountOther.val() && (goNext = !1, 
                amountOther.addClass("error")), /^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(amountOther.val()) || (goNext = !1, 
                amountOther.addClass("error")));
            }
            if (2 === current) {
                for (b = 0; a > b; b++) if ("" !== currentInputs.eq(b).val()) {
                    goNext = !0;
                    break;
                }
                var c = $("#firstname");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(c.val()) || (goNext = !1, c.addClass("error"));
                var d = $("#lastname");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(d.val()) || (goNext = !1, d.addClass("error"));
                var e = $("#addr1");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(e.val()) || (goNext = !1, e.addClass("error"));
                var f = $("#city");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(f.val()) || (goNext = !1, f.addClass("error")), 
                "" === $("#state_cd").val() && (goNext = !1, $("#state_cd").addClass("error"));
                var g = $("#zip");
                /^(\d{5}-\d{4}|\d{5}\+\d{4}|\d{5}|\d{9})$/.test(g.val()) || (goNext = !1, g.addClass("error"));
                var h = $("#email");
                /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(h.val()) || (goNext = !1, 
                h.addClass("error"));
                var i = $("#phone");
                i.val(i.val().replace(/\D/g, "")), (i.val().length > 11 || i.val().length < 10) && (goNext = !1, 
                i.addClass("error"));
            }
            if (3 === current) for (b = 0; a > b; b++) if ("" !== currentInputs.eq(b).val()) {
                goNext = !0;
                break;
            }
            if (4 === current) {
                replacementSubmit.focus(), goNext = !0;
                var j = $("#employer");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(j.val()) || (goNext = !1, j.addClass("error"));
                var k = $("#occupation");
                /([a-zA-Z]+)|(([0-9]+)([a-zA-Z]+))/.test(k.val()) || (goNext = !1, k.addClass("error"));
            }
            goNext && currentInputs.find("input").removeClass("error"), goNext || clientErrors();
        }
        runValidation = !0;
    }
}

!function(a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e, a[e] = a[e] || function() {
        (a[e].q = a[e].q || []).push(arguments);
    }, a[e].l = 1 * new Date(), f = b.createElement(c), g = b.getElementsByTagName(c)[0], 
    f.async = 1, f.src = d, g.parentNode.insertBefore(f, g);
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), 
ga("create", "UA-19400273-3", "auto"), ga("send", "pageview"), !function(a, b, c) {
    "use strict";
    var d, e, f, g = {
        minHeight: 0,
        elements: [],
        percentage: !0,
        userTiming: !0,
        pixelDepth: !0,
        nonInteraction: !0
    }, h = a(b), i = [], j = 0;
    a.scrollDepth = function(k) {
        function l(a, b, c, g) {
            f ? (dataLayer.push({
                event: "ScrollDistance",
                eventCategory: "Scroll Depth",
                eventAction: a,
                eventLabel: b,
                eventValue: 1,
                eventNonInteraction: k.nonInteraction
            }), k.pixelDepth && arguments.length > 2 && c > j && (j = c, dataLayer.push({
                event: "ScrollDistance",
                eventCategory: "Scroll Depth",
                eventAction: "Pixel Depth",
                eventLabel: p(c),
                eventValue: 1,
                eventNonInteraction: k.nonInteraction
            })), k.userTiming && arguments.length > 3 && dataLayer.push({
                event: "ScrollTiming",
                eventCategory: "Scroll Depth",
                eventAction: a,
                eventLabel: b,
                eventTiming: g
            })) : (d && (ga("send", "event", "Scroll Depth", a, b, 1, {
                nonInteraction: k.nonInteraction ? 1 : 0
            }), k.pixelDepth && arguments.length > 2 && c > j && (j = c, ga("send", "event", "Scroll Depth", "Pixel Depth", p(c), 1, {
                nonInteraction: k.nonInteraction ? 1 : 0
            })), k.userTiming && arguments.length > 3 && ga("send", "timing", "Scroll Depth", a, g, b)), 
            e && (_gaq.push([ "_trackEvent", "Scroll Depth", a, b, 1, k.nonInteraction ]), k.pixelDepth && arguments.length > 2 && c > j && (j = c, 
            _gaq.push([ "_trackEvent", "Scroll Depth", "Pixel Depth", p(c), 1, k.nonInteraction ])), 
            k.userTiming && arguments.length > 3 && _gaq.push([ "_trackTiming", "Scroll Depth", a, g, b, 100 ])));
        }
        function m(a) {
            return {
                "25%": parseInt(.25 * a, 10),
                "50%": parseInt(.5 * a, 10),
                "75%": parseInt(.75 * a, 10),
                "100%": a - 5
            };
        }
        function n(b, c, d) {
            a.each(b, function(b, e) {
                -1 === a.inArray(b, i) && c >= e && (l("Percentage", b, c, d), i.push(b));
            });
        }
        function o(b, c, d) {
            a.each(b, function(b, e) {
                -1 === a.inArray(e, i) && a(e).length && c >= a(e).offset().top && (l("Elements", e, c, d), 
                i.push(e));
            });
        }
        function p(a) {
            return (250 * Math.floor(a / 250)).toString();
        }
        function q(a, b) {
            var c, d, e, f = null, g = 0, h = function() {
                g = new Date(), f = null, e = a.apply(c, d);
            };
            return function() {
                var i = new Date();
                g || (g = i);
                var j = b - (i - g);
                return c = this, d = arguments, 0 >= j ? (clearTimeout(f), f = null, g = i, e = a.apply(c, d)) : f || (f = setTimeout(h, j)), 
                e;
            };
        }
        var r = +new Date();
        k = a.extend({}, g, k), a(c).height() < k.minHeight || ("function" == typeof ga && (d = !0), 
        "undefined" != typeof _gaq && "function" == typeof _gaq.push && (e = !0), "undefined" != typeof dataLayer && "function" == typeof dataLayer.push && (f = !0), 
        k.percentage ? l("Percentage", "Baseline") : k.elements && l("Elements", "Baseline"), 
        h.on("scroll.scrollDepth", q(function() {
            var d = a(c).height(), e = b.innerHeight ? b.innerHeight : h.height(), f = h.scrollTop() + e, g = m(d), j = +new Date() - r;
            return i.length >= 4 + k.elements.length ? void h.off("scroll.scrollDepth") : (k.elements && o(k.elements, f, j), 
            void (k.percentage && n(g, f, j)));
        }, 500)));
    };
}(jQuery, window, document), !function(a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {
            exports: {},
            id: d,
            loaded: !1
        };
        return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports;
    }
    var c = {};
    return b.m = a, b.c = c, b.p = "build/", b(0);
}([ function(a, b, c) {
    a.exports = c(49);
}, function(a, b, c) {
    c(56), a.exports = c(57).Object.setPrototypeOf;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(21), h = d(g), i = c(22), j = d(i), k = c(15), l = (d(k), 
    c(9)), m = d(l), n = c(18), o = d(n), p = c(13), q = d(p), r = function(a) {
        function b() {
            var c, d = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            f["default"](this, b);
            var e = h["default"](this, a.call(this, d));
            return null == e._props.name && e._setSelfName(), c = e, h["default"](e, c);
        }
        return j["default"](b, a), b.prototype._declareDefaults = function() {
            this._defaults = {
                duration: 350,
                delay: 0,
                repeat: 0,
                speed: 1,
                isYoyo: !1,
                easing: "Sin.Out",
                backwardEasing: null,
                name: null,
                nameBase: "Tween",
                onProgress: null,
                onStart: null,
                onRefresh: null,
                onComplete: null,
                onRepeatStart: null,
                onRepeatComplete: null,
                onFirstUpdate: null,
                onUpdate: null,
                isChained: !1,
                onPlaybackStart: null,
                onPlaybackPause: null,
                onPlaybackStop: null,
                onPlaybackComplete: null,
                callbacksContext: null
            };
        }, b.prototype.play = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return "play" === this._state && this._isRunning ? this : (this._props.isReversed = !1, 
            this._subPlay(a, "play"), this._setPlaybackState("play"), this);
        }, b.prototype.playBackward = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return "reverse" === this._state && this._isRunning ? this : (this._props.isReversed = !0, 
            this._subPlay(a, "reverse"), this._setPlaybackState("reverse"), this);
        }, b.prototype.pause = function() {
            return "pause" === this._state || "stop" === this._state ? this : (this._removeFromTweener(), 
            this._setPlaybackState("pause"), this);
        }, b.prototype.stop = function(a) {
            if ("stop" === this._state) return this;
            this._wasUknownUpdate = void 0;
            var b = null != a ? a : "reverse" === this._state ? 1 : 0;
            return this.setProgress(b), this.reset(), this;
        }, b.prototype.replay = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.reset(), this.play(a), this;
        }, b.prototype.replayBackward = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
            return this.reset(), this.playBackward(a), this;
        }, b.prototype.setProgress = function(a) {
            var b = this._props;
            return !b.startTime && this._setStartTime(), this._playTime = null, 0 > a && (a = 0), 
            a > 1 && (a = 1), this._update(b.startTime - b.delay + a * b.repeatTime), this;
        }, b.prototype.setSpeed = function(a) {
            return this._props.speed = a, ("play" === this._state || "reverse" === this._state) && this._setResumeTime(this._state), 
            this;
        }, b.prototype.reset = function() {
            return this._removeFromTweener(), this._setPlaybackState("stop"), this._progressTime = 0, 
            this._isCompleted = !1, this._isStarted = !1, this._isFirstUpdate = !1, this._wasUknownUpdate = void 0, 
            this._prevTime = void 0, this._prevYoyo = void 0, this._props.isReversed = !1, this;
        }, b.prototype._subPlay = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], b = arguments[1], c = this._props, d = this._state, e = this._prevState, f = "pause" === d, g = "play" === d || f && "play" === e, h = "reverse" === d || f && "reverse" === e, i = g && "reverse" === b || h && "play" === b;
            return this._progressTime = this._progressTime >= c.repeatTime ? 0 : this._progressTime, 
            i && (this._progressTime = c.repeatTime - this._progressTime), this._setResumeTime(b, a), 
            m["default"].add(this), this;
        }, b.prototype._setResumeTime = function(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
            this._resumeTime = performance.now();
            var c = this._resumeTime - Math.abs(b) - this._progressTime;
            this._setStartTime(c, !1), null != this._prevTime && (this._prevTime = "play" === a ? this._normPrevTimeForward() : this._props.endTime - this._progressTime);
        }, b.prototype._normPrevTimeForward = function() {
            var a = this._props;
            return a.startTime + this._progressTime - a.delay;
        }, b.prototype._setSelfName = function() {
            var a = "_" + this._props.nameBase + "s";
            m["default"][a] = null == m["default"][a] ? 1 : ++m["default"][a], this._props.name = this._props.nameBase + " " + m["default"][a];
        }, b.prototype._setPlaybackState = function(a) {
            this._prevState = this._state, this._state = a;
            var b = "pause" === this._prevState, c = "stop" === this._prevState, d = "play" === this._prevState, e = "reverse" === this._prevState, f = d || e, g = c || b;
            "play" !== a && "reverse" !== a || !g || this._playbackStart(), "pause" === a && f && this._playbackPause(), 
            "stop" === a && (f || b) && this._playbackStop();
        }, b.prototype._vars = function() {
            return this.progress = 0, this._prevTime = void 0, this._progressTime = 0, this._negativeShift = 0, 
            this._state = "stop", this._props.delay < 0 && (this._negativeShift = this._props.delay, 
            this._props.delay = 0), this._calcDimentions();
        }, b.prototype._calcDimentions = function() {
            this._props.time = this._props.duration + this._props.delay, this._props.repeatTime = this._props.time * (this._props.repeat + 1);
        }, b.prototype._extendDefaults = function() {
            this._callbackOverrides = this._o.callbackOverrides || {}, delete this._o.callbackOverrides, 
            a.prototype._extendDefaults.call(this);
            var b = this._props;
            b.easing = o["default"].parseEasing(b.easing), null != b.backwardEasing && (b.backwardEasing = o["default"].parseEasing(b.backwardEasing));
        }, b.prototype._setStartTime = function(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1], c = this._props, d = c.shiftTime || 0;
            b && (this._isCompleted = !1, this._isRepeatCompleted = !1, this._isStarted = !1);
            var e = null == a ? performance.now() : a;
            return c.startTime = e + c.delay + this._negativeShift + d, c.endTime = c.startTime + c.repeatTime - c.delay, 
            this._playTime = null != this._resumeTime ? this._resumeTime : e + d, this._resumeTime = null, 
            this;
        }, b.prototype._update = function(a, b, c, d) {
            var e = this._props;
            null == this._prevTime && null != b && (this._props.speed && this._playTime && (this._prevTime = this._playTime + this._props.speed * (b - this._playTime)), 
            this._wasUknownUpdate = !0);
            var f = e.startTime - e.delay;
            if (e.speed && this._playTime && (a = this._playTime + e.speed * (a - this._playTime)), 
            Math.abs(e.endTime - a) < 1e-8 && (a = e.endTime), d && null != c) {
                var g = this._getPeriod(a), h = !(!e.isYoyo || !this._props.repeat || g % 2 !== 1);
                if (this._timelines) for (var i = 0; i < this._timelines.length; i++) this._timelines[i]._update(a, b, c, d);
                1 === d ? c ? (this._prevTime = a + 1, this._repeatStart(a, h), this._start(a, h)) : (this._prevTime = a - 1, 
                this._repeatComplete(a, h), this._complete(a, h)) : -1 === d && (c ? (this._prevTime = a - 1, 
                this._repeatComplete(a, h), this._complete(a, h)) : this._prevTime >= e.startTime && this._prevTime <= e.endTime && (this._prevTime = a + 1, 
                this._repeatStart(a, h), this._start(a, h), this._isCompleted = !0)), this._prevTime = void 0;
            }
            return a > f && a < e.endTime ? this._progressTime = a - f : f >= a ? this._progressTime = 0 : a >= e.endTime && (this._progressTime = e.repeatTime + 1e-11), 
            e.isReversed && (a = e.endTime - this._progressTime), null == this._prevTime ? (this._prevTime = a, 
            this._wasUknownUpdate = !0, !1) : (a >= f && a <= e.endTime && this._progress((a - f) / e.repeatTime, a), 
            a >= e.startTime && a <= e.endTime ? this._updateInActiveArea(a) : this._isInActiveArea ? this._updateInInactiveArea(a) : this._isRefreshed || a < e.startTime && 0 !== this.progress && (this._refresh(!0), 
            this._isRefreshed = !0), this._prevTime = a, a >= e.endTime || f >= a);
        }, b.prototype._updateInInactiveArea = function(a) {
            if (this._isInActiveArea) {
                var b = this._props;
                if (a > b.endTime && !this._isCompleted) {
                    this._progress(1, a);
                    var c = this._getPeriod(b.endTime), d = b.isYoyo && c % 2 === 0;
                    this._setProgress(d ? 0 : 1, a, d), this._repeatComplete(a, d), this._complete(a, d);
                }
                a < this._prevTime && a < b.startTime && !this._isStarted && !this._isCompleted && (this._progress(0, a, !1), 
                this._setProgress(0, a, !1), this._isRepeatStart = !1, this._repeatStart(a, !1), 
                this._start(a, !1)), this._isInActiveArea = !1;
            }
        }, b.prototype._updateInActiveArea = function(a) {
            var b = this._props, c = b.delay + b.duration, d = b.startTime - b.delay, e = (a - b.startTime + b.delay) % c, f = Math.round((b.endTime - b.startTime + b.delay) / c), g = this._getPeriod(a), h = this._delayT, i = this._getPeriod(this._prevTime), j = this._delayT, k = b.isYoyo && g % 2 === 1, l = b.isYoyo && i % 2 === 1, m = k ? 1 : 0;
            if (a === b.endTime) {
                this._wasUknownUpdate = !1;
                var k = b.isYoyo && (g - 1) % 2 === 1;
                return this._setProgress(k ? 0 : 1, a, k), a > this._prevTime && (this._isRepeatCompleted = !1), 
                this._repeatComplete(a, k), this._complete(a, k);
            }
            if (this._isCompleted = !1, this._isRefreshed = !1, d + e >= b.startTime) {
                this._isInActiveArea = !0, this._isRepeatCompleted = !1, this._isRepeatStart = !1, 
                this._isStarted = !1;
                var n = (a - b.startTime) % c, o = n / b.duration, p = g > 0 && g > i, q = i > g;
                if (this._onEdge = 0, p && (this._onEdge = 1), q && (this._onEdge = -1), this._wasUknownUpdate && (a > this._prevTime && (this._start(a, k), 
                this._repeatStart(a, k), this._firstUpdate(a, k)), a < this._prevTime && (this._complete(a, k), 
                this._repeatComplete(a, k), this._firstUpdate(a, k), this._isCompleted = !1)), p) {
                    if (1 !== this.progress) {
                        var r = b.isYoyo && (g - 1) % 2 === 1;
                        this._repeatComplete(a, r);
                    }
                    i >= 0 && this._repeatStart(a, k);
                }
                a > this._prevTime && (!this._isStarted && this._prevTime <= b.startTime && (this._start(a, k), 
                this._repeatStart(a, k), this._isStarted = !1, this._isRepeatStart = !1), this._firstUpdate(a, k)), 
                q && (0 !== this.progress && 1 !== this.progress && i != f && this._repeatStart(a, l), 
                i !== f || this._wasUknownUpdate || (this._complete(a, k), this._repeatComplete(a, k), 
                this._firstUpdate(a, k), this._isCompleted = !1), this._repeatComplete(a, k)), "delay" === i && (j > g && this._repeatComplete(a, k), 
                g === j && g > 0 && this._repeatStart(a, k)), a > this._prevTime ? (0 === o && this._repeatStart(a, k), 
                a !== b.endTime && this._setProgress(k ? 1 - o : o, a, k)) : (a !== b.endTime && this._setProgress(k ? 1 - o : o, a, k), 
                0 === o && this._repeatStart(a, k)), a === b.startTime && this._start(a, k);
            } else if (this._isInActiveArea) {
                var s = "delay" === g ? h : g, t = a > this._prevTime;
                t && s--, m = b.isYoyo && s % 2 === 1 ? 1 : 0, a < this._prevTime && (this._setProgress(m, a, 1 === m), 
                this._repeatStart(a, 1 === m)), this._setProgress(t ? 1 - m : m, a, 1 === m), a > this._prevTime && (0 !== this.progress || 1 === m) && this._repeatComplete(a, 1 === m), 
                this._isInActiveArea = !1;
            }
            this._wasUknownUpdate = !1;
        }, b.prototype._removeFromTweener = function() {
            return m["default"].remove(this), this;
        }, b.prototype._getPeriod = function(a) {
            var b = this._props, c = b.delay + b.duration, d = b.delay + a - b.startTime, e = d / c, f = a < b.endTime ? d % c : 0;
            return e = a >= b.endTime ? Math.round(e) : Math.floor(e), a > b.endTime ? e = Math.round((b.endTime - b.startTime + b.delay) / c) : f > 0 && f < b.delay && (this._delayT = e, 
            e = "delay"), e;
        }, b.prototype._setProgress = function(a, b, c) {
            var d = this._props, e = d.wasYoyo !== c, f = b > this._prevTime;
            if (this.progress = a, f && !c || !f && c) this.easedProgress = d.easing(a); else if (!f && !c || f && c) {
                var g = null != d.backwardEasing ? d.backwardEasing : d.easing;
                this.easedProgress = g(a);
            }
            return (d.prevEasedProgress !== this.easedProgress || e) && null != d.onUpdate && "function" == typeof d.onUpdate && d.onUpdate.call(d.callbacksContext || this, this.easedProgress, this.progress, f, c), 
            d.prevEasedProgress = this.easedProgress, d.wasYoyo = c, this;
        }, b.prototype._start = function(a, b) {
            if (!this._isStarted) {
                var c = this._props;
                null != c.onStart && "function" == typeof c.onStart && c.onStart.call(c.callbacksContext || this, a > this._prevTime, b), 
                this._isCompleted = !1, this._isStarted = !0, this._isFirstUpdate = !1;
            }
        }, b.prototype._playbackStart = function() {
            var a = this._props;
            null != a.onPlaybackStart && "function" == typeof a.onPlaybackStart && a.onPlaybackStart.call(a.callbacksContext || this);
        }, b.prototype._playbackPause = function() {
            var a = this._props;
            null != a.onPlaybackPause && "function" == typeof a.onPlaybackPause && a.onPlaybackPause.call(a.callbacksContext || this);
        }, b.prototype._playbackStop = function() {
            var a = this._props;
            null != a.onPlaybackStop && "function" == typeof a.onPlaybackStop && a.onPlaybackStop.call(a.callbacksContext || this);
        }, b.prototype._playbackComplete = function() {
            var a = this._props;
            null != a.onPlaybackComplete && "function" == typeof a.onPlaybackComplete && a.onPlaybackComplete.call(a.callbacksContext || this);
        }, b.prototype._complete = function(a, b) {
            if (!this._isCompleted) {
                var c = this._props;
                null != c.onComplete && "function" == typeof c.onComplete && c.onComplete.call(c.callbacksContext || this, a > this._prevTime, b), 
                this._isCompleted = !0, this._isStarted = !1, this._isFirstUpdate = !1, this._prevYoyo = void 0;
            }
        }, b.prototype._firstUpdate = function(a, b) {
            if (!this._isFirstUpdate) {
                var c = this._props;
                null != c.onFirstUpdate && "function" == typeof c.onFirstUpdate && (c.onFirstUpdate.tween = this, 
                c.onFirstUpdate.call(c.callbacksContext || this, a > this._prevTime, b)), this._isFirstUpdate = !0;
            }
        }, b.prototype._repeatComplete = function(a, b) {
            if (!this._isRepeatCompleted) {
                var c = this._props;
                null != c.onRepeatComplete && "function" == typeof c.onRepeatComplete && c.onRepeatComplete.call(c.callbacksContext || this, a > this._prevTime, b), 
                this._isRepeatCompleted = !0;
            }
        }, b.prototype._repeatStart = function(a, b) {
            if (!this._isRepeatStart) {
                var c = this._props;
                null != c.onRepeatStart && "function" == typeof c.onRepeatStart && c.onRepeatStart.call(c.callbacksContext || this, a > this._prevTime, b), 
                this._isRepeatStart = !0;
            }
        }, b.prototype._progress = function(a, b) {
            var c = this._props;
            null != c.onProgress && "function" == typeof c.onProgress && c.onProgress.call(c.callbacksContext || this, a, b > this._prevTime);
        }, b.prototype._refresh = function(a) {
            var b = this._props;
            null != b.onRefresh && b.onRefresh.call(b.callbacksContext || this, a);
        }, b.prototype._onTweenerRemove = function() {}, b.prototype._onTweenerFinish = function() {
            this._setPlaybackState("stop"), this._playbackComplete();
        }, b.prototype._setProp = function(b, c) {
            a.prototype._setProp.call(this, b, c), this._calcDimentions();
        }, b.prototype._assignProp = function(b, c) {
            null == c && (c = this._defaults[b]), "easing" === b && (c = o["default"].parseEasing(c));
            var d = this._callbackOverrides[b], e = !c || !c.isMojsCallbackOverride;
            d && e && (c = this._overrideCallback(c, d)), a.prototype._assignProp.call(this, b, c);
        }, b.prototype._overrideCallback = function(a, b) {
            var c = a && "function" == typeof a, d = function() {
                c && a.apply(this, arguments), b.apply(this, arguments);
            };
            return d.isMojsCallbackOverride = !0, d;
        }, b;
    }(q["default"]);
    b["default"] = r;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(26), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(8), n = d(m), o = c(5), p = d(o), q = c(12), r = d(q), s = c(15), t = d(s), u = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype._declareDefaults = function() {
            this._defaults = {
                count: 5,
                degree: 360,
                radius: {
                    0: 50
                },
                radiusX: null,
                radiusY: null,
                width: 0,
                height: 0
            };
        }, b.prototype.then = function(a) {
            this._removeTweenProperties(a);
            var b = this._masterThen(a), c = this._childThen(a);
            return this._setSwirlDuration(b, this._calcPackTime(c)), this.timeline._recalcTotalDuration(), 
            this;
        }, b.prototype.tune = function(a) {
            return null == a ? this : (this._saveTimelineOptions(a), this.timeline._setProp(this._timelineOptions), 
            this._removeTweenProperties(a), this._tuneNewOptions(a), this.masterSwirl.tune(a), 
            this._tuneSwirls(a), this._recalcModulesTime(), this);
        }, b.prototype._extendDefaults = function() {
            this._removeTweenProperties(this._o), a.prototype._extendDefaults.call(this);
        }, b.prototype._removeTweenProperties = function(a) {
            for (var b in t["default"].tweenOptionMap) null == this._defaults[b] && delete a[b];
        }, b.prototype._recalcModulesTime = function() {
            for (var a = this.masterSwirl._modules, b = this._swirls, c = 0, d = 0; d < a.length; d++) {
                var e = a[d].tween, f = this._calcPackTime(b[d]);
                e._setProp({
                    duration: f,
                    shiftTime: c
                }), c += f;
            }
            this.timeline._recalcTotalDuration();
        }, b.prototype._tuneSwirls = function(a) {
            for (var b = this._swirls[0], c = 0; c < b.length; c++) {
                var d = b[c], e = this._getChildOption(a || {}, c), f = null != e.degreeShift;
                f || (e.degreeShift = this._swirls[0][c]._props.degreeShift), this._addBurstProperties(e, c), 
                f || delete e.degreeShift, d.tune(e), this._refreshBurstOptions(d._modules, c);
            }
        }, b.prototype._refreshBurstOptions = function(a, b) {
            for (var c = 1; c < a.length; c++) {
                var d = a[c], e = {};
                this._addBurstProperties(e, b, c), d._tuneNewOptions(e);
            }
        }, b.prototype._masterThen = function(a) {
            this.masterSwirl.then(a);
            var b = t["default"].getLastItem(this.masterSwirl._modules);
            return this._masterSwirls.push(b), b;
        }, b.prototype._childThen = function(a) {
            for (var b = this._swirls[0], c = [], d = 0; d < b.length; d++) {
                var e = this._getChildOption(a, d), f = b[d];
                t["default"].getLastItem(f._modules), e.parent = this.el, this._addBurstProperties(e, d, this._masterSwirls.length - 1), 
                f.then(e), c.push(t["default"].getLastItem(f._modules));
            }
            return this._swirls[this._masterSwirls.length - 1] = c, c;
        }, b.prototype._vars = function() {
            a.prototype._vars.call(this), this._bufferTimeline = new n["default"]();
        }, b.prototype._render = function() {
            this._o.isWithShape = !1, this._o.isSwirl = this._props.isSwirl, this._o.callbacksContext = this, 
            this._saveTimelineOptions(this._o), this.masterSwirl = new w(this._o), this._masterSwirls = [ this.masterSwirl ], 
            this.el = this.masterSwirl.el, this._renderSwirls();
        }, b.prototype._renderSwirls = function() {
            for (var a = this._props, b = [], c = 0; c < a.count; c++) {
                var d = this._getChildOption(this._o, c);
                b.push(new v(this._addOptionalProps(d, c)));
            }
            this._swirls = {
                0: b
            }, this._setSwirlDuration(this.masterSwirl, this._calcPackTime(b));
        }, b.prototype._saveTimelineOptions = function(a) {
            this._timelineOptions = a.timeline, delete a.timeline;
        }, b.prototype._calcPackTime = function(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = a[c].tween, e = d._props;
                b = Math.max(e.repeatTime / e.speed, b);
            }
            return b;
        }, b.prototype._setSwirlDuration = function(a, b) {
            a.tween._setProp("duration", b);
            var c = a.timeline && a.timeline._recalcTotalDuration;
            c && a.timeline._recalcTotalDuration();
        }, b.prototype._getChildOption = function(a, b) {
            var c = {};
            for (var d in a.children) c[d] = this._getPropByMod(d, b, a.children);
            return c;
        }, b.prototype._getPropByMod = function(a, b) {
            var c = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], d = c[a];
            return t["default"].isArray(d) ? d[b % d.length] : d;
        }, b.prototype._addOptionalProps = function(a, b) {
            return a.index = b, a.parent = this.masterSwirl.el, this._addBurstProperties(a, b), 
            a;
        }, b.prototype._addBurstProperties = function(a, b, c) {
            var d = this._index;
            this._index = b;
            var e = this._parseProperty("degreeShift", a.degreeShift || 0);
            this._index = d;
            var f = this._props, g = f.degree % 360 === 0 ? f.count : f.count - 1 || 1, h = f.degree / g, i = this._getSidePoint("start", b * h + e, c), j = this._getSidePoint("end", b * h + e, c);
            a.x = this._getDeltaFromPoints("x", i, j), a.y = this._getDeltaFromPoints("y", i, j), 
            a.angle = this._getBitAngle(a.angle || 0, e, b);
        }, b.prototype._getBitAngle = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], b = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], c = arguments[2], d = this._props, e = d.degree % 360 === 0 ? d.count : d.count - 1 || 1, g = d.degree / e, h = c * g + 90;
            if (h += b, this._isDelta(a)) {
                var i = {}, j = f["default"](a), k = j[0], l = a[k];
                k = t["default"].parseStringOption(k, c), l = t["default"].parseStringOption(l, c), 
                i[parseFloat(k) + h] = parseFloat(l) + h, a = i;
            } else a += h;
            return a;
        }, b.prototype._getSidePoint = function(a, b, c) {
            var d = (this._props, this._getSideRadius(a, c));
            return t["default"].getRadialPoint({
                radius: d.radius,
                radiusX: d.radiusX,
                radiusY: d.radiusY,
                angle: b,
                center: {
                    x: 0,
                    y: 0
                }
            });
        }, b.prototype._getSideRadius = function(a, b) {
            return {
                radius: this._getRadiusByKey("radius", a, b),
                radiusX: this._getRadiusByKey("radiusX", a, b),
                radiusY: this._getRadiusByKey("radiusY", a, b)
            };
        }, b.prototype._getRadiusByKey = function(a, b) {
            var c = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], d = this._masterSwirls[c], e = d._deltas, f = d._props;
            return null != e[a] ? e[a][b] : null != f[a] ? f[a] : void 0;
        }, b.prototype._getDeltaFromPoints = function(a, b, c) {
            var d = {};
            return b[a] === c[a] ? d = b[a] : d[b[a]] = c[a], d;
        }, b.prototype._makeTimeline = function() {
            this._o.timeline = this._timelineOptions, a.prototype._makeTimeline.call(this), 
            this.timeline.add(this.masterSwirl, this._swirls[0]);
        }, b.prototype._makeTween = function() {}, b.prototype._hide = function() {}, b.prototype._show = function() {}, 
        b;
    }(r["default"]), v = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype._declareDefaults = function() {
            a.prototype._declareDefaults.call(this), this._defaults.isSwirl = !1, this._o.duration = null != this._o.duration ? this._o.duration : 700;
        }, b.prototype._calcSwirlXY = function(b) {
            var c = this._props.degreeShift;
            this._props.degreeShift = 0, a.prototype._calcSwirlXY.call(this, b), this._props.degreeShift = c;
        }, b;
    }(p["default"]), w = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype._declareDefaults = function() {
            a.prototype._declareDefaults.call(this), this._defaults.scale = 1, this._defaults.width = 0, 
            this._defaults.height = 0, this._defaults.radius = {
                25: 75
            };
        }, b;
    }(v);
    u.ChildSwirl = v, u.MainSwirl = w, b["default"] = u;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(26), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(13), n = d(m), o = c(11), p = (d(o), 
    c(12)), q = d(p), r = c(10), s = (d(r), c(2)), t = (d(s), c(8)), u = (d(t), c(15)), v = (c(23), 
    c(16)), w = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype._declareDefaults = function() {
            this._defaults = {
                parent: document.body,
                className: "",
                shape: "circle",
                stroke: "transparent",
                strokeOpacity: 1,
                strokeLinecap: "",
                strokeWidth: 2,
                strokeDasharray: 0,
                strokeDashoffset: 0,
                fill: "deeppink",
                fillOpacity: 1,
                isSoftHide: !0,
                isForce3d: !1,
                left: "50%",
                top: "50%",
                x: 0,
                y: 0,
                angle: 0,
                scale: 1,
                scaleX: null,
                scaleY: null,
                origin: "50% 50%",
                opacity: 1,
                rx: 0,
                ry: 0,
                points: 3,
                radius: 50,
                radiusX: null,
                radiusY: null,
                isShowStart: !1,
                isShowEnd: !0,
                isRefreshState: !0,
                duration: 400,
                width: null,
                height: null,
                isWithShape: !0,
                callbacksContext: this
            };
        }, b.prototype.tune = function(b) {
            return a.prototype.tune.call(this, b), this._getMaxSizeInChain(), this;
        }, b.prototype.then = function(b) {
            return a.prototype.then.call(this, b), this._getMaxSizeInChain(), this;
        }, b.prototype._vars = function() {
            return a.prototype._vars.call(this), this._lastSet = {}, this._masterModule = this._o.masterModule, 
            this._prevChainModule = this._o.prevChainModule, this._isChained = !!this._masterModule, 
            this.isForeign = !!this._o.ctx, this.isForeignBit = !!this._o.shape;
        }, b.prototype._render = function() {
            return this._isRendered || this._isChained ? this._isChained && (this.el = this._masterModule.el, 
            this.shapeModule = this._masterModule.shapeModule) : (this.el = document.createElement("div"), 
            this.el.setAttribute("data-name", "mojs-shape"), this.el.setAttribute("class", this._props.className), 
            this._createShape(), this._props.parent.appendChild(this.el), this._setElStyles(), 
            this._setProgress(0, 0), this._props.isShowStart ? this._show() : this._hide(), 
            this._isRendered = !0), this;
        }, b.prototype._setElStyles = function() {
            if (this.el) {
                var a = this._props, b = this.el.style, c = a.shapeWidth, d = a.shapeHeight;
                if (b.position = "absolute", this._setElSizeStyles(c, d), a.isForce3d) {
                    var e = "backface-visibility";
                    b["" + e] = "hidden", b["" + u.prefix.css + e] = "hidden";
                }
            }
        }, b.prototype._setElSizeStyles = function(a, b) {
            var c = this.el.style;
            c.width = a + "px", c.height = b + "px", c["margin-left"] = -a / 2 + "px", c["margin-top"] = -b / 2 + "px";
        }, b.prototype._draw = function() {
            if (this.shapeModule) {
                var a = this._props, b = this.shapeModule._props;
                b.rx = a.rx, b.ry = a.ry, b.stroke = a.stroke, b["stroke-width"] = a.strokeWidth, 
                b["stroke-opacity"] = a.strokeOpacity, b["stroke-dasharray"] = a.strokeDasharray, 
                b["stroke-dashoffset"] = a.strokeDashoffset, b["stroke-linecap"] = a.strokeLinecap, 
                b.fill = a.fill, b["fill-opacity"] = a.fillOpacity, b.radius = a.radius, b.radiusX = a.radiusX, 
                b.radiusY = a.radiusY, b.points = a.points, this.shapeModule._draw(), this._drawEl();
            }
        }, b.prototype._drawEl = function() {
            if (null == this.el) return !0;
            var a = this._props, b = this.el.style;
            if (this._isPropChanged("opacity") && (b.opacity = a.opacity), !this.isForeign) {
                this._isPropChanged("left") && (b.left = a.left), this._isPropChanged("top") && (b.top = a.top);
                var c = this._isPropChanged("x"), d = this._isPropChanged("y"), e = c || d, f = this._isPropChanged("scaleX"), g = this._isPropChanged("scaleY"), h = this._isPropChanged("scale"), h = h || f || g, i = this._isPropChanged("angle");
                if (e || h || i) {
                    var j = this._fillTransform();
                    b[u.prefix.css + "transform"] = j, b.transform = j;
                }
                if (this._isPropChanged("origin") || this._deltas.origin) {
                    var k = this._fillOrigin();
                    b[u.prefix.css + "transform-origin"] = k, b["transform-origin"] = k;
                }
            }
        }, b.prototype._isPropChanged = function(a) {
            return null == this._lastSet[a] && (this._lastSet[a] = {}), this._lastSet[a].value !== this._props[a] ? (this._lastSet[a].value = this._props[a], 
            !0) : !1;
        }, b.prototype._tuneNewOptions = function(b) {
            return a.prototype._tuneNewOptions.call(this, b), null != b && f["default"](b).length ? void this._setElStyles() : 1;
        }, b.prototype._getMaxRadius = function(a) {
            var b;
            return b = this._getRadiusSize("radius"), this._getRadiusSize(a, b);
        }, b.prototype._increaseSizeWithEasing = function() {
            var a = this._props, b = this._o.easing, c = b && "string" == typeof b;
            switch (c && b.toLowerCase()) {
              case "elastic.out":
              case "elastic.inout":
                a.size *= 1.25;
                break;

              case "back.out":
              case "back.inout":
                a.size *= 1.1;
            }
        }, b.prototype._getRadiusSize = function(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], c = this._deltas[a];
            return null != c ? Math.max(Math.abs(c.end), Math.abs(c.start)) : null != this._props[a] ? parseFloat(this._props[a]) : b;
        }, b.prototype._getShapeSize = function() {
            var a = this._props, b = this._getMaxStroke();
            a.shapeWidth = null != a.width ? a.width : 2 * this._getMaxRadius("radiusX") + b, 
            a.shapeHeight = null != a.height ? a.height : 2 * this._getMaxRadius("radiusY") + b;
        }, b.prototype._createShape = function() {
            if (this._getShapeSize(), this._props.isWithShape) {
                var a = this._props, b = v.getShape(this._props.shape);
                this.shapeModule = new b({
                    width: a.shapeWidth,
                    height: a.shapeHeight,
                    parent: this.el
                });
            }
        }, b.prototype._getMaxSizeInChain = function() {
            for (var a = (this._props, 0), b = 0, c = 0; c < this._modules.length; c++) this._modules[c]._getShapeSize(), 
            a = Math.max(a, this._modules[c]._props.shapeWidth), b = Math.max(b, this._modules[c]._props.shapeHeight);
            this.shapeModule && this.shapeModule._setSize(a, b), this._setElSizeStyles(a, b);
        }, b.prototype._getMaxStroke = function() {
            var a = this._props, b = this._deltas.strokeWidth;
            return null != b ? Math.max(b.start, b.end) : a.strokeWidth;
        }, b.prototype._setProgress = function(a, b) {
            n["default"].prototype._setProgress.call(this, a, b), this._draw(a);
        }, b.prototype._applyCallbackOverrides = function(a) {
            var b = this, c = this._props;
            a.callbackOverrides = {
                onUpdate: function(a, c) {
                    return b._setProgress(a, c);
                },
                onStart: function(a) {
                    b._isChained || (a ? b._show() : c.isShowStart || b._hide());
                },
                onComplete: function(a) {
                    b._isLastInChain() && (a ? c.isShowEnd || b._hide() : b._show());
                },
                onRefresh: function(a) {
                    c.isRefreshState && a && b._refreshBefore();
                }
            };
        }, b.prototype._transformTweenOptions = function() {
            this._applyCallbackOverrides(this._o);
        }, b.prototype._fillTransform = function() {
            var a = this._props, b = null != a.scaleX ? a.scaleX : a.scale, c = null != a.scaleY ? a.scaleY : a.scale, d = b + ", " + c;
            return "translate(" + a.x + ", " + a.y + ") rotate(" + a.angle + "deg) scale(" + d + ")";
        }, b.prototype._fillOrigin = function() {
            for (var a = this._props, b = "", c = 0; c < a.origin.length; c++) b += a.origin[c].string + " ";
            return b;
        }, b.prototype._refreshBefore = function() {
            this._setProgress(this.tween._props.easing(0), 0), this._props.isShowStart ? this._show() : this._hide();
        }, b;
    }(q["default"]);
    b["default"] = w;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(21), h = d(g), i = c(22), j = d(i), k = c(4), l = d(k), m = c(15), n = d(m), o = function(a) {
        function b() {
            return f["default"](this, b), h["default"](this, a.apply(this, arguments));
        }
        return j["default"](b, a), b.prototype._declareDefaults = function() {
            a.prototype._declareDefaults.call(this), this._defaults.isSwirl = !0, this._defaults.swirlSize = 10, 
            this._defaults.swirlFrequency = 3, this._defaults.pathScale = 1, this._defaults.degreeShift = 0, 
            this._defaults.radius = 5, this._defaults.x = 0, this._defaults.y = 0, this._defaults.scale = {
                1: 0
            }, this._defaults.direction = 1;
        }, b.prototype._extendDefaults = function() {
            a.prototype._extendDefaults.call(this), this._calcPosData();
        }, b.prototype._tuneNewOptions = function(b) {
            null != b && (a.prototype._tuneNewOptions.call(this, b), (null != b.x || null != b.y) && this._calcPosData());
        }, b.prototype._calcPosData = function() {
            var a = this._getPosValue("x"), b = this._getPosValue("y"), c = 90 + Math.atan(b.delta / a.delta || 0) * n["default"].RAD_TO_DEG;
            this._posData = {
                radius: Math.sqrt(a.delta * a.delta + b.delta * b.delta),
                angle: a.delta < 0 ? c + 180 : c,
                x: a,
                y: b
            };
        }, b.prototype._getPosValue = function(a) {
            var b = this._deltas[a];
            if (b) return delete this._deltas[a], {
                start: b.start.value,
                end: b.end.value,
                delta: b.delta,
                units: b.end.unit
            };
            var c = n["default"].parseUnit(this._props[a]);
            return {
                start: c.value,
                end: c.value,
                delta: 0,
                units: c.unit
            };
        }, b.prototype._setProgress = function(a, b) {
            this._progress = a, this._calcCurrentProps(a, b), this._calcSwirlXY(a), this._draw(a);
        }, b.prototype._calcSwirlXY = function(a) {
            var b = this._props, c = this._posData.angle + b.degreeShift, d = n["default"].getRadialPoint({
                angle: b.isSwirl ? c + this._getSwirl(a) : c,
                radius: a * this._posData.radius * b.pathScale,
                center: {
                    x: this._posData.x.start,
                    y: this._posData.y.start
                }
            }), e = d.x, f = d.y, g = 1e-6;
            e > 0 && g > e && (e = g), f > 0 && g > f && (f = g), 0 > e && e > -g && (e = -g), 
            0 > f && f > -g && (f = -g), b.x = this._o.ctx ? e : "" + e + this._posData.x.units, 
            b.y = this._o.ctx ? f : "" + f + this._posData.y.units;
        }, b.prototype._getSwirl = function(a) {
            var b = this._props;
            return b.direction * b.swirlSize * Math.sin(b.swirlFrequency * a);
        }, b.prototype._draw = function() {
            var a = this._props.isWithShape ? "_draw" : "_drawEl";
            l["default"].prototype[a].call(this);
        }, b;
    }(l["default"]);
    b["default"] = o;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    var e = c(26), f = d(e), g = c(20), h = d(g), i = c(15), j = d(i), k = c(8), l = d(k), m = function() {
        function a(b, c) {
            return h["default"](this, a), this.init(b, c);
        }
        return a.prototype._getOptionByMod = function(a, b, c) {
            var d = c[a];
            (d + "" == "[object NodeList]" || d + "" == "[object HTMLCollection]") && (d = Array.prototype.slice.call(d, 0));
            var e = j["default"].isArray(d) ? d[b % d.length] : d;
            return j["default"].parseIfStagger(e, b);
        }, a.prototype._getOptionByIndex = function(a, b) {
            var c = this, d = {};
            return f["default"](b).forEach(function(e) {
                return d[e] = c._getOptionByMod(e, a, b);
            }), d;
        }, a.prototype._getChildQuantity = function(a, b) {
            if ("number" == typeof a) return a;
            var c = b[a];
            return j["default"].isArray(c) ? c.length : c + "" == "[object NodeList]" ? c.length : c + "" == "[object HTMLCollection]" ? Array.prototype.slice.call(c, 0).length : c instanceof HTMLElement ? 1 : "string" == typeof c ? 1 : void 0;
        }, a.prototype._createTimeline = function() {
            var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            this.timeline = new l["default"]({
                onStart: a.onStaggerStart,
                onUpdate: a.onStaggerUpdate,
                onComplete: a.onStaggerComplete,
                onReverseComplete: a.onStaggerReverseComplete,
                delay: a.moduleDelay
            });
        }, a.prototype.init = function(a, b) {
            var c = this._getChildQuantity(a.quantifier || "el", a);
            this._createTimeline(a), this.childModules = [];
            for (var d = 0; c > d; d++) {
                var e = this._getOptionByIndex(d, a);
                e.isRunLess = !0;
                var f = new b(e);
                this.childModules.push(f), this.timeline.add(f);
            }
            return this;
        }, a.prototype.run = function() {
            this.timeline.play();
        }, a;
    }();
    a.exports = function(a) {
        return function(b) {
            return new m(b, a);
        };
    };
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(15), h = d(g), i = c(2), j = d(i), k = c(8), l = d(k), m = function() {
        function a() {
            var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            return f["default"](this, a), this.o = b, this.o.el ? (this._vars(), this._declareDefaults(), 
            this._extendDefaults(), this._parseFrames(), this._frames.length <= 2 && h["default"].warn("Spriter: only " + this._frames.length + " frames found"), 
            this._frames.length < 1 && h["default"].error("Spriter: there is no frames to animate, aborting"), 
            this._createTween(), this) : h["default"].error('No "el" option specified, aborting');
        }
        return a.prototype._declareDefaults = function() {
            this._defaults = {
                duration: 500,
                delay: 0,
                easing: "linear.none",
                repeat: 0,
                yoyo: !1,
                isRunLess: !1,
                isShowEnd: !1,
                onStart: null,
                onUpdate: null,
                onComplete: null
            };
        }, a.prototype._vars = function() {
            this._props = h["default"].cloneObj(this.o), this.el = this.o.el, this._frames = [];
        }, a.prototype.run = function(a) {
            return this.timeline.play();
        }, a.prototype._extendDefaults = function() {
            return h["default"].extend(this._props, this._defaults);
        }, a.prototype._parseFrames = function() {
            this._frames = Array.prototype.slice.call(this.el.children, 0), this._frames.forEach(function(a, b) {
                return a.style.opacity = 0;
            }), this._frameStep = 1 / this._frames.length;
        }, a.prototype._createTween = function() {
            var a = this;
            this._tween = new j["default"]({
                duration: this._props.duration,
                delay: this._props.delay,
                yoyo: this._props.yoyo,
                repeat: this._props.repeat,
                easing: this._props.easing,
                onStart: function() {
                    return a._props.onStart && a._props.onStart();
                },
                onComplete: function() {
                    return a._props.onComplete && a._props.onComplete();
                },
                onUpdate: function(b) {
                    return a._setProgress(b);
                }
            }), this.timeline = new l["default"](), this.timeline.add(this._tween), this._props.isRunLess || this._startTween();
        }, a.prototype._startTween = function() {
            var a = this;
            setTimeout(function() {
                return a.timeline.play();
            }, 1);
        }, a.prototype._setProgress = function(a) {
            var b = Math.floor(a / this._frameStep);
            if (this._prevFrame != this._frames[b]) {
                this._prevFrame && (this._prevFrame.style.opacity = 0);
                var c = 1 === a && this._props.isShowEnd ? b - 1 : b;
                this._frames[c] && (this._frames[c].style.opacity = 1), this._prevFrame = this._frames[b];
            }
            this._props.onUpdate && this._props.onUpdate(a);
        }, a;
    }();
    b["default"] = m;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(27), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(15), n = d(m), o = c(9), p = (d(o), 
    c(2)), q = d(p), r = function(a) {
        function b() {
            var c = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            return h["default"](this, b), j["default"](this, a.call(this, c));
        }
        return l["default"](b, a), b.prototype.add = function() {
            for (var a = arguments.length, b = Array(a), c = 0; a > c; c++) b[c] = arguments[c];
            return this._pushTimelineArray(b), this._calcDimentions(), this;
        }, b.prototype.append = function() {
            for (var a = arguments.length, b = Array(a), c = 0; a > c; c++) b[c] = arguments[c];
            for (var d = b, e = Array.isArray(d), g = 0, d = e ? d : f["default"](d); ;) {
                var h;
                if (e) {
                    if (g >= d.length) break;
                    h = d[g++];
                } else {
                    if (g = d.next(), g.done) break;
                    h = g.value;
                }
                var i = h;
                n["default"].isArray(i) ? this._appendTimelineArray(i) : this._appendTimeline(i, this._timelines.length), 
                this._calcDimentions();
            }
            return this;
        }, b.prototype.stop = function(b) {
            return a.prototype.stop.call(this, b), this._stopChildren(b), this;
        }, b.prototype.reset = function() {
            return a.prototype.reset.call(this), this._resetChildren(), this;
        }, b.prototype._resetChildren = function() {
            for (var a = 0; a < this._timelines.length; a++) this._timelines[a].reset();
        }, b.prototype._stopChildren = function(a) {
            for (var b = this._timelines.length - 1; b >= 0; b--) this._timelines[b].stop(a);
        }, b.prototype._appendTimelineArray = function(a) {
            for (var b = a.length, c = this._props.repeatTime - this._props.delay, d = this._timelines.length; b--; ) this._appendTimeline(a[b], d, c);
        }, b.prototype._appendTimeline = function(a, c, d) {
            a.timeline instanceof b && (a = a.timeline), a.tween instanceof q["default"] && (a = a.tween);
            var e = null != d ? d : this._props.duration;
            e += a._props.shiftTime || 0, a.index = c, this._pushTimeline(a, e);
        }, b.prototype._pushTimelineArray = function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                n["default"].isArray(c) ? this._pushTimelineArray(c) : this._pushTimeline(c);
            }
        }, b.prototype._pushTimeline = function(a, c) {
            a.timeline instanceof b && (a = a.timeline), a.tween instanceof q["default"] && (a = a.tween), 
            null != c && a._setProp({
                shiftTime: c
            }), this._timelines.push(a), this._recalcDuration(a);
        }, b.prototype._setProgress = function(a, b, c) {
            q["default"].prototype._setProgress.call(this, a, b), this._updateChildren(a, b, c);
        }, b.prototype._updateChildren = function(a, b, c) {
            this._o.isIt && console.log(b, this._prevTime);
            var d = b > this._prevTime ? -1 : 1;
            this._props.isYoyo && c && (d *= -1);
            var e = this._props.startTime + a * this._props.duration, f = e + d, g = this._timelines.length;
            this._o.isIt && console.log("update children", e, f);
            for (var h = 0; g > h; h++) {
                var i = e > f ? h : g - 1 - h;
                this._timelines[i]._update(e, f, this._prevYoyo, this._onEdge);
            }
            this._prevYoyo = c;
        }, b.prototype._recalcDuration = function(a) {
            var b = a._props, c = b.repeatTime / b.speed + (b.shiftTime || 0);
            this._props.duration = Math.max(c, this._props.duration);
        }, b.prototype._recalcTotalDuration = function() {
            var a = this._timelines.length;
            for (this._props.duration = 0; a--; ) {
                var b = this._timelines[a];
                b._recalcTotalDuration && b._recalcTotalDuration(), this._recalcDuration(b);
            }
            this._calcDimentions();
        }, b.prototype._setStartTime = function(b) {
            var c = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1];
            a.prototype._setStartTime.call(this, b), this._startTimelines(this._props.startTime, c);
        }, b.prototype._startTimelines = function(a) {
            var b = arguments.length <= 1 || void 0 === arguments[1] ? !0 : arguments[1], c = (this._props, 
            "stop" === this._state);
            null == a && (a = this._props.startTime);
            for (var d = 0; d < this._timelines.length; d++) {
                var e = this._timelines[d];
                e._setStartTime(a, b), b || null == e._prevTime || c || (e._prevTime = e._normPrevTimeForward());
            }
        }, b.prototype._refresh = function(b) {
            a.prototype._refresh.call(this, b);
            for (var c = this._timelines.length, d = 0; c > d; d++) this._timelines[d]._refresh(b);
        }, b.prototype._declareDefaults = function() {
            null != this._o.duration && (n["default"].error('Duration can not be declared on Timeline, but "' + this._o.duration + '" is. You probably want to use Tween instead.'), 
            this._o.duration = 0), a.prototype._declareDefaults.call(this), this._defaults.duration = 0, 
            this._defaults.easing = "Linear.None", this._defaults.backwardEasing = "Linear.None", 
            this._defaults.nameBase = "Timeline";
        }, b.prototype._vars = function() {
            this._timelines = [], a.prototype._vars.call(this);
        }, b;
    }(q["default"]);
    b["default"] = r;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e);
    c(24), c(25);
    var g = c(15), h = (d(g), function() {
        function a() {
            return f["default"](this, a), this._vars(), this;
        }
        return a.prototype._vars = function() {
            this.tweens = [], this._loop = this._loop.bind(this);
        }, a.prototype._loop = function() {
            return this._isRunning ? (this._update(window.performance.now()), this.tweens.length ? (requestAnimationFrame(this._loop), 
            this) : this._isRunning = !1) : !1;
        }, a.prototype._startLoop = function() {
            this._isRunning || (this._isRunning = !0, requestAnimationFrame(this._loop));
        }, a.prototype._stopLoop = function() {
            this._isRunning = !1;
        }, a.prototype._update = function(a) {
            for (var b = this.tweens.length; b--; ) {
                var c = this.tweens[b];
                c && c._update(a) === !0 && (this.remove(c), c._onTweenerFinish(), c._prevTime = void 0);
            }
        }, a.prototype.add = function(a) {
            a._isRunning || (a._isRunning = !0, this.tweens.push(a), this._startLoop());
        }, a.prototype.removeAll = function() {
            this.tweens.length = 0;
        }, a.prototype.remove = function(a) {
            var b = "number" == typeof a ? a : this.tweens.indexOf(a);
            -1 !== b && (a = this.tweens[b], a && (a._isRunning = !1, this.tweens.splice(b, 1), 
            a._onTweenerRemove()));
        }, a;
    }()), i = new h();
    b["default"] = i;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(21), h = d(g), i = c(22), j = d(i), k = c(2), l = d(k), m = c(8), n = d(m), o = c(13), p = d(o), q = function(a) {
        function b() {
            var c = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            f["default"](this, b);
            var d = h["default"](this, a.call(this, c));
            return d._transformTweenOptions(), !d._o.isTweenLess && d._makeTween(), !d._o.isTimelineLess && d._makeTimeline(), 
            d;
        }
        return j["default"](b, a), b.prototype.play = function() {
            return this.timeline.play.apply(this.timeline, arguments), this;
        }, b.prototype.playBackward = function() {
            return this.timeline.playBackward.apply(this.timeline, arguments), this;
        }, b.prototype.pause = function() {
            return this.timeline.pause.apply(this.timeline, arguments), this;
        }, b.prototype.stop = function() {
            return this.timeline.stop.apply(this.timeline, arguments), this;
        }, b.prototype.reset = function() {
            return this.timeline.reset.apply(this.timeline, arguments), this;
        }, b.prototype.replay = function() {
            return this.timeline.replay.apply(this.timeline, arguments), this;
        }, b.prototype.replayBackward = function() {
            return this.timeline.replayBackward.apply(this.timeline, arguments), this;
        }, b.prototype.setProgress = function() {
            return this.timeline.setProgress.apply(this.timeline, arguments), this;
        }, b.prototype.setSpeed = function(a) {
            return this.timeline.setSpeed.apply(this.timeline, arguments), this;
        }, b.prototype._transformTweenOptions = function() {}, b.prototype._makeTween = function() {
            this._o.callbacksContext = this._o.callbacksContext || this, this.tween = new l["default"](this._o), 
            this._o.isTimelineLess && (this.timeline = this.tween);
        }, b.prototype._makeTimeline = function() {
            this._o.timeline = this._o.timeline || {}, this._o.timeline.callbacksContext = this._o.callbacksContext || this, 
            this.timeline = new n["default"](this._o.timeline), this._isTimeline = !0, this.tween && this.timeline.add(this.tween);
        }, b;
    }(p["default"]);
    b["default"] = q;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(26), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(10), n = d(m), o = c(15), p = d(o), q = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype.then = function(a) {
            if (null == a || !f["default"](a)) return 1;
            var b = this._history[this._history.length - 1], c = (this._modules[this._modules.length - 1], 
            this._mergeThenOptions(b, a));
            this._resetMergedFlags(c);
            var d = new this.constructor(c);
            return d._masterModule = this, this._modules.push(d), this.timeline.append(d), this;
        }, b.prototype._resetMergedFlags = function(a) {
            return a.isTimelineLess = !0, a.isShowStart = !1, a.isRefreshState = !1, a.callbacksContext = this._props.callbacksContext, 
            a.prevChainModule = p["default"].getLastItem(this._modules), a.masterModule = this, 
            a;
        }, b.prototype._vars = function() {
            a.prototype._vars.call(this);
            var b = p["default"].cloneObj(this._props);
            for (var c in this._arrayPropertyMap) if (this._o[c]) {
                var d = this._parsePreArrayProperty(c, this._o[c]);
                b[c] = d;
            }
            this._history = [ b ], this._modules = [ this ], this._nonMergeProps = {
                shape: 1
            };
        }, b.prototype._mergeThenOptions = function(a, b) {
            var c = {};
            return this._mergeStartLoop(c, a), this._mergeEndLoop(c, a, b), this._history.push(c), 
            c;
        }, b.prototype._mergeStartLoop = function(a, b) {
            for (var c in b) {
                var d = b[c];
                null != b[c] && (p["default"].isTweenProp(c) && "duration" !== c || (a[c] = this._isDelta(d) ? p["default"].getDeltaEnd(d) : d));
            }
        }, b.prototype._mergeEndLoop = function(a, b, c) {
            f["default"](c);
            for (var d in c) if ("parent" != d) {
                var e = c[d], g = null != b[d] ? b[d] : this._defaults[d];
                if (null != e) {
                    var h = "radiusX" === d || "radiusY" === d;
                    h && null == g && (g = b.radius);
                    var h = "scaleX" === d || "scaleY" === d;
                    h && null == g && (g = b.scale), a[d] = this._mergeThenProperty(d, g, e);
                }
            } else a[d] = c[d];
        }, b.prototype._mergeThenProperty = function(a, b, c) {
            var d, e, f = "boolean" == typeof c;
            if (p["default"].isTweenProp(a) || this._nonMergeProps[a] || f) return c;
            if (p["default"].isObject(c) && null != c.to && (d = c.curve, e = c.easing, c = c.to), 
            this._isDelta(c)) return this._parseDeltaValues(a, c);
            var g = this._parsePreArrayProperty(a, c);
            if (this._isDelta(b)) {
                var h;
                return h = {}, h[p["default"].getDeltaEnd(b)] = g, h.easing = e, h.curve = d, h;
            }
            var i;
            return i = {}, i[b] = g, i.easing = e, i.curve = d, i;
        }, b.prototype._getArrayLength = function(a) {
            return p["default"].isArray(a) ? a.length : -1;
        }, b.prototype._isDelta = function(a) {
            var b = p["default"].isObject(a);
            return b = b && !a.unit, !(!b || p["default"].isArray(a) || p["default"].isDOM(a));
        }, b.prototype._isFirstInChain = function() {
            return !this._masterModule;
        }, b.prototype._isLastInChain = function() {
            var a = this._masterModule;
            return a ? this === p["default"].getLastItem(a._modules) : 1 === this._modules.length;
        }, b;
    }(n["default"]);
    b["default"] = q;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(26), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(15), n = d(m), o = c(11), p = d(o), q = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype.tune = function(a) {
            if (a && f["default"](a).length) {
                this._transformHistory(a), this._tuneNewOptions(a), this._history[0] = n["default"].cloneObj(this._props);
                for (var b in this._arrayPropertyMap) null != a[b] && (this._history[0][b] = this._preparsePropValue(b, a[b]));
                this._tuneSubModules(), this._resetTweens();
            }
            return this;
        }, b.prototype.generate = function() {
            return this.tune(this._o);
        }, b.prototype._transformHistory = function(a) {
            for (var b in a) {
                var c = a[b];
                this._transformHistoryFor(b, this._preparsePropValue(b, c));
            }
        }, b.prototype._transformHistoryFor = function(a, b) {
            for (var c = 0; c < this._history.length && (!(b = this._transformHistoryRecord(c, a, b)) || null != b); c++) ;
        }, b.prototype._transformHistoryRecord = function(a, b, c, d, e) {
            if (null == c) return null;
            d = null == d ? this._history[a] : d, e = null == e ? this._history[a + 1] : e;
            var f = d[b], g = null == e ? null : e[b];
            if (0 === a) {
                if (d[b] = c, n["default"].isTweenProp(b) && "duration" !== b) return null;
                var h = this._isRewriteNext(f, g), i = this._isDelta(c) ? n["default"].getDeltaEnd(c) : c;
                return h ? i : null;
            }
            if (this._isDelta(f)) {
                var j;
                return d[b] = (j = {}, j[c] = n["default"].getDeltaEnd(f), j), null;
            }
            return d[b] = c, this._isRewriteNext(f, g) ? c : null;
        }, b.prototype._isRewriteNext = function(a, b) {
            if (null == b && null != a) return !1;
            var c = a === b, d = this._isDelta(b), e = this._isDelta(a), f = !1, g = !1;
            return e && d ? n["default"].getDeltaEnd(a) == n["default"].getDeltaStart(b) && (g = !0) : d && (f = n["default"].getDeltaStart(b) === "" + a), 
            c || f || g;
        }, b.prototype._tuneSubModules = function() {
            for (var a = 1; a < this._modules.length; a++) this._modules[a]._tuneNewOptions(this._history[a]);
        }, b.prototype._resetTweens = function() {
            var a = 0, b = 0, c = this.timeline._timelines;
            if (null != c) {
                for (var a = 0; a < c.length; a++) {
                    var d = c[a], e = c[a - 1];
                    b += e ? e._props.repeatTime : 0, this._resetTween(d, this._history[a], b);
                }
                this.timeline._setProp(this._props.timeline), this.timeline._recalcTotalDuration();
            }
        }, b.prototype._resetTween = function(a, b) {
            var c = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2];
            b.shiftTime = c, a._setProp(b);
        }, b;
    }(p["default"]);
    b["default"] = q;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(19), f = d(e), g = c(20), h = d(g), i = c(15), j = d(i), k = function() {
        function a() {
            var b = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            h["default"](this, a), this._o = b, this._index = this._o.index || 0, this._arrayPropertyMap = {
                strokeDashoffset: 1,
                strokeDasharray: 1,
                origin: 1
            }, this._skipPropsDelta = {
                timeline: 1,
                prevChainModule: 1,
                callbacksContext: 1
            }, this._declareDefaults(), this._extendDefaults(), this._vars(), this._render();
        }
        return a.prototype._declareDefaults = function() {
            this._defaults = {};
        }, a.prototype._vars = function() {
            this._progress = 0, this._strokeDasharrayBuffer = [];
        }, a.prototype._render = function() {}, a.prototype._setProp = function(a, b) {
            if ("object" === ("undefined" == typeof a ? "undefined" : f["default"](a))) for (var c in a) this._assignProp(c, a[c]); else this._assignProp(a, b);
        }, a.prototype._assignProp = function(a, b) {
            this._props[a] = b;
        }, a.prototype._show = function() {
            var a = this._props;
            this.el && (a.isSoftHide ? (this.el.style.opacity = a.opacity, j["default"].setPrefixedStyle(this.el, "transform", this._fillTransform())) : this.el.style.display = "block", 
            this._isShown = !0);
        }, a.prototype._hide = function() {
            this.el && (this._props.isSoftHide ? (this.el.style.opacity = 0, j["default"].setPrefixedStyle(this.el, "transform", "scale(0)")) : this.el.style.display = "none", 
            this._isShown = !1);
        }, a.prototype._parseOptionString = function(a) {
            return "string" == typeof a && a.match(/stagger/) && (a = j["default"].parseStagger(a, this._index)), 
            "string" == typeof a && a.match(/rand/) && (a = j["default"].parseRand(a)), a;
        }, a.prototype._parsePositionOption = function(a, b) {
            return j["default"].unitOptionMap[a] && (b = j["default"].parseUnit(b).string), 
            b;
        }, a.prototype._parseStrokeDashOption = function(a, b) {
            var c = b;
            if (this._arrayPropertyMap[a]) {
                var c = [];
                switch ("undefined" == typeof b ? "undefined" : f["default"](b)) {
                  case "number":
                    c.push(j["default"].parseUnit(b));
                    break;

                  case "string":
                    for (var d = b.split(" "), e = 0; e < d.length; e++) c.push(j["default"].parseUnit(d[e]));
                }
            }
            return c;
        }, a.prototype._isDelta = function(a) {
            var b = j["default"].isObject(a);
            return b = b && !a.unit, !(!b || j["default"].isArray(a) || j["default"].isDOM(a));
        }, a.prototype._getDelta = function(a, b) {
            var c;
            if ("left" !== a && "top" !== a || this._o.ctx || j["default"].warn("Consider to animate x/y properties instead of left/top,\n        as it would be much more performant", b), 
            !this._skipPropsDelta || !this._skipPropsDelta[a]) {
                c = j["default"].parseDelta(a, b, this._index), null != c.type && (this._deltas[a] = c);
                var d = "object" === f["default"](c.end) ? 0 === c.end.value ? 0 : c.end.string : c.end;
                this._props[a] = d;
            }
        }, a.prototype._extendDefaults = function() {
            this._props = {}, this._deltas = {};
            for (var a in this._defaults) {
                var b = null != this._o[a] ? this._o[a] : this._defaults[a];
                this._parseOption(a, b);
            }
        }, a.prototype._tuneNewOptions = function(a) {
            this._hide();
            for (var b in a) a && delete this._deltas[b], this._o[b] = a[b], this._parseOption(b, a[b]);
        }, a.prototype._parseOption = function(a, b) {
            if (this._isDelta(b) && !this._skipPropsDelta[a]) {
                this._getDelta(a, b);
                var c = j["default"].getDeltaEnd(b);
                return this._assignProp(a, this._parseProperty(a, c));
            }
            this._assignProp(a, this._parseProperty(a, b));
        }, a.prototype._parsePreArrayProperty = function(a, b) {
            return b = this._parseOptionString(b), this._parsePositionOption(a, b);
        }, a.prototype._parseProperty = function(a, b) {
            return "parent" === a ? j["default"].parseEl(b) : (b = this._parsePreArrayProperty(a, b), 
            this._parseStrokeDashOption(a, b));
        }, a.prototype._parseDeltaValues = function(a, b) {
            var c = {};
            for (var d in b) {
                var e = b[d], f = this._parsePreArrayProperty(a, e);
                c[this._parsePreArrayProperty(a, d)] = f;
            }
            return c;
        }, a.prototype._preparsePropValue = function(a, b) {
            return this._isDelta(b) ? this._parseDeltaValues(a, b) : this._parsePreArrayProperty(a, b);
        }, a.prototype._calcCurrentProps = function(a, b) {
            for (var c in this._deltas) {
                var d = this._deltas[c], e = !!d.curve, f = null == d.easing || e ? a : d.easing(b);
                if ("array" === d.type) {
                    var g;
                    j["default"].isArray(this._props[c]) ? (g = this._props[c], g.length = 0) : g = [];
                    for (var h = e ? d.curve(b) : null, i = 0; i < d.delta.length; i++) {
                        var k = d.delta[i], l = e ? h * (d.start[i].value + b * k.value) : d.start[i].value + f * k.value;
                        g.push({
                            string: "" + l + k.unit,
                            value: l,
                            unit: k.unit
                        });
                    }
                    this._props[c] = g;
                } else if ("number" === d.type) this._props[c] = e ? d.curve(b) * (d.start + b * d.delta) : d.start + f * d.delta; else if ("unit" === d.type) {
                    var m = e ? d.curve(b) * (d.start.value + b * d.delta) : d.start.value + f * d.delta;
                    this._props[c] = "" + m + d.end.unit;
                } else if ("color" === d.type) {
                    var n, o, p, q;
                    e ? (n = parseInt(d.curve(b) * (d.start.r + b * d.delta.r), 10), o = parseInt(d.curve(b) * (d.start.g + b * d.delta.g), 10), 
                    p = parseInt(d.curve(b) * (d.start.b + b * d.delta.b), 10), q = parseFloat(d.curve(b) * (d.start.a + b * d.delta.a))) : (n = parseInt(d.start.r + f * d.delta.r, 10), 
                    o = parseInt(d.start.g + f * d.delta.g, 10), p = parseInt(d.start.b + f * d.delta.b, 10), 
                    q = parseFloat(d.start.a + f * d.delta.a)), this._props[c] = "rgba(" + n + "," + o + "," + p + "," + q + ")";
                }
            }
        }, a.prototype._setProgress = function(a, b) {
            this._progress = a, this._calcCurrentProps(a, b);
        }, a;
    }();
    b["default"] = k;
}, function(a, b, c) {
    a.exports = function(a) {
        return a.webpackPolyfill || (a.deprecate = function() {}, a.paths = [], a.children = [], 
        a.webpackPolyfill = 1), a;
    };
}, function(a, b, c) {
    var d, e;
    d = function() {
        function a() {
            this.vars();
        }
        return a.prototype.NS = "http://www.w3.org/2000/svg", a.prototype.logBadgeCss = "background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;", 
        a.prototype.shortColors = {
            transparent: "rgba(0,0,0,0)",
            none: "rgba(0,0,0,0)",
            aqua: "rgb(0,255,255)",
            black: "rgb(0,0,0)",
            blue: "rgb(0,0,255)",
            fuchsia: "rgb(255,0,255)",
            gray: "rgb(128,128,128)",
            green: "rgb(0,128,0)",
            lime: "rgb(0,255,0)",
            maroon: "rgb(128,0,0)",
            navy: "rgb(0,0,128)",
            olive: "rgb(128,128,0)",
            purple: "rgb(128,0,128)",
            red: "rgb(255,0,0)",
            silver: "rgb(192,192,192)",
            teal: "rgb(0,128,128)",
            white: "rgb(255,255,255)",
            yellow: "rgb(255,255,0)",
            orange: "rgb(255,128,0)"
        }, a.prototype.chainOptionMap = {}, a.prototype.callbacksMap = {
            onStart: 1,
            onComplete: 1,
            onFirstUpdate: 1,
            onUpdate: 1,
            onProgress: 1,
            onRepeatStart: 1,
            onRepeatComplete: 1
        }, a.prototype.tweenOptionMap = {
            duration: 1,
            delay: 1,
            speed: 1,
            repeat: 1,
            easing: 1,
            yoyo: 1,
            shiftTime: 1,
            isReversed: 1
        }, a.prototype.unitOptionMap = {
            left: 1,
            top: 1,
            x: 1,
            y: 1,
            rx: 1,
            ry: 1
        }, a.prototype.RAD_TO_DEG = 180 / Math.PI, a.prototype.vars = function() {
            var a;
            return this.prefix = this.getPrefix(), this.getRemBase(), this.isFF = "moz" === this.prefix.lowercase, 
            this.isIE = "ms" === this.prefix.lowercase, a = navigator.userAgent, this.isOldOpera = a.match(/presto/gim), 
            this.isSafari = a.indexOf("Safari") > -1, this.isChrome = a.indexOf("Chrome") > -1, 
            this.isOpera = a.toLowerCase().indexOf("op") > -1, this.isChrome && this.isSafari && (this.isSafari = !1), 
            a.match(/PhantomJS/gim) && (this.isSafari = !1), this.isChrome && this.isOpera && (this.isChrome = !1), 
            this.is3d = this.checkIf3d(), this.uniqIDs = -1, this.div = document.createElement("div"), 
            document.body.appendChild(this.div);
        }, a.prototype.cloneObj = function(a, b) {
            var c, d, e, f;
            for (e = Object.keys(a), f = {}, c = e.length; c--; ) d = e[c], null != b ? b[d] || (f[d] = a[d]) : f[d] = a[d];
            return f;
        }, a.prototype.extend = function(a, b) {
            var c, d;
            for (c in b) d = b[c], null == a[c] && (a[c] = b[c]);
            return a;
        }, a.prototype.getRemBase = function() {
            var a, b;
            return a = document.querySelector("html"), b = getComputedStyle(a), this.remBase = parseFloat(b.fontSize);
        }, a.prototype.clamp = function(a, b, c) {
            return b > a ? b : a > c ? c : a;
        }, a.prototype.setPrefixedStyle = function(a, b, c) {
            return "transform" === b && (a.style["" + this.prefix.css + b] = c), a.style[b] = c;
        }, a.prototype.style = function(a, b, c) {
            var d, e, f, g;
            if ("object" == typeof b) {
                for (e = Object.keys(b), f = e.length, g = []; f--; ) d = e[f], c = b[d], g.push(this.setPrefixedStyle(a, d, c));
                return g;
            }
            return this.setPrefixedStyle(a, b, c);
        }, a.prototype.prepareForLog = function(a) {
            return a = Array.prototype.slice.apply(a), a.unshift("::"), a.unshift(this.logBadgeCss), 
            a.unshift("%cmo·js%c"), a;
        }, a.prototype.log = function() {
            return mojs.isDebug !== !1 ? console.log.apply(console, this.prepareForLog(arguments)) : void 0;
        }, a.prototype.warn = function() {
            return mojs.isDebug !== !1 ? console.warn.apply(console, this.prepareForLog(arguments)) : void 0;
        }, a.prototype.error = function() {
            return mojs.isDebug !== !1 ? console.error.apply(console, this.prepareForLog(arguments)) : void 0;
        }, a.prototype.parseUnit = function(a) {
            var b, c, d, e, f, g;
            return "number" == typeof a ? f = {
                unit: "px",
                isStrict: !1,
                value: a,
                string: 0 === a ? "" + a : a + "px"
            } : "string" == typeof a ? (e = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim, 
            g = null != (d = a.match(e)) ? d[0] : void 0, c = !0, g || (g = "px", c = !1), b = parseFloat(a), 
            f = {
                unit: g,
                isStrict: c,
                value: b,
                string: 0 === b ? "" + b : "" + b + g
            }) : a;
        }, a.prototype.bind = function(a, b) {
            var c, d;
            return d = function() {
                var d, e;
                return d = Array.prototype.slice.call(arguments), e = c.concat(d), a.apply(b, e);
            }, c = Array.prototype.slice.call(arguments, 2), d;
        }, a.prototype.getRadialPoint = function(a) {
            var b, c, d, e;
            return null == a && (a = {}), c = .017453292519943295 * (a.angle - 90), d = null != a.radiusX ? a.radiusX : a.radius, 
            e = null != a.radiusY ? a.radiusY : a.radius, b = {
                x: a.center.x + Math.cos(c) * d,
                y: a.center.y + Math.sin(c) * e
            };
        }, a.prototype.getPrefix = function() {
            var a, b, c, d;
            return c = window.getComputedStyle(document.documentElement, ""), d = Array.prototype.slice.call(c).join("").match(/-(moz|webkit|ms)-/), 
            b = (d || "" === c.OLink && [ "", "o" ])[1], a = "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], 
            {
                dom: a,
                lowercase: b,
                css: "-" + b + "-",
                js: b[0].toUpperCase() + b.substr(1)
            };
        }, a.prototype.strToArr = function(a) {
            var b;
            return b = [], "number" != typeof a || isNaN(a) ? (a.trim().split(/\s+/gim).forEach(function(a) {
                return function(c) {
                    return b.push(a.parseUnit(a.parseIfRand(c)));
                };
            }(this)), b) : (b.push(this.parseUnit(a)), b);
        }, a.prototype.calcArrDelta = function(a, b) {
            var c, d, e, f, g;
            for (c = [], d = e = 0, f = a.length; f > e; d = ++e) g = a[d], c[d] = this.parseUnit("" + (b[d].value - a[d].value) + b[d].unit);
            return c;
        }, a.prototype.isArray = function(a) {
            return a instanceof Array;
        }, a.prototype.normDashArrays = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l;
            if (c = a.length, d = b.length, c > d) for (i = c - d, l = b.length, f = g = 0, 
            j = i; j >= 0 ? j > g : g > j; f = j >= 0 ? ++g : --g) e = f + l, b.push(this.parseUnit("0" + a[e].unit)); else if (d > c) for (i = d - c, 
            l = a.length, f = h = 0, k = i; k >= 0 ? k > h : h > k; f = k >= 0 ? ++h : --h) e = f + l, 
            a.push(this.parseUnit("0" + b[e].unit));
            return [ a, b ];
        }, a.prototype.makeColorObj = function(a) {
            var b, c, d, e, f, g, h, i, j, k;
            return "#" === a[0] && (j = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(a), 
            d = {}, j && (g = 2 === j[1].length ? j[1] : j[1] + j[1], e = 2 === j[2].length ? j[2] : j[2] + j[2], 
            c = 2 === j[3].length ? j[3] : j[3] + j[3], d = {
                r: parseInt(g, 16),
                g: parseInt(e, 16),
                b: parseInt(c, 16),
                a: 1
            })), "#" !== a[0] && (f = "r" === a[0] && "g" === a[1] && "b" === a[2], f && (k = a), 
            f || (k = this.shortColors[a] ? this.shortColors[a] : (this.div.style.color = a, 
            this.computedStyle(this.div).color)), h = "^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),", 
            i = "\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$", j = new RegExp(h + i, "gi").exec(k), 
            d = {}, b = parseFloat(j[4] || 1), j && (d = {
                r: parseInt(j[1], 10),
                g: parseInt(j[2], 10),
                b: parseInt(j[3], 10),
                a: null == b || isNaN(b) ? 1 : b
            })), d;
        }, a.prototype.computedStyle = function(a) {
            return getComputedStyle(a);
        }, a.prototype.capitalize = function(a) {
            if ("string" != typeof a) throw Error("String expected - nothing to capitalize");
            return a.charAt(0).toUpperCase() + a.substring(1);
        }, a.prototype.parseRand = function(a) {
            var b, c, d;
            return c = a.split(/rand\(|\,|\)/), d = this.parseUnit(c[2]), b = this.rand(parseFloat(c[1]), parseFloat(c[2])), 
            d.unit && c[2].match(d.unit) ? b + d.unit : b;
        }, a.prototype.parseStagger = function(a, b) {
            var c, d, e, f, g, h;
            return h = a.split(/stagger\(|\)$/)[1].toLowerCase(), e = h.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim), 
            h = e.length > 3 ? (c = this.parseUnit(this.parseIfRand(e[1])), e[3]) : (c = this.parseUnit(0), 
            e[1]), h = this.parseIfRand(h), g = this.parseUnit(h), d = b * g.value + c.value, 
            f = c.isStrict ? c.unit : g.isStrict ? g.unit : "", f ? "" + d + f : d;
        }, a.prototype.parseIfStagger = function(a, b) {
            return "string" == typeof a && a.match(/stagger/g) ? this.parseStagger(a, b) : a;
        }, a.prototype.parseIfRand = function(a) {
            return "string" == typeof a && a.match(/rand\(/) ? this.parseRand(a) : a;
        }, a.prototype.parseDelta = function(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n, o;
            if (b = this.cloneObj(b), f = b.easing, null != f && (f = mojs.easing.parseEasing(f)), 
            delete b.easing, d = b.curve, null != d && (d = mojs.easing.parseEasing(d)), delete b.curve, 
            m = Object.keys(b)[0], g = b[m], e = {
                start: m
            }, !isNaN(parseFloat(m)) || m.match(/rand\(/) || m.match(/stagger\(/)) if ("strokeDasharray" === a || "strokeDashoffset" === a || "origin" === a) {
                for (n = this.strToArr(m), h = this.strToArr(g), this.normDashArrays(n, h), j = k = 0, 
                l = n.length; l > k; j = ++k) m = n[j], g = h[j], this.mergeUnits(m, g, a);
                e = {
                    type: "array",
                    start: n,
                    end: h,
                    delta: this.calcArrDelta(n, h),
                    easing: f,
                    curve: d
                };
            } else this.callbacksMap[a] || this.tweenOptionMap[a] || (this.unitOptionMap[a] ? (g = this.parseUnit(this.parseStringOption(g, c)), 
            m = this.parseUnit(this.parseStringOption(m, c)), this.mergeUnits(m, g, a), e = {
                type: "unit",
                start: m,
                end: g,
                delta: g.value - m.value,
                easing: f,
                curve: d
            }) : (g = parseFloat(this.parseStringOption(g, c)), m = parseFloat(this.parseStringOption(m, c)), 
            e = {
                type: "number",
                start: m,
                end: g,
                delta: g - m,
                easing: f,
                curve: d
            })); else {
                if ("strokeLinecap" === a) return this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + m + ") value instead", b), 
                e;
                o = this.makeColorObj(m), i = this.makeColorObj(g), e = {
                    type: "color",
                    start: o,
                    end: i,
                    easing: f,
                    curve: d,
                    delta: {
                        r: i.r - o.r,
                        g: i.g - o.g,
                        b: i.b - o.b,
                        a: i.a - o.a
                    }
                };
            }
            return e;
        }, a.prototype.mergeUnits = function(a, b, c) {
            return !b.isStrict && a.isStrict ? (b.unit = a.unit, b.string = "" + b.value + b.unit) : b.isStrict && !a.isStrict ? (a.unit = b.unit, 
            a.string = "" + a.value + a.unit) : b.isStrict && a.isStrict && b.unit !== a.unit ? (a.unit = b.unit, 
            a.string = "" + a.value + a.unit, this.warn('Two different units were specified on "' + c + '" delta property, mo · js will fallback to end "' + b.unit + '" unit ')) : void 0;
        }, a.prototype.rand = function(a, b) {
            return Math.random() * (b - a) + a;
        }, a.prototype.isDOM = function(a) {
            var b;
            return null == a ? !1 : (b = "number" == typeof a.nodeType && "string" == typeof a.nodeName, 
            "object" == typeof a && b);
        }, a.prototype.getChildElements = function(a) {
            var b, c, d;
            for (b = a.childNodes, c = [], d = b.length; d--; ) 1 === b[d].nodeType && c.unshift(b[d]);
            return c;
        }, a.prototype.delta = function(a, b) {
            var c, d, e, f, g;
            return f = typeof a, g = typeof b, c = "string" === f || "number" === f && !isNaN(a), 
            d = "string" === g || "number" === g && !isNaN(b), c && d ? (e = {}, e[a] = b, e) : void this.error("delta method expects Strings or Numbers at input but got - " + a + ", " + b);
        }, a.prototype.getUniqID = function() {
            return ++this.uniqIDs;
        }, a.prototype.parsePath = function(a) {
            var b;
            return "string" == typeof a ? "m" === a.charAt(0).toLowerCase() ? (b = document.createElementNS(this.NS, "path"), 
            b.setAttributeNS(null, "d", a), b) : document.querySelector(a) : a.style ? a : void 0;
        }, a.prototype.closeEnough = function(a, b, c) {
            return Math.abs(a - b) < c;
        }, a.prototype.checkIf3d = function() {
            var a, b, c, d;
            return a = document.createElement("div"), this.style(a, "transform", "translateZ(0)"), 
            c = a.style, b = this.prefix.css + "transform", d = null != c[b] ? c[b] : c.transform, 
            "" !== d;
        }, a.prototype.isObject = function(a) {
            return null !== a && "object" == typeof a;
        }, a.prototype.getDeltaEnd = function(a) {
            var b;
            return b = Object.keys(a)[0], a[b];
        }, a.prototype.getDeltaStart = function(a) {
            var b;
            return b = Object.keys(a)[0];
        }, a.prototype.isTweenProp = function(a) {
            return this.tweenOptionMap[a] || this.callbacksMap[a];
        }, a.prototype.parseStringOption = function(a, b) {
            return null == b && (b = 0), "string" == typeof a && (a = this.parseIfStagger(a, b), 
            a = this.parseIfRand(a)), a;
        }, a.prototype.getLastItem = function(a) {
            return a[a.length - 1];
        }, a.prototype.parseEl = function(a) {
            return e.isDOM(a) ? a : ("string" == typeof a && (a = document.querySelector(a)), 
            null === a && e.error("Can't parse HTML element: ", a), a);
        }, a.prototype.force3d = function(a) {
            return this.setPrefixedStyle(a, "backface-visibility", "hidden"), a;
        }, a;
    }(), e = new d(), a.exports = e;
}, function(a, b, c) {
    var d, e, f, g, h, i, j, k, l, m, n, o;
    d = c(23)["default"] || c(23), i = c(36)["default"] || c(36), f = c(37), k = c(38), 
    n = c(39), m = c(35), l = c(40), g = c(41), h = c(42)["default"] || c(42), j = c(43), 
    o = c(15), e = function() {
        function a() {
            this.addShape = o.bind(this.addShape, this);
        }
        return a.prototype.bit = d, a.prototype.custom = i, a.prototype.circle = f, a.prototype.line = k, 
        a.prototype.zigzag = n, a.prototype.rect = m, a.prototype.polygon = l, a.prototype.cross = g, 
        a.prototype.equal = j, a.prototype.curve = h, a.prototype.getShape = function(a) {
            return this[a] || o.error('no "' + a + '" shape available yet, please choose from this list:', this);
        }, a.prototype.addShape = function(a, b) {
            return this[a] = b;
        }, a;
    }(), a.exports = new e();
}, function(a, b, c) {
    var d, e, f, g, h, i = function(a, b) {
        return function() {
            return a.apply(b, arguments);
        };
    };
    g = c(15), h = c(28), f = c(2)["default"], e = c(8)["default"], d = function() {
        function a(a) {
            this.o = null != a ? a : {}, this.calcHeight = i(this.calcHeight, this), this.vars() || this.createTween();
        }
        return a.prototype.defaults = {
            path: null,
            curvature: {
                x: "75%",
                y: "50%"
            },
            isCompositeLayer: !0,
            delay: 0,
            duration: 1e3,
            easing: null,
            repeat: 0,
            yoyo: !1,
            onStart: null,
            onComplete: null,
            onUpdate: null,
            offsetX: 0,
            offsetY: 0,
            angleOffset: null,
            pathStart: 0,
            pathEnd: 1,
            motionBlur: 0,
            transformOrigin: null,
            isAngle: !1,
            isReverse: !1,
            isRunLess: !1,
            isPresetPosition: !0
        }, a.prototype.vars = function() {
            return this.getScaler = g.bind(this.getScaler, this), this.resize = h, this.props = g.cloneObj(this.defaults), 
            this.extendOptions(this.o), this.isMotionBlurReset = g.isSafari || g.isIE, this.isMotionBlurReset && (this.props.motionBlur = 0), 
            this.history = [ g.cloneObj(this.props) ], this.postVars();
        }, a.prototype.curveToPath = function(a) {
            var b, c, d, e, f, h, i, j, k, l, m, n, o;
            return l = document.createElementNS(g.NS, "path"), o = a.start, k = {
                x: o.x + a.shift.x,
                y: o.x + a.shift.y
            }, c = a.curvature, i = a.shift.x, j = a.shift.y, n = Math.sqrt(i * i + j * j), 
            m = n / 100, b = Math.atan(j / i) * (180 / Math.PI) + 90, a.shift.x < 0 && (b += 180), 
            d = g.parseUnit(c.x), d = "%" === d.unit ? d.value * m : d.value, h = g.getRadialPoint({
                center: {
                    x: o.x,
                    y: o.y
                },
                radius: d,
                angle: b
            }), e = g.parseUnit(c.y), e = "%" === e.unit ? e.value * m : e.value, f = g.getRadialPoint({
                center: {
                    x: h.x,
                    y: h.y
                },
                radius: e,
                angle: b + 90
            }), l.setAttribute("d", "M" + o.x + "," + o.y + " Q" + f.x + "," + f.y + " " + k.x + "," + k.y), 
            l;
        }, a.prototype.postVars = function() {
            return this.props.pathStart = g.clamp(this.props.pathStart, 0, 1), this.props.pathEnd = g.clamp(this.props.pathEnd, this.props.pathStart, 1), 
            this.angle = 0, this.speedX = 0, this.speedY = 0, this.blurX = 0, this.blurY = 0, 
            this.prevCoords = {}, this.blurAmount = 20, this.props.motionBlur = g.clamp(this.props.motionBlur, 0, 1), 
            this.onUpdate = this.props.onUpdate, this.o.el ? (this.el = this.parseEl(this.props.el), 
            this.props.motionBlur > 0 && this.createFilter(), this.path = this.getPath(), this.path.getAttribute("d") ? (this.len = this.path.getTotalLength(), 
            this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart), this.startLen = this.props.pathStart * this.len, 
            this.fill = this.props.fill, null != this.fill && (this.container = this.parseEl(this.props.fill.container), 
            this.fillRule = this.props.fill.fillRule || "all", this.getScaler(), null != this.container) ? (this.removeEvent(this.container, "onresize", this.getScaler), 
            this.addEvent(this.container, "onresize", this.getScaler)) : void 0) : (g.error("Path has no coordinates to work with, aborting"), 
            !0)) : (g.error('Missed "el" option. It could be a selector, DOMNode or another module.'), 
            !0);
        }, a.prototype.addEvent = function(a, b, c) {
            return a.addEventListener(b, c, !1);
        }, a.prototype.removeEvent = function(a, b, c) {
            return a.removeEventListener(b, c, !1);
        }, a.prototype.createFilter = function() {
            var a, b;
            return a = document.createElement("div"), this.filterID = "filter-" + g.getUniqID(), 
            a.innerHTML = '<svg id="svg-' + this.filterID + '"\n    style="visibility:hidden; width:0px; height:0px">\n  <filter id="' + this.filterID + '" y="-20" x="-20" width="40" height="40">\n    <feOffset\n      id="blur-offset" in="SourceGraphic"\n      dx="0" dy="0" result="offset2"></feOffset>\n    <feGaussianblur\n      id="blur" in="offset2"\n      stdDeviation="0,0" result="blur2"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in="SourceGraphic"></feMergeNode>\n      <feMergeNode in="blur2"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>', 
            b = a.querySelector("#svg-" + this.filterID), this.filter = b.querySelector("#blur"), 
            this.filterOffset = b.querySelector("#blur-offset"), document.body.insertBefore(b, document.body.firstChild), 
            this.el.style.filter = "url(#" + this.filterID + ")", this.el.style[g.prefix.css + "filter"] = "url(#" + this.filterID + ")";
        }, a.prototype.parseEl = function(a) {
            return "string" == typeof a ? document.querySelector(a) : a instanceof HTMLElement ? a : null != a._setProp ? (this.isModule = !0, 
            a) : void 0;
        }, a.prototype.getPath = function() {
            var a;
            return a = g.parsePath(this.props.path), a ? a : this.props.path.x || this.props.path.y ? this.curveToPath({
                start: {
                    x: 0,
                    y: 0
                },
                shift: {
                    x: this.props.path.x || 0,
                    y: this.props.path.y || 0
                },
                curvature: {
                    x: this.props.curvature.x || this.defaults.curvature.x,
                    y: this.props.curvature.y || this.defaults.curvature.y
                }
            }) : void 0;
        }, a.prototype.getScaler = function() {
            var a, b, c;
            switch (this.cSize = {
                width: this.container.offsetWidth || 0,
                height: this.container.offsetHeight || 0
            }, c = this.path.getPointAtLength(0), a = this.path.getPointAtLength(this.len), 
            b = {}, this.scaler = {}, b.width = a.x >= c.x ? a.x - c.x : c.x - a.x, b.height = a.y >= c.y ? a.y - c.y : c.y - a.y, 
            this.fillRule) {
              case "all":
                return this.calcWidth(b), this.calcHeight(b);

              case "width":
                return this.calcWidth(b), this.scaler.y = this.scaler.x;

              case "height":
                return this.calcHeight(b), this.scaler.x = this.scaler.y;
            }
        }, a.prototype.calcWidth = function(a) {
            return this.scaler.x = this.cSize.width / a.width, !isFinite(this.scaler.x) && (this.scaler.x = 1);
        }, a.prototype.calcHeight = function(a) {
            return this.scaler.y = this.cSize.height / a.height, !isFinite(this.scaler.y) && (this.scaler.y = 1);
        }, a.prototype.run = function(a) {
            var b, c, d;
            if (a) {
                b = this.history[0];
                for (c in a) d = a[c], g.callbacksMap[c] || g.tweenOptionMap[c] ? (g.warn('the property "' + c + '" property can not be overridden on run yet'), 
                delete a[c]) : this.history[0][c] = d;
                this.tuneOptions(a);
            }
            return this.startTween();
        }, a.prototype.createTween = function() {
            return this.tween = new f({
                duration: this.props.duration,
                delay: this.props.delay,
                yoyo: this.props.yoyo,
                repeat: this.props.repeat,
                easing: this.props.easing,
                onStart: function(a) {
                    return function() {
                        var b;
                        return null != (b = a.props.onStart) ? b.apply(a) : void 0;
                    };
                }(this),
                onComplete: function(a) {
                    return function() {
                        var b;
                        return a.props.motionBlur && a.setBlur({
                            blur: {
                                x: 0,
                                y: 0
                            },
                            offset: {
                                x: 0,
                                y: 0
                            }
                        }), null != (b = a.props.onComplete) ? b.apply(a) : void 0;
                    };
                }(this),
                onUpdate: function(a) {
                    return function(b) {
                        return a.setProgress(b);
                    };
                }(this),
                onFirstUpdate: function(a) {
                    return function(b, c) {
                        return b ? void 0 : a.history.length > 1 && a.tuneOptions(a.history[0]);
                    };
                }(this)
            }), this.timeline = new e(), this.timeline.add(this.tween), !this.props.isRunLess && this.startTween(), 
            this.props.isPresetPosition && this.setProgress(0, !0);
        }, a.prototype.startTween = function() {
            return setTimeout(function(a) {
                return function() {
                    var b;
                    return null != (b = a.timeline) ? b.play() : void 0;
                };
            }(this), 1);
        }, a.prototype.setProgress = function(a, b) {
            var c, d, e, f;
            return c = this.startLen + (this.props.isReverse ? (1 - a) * this.slicedLen : a * this.slicedLen), 
            d = this.path.getPointAtLength(c), e = d.x + this.props.offsetX, f = d.y + this.props.offsetY, 
            this._getCurrentAngle(d, c, a), this._setTransformOrigin(a), this._setTransform(e, f, a, b), 
            this.props.motionBlur && this.makeMotionBlur(e, f);
        }, a.prototype.setElPosition = function(a, b, c) {
            var d, e, f, h;
            return f = 0 !== this.angle ? "rotate(" + this.angle + "deg)" : "", e = this.props.isCompositeLayer && g.is3d, 
            d = e ? "translateZ(0)" : "", h = "translate(" + a + "px," + b + "px) " + f + " " + d, 
            g.setPrefixedStyle(this.el, "transform", h);
        }, a.prototype.setModulePosition = function(a, b) {
            return this.el._setProp({
                shiftX: a + "px",
                shiftY: b + "px",
                angle: this.angle
            }), this.el._draw();
        }, a.prototype._getCurrentAngle = function(a, b, c) {
            var d, e, f, h, i;
            return e = "function" == typeof this.props.transformOrigin, this.props.isAngle || null != this.props.angleOffset || e ? (f = this.path.getPointAtLength(b - 1), 
            h = a.y - f.y, i = a.x - f.x, d = Math.atan(h / i), !isFinite(d) && (d = 0), this.angle = d * g.RAD_TO_DEG, 
            "function" != typeof this.props.angleOffset ? this.angle += this.props.angleOffset || 0 : this.angle = this.props.angleOffset.call(this, this.angle, c)) : this.angle = 0;
        }, a.prototype._setTransform = function(a, b, c, d) {
            var e;
            return this.scaler && (a *= this.scaler.x, b *= this.scaler.y), e = null, d || (e = "function" == typeof this.onUpdate ? this.onUpdate(c, {
                x: a,
                y: b,
                angle: this.angle
            }) : void 0), this.isModule ? this.setModulePosition(a, b) : "string" != typeof e ? this.setElPosition(a, b, c) : g.setPrefixedStyle(this.el, "transform", e);
        }, a.prototype._setTransformOrigin = function(a) {
            var b, c;
            return this.props.transformOrigin ? (b = "function" == typeof this.props.transformOrigin, 
            c = b ? this.props.transformOrigin(this.angle, a) : this.props.transformOrigin, 
            g.setPrefixedStyle(this.el, "transform-origin", c)) : void 0;
        }, a.prototype.makeMotionBlur = function(a, b) {
            var c, d, e, f, h, i, j;
            return j = 0, h = 1, i = 1, null == this.prevCoords.x || null == this.prevCoords.y ? (this.speedX = 0, 
            this.speedY = 0) : (e = a - this.prevCoords.x, f = b - this.prevCoords.y, e > 0 && (h = -1), 
            0 > h && (i = -1), this.speedX = Math.abs(e), this.speedY = Math.abs(f), j = Math.atan(f / e) * (180 / Math.PI) + 90), 
            c = j - this.angle, d = this.angToCoords(c), this.blurX = g.clamp(this.speedX / 16 * this.props.motionBlur, 0, 1), 
            this.blurY = g.clamp(this.speedY / 16 * this.props.motionBlur, 0, 1), this.setBlur({
                blur: {
                    x: 3 * this.blurX * this.blurAmount * Math.abs(d.x),
                    y: 3 * this.blurY * this.blurAmount * Math.abs(d.y)
                },
                offset: {
                    x: 3 * h * this.blurX * d.x * this.blurAmount,
                    y: 3 * i * this.blurY * d.y * this.blurAmount
                }
            }), this.prevCoords.x = a, this.prevCoords.y = b;
        }, a.prototype.setBlur = function(a) {
            return this.isMotionBlurReset ? void 0 : (this.filter.setAttribute("stdDeviation", a.blur.x + "," + a.blur.y), 
            this.filterOffset.setAttribute("dx", a.offset.x), this.filterOffset.setAttribute("dy", a.offset.y));
        }, a.prototype.extendDefaults = function(a) {
            var b, c, d;
            c = [];
            for (b in a) d = a[b], c.push(this[b] = d);
            return c;
        }, a.prototype.extendOptions = function(a) {
            var b, c, d;
            c = [];
            for (b in a) d = a[b], c.push(this.props[b] = d);
            return c;
        }, a.prototype.then = function(a) {
            var b, c, d, e, h;
            e = this.history[this.history.length - 1], d = {};
            for (c in e) h = e[c], !g.callbacksMap[c] && !g.tweenOptionMap[c] || "duration" === c ? null == a[c] && (a[c] = h) : null == a[c] && (a[c] = void 0), 
            g.tweenOptionMap[c] && (d[c] = "duration" !== c ? a[c] : null != a[c] ? a[c] : e[c]);
            return this.history.push(a), b = this, d.onUpdate = function(a) {
                return function(b) {
                    return a.setProgress(b);
                };
            }(this), d.onStart = function(a) {
                return function() {
                    var b;
                    return null != (b = a.props.onStart) ? b.apply(a) : void 0;
                };
            }(this), d.onComplete = function(a) {
                return function() {
                    var b;
                    return null != (b = a.props.onComplete) ? b.apply(a) : void 0;
                };
            }(this), d.onFirstUpdate = function() {
                return b.tuneOptions(b.history[this.index]);
            }, d.isChained = !a.delay, this.timeline.append(new f(d)), this;
        }, a.prototype.tuneOptions = function(a) {
            return this.extendOptions(a), this.postVars();
        }, a.prototype.angToCoords = function(a) {
            var b, c, d;
            return a %= 360, b = (a - 90) * Math.PI / 180, c = Math.cos(b), d = Math.sin(b), 
            c = 0 > c ? Math.max(c, -.7) : Math.min(c, .7), d = 0 > d ? Math.max(d, -.7) : Math.min(d, .7), 
            {
                x: 1.428571429 * c,
                y: 1.428571429 * d
            };
        }, a;
    }(), a.exports = d;
}, function(a, b, c) {
    var d, e, f, g, h, i, j, k, l;
    h = c(29), f = c(30), k = c(31), j = c(15), g = c(32)["default"] || c(32), l = Math.sin, 
    e = Math.PI, d = function() {
        function a() {}
        return a.prototype.bezier = h, a.prototype.PathEasing = f, a.prototype.path = new f("creator").create, 
        a.prototype.approximate = g, a.prototype.inverse = function(a) {
            return 1 - a;
        }, a.prototype.linear = {
            none: function(a) {
                return a;
            }
        }, a.prototype.ease = {
            "in": h.apply(a, [ .42, 0, 1, 1 ]),
            out: h.apply(a, [ 0, 0, .58, 1 ]),
            inout: h.apply(a, [ .42, 0, .58, 1 ])
        }, a.prototype.sin = {
            "in": function(a) {
                return 1 - Math.cos(a * e / 2);
            },
            out: function(a) {
                return l(a * e / 2);
            },
            inout: function(a) {
                return .5 * (1 - Math.cos(e * a));
            }
        }, a.prototype.quad = {
            "in": function(a) {
                return a * a;
            },
            out: function(a) {
                return a * (2 - a);
            },
            inout: function(a) {
                return (a *= 2) < 1 ? .5 * a * a : -.5 * (--a * (a - 2) - 1);
            }
        }, a.prototype.cubic = {
            "in": function(a) {
                return a * a * a;
            },
            out: function(a) {
                return --a * a * a + 1;
            },
            inout: function(a) {
                return (a *= 2) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2);
            }
        }, a.prototype.quart = {
            "in": function(a) {
                return a * a * a * a;
            },
            out: function(a) {
                return 1 - --a * a * a * a;
            },
            inout: function(a) {
                return (a *= 2) < 1 ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2);
            }
        }, a.prototype.quint = {
            "in": function(a) {
                return a * a * a * a * a;
            },
            out: function(a) {
                return --a * a * a * a * a + 1;
            },
            inout: function(a) {
                return (a *= 2) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2);
            }
        }, a.prototype.expo = {
            "in": function(a) {
                return 0 === a ? 0 : Math.pow(1024, a - 1);
            },
            out: function(a) {
                return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
            },
            inout: function(a) {
                return 0 === a ? 0 : 1 === a ? 1 : (a *= 2) < 1 ? .5 * Math.pow(1024, a - 1) : .5 * (-Math.pow(2, -10 * (a - 1)) + 2);
            }
        }, a.prototype.circ = {
            "in": function(a) {
                return 1 - Math.sqrt(1 - a * a);
            },
            out: function(a) {
                return Math.sqrt(1 - --a * a);
            },
            inout: function(a) {
                return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            }
        }, a.prototype.back = {
            "in": function(a) {
                var b;
                return b = 1.70158, a * a * ((b + 1) * a - b);
            },
            out: function(a) {
                var b;
                return b = 1.70158, --a * a * ((b + 1) * a + b) + 1;
            },
            inout: function(a) {
                var b;
                return b = 2.5949095, (a *= 2) < 1 ? .5 * a * a * ((b + 1) * a - b) : .5 * ((a -= 2) * a * ((b + 1) * a + b) + 2);
            }
        }, a.prototype.elastic = {
            "in": function(a) {
                var b, c, d;
                return d = void 0, c = .4, 0 === a ? 0 : 1 === a ? 1 : (b = 1, d = c / 4, -(b * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - d) * Math.PI / c)));
            },
            out: function(a) {
                var b, c, d;
                return d = void 0, c = .4, 0 === a ? 0 : 1 === a ? 1 : (b = 1, d = c / 4, b * Math.pow(2, -10 * a) * Math.sin(2 * (a - d) * Math.PI / c) + 1);
            },
            inout: function(a) {
                var b, c, d;
                return d = void 0, c = .4, 0 === a ? 0 : 1 === a ? 1 : (b = 1, d = c / 4, (a *= 2) < 1 ? -.5 * b * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - d) * Math.PI / c) : b * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - d) * Math.PI / c) * .5 + 1);
            }
        }, a.prototype.bounce = {
            "in": function(a) {
                return 1 - i.bounce.out(1 - a);
            },
            out: function(a) {
                return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
            },
            inout: function(a) {
                return .5 > a ? .5 * i.bounce["in"](2 * a) : .5 * i.bounce.out(2 * a - 1) + .5;
            }
        }, a.prototype.parseEasing = function(a) {
            var b, c;
            return null == a && (a = "linear.none"), c = typeof a, "string" === c ? "m" === a.charAt(0).toLowerCase() ? this.path(a) : (a = this._splitEasing(a), 
            b = this[a[0]], b ? b[a[1]] : (j.error('Easing with name "' + a[0] + '" was not found, fallback to "linear.none" instead'), 
            this.linear.none)) : j.isArray(a) ? this.bezier.apply(this, a) : a;
        }, a.prototype._splitEasing = function(a) {
            var b, c, d;
            return "function" == typeof a ? a : "string" == typeof a && a.length ? (d = a.split("."), 
            b = d[0].toLowerCase() || "linear", c = d[1].toLowerCase() || "none", [ b, c ]) : [ "linear", "none" ];
        }, a;
    }(), i = new d(), i.mix = k(i), a.exports = i;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    var e = "function" == typeof _Symbol && "symbol" == typeof _Symbol$iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof _Symbol && a.constructor === _Symbol ? "symbol" : typeof a;
    };
    b.__esModule = !0;
    var f = c(33), g = d(f), h = c(34), i = d(h);
    b["default"] = "function" == typeof i["default"] && "symbol" === e(g["default"]) ? function(a) {
        return "undefined" == typeof a ? "undefined" : e(a);
    } : function(a) {
        return a && "function" == typeof i["default"] && a.constructor === i["default"] ? "symbol" : "undefined" == typeof a ? "undefined" : e(a);
    };
}, function(a, b, c) {
    "use strict";
    b.__esModule = !0, b["default"] = function(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    };
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(19), f = d(e);
    b["default"] = function(a, b) {
        if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !b || "object" !== ("undefined" == typeof b ? "undefined" : f["default"](b)) && "function" != typeof b ? a : b;
    };
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(44), f = d(e), g = c(45), h = d(g), i = c(19), j = d(i);
    b["default"] = function(a, b) {
        if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof b ? "undefined" : j["default"](b)));
        a.prototype = h["default"](b && b.prototype, {
            constructor: {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), b && (f["default"] ? f["default"](a, b) : a.__proto__ = b);
    };
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(19), f = d(e), g = c(20), h = d(g), i = c(21), j = d(i), k = c(22), l = d(k), m = c(13), n = d(m), o = c(15), p = d(o), q = function(a) {
        function b() {
            return h["default"](this, b), j["default"](this, a.apply(this, arguments));
        }
        return l["default"](b, a), b.prototype._declareDefaults = function() {
            this._defaults = {
                ns: "http://www.w3.org/2000/svg",
                tag: "ellipse",
                parent: document.body,
                ratio: 1,
                radius: 50,
                radiusX: null,
                radiusY: null,
                stroke: "hotpink",
                "stroke-dasharray": "",
                "stroke-dashoffset": "",
                "stroke-linecap": "",
                "stroke-width": 2,
                "stroke-opacity": 1,
                fill: "transparent",
                "fill-opacity": 1,
                width: 0,
                height: 0
            }, this._drawMap = [ "stroke", "stroke-width", "stroke-opacity", "stroke-dasharray", "fill", "stroke-dashoffset", "stroke-linecap", "fill-opacity", "transform" ];
        }, b.prototype._vars = function() {
            this._state = {}, this._drawMapLength = this._drawMap.length;
        }, b.prototype._render = function() {
            this._isRendered || (this._isRendered = !0, this._createSVGCanvas(), this._setCanvasSize(), 
            this._props.parent.appendChild(this._canvas));
        }, b.prototype._createSVGCanvas = function() {
            var a = this._props;
            this._canvas = document.createElementNS(a.ns, "svg"), this.el = document.createElementNS(a.ns, a.tag), 
            this._canvas.appendChild(this.el);
        }, b.prototype._setCanvasSize = function() {
            var a = (this._props, this._canvas.style);
            a.display = "block", a.width = "100%", a.height = "100%", a.left = "0px", a.top = "0px";
        }, b.prototype._draw = function() {
            this._props.length = this._getLength();
            for (var a = (this._state, this._props, this._drawMapLength); a--; ) {
                var b = this._drawMap[a];
                switch (b) {
                  case "stroke-dasharray":
                  case "stroke-dashoffset":
                    this.castStrokeDash(b);
                }
                this._setAttrIfChanged(b, this._props[b]);
            }
            this._state.radius = this._props.radius;
        }, b.prototype.castStrokeDash = function(a) {
            var b = this._props;
            if (p["default"].isArray(b[a])) {
                for (var c = "", d = 0; d < b[a].length; d++) {
                    var e = b[a][d], g = "%" === e.unit ? this.castPercent(e.value) : e.value;
                    c += g + " ";
                }
                return b[a] = "0 " === c ? c = "" : c, b[a] = c;
            }
            "object" === f["default"](b[a]) && (c = "%" === b[a].unit ? this.castPercent(b[a].value) : b[a].value, 
            b[a] = 0 === c ? c = "" : c);
        }, b.prototype.castPercent = function(a) {
            return a * (this._props.length / 100);
        }, b.prototype._setAttrIfChanged = function(a, b) {
            this._state[a] !== b && (this.el.setAttribute(a, b), this._state[a] = b);
        }, b.prototype._getLength = function() {
            var a = this._props, b = 0, c = !(!this.el || !this.el.getTotalLength);
            return b = c && this.el.getAttribute("d") ? this.el.getTotalLength() : 2 * (null != a.radiusX ? a.radiusX : a.radius);
        }, b.prototype._getPointsPerimiter = function(a) {
            for (var b = 0, c = 1; c < a.length; c++) b += this._pointsDelta(a[c - 1], a[c]);
            return b += this._pointsDelta(a[0], p["default"].getLastItem(a));
        }, b.prototype._pointsDelta = function(a, b) {
            var c = Math.abs(a.x - b.x), d = Math.abs(a.y - b.y);
            return Math.sqrt(c * c + d * d);
        }, b.prototype._setSize = function(a, b) {
            var c = this._props;
            c.width = a, c.height = b, this._draw();
        }, b;
    }(n["default"]);
    b["default"] = q;
}, function(a, b, c) {
    !function() {
        "use strict";
        var a, b, c, d, e, f, g;
        for (e = [ "webkit", "moz" ], b = 0, g = window; b < e.length && !g.requestAnimationFrame; ) f = e[b], 
        g.requestAnimationFrame = g[f + "RequestAnimationFrame"], a = g[f + "CancelAnimationFrame"], 
        g.cancelAnimationFrame = a || g[f + "CancelRequestAnimationFrame"], ++b;
        c = !g.requestAnimationFrame || !g.cancelAnimationFrame, (/iP(ad|hone|od).*OS 6/.test(g.navigator.userAgent) || c) && (d = 0, 
        g.requestAnimationFrame = function(a) {
            var b, c;
            return c = Date.now(), b = Math.max(d + 16, c), setTimeout(function() {
                a(d = b);
            }, b - c);
        }, g.cancelAnimationFrame = clearTimeout);
    }();
}, function(a, b, c) {
    !function(a) {
        var b, c, d;
        return null == a.performance && (a.performance = {}), Date.now = Date.now || function() {
            return new Date().getTime();
        }, null == a.performance.now ? (b = (null != (c = a.performance) && null != (d = c.timing) ? d.navigationStart : void 0) ? performance.timing.navigationStart : Date.now(), 
        a.performance.now = function() {
            return Date.now() - b;
        }) : void 0;
    }(window);
}, function(a, b, c) {
    a.exports = {
        "default": c(47),
        __esModule: !0
    };
}, function(a, b, c) {
    a.exports = {
        "default": c(46),
        __esModule: !0
    };
}, function(a, b, c) {
    var d, e;
    !function() {
        var c;
        return c = function() {
            function a(a) {
                this.o = null != a ? a : {}, window.isAnyResizeEventInited || (this.vars(), this.redefineProto());
            }
            return a.prototype.vars = function() {
                return window.isAnyResizeEventInited = !0, this.allowedProtos = [ HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement ], 
                this.timerElements = {
                    img: 1,
                    textarea: 1,
                    input: 1,
                    embed: 1,
                    object: 1,
                    svg: 1,
                    canvas: 1,
                    tr: 1,
                    tbody: 1,
                    thead: 1,
                    tfoot: 1,
                    a: 1,
                    select: 1,
                    option: 1,
                    optgroup: 1,
                    dl: 1,
                    dt: 1,
                    br: 1,
                    basefont: 1,
                    font: 1,
                    col: 1,
                    iframe: 1
                };
            }, a.prototype.redefineProto = function() {
                var a, b, c, d;
                return b = this, d = function() {
                    var d, e, f, g;
                    for (f = this.allowedProtos, g = [], a = d = 0, e = f.length; e > d; a = ++d) c = f[a], 
                    null != c.prototype && g.push(function(a) {
                        var c, d;
                        return c = a.prototype.addEventListener || a.prototype.attachEvent, function(c) {
                            var d;
                            return d = function() {
                                var a;
                                return (this !== window || this !== document) && (a = "onresize" === arguments[0] && !this.isAnyResizeEventInited, 
                                a && b.handleResize({
                                    args: arguments,
                                    that: this
                                })), c.apply(this, arguments);
                            }, a.prototype.addEventListener ? a.prototype.addEventListener = d : a.prototype.attachEvent ? a.prototype.attachEvent = d : void 0;
                        }(c), d = a.prototype.removeEventListener || a.prototype.detachEvent, function(b) {
                            var c;
                            return c = function() {
                                return this.isAnyResizeEventInited = !1, this.iframe && this.removeChild(this.iframe), 
                                b.apply(this, arguments);
                            }, a.prototype.removeEventListener ? a.prototype.removeEventListener = c : a.prototype.detachEvent ? a.prototype.detachEvent = wrappedListener : void 0;
                        }(d);
                    }(c));
                    return g;
                }.call(this);
            }, a.prototype.handleResize = function(a) {
                var b, c, d, e, f, g, h;
                return c = a.that, this.timerElements[c.tagName.toLowerCase()] ? this.initTimer(c) : (d = document.createElement("iframe"), 
                c.appendChild(d), d.style.width = "100%", d.style.height = "100%", d.style.position = "absolute", 
                d.style.zIndex = -999, d.style.opacity = 0, d.style.top = 0, d.style.left = 0, b = window.getComputedStyle ? getComputedStyle(c) : c.currentStyle, 
                f = "" === c.style.position, g = "static" === b.position && f, e = "" === b.position && "" === c.style.position, 
                (g || e) && (c.style.position = "relative"), null != (h = d.contentWindow) && (h.onresize = function(a) {
                    return function(b) {
                        return a.dispatchEvent(c);
                    };
                }(this)), c.iframe = d), c.isAnyResizeEventInited = !0;
            }, a.prototype.initTimer = function(a) {
                var b, c;
                return c = 0, b = 0, this.interval = setInterval(function(d) {
                    return function() {
                        var e, f;
                        return f = a.offsetWidth, e = a.offsetHeight, f !== c || e !== b ? (d.dispatchEvent(a), 
                        c = f, b = e) : void 0;
                    };
                }(this), this.o.interval || 62.5);
            }, a.prototype.dispatchEvent = function(a) {
                var b;
                return document.createEvent ? (b = document.createEvent("HTMLEvents"), b.initEvent("onresize", !1, !1), 
                a.dispatchEvent(b)) : document.createEventObject ? (b = document.createEventObject(), 
                a.fireEvent("onresize", b)) : !1;
            }, a.prototype.destroy = function() {
                var a, b, c, d, e, f, g;
                for (clearInterval(this.interval), this.interval = null, window.isAnyResizeEventInited = !1, 
                b = this, f = this.allowedProtos, g = [], a = c = 0, d = f.length; d > c; a = ++c) e = f[a], 
                null != e.prototype && g.push(function(a) {
                    var b;
                    return b = a.prototype.addEventListener || a.prototype.attachEvent, a.prototype.addEventListener ? a.prototype.addEventListener = Element.prototype.addEventListener : a.prototype.attachEvent && (a.prototype.attachEvent = Element.prototype.attachEvent), 
                    a.prototype.removeEventListener ? a.prototype.removeEventListener = Element.prototype.removeEventListener : a.prototype.detachEvent ? a.prototype.detachEvent = Element.prototype.detachEvent : void 0;
                }(e));
                return g;
            }, a;
        }(), d = [], e = function() {
            return new c();
        }.apply(b, d), !(void 0 !== e && (a.exports = e));
    }();
}, function(a, b, c) {
    (function(b) {
        var d, e, f, g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
            return -1;
        };
        f = c(15), d = function() {
            function a(a) {
                return this.vars(), this.generate;
            }
            return a.prototype.vars = function() {
                return this.generate = f.bind(this.generate, this);
            }, a.prototype.generate = function(a, c, d, e) {
                var f, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D;
                if (arguments.length < 4) return this.error("Bezier function expects 4 arguments");
                for (w = x = 0; 4 > x; w = ++x) if (o = arguments[w], "number" != typeof o || isNaN(o) || !isFinite(o)) return this.error("Bezier function expects 4 arguments");
                return 0 > a || a > 1 || 0 > d || d > 1 ? this.error("Bezier x values should be > 0 and < 1") : (j = 4, 
                k = .001, m = 1e-7, l = 10, z = 11, y = 1 / (z - 1), t = g.call(b, "Float32Array") >= 0, 
                f = function(a, b) {
                    return 1 - 3 * b + 3 * a;
                }, h = function(a, b) {
                    return 3 * b - 6 * a;
                }, i = function(a) {
                    return 3 * a;
                }, q = function(a, b, c) {
                    return ((f(b, c) * a + h(b, c)) * a + i(b)) * a;
                }, u = function(a, b, c) {
                    return 3 * f(b, c) * a * a + 2 * h(b, c) * a + i(b);
                }, B = function(b, c) {
                    var e, f;
                    for (w = 0; j > w; ) {
                        if (e = u(c, a, d), 0 === e) return c;
                        f = q(c, a, d) - b, c -= f / e, ++w;
                    }
                    return c;
                }, r = function() {
                    for (w = 0; z > w; ) A[w] = q(w * y, a, d), ++w;
                }, p = function(b, c, e) {
                    var f, g, h;
                    for (g = void 0, f = void 0, w = 0; f = c + (e - c) / 2, g = q(f, a, d) - b, g > 0 ? e = f : c = f, 
                    h = Math.abs(g) > m, h && ++w < l; ) ;
                    return f;
                }, v = function(b) {
                    var c, e, f, g, h, i, j;
                    for (i = 0, c = 1, j = z - 1; c !== j && A[c] <= b; ) i += y, ++c;
                    return --c, e = A[c + 1] - A[c], f = (b - A[c]) / e, g = i + f * y, h = u(g, a, d), 
                    h >= k ? B(b, g) : 0 === h ? g : p(b, i, i + y);
                }, C = function() {
                    var b;
                    return b = !0, a !== c || d !== e ? r() : void 0;
                }, A = t ? new Float32Array(z) : new Array(z), n = !1, s = function(b) {
                    return n || C(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : q(v(b), c, e);
                }, D = "bezier(" + [ a, c, d, e ] + ")", s.toStr = function() {
                    return D;
                }, s);
            }, a.prototype.error = function(a) {
                return f.error(a);
            }, a;
        }(), e = new d(), a.exports = e;
    }).call(b, function() {
        return this;
    }());
}, function(a, b, c) {
    var d, e;
    e = c(15), d = function() {
        function a(a, b) {
            if (this.o = null != b ? b : {}, "creator" !== a) {
                if (this.path = e.parsePath(a), null == this.path) return e.error("Error while parsing the path");
                this._vars(), this.path.setAttribute("d", this._normalizePath(this.path.getAttribute("d"))), 
                this.pathLength = this.path.getTotalLength(), this.sample = e.bind(this.sample, this), 
                this._hardSample = e.bind(this._hardSample, this), this._preSample();
            }
        }
        return a.prototype._vars = function() {
            return this._precompute = e.clamp(this.o.precompute || 1450, 100, 1e4), this._step = 1 / this._precompute, 
            this._rect = this.o.rect || 100, this._approximateMax = this.o.approximateMax || 5, 
            this._eps = this.o.eps || .001, this._boundsPrevProgress = -1;
        }, a.prototype._preSample = function() {
            var a, b, c, d, e, f, g;
            for (this._samples = [], g = [], a = b = 0, f = this._precompute; f >= 0 ? f >= b : b >= f; a = f >= 0 ? ++b : --b) e = a * this._step, 
            c = this.pathLength * e, d = this.path.getPointAtLength(c), g.push(this._samples[a] = {
                point: d,
                length: c,
                progress: e
            });
            return g;
        }, a.prototype._findBounds = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o;
            if (b === this._boundsPrevProgress) return this._prevBounds;
            for (null == this._boundsStartIndex && (this._boundsStartIndex = 0), h = a.length, 
            this._boundsPrevProgress > b ? (i = 0, d = "reverse") : (i = h, d = "forward"), 
            "forward" === d ? (n = a[0], e = a[a.length - 1]) : (n = a[a.length - 1], e = a[0]), 
            f = g = l = this._boundsStartIndex, m = i; m >= l ? m > g : g > m; f = m >= l ? ++g : --g) {
                if (o = a[f], k = o.point.x / this._rect, j = b, "reverse" === d && (c = k, k = j, 
                j = c), !(j > k)) {
                    e = o;
                    break;
                }
                n = o, this._boundsStartIndex = f;
            }
            return this._boundsPrevProgress = b, this._prevBounds = {
                start: n,
                end: e
            };
        }, a.prototype.sample = function(a) {
            var b, c;
            return a = e.clamp(a, 0, 1), b = this._findBounds(this._samples, a), c = this._checkIfBoundsCloseEnough(a, b), 
            null != c ? c : this._findApproximate(a, b.start, b.end);
        }, a.prototype._checkIfBoundsCloseEnough = function(a, b) {
            var c, d;
            return c = void 0, d = this._checkIfPointCloseEnough(a, b.start.point), null != d ? d : this._checkIfPointCloseEnough(a, b.end.point);
        }, a.prototype._checkIfPointCloseEnough = function(a, b) {
            return e.closeEnough(a, b.x / this._rect, this._eps) ? this._resolveY(b) : void 0;
        }, a.prototype._approximate = function(a, b, c) {
            var d, e;
            return d = b.point.x - a.point.x, e = (c - a.point.x / this._rect) / (d / this._rect), 
            a.length + e * (b.length - a.length);
        }, a.prototype._findApproximate = function(a, b, c, d) {
            var f, g, h, i, j;
            return null == d && (d = this._approximateMax), f = this._approximate(b, c, a), 
            i = this.path.getPointAtLength(f), j = i.x / this._rect, e.closeEnough(a, j, this._eps) ? this._resolveY(i) : --d < 1 ? this._resolveY(i) : (h = {
                point: i,
                length: f
            }, g = j > a ? [ a, b, h, d ] : [ a, h, c, d ], this._findApproximate.apply(this, g));
        }, a.prototype._resolveY = function(a) {
            return 1 - a.y / this._rect;
        }, a.prototype._normalizePath = function(a) {
            var b, c, d, e, f, g;
            return g = /[M|L|H|V|C|S|Q|T|A]/gim, e = a.split(g), e.shift(), b = a.match(g), 
            f = 0, e[f] = this._normalizeSegment(e[f]), c = e.length - 1, e[c] = this._normalizeSegment(e[c], this._rect || 100), 
            d = this._joinNormalizedPath(b, e);
        }, a.prototype._joinNormalizedPath = function(a, b) {
            var c, d, e, f, g, h;
            for (g = "", d = e = 0, f = a.length; f > e; d = ++e) c = a[d], h = 0 === d ? "" : " ", 
            g += "" + h + c + b[d].trim();
            return g;
        }, a.prototype._normalizeSegment = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l;
            if (null == b && (b = 0), a = a.trim(), g = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim, 
            h = this._getSegmentPairs(a.match(g)), e = h[h.length - 1], l = e[0], i = Number(l), 
            i !== b) for (a = "", e[0] = b, c = d = 0, f = h.length; f > d; c = ++d) j = h[c], 
            k = 0 === c ? "" : " ", a += "" + k + j[0] + "," + j[1];
            return a;
        }, a.prototype._getSegmentPairs = function(a) {
            var b, c, d, f, g, h;
            for (a.length % 2 !== 0 && e.error("Failed to parse the path - segment pairs are not even.", a), 
            f = [], b = c = 0, d = a.length; d > c; b = c += 2) h = a[b], g = [ a[b], a[b + 1] ], 
            f.push(g);
            return f;
        }, a.prototype.create = function(b, c) {
            var d;
            return d = new a(b, c), d.sample.path = d.path, d.sample;
        }, a;
    }(), a.exports = d;
}, function(a, b, c) {
    var d, e, f, g, h, i, j = [].slice;
    e = null, h = function(a) {
        return "number" == typeof a.value ? a.value : e.parseEasing(a.value);
    }, i = function(a, b) {
        var c;
        return a.value = h(a), b.value = h(b), c = 0, a.to < b.to && (c = -1), a.to > b.to && (c = 1), 
        c;
    }, f = function(a, b) {
        var c, d, e, f, g;
        for (d = 0, c = e = 0, f = a.length; f > e && (g = a[c], d = c, !(g.to > b)); c = ++e) ;
        return d;
    }, g = function() {
        var a;
        return a = 1 <= arguments.length ? j.call(arguments, 0) : [], a.length > 1 ? a = a.sort(i) : a[0].value = h(a[0]), 
        function(b) {
            var c, d;
            return c = f(a, b), -1 !== c ? (d = a[c].value, c === a.length - 1 && b > a[c].to ? 1 : "function" == typeof d ? d(b) : d) : void 0;
        };
    }, d = function(a) {
        return e = a, g;
    }, a.exports = d;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(19), f = d(e), g = c(15), h = (d(g), function(a) {
        function b(a, b) {
            b = +b || 0;
            var c = Math.pow(10, b);
            return Math.round(a * c) / c;
        }
        var c = a.base, d = Math.pow(10, c), e = 1 / d, f = function(d) {
            var f = b(d, c), g = a[f.toString()];
            if (Math.abs(d - f) < e) return g;
            if (d > f) var h = f + e, i = a[h]; else var h = f - e, i = a[h];
            var j = h - f, k = i - g;
            if (e > k) return g;
            var l = (d - f) / j, m = i > g ? -1 : 1, n = m * l * k;
            return g + n;
        };
        return f.getSamples = function() {
            return a;
        }, f;
    }), i = function(a) {
        var b = arguments.length <= 1 || void 0 === arguments[1] ? 4 : arguments[1], c = "undefined" == typeof b ? "undefined" : f["default"](b), d = {};
        if ("number" === c) {
            var e = 0, g = Math.pow(10, b), h = 1 / g;
            d[0] = a(0);
            for (var i = 0; g - 1 > i; i++) {
                e += h;
                var k = parseFloat(e.toFixed(b));
                d[k] = a(e);
            }
            d[1] = a(1), d.base = b;
        } else "object" === c ? d = b : "string" === c && (d = JSON.parse(b));
        return j._sample._proximate(d);
    }, j = {
        _sample: i,
        _proximate: h
    };
    j._sample._proximate = j._proximate, b["default"] = j._sample;
}, function(a, b, c) {
    a.exports = {
        "default": c(48),
        __esModule: !0
    };
}, function(a, b, c) {
    a.exports = {
        "default": c(51),
        __esModule: !0
    };
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "rect", 
            this._defaults.rx = 0, this._defaults.ry = 0;
        }, b.prototype._draw = function() {
            var a, c, d;
            return b.__super__._draw.apply(this, arguments), a = this._props, c = null != a.radiusX ? a.radiusX : a.radius, 
            d = null != a.radiusY ? a.radiusY : a.radius, this._setAttrIfChanged("width", 2 * c), 
            this._setAttrIfChanged("height", 2 * d), this._setAttrIfChanged("x", a.width / 2 - c), 
            this._setAttrIfChanged("y", a.height / 2 - d), this._setAttrIfChanged("rx", a.rx), 
            this._setAttrIfChanged("ry", a.ry);
        }, b.prototype._getLength = function() {
            var a, b;
            return a = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            b = null != this._props.radiusY ? this._props.radiusY : this._props.radius, 2 * (2 * a + 2 * b);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(21), h = d(g), i = c(22), j = d(i), k = c(23), l = d(k), m = function(a) {
        function b() {
            return f["default"](this, b), h["default"](this, a.apply(this, arguments));
        }
        return j["default"](b, a), b.prototype._declareDefaults = function() {
            a.prototype._declareDefaults.call(this), this._defaults.tag = "path", this._defaults.parent = null;
            for (var b = 0; b < this._drawMap.length; b++) "stroke-width" === this._drawMap[b] && this._drawMap.splice(b, 1);
        }, b.prototype.getShape = function() {
            return "";
        }, b.prototype.getLength = function() {
            return 100;
        }, b.prototype._draw = function() {
            var b = this._props, c = this._state, d = c.radiusX !== b.radiusX, e = c.radiusY !== b.radiusY, f = c.radius !== b.radius;
            (d || e || f) && (this.el.setAttribute("transform", this._getScale()), c.radiusX = b.radiusX, 
            c.radiusY = b.radiusY, c.radius = b.radius), this._setAttrIfChanged("stroke-width", b["stroke-width"] / b.maxScale), 
            a.prototype._draw.call(this);
        }, b.prototype._render = function() {
            if (!this._isRendered) {
                this._isRendered = !0, this._length = this.getLength();
                var a = this._props;
                a.parent.innerHTML = '<svg id="js-mojs-shape-canvas" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><g id="js-mojs-shape-el">' + this.getShape() + "</g></svg>", 
                this._canvas = a.parent.querySelector("#js-mojs-shape-canvas"), this.el = a.parent.querySelector("#js-mojs-shape-el"), 
                this._setCanvasSize();
            }
        }, b.prototype._getScale = function() {
            var a = this._props, b = a.radiusX ? a.radiusX : a.radius, c = a.radiusY ? a.radiusY : a.radius;
            a.scaleX = 2 * b / 100, a.scaleY = 2 * c / 100, a.maxScale = Math.max(a.scaleX, a.scaleY), 
            a.shiftX = a.width / 2 - 50 * a.scaleX, a.shiftY = a.height / 2 - 50 * a.scaleY;
            var d = "translate(" + a.shiftX + ", " + a.shiftY + ")";
            return d + " scale(" + a.scaleX + ", " + a.scaleY + ")";
        }, b.prototype._getLength = function() {
            return this._length;
        }, b;
    }(l["default"]);
    b["default"] = m;
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.shape = "ellipse";
        }, b.prototype._draw = function() {
            var a, c;
            return a = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            c = null != this._props.radiusY ? this._props.radiusY : this._props.radius, this._setAttrIfChanged("rx", a), 
            this._setAttrIfChanged("ry", c), this._setAttrIfChanged("cx", this._props.width / 2), 
            this._setAttrIfChanged("cy", this._props.height / 2), b.__super__._draw.apply(this, arguments);
        }, b.prototype._getLength = function() {
            var a, b;
            return a = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            b = null != this._props.radiusY ? this._props.radiusY : this._props.radius, 2 * Math.PI * Math.sqrt((a * a + b * b) / 2);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "line";
        }, b.prototype._draw = function() {
            var a, c, d;
            return a = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            c = this._props.width / 2, d = this._props.height / 2, this._setAttrIfChanged("x1", c - a), 
            this._setAttrIfChanged("x2", c + a), this._setAttrIfChanged("y1", d), this._setAttrIfChanged("y2", d), 
            b.__super__._draw.apply(this, arguments);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "path", 
            this._defaults.points = 3;
        }, b.prototype._draw = function() {
            var a, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            if (b.__super__._draw.apply(this, arguments), k = this._props, this._props.points && (m = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            n = null != this._props.radiusY ? this._props.radiusY : this._props.radius, g = m === this._prevRadiusX, 
            h = n === this._prevRadiusY, f = k.points === this._prevPoints, !(g && h && f))) {
                for (q = k.width / 2, r = k.height / 2, a = q - m, c = r, p = 2 * m / (k.points - 1), 
                s = -1, d = Math.sqrt(p * p + n * n), j = -d, l = "M" + a + ", " + r + " ", e = i = 0, 
                o = k.points; o >= 0 ? o > i : i > o; e = o >= 0 ? ++i : --i) l += "L" + a + ", " + c + " ", 
                a += p, j += d, c = -1 === s ? r - n : r, s = -s;
                return this._length = j, this.el.setAttribute("d", l), this._prevPoints = k.points, 
                this._prevRadiusX = m, this._prevRadiusY = n;
            }
        }, b.prototype._getLength = function() {
            return this._length;
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    var d, e, f, g = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) h.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, h = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), f = c(15), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return g(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "path", 
            this._defaults.points = 3;
        }, b.prototype._draw = function() {
            var a, c, d, e, g, h, i, j, k, l, m, n, o, p, q, r;
            if (l = this._props, n = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            o = null != this._props.radiusY ? this._props.radiusY : this._props.radius, g = n === this._prevRadiusX, 
            h = o === this._prevRadiusY, e = l.points === this._prevPoints, !(g && h && e)) {
                for (r = 360 / this._props.points, null == this._radialPoints ? this._radialPoints = [] : this._radialPoints.length = 0, 
                d = i = 0, p = this._props.points; p >= 0 ? p > i : i > p; d = p >= 0 ? ++i : --i) this._radialPoints.push(f.getRadialPoint({
                    radius: this._props.radius,
                    radiusX: this._props.radiusX,
                    radiusY: this._props.radiusY,
                    angle: d * r,
                    center: {
                        x: l.width / 2,
                        y: l.height / 2
                    }
                }));
                for (c = "", q = this._radialPoints, d = j = 0, k = q.length; k > j; d = ++j) m = q[d], 
                a = 0 === d ? "M" : "L", c += "" + a + m.x.toFixed(4) + "," + m.y.toFixed(4) + " ";
                this._prevPoints = l.points, this._prevRadiusX = n, this._prevRadiusY = o, this.el.setAttribute("d", c += "z");
            }
            return b.__super__._draw.apply(this, arguments);
        }, b.prototype._getLength = function() {
            return this._getPointsPerimiter(this._radialPoints);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "path";
        }, b.prototype._draw = function() {
            var a, c, d, e, f, g, h, i, j, k, l, m, n, o;
            return b.__super__._draw.apply(this, arguments), g = this._props, h = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            i = null != this._props.radiusY ? this._props.radiusY : this._props.radius, c = h === this._prevRadiusX, 
            d = i === this._prevRadiusY, c && d ? void 0 : (j = this._props.width / 2, m = this._props.height / 2, 
            k = j - h, l = j + h, e = "M" + k + "," + m + " L" + l + "," + m, n = m - i, o = m + i, 
            f = "M" + j + "," + n + " L" + j + "," + o, a = e + " " + f, this.el.setAttribute("d", a), 
            this._prevRadiusX = h, this._prevRadiusY = i);
        }, b.prototype._getLength = function() {
            var a, b;
            return a = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            b = null != this._props.radiusY ? this._props.radiusY : this._props.radius, 2 * (a + b);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    "use strict";
    function d(a) {
        return a && a.__esModule ? a : {
            "default": a
        };
    }
    b.__esModule = !0;
    var e = c(20), f = d(e), g = c(21), h = d(g), i = c(22), j = d(i), k = c(23), l = d(k), m = function(a) {
        function b() {
            return f["default"](this, b), h["default"](this, a.apply(this, arguments));
        }
        return j["default"](b, a), b.prototype._declareDefaults = function() {
            a.prototype._declareDefaults.call(this), this._defaults.tag = "path";
        }, b.prototype._draw = function() {
            a.prototype._draw.call(this);
            var b = this._props, c = null != b.radiusX ? b.radiusX : b.radius, d = null != b.radiusY ? b.radiusY : b.radius, e = c === this._prevRadiusX, f = d === this._prevRadiusY, g = b.points === this._prevPoints;
            if (!(e && f && g)) {
                var h = b.width / 2, i = b.height / 2, j = h - c, k = h + c, l = "M" + j + " " + i + " Q " + h + " " + (i - 2 * d) + " " + k + " " + i;
                this.el.setAttribute("d", l), this._prevPoints = b.points, this._prevRadiusX = c, 
                this._prevRadiusY = d;
            }
        }, b.prototype._getLength = function() {
            var a = this._props, b = null != a.radiusX ? a.radiusX : a.radius, c = null != a.radiusY ? a.radiusY : a.radius, d = b + c, e = Math.sqrt((3 * b + c) * (b + 3 * c));
            return .5 * Math.PI * (3 * d - e);
        }, b;
    }(l["default"]);
    b["default"] = m;
}, function(a, b, c) {
    var d, e, f = function(a, b) {
        function c() {
            this.constructor = a;
        }
        for (var d in b) g.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, 
        a;
    }, g = {}.hasOwnProperty;
    d = c(23)["default"] || c(23), e = function(a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments);
        }
        return f(b, a), b.prototype._declareDefaults = function() {
            return b.__super__._declareDefaults.apply(this, arguments), this._defaults.tag = "path", 
            this._defaults.points = 2;
        }, b.prototype._draw = function() {
            var a, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q;
            if (b.__super__._draw.apply(this, arguments), h = this._props, this._props.points && (i = null != this._props.radiusX ? this._props.radiusX : this._props.radius, 
            j = null != this._props.radiusY ? this._props.radiusY : this._props.radius, e = i === this._prevRadiusX, 
            f = j === this._prevRadiusY, d = h.points === this._prevPoints, !(e && f && d))) {
                for (l = this._props.width / 2, o = this._props.height / 2, m = l - i, n = l + i, 
                a = "", q = 2 * j / (this._props.points - 1), p = o - j, c = g = 0, k = this._props.points; k >= 0 ? k > g : g > k; c = k >= 0 ? ++g : --g) o = "" + (c * q + p), 
                a += "M" + m + ", " + o + " L" + n + ", " + o + " ";
                return this.el.setAttribute("d", a), this._prevPoints = h.points, this._prevRadiusX = i, 
                this._prevRadiusY = j;
            }
        }, b.prototype._getLength = function() {
            return 2 * (null != this._props.radiusX ? this._props.radiusX : this._props.radius);
        }, b;
    }(d), a.exports = e;
}, function(a, b, c) {
    a.exports = {
        "default": c(1),
        __esModule: !0
    };
}, function(a, b, c) {
    a.exports = {
        "default": c(50),
        __esModule: !0
    };
}, function(a, b, c) {
    c(52), c(53), a.exports = c(54);
}, function(a, b, c) {
    c(61), a.exports = c(57).Object.keys;
}, function(a, b, c) {
    c(53), c(52), a.exports = c(55)("iterator");
}, function(a, b, c) {
    var d, e;
    (function(a) {
        "use strict";
        function f(a) {
            return a && a.__esModule ? a : {
                "default": a
            };
        }
        var g = c(19), h = f(g), i = c(15), j = f(i), k = c(16), l = f(k), m = c(3), n = f(m), o = c(4), p = f(o), q = c(5), r = f(q), s = c(6), t = f(s), u = c(7), v = f(u), w = c(17), x = f(w), y = c(2), z = f(y), A = c(8), B = f(A), C = c(9), D = f(C), E = c(10), F = f(E), G = c(11), H = f(G), I = c(12), J = f(I), K = c(13), L = f(K), M = c(18), N = f(M), O = {
            revision: "0.265.6",
            isDebug: !0,
            helpers: j["default"],
            Shape: p["default"],
            ShapeSwirl: r["default"],
            Burst: n["default"],
            stagger: t["default"],
            Spriter: v["default"],
            MotionPath: x["default"],
            Tween: z["default"],
            Timeline: B["default"],
            Tweenable: F["default"],
            Thenable: H["default"],
            Tunable: J["default"],
            Module: L["default"],
            tweener: D["default"],
            easing: N["default"],
            shapesMap: l["default"]
        };
        O.h = O.helpers, O.delta = O.h.delta, O.addShape = O.shapesMap.addShape, O.CustomShape = O.shapesMap.custom, 
        O.Transit = O.Shape, O.Swirl = O.ShapeSwirl, window.mojs = O, d = [], e = function() {
            return O;
        }.apply(b, d), !(void 0 !== e && (a.exports = e)), "object" === h["default"](a) && "object" === h["default"](a.exports) && (a.exports = O);
    }).call(b, c(14)(a));
}, function(a, b, c) {
    var d = c(58);
    a.exports = function(a, b) {
        return d.create(a, b);
    };
}, function(a, b, c) {
    c(59), c(60), a.exports = c(57).Symbol;
}, function(a, b, c) {
    c(62);
    var d = c(63);
    d.NodeList = d.HTMLCollection = d.Array;
}, function(a, b, c) {
    "use strict";
    var d = c(64)(!0);
    c(65)(String, "String", function(a) {
        this._t = String(a), this._i = 0;
    }, function() {
        var a, b = this._t, c = this._i;
        return c >= b.length ? {
            value: void 0,
            done: !0
        } : (a = d(b, c), this._i += a.length, {
            value: a,
            done: !1
        });
    });
}, function(a, b, c) {
    var d = c(66), e = c(67);
    a.exports = c(57).getIterator = function(a) {
        var b = e(a);
        if ("function" != typeof b) throw TypeError(a + " is not iterable!");
        return d(b.call(a));
    };
}, function(a, b, c) {
    var d = c(68)("wks"), e = c(69), f = c(70).Symbol;
    a.exports = function(a) {
        return d[a] || (d[a] = f && f[a] || (f || e)("Symbol." + a));
    };
}, function(a, b, c) {
    var d = c(73);
    d(d.S, "Object", {
        setPrototypeOf: c(84).set
    });
}, function(a, b, c) {
    var d = a.exports = {
        version: "1.2.6"
    };
    "number" == typeof __e && (__e = d);
}, function(a, b, c) {
    var d = Object;
    a.exports = {
        create: d.create,
        getProto: d.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: d.getOwnPropertyDescriptor,
        setDesc: d.defineProperty,
        setDescs: d.defineProperties,
        getKeys: d.keys,
        getNames: d.getOwnPropertyNames,
        getSymbols: d.getOwnPropertySymbols,
        each: [].forEach
    };
}, function(a, b, c) {
    "use strict";
    var d = c(58), e = c(70), f = c(71), g = c(72), h = c(73), i = c(74), j = c(75), k = c(68), l = c(76), m = c(69), n = c(55), o = c(77), p = c(78), q = c(79), r = c(80), s = c(66), t = c(81), u = c(82), v = d.getDesc, w = d.setDesc, x = d.create, y = p.get, z = e.Symbol, A = e.JSON, B = A && A.stringify, C = !1, D = n("_hidden"), E = d.isEnum, F = k("symbol-registry"), G = k("symbols"), H = "function" == typeof z, I = Object.prototype, J = g && j(function() {
        return 7 != x(w({}, "a", {
            get: function() {
                return w(this, "a", {
                    value: 7
                }).a;
            }
        })).a;
    }) ? function(a, b, c) {
        var d = v(I, b);
        d && delete I[b], w(a, b, c), d && a !== I && w(I, b, d);
    } : w, K = function(a) {
        var b = G[a] = x(z.prototype);
        return b._k = a, g && C && J(I, a, {
            configurable: !0,
            set: function(b) {
                f(this, D) && f(this[D], a) && (this[D][a] = !1), J(this, a, u(1, b));
            }
        }), b;
    }, L = function(a) {
        return "symbol" == typeof a;
    }, M = function(a, b, c) {
        return c && f(G, b) ? (c.enumerable ? (f(a, D) && a[D][b] && (a[D][b] = !1), c = x(c, {
            enumerable: u(0, !1)
        })) : (f(a, D) || w(a, D, u(1, {})), a[D][b] = !0), J(a, b, c)) : w(a, b, c);
    }, N = function(a, b) {
        s(a);
        for (var c, d = q(b = t(b)), e = 0, f = d.length; f > e; ) M(a, c = d[e++], b[c]);
        return a;
    }, O = function(a, b) {
        return void 0 === b ? x(a) : N(x(a), b);
    }, P = function(a) {
        var b = E.call(this, a);
        return b || !f(this, a) || !f(G, a) || f(this, D) && this[D][a] ? b : !0;
    }, Q = function(a, b) {
        var c = v(a = t(a), b);
        return !c || !f(G, b) || f(a, D) && a[D][b] || (c.enumerable = !0), c;
    }, R = function(a) {
        for (var b, c = y(t(a)), d = [], e = 0; c.length > e; ) f(G, b = c[e++]) || b == D || d.push(b);
        return d;
    }, S = function(a) {
        for (var b, c = y(t(a)), d = [], e = 0; c.length > e; ) f(G, b = c[e++]) && d.push(G[b]);
        return d;
    }, T = function(a) {
        if (void 0 !== a && !L(a)) {
            for (var b, c, d = [ a ], e = 1, f = arguments; f.length > e; ) d.push(f[e++]);
            return b = d[1], "function" == typeof b && (c = b), (c || !r(b)) && (b = function(a, b) {
                return c && (b = c.call(this, a, b)), L(b) ? void 0 : b;
            }), d[1] = b, B.apply(A, d);
        }
    }, U = j(function() {
        var a = z();
        return "[null]" != B([ a ]) || "{}" != B({
            a: a
        }) || "{}" != B(Object(a));
    });
    H || (z = function() {
        if (L(this)) throw TypeError("Symbol is not a constructor");
        return K(m(arguments.length > 0 ? arguments[0] : void 0));
    }, i(z.prototype, "toString", function() {
        return this._k;
    }), L = function(a) {
        return a instanceof z;
    }, d.create = O, d.isEnum = P, d.getDesc = Q, d.setDesc = M, d.setDescs = N, d.getNames = p.get = R, 
    d.getSymbols = S, g && !c(83) && i(I, "propertyIsEnumerable", P, !0));
    var V = {
        "for": function(a) {
            return f(F, a += "") ? F[a] : F[a] = z(a);
        },
        keyFor: function(a) {
            return o(F, a);
        },
        useSetter: function() {
            C = !0;
        },
        useSimple: function() {
            C = !1;
        }
    };
    d.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(a) {
        var b = n(a);
        V[a] = H ? b : K(b);
    }), C = !0, h(h.G + h.W, {
        Symbol: z
    }), h(h.S, "Symbol", V), h(h.S + h.F * !H, "Object", {
        create: O,
        defineProperty: M,
        defineProperties: N,
        getOwnPropertyDescriptor: Q,
        getOwnPropertyNames: R,
        getOwnPropertySymbols: S
    }), A && h(h.S + h.F * (!H || U), "JSON", {
        stringify: T
    }), l(z, "Symbol"), l(Math, "Math", !0), l(e.JSON, "JSON", !0);
}, function(a, b, c) {}, function(a, b, c) {
    var d = c(85);
    c(86)("keys", function(a) {
        return function(b) {
            return a(d(b));
        };
    });
}, function(a, b, c) {
    "use strict";
    var d = c(87), e = c(88), f = c(63), g = c(81);
    a.exports = c(65)(Array, "Array", function(a, b) {
        this._t = g(a), this._i = 0, this._k = b;
    }, function() {
        var a = this._t, b = this._k, c = this._i++;
        return !a || c >= a.length ? (this._t = void 0, e(1)) : "keys" == b ? e(0, c) : "values" == b ? e(0, a[c]) : e(0, [ c, a[c] ]);
    }, "values"), f.Arguments = f.Array, d("keys"), d("values"), d("entries");
}, function(a, b, c) {
    a.exports = {};
}, function(a, b, c) {
    var d = c(89), e = c(90);
    a.exports = function(a) {
        return function(b, c) {
            var f, g, h = String(e(b)), i = d(c), j = h.length;
            return 0 > i || i >= j ? a ? "" : void 0 : (f = h.charCodeAt(i), 55296 > f || f > 56319 || i + 1 === j || (g = h.charCodeAt(i + 1)) < 56320 || g > 57343 ? a ? h.charAt(i) : f : a ? h.slice(i, i + 2) : (f - 55296 << 10) + (g - 56320) + 65536);
        };
    };
}, function(a, b, c) {
    "use strict";
    var d = c(83), e = c(73), f = c(74), g = c(91), h = c(71), i = c(63), j = c(92), k = c(76), l = c(58).getProto, m = c(55)("iterator"), n = !([].keys && "next" in [].keys()), o = "@@iterator", p = "keys", q = "values", r = function() {
        return this;
    };
    a.exports = function(a, b, c, s, t, u, v) {
        j(c, b, s);
        var w, x, y = function(a) {
            if (!n && a in C) return C[a];
            switch (a) {
              case p:
                return function() {
                    return new c(this, a);
                };

              case q:
                return function() {
                    return new c(this, a);
                };
            }
            return function() {
                return new c(this, a);
            };
        }, z = b + " Iterator", A = t == q, B = !1, C = a.prototype, D = C[m] || C[o] || t && C[t], E = D || y(t);
        if (D) {
            var F = l(E.call(new a()));
            k(F, z, !0), !d && h(C, o) && g(F, m, r), A && D.name !== q && (B = !0, E = function() {
                return D.call(this);
            });
        }
        if (d && !v || !n && !B && C[m] || g(C, m, E), i[b] = E, i[z] = r, t) if (w = {
            values: A ? E : y(q),
            keys: u ? E : y(p),
            entries: A ? y("entries") : E
        }, v) for (x in w) x in C || f(C, x, w[x]); else e(e.P + e.F * (n || B), b, w);
        return w;
    };
}, function(a, b, c) {
    var d = c(93);
    a.exports = function(a) {
        if (!d(a)) throw TypeError(a + " is not an object!");
        return a;
    };
}, function(a, b, c) {
    var d = c(94), e = c(55)("iterator"), f = c(63);
    a.exports = c(57).getIteratorMethod = function(a) {
        return void 0 != a ? a[e] || a["@@iterator"] || f[d(a)] : void 0;
    };
}, function(a, b, c) {
    var d = c(70), e = "__core-js_shared__", f = d[e] || (d[e] = {});
    a.exports = function(a) {
        return f[a] || (f[a] = {});
    };
}, function(a, b, c) {
    var d = 0, e = Math.random();
    a.exports = function(a) {
        return "Symbol(".concat(void 0 === a ? "" : a, ")_", (++d + e).toString(36));
    };
}, function(a, b, c) {
    var d = a.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = d);
}, function(a, b, c) {
    var d = {}.hasOwnProperty;
    a.exports = function(a, b) {
        return d.call(a, b);
    };
}, function(a, b, c) {
    a.exports = !c(75)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a;
    });
}, function(a, b, c) {
    var d = c(70), e = c(57), f = c(95), g = "prototype", h = function(a, b, c) {
        var i, j, k, l = a & h.F, m = a & h.G, n = a & h.S, o = a & h.P, p = a & h.B, q = a & h.W, r = m ? e : e[b] || (e[b] = {}), s = m ? d : n ? d[b] : (d[b] || {})[g];
        m && (c = b);
        for (i in c) j = !l && s && i in s, j && i in r || (k = j ? s[i] : c[i], r[i] = m && "function" != typeof s[i] ? c[i] : p && j ? f(k, d) : q && s[i] == k ? function(a) {
            var b = function(b) {
                return this instanceof a ? new a(b) : a(b);
            };
            return b[g] = a[g], b;
        }(k) : o && "function" == typeof k ? f(Function.call, k) : k, o && ((r[g] || (r[g] = {}))[i] = k));
    };
    h.F = 1, h.G = 2, h.S = 4, h.P = 8, h.B = 16, h.W = 32, a.exports = h;
}, function(a, b, c) {
    a.exports = c(91);
}, function(a, b, c) {
    a.exports = function(a) {
        try {
            return !!a();
        } catch (b) {
            return !0;
        }
    };
}, function(a, b, c) {
    var d = c(58).setDesc, e = c(71), f = c(55)("toStringTag");
    a.exports = function(a, b, c) {
        a && !e(a = c ? a : a.prototype, f) && d(a, f, {
            configurable: !0,
            value: b
        });
    };
}, function(a, b, c) {
    var d = c(58), e = c(81);
    a.exports = function(a, b) {
        for (var c, f = e(a), g = d.getKeys(f), h = g.length, i = 0; h > i; ) if (f[c = g[i++]] === b) return c;
    };
}, function(a, b, c) {
    var d = c(81), e = c(58).getNames, f = {}.toString, g = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], h = function(a) {
        try {
            return e(a);
        } catch (b) {
            return g.slice();
        }
    };
    a.exports.get = function(a) {
        return g && "[object Window]" == f.call(a) ? h(a) : e(d(a));
    };
}, function(a, b, c) {
    var d = c(58);
    a.exports = function(a) {
        var b = d.getKeys(a), c = d.getSymbols;
        if (c) for (var e, f = c(a), g = d.isEnum, h = 0; f.length > h; ) g.call(a, e = f[h++]) && b.push(e);
        return b;
    };
}, function(a, b, c) {
    var d = c(96);
    a.exports = Array.isArray || function(a) {
        return "Array" == d(a);
    };
}, function(a, b, c) {
    var d = c(97), e = c(90);
    a.exports = function(a) {
        return d(e(a));
    };
}, function(a, b, c) {
    a.exports = function(a, b) {
        return {
            enumerable: !(1 & a),
            configurable: !(2 & a),
            writable: !(4 & a),
            value: b
        };
    };
}, function(a, b, c) {
    a.exports = !0;
}, function(a, b, c) {
    var d = c(58).getDesc, e = c(93), f = c(66), g = function(a, b) {
        if (f(a), !e(b) && null !== b) throw TypeError(b + ": can't set as prototype!");
    };
    a.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(a, b, e) {
            try {
                e = c(95)(Function.call, d(Object.prototype, "__proto__").set, 2), e(a, []), b = !(a instanceof Array);
            } catch (f) {
                b = !0;
            }
            return function(a, c) {
                return g(a, c), b ? a.__proto__ = c : e(a, c), a;
            };
        }({}, !1) : void 0),
        check: g
    };
}, function(a, b, c) {
    var d = c(90);
    a.exports = function(a) {
        return Object(d(a));
    };
}, function(a, b, c) {
    var d = c(73), e = c(57), f = c(75);
    a.exports = function(a, b) {
        var c = (e.Object || {})[a] || Object[a], g = {};
        g[a] = b(c), d(d.S + d.F * f(function() {
            c(1);
        }), "Object", g);
    };
}, function(a, b, c) {
    a.exports = function() {};
}, function(a, b, c) {
    a.exports = function(a, b) {
        return {
            value: b,
            done: !!a
        };
    };
}, function(a, b, c) {
    var d = Math.ceil, e = Math.floor;
    a.exports = function(a) {
        return isNaN(a = +a) ? 0 : (a > 0 ? e : d)(a);
    };
}, function(a, b, c) {
    a.exports = function(a) {
        if (void 0 == a) throw TypeError("Can't call method on  " + a);
        return a;
    };
}, function(a, b, c) {
    var d = c(58), e = c(82);
    a.exports = c(72) ? function(a, b, c) {
        return d.setDesc(a, b, e(1, c));
    } : function(a, b, c) {
        return a[b] = c, a;
    };
}, function(a, b, c) {
    "use strict";
    var d = c(58), e = c(82), f = c(76), g = {};
    c(91)(g, c(55)("iterator"), function() {
        return this;
    }), a.exports = function(a, b, c) {
        a.prototype = d.create(g, {
            next: e(1, c)
        }), f(a, b + " Iterator");
    };
}, function(a, b, c) {
    a.exports = function(a) {
        return "object" == typeof a ? null !== a : "function" == typeof a;
    };
}, function(a, b, c) {
    var d = c(96), e = c(55)("toStringTag"), f = "Arguments" == d(function() {
        return arguments;
    }());
    a.exports = function(a) {
        var b, c, g;
        return void 0 === a ? "Undefined" : null === a ? "Null" : "string" == typeof (c = (b = Object(a))[e]) ? c : f ? d(b) : "Object" == (g = d(b)) && "function" == typeof b.callee ? "Arguments" : g;
    };
}, function(a, b, c) {
    var d = c(98);
    a.exports = function(a, b, c) {
        if (d(a), void 0 === b) return a;
        switch (c) {
          case 1:
            return function(c) {
                return a.call(b, c);
            };

          case 2:
            return function(c, d) {
                return a.call(b, c, d);
            };

          case 3:
            return function(c, d, e) {
                return a.call(b, c, d, e);
            };
        }
        return function() {
            return a.apply(b, arguments);
        };
    };
}, function(a, b, c) {
    var d = {}.toString;
    a.exports = function(a) {
        return d.call(a).slice(8, -1);
    };
}, function(a, b, c) {
    var d = c(96);
    a.exports = Object("z").propertyIsEnumerable(0) ? Object : function(a) {
        return "String" == d(a) ? a.split("") : Object(a);
    };
}, function(a, b, c) {
    a.exports = function(a) {
        if ("function" != typeof a) throw TypeError(a + " is not a function!");
        return a;
    };
} ]), "home" === $("body").attr("id") && $(document).ready(function() {
    $("#twitter-api-bar").load("OAuth/twitter-auth.php");
});

var LastFMStatus = {
    defaultApiKey: "8268a36df9e8ca5f3bf2dac06f83ef93",
    updateDelay: 6e4,
    apikey: null,
    username: null,
    trackInfo: null,
    init: function(a) {
        if (a = a || {}, this.apikey = a.apikey ? a.apikey : this.defaultApiKey, !a.username) throw "RuntimeError: No username was specified!";
        this.username = a.username, this.fetch();
    },
    url: function(a) {
        return "http://ws.audioscrobbler.com/2.0?method=user.getrecenttracks&user=" + this.username + "&api_key=" + this.apikey + "&limit=2&format=json&callback=" + a;
    },
    fetch: function() {
        var a = document.getElementById("lfm_state_json");
        a && document.body.removeChild(a);
        var b = document.createElement("script");
        b.src = this.url("LastFMStatus.updateInfo"), b.id = "lfm_state_json", document.body.appendChild(b);
    },
    updateInfo: function(a) {
        if (a.error) this.trackInfo = a; else {
            var b = a.recenttracks.track[0], c = {
                song: b.name,
                artist: b.artist["#text"],
                playing: b["@attr"] ? !0 : !1
            };
            this.trackInfo = this.trackInfo || {}, this.songChanged(c) && (this.trackInfo = c);
        }
        this.updateView(), setTimeout(function() {
            LastFMStatus.fetch();
        }, this.updateDelay);
    },
    songChanged: function(a) {
        return this.trackInfo.song != a.song || this.trackInfo.playing != a.playing;
    },
    updateView: function() {
        var a, b, c = (' ( <a target="__blank" href="http://www.last.fm/user/' + this.username + '">last.fm</a> )', 
        document.getElementById("spotify-api-bar"));
        if (!c) {
            var d = document.createElement("div");
            d.id = "spotify-api-bar", document.getElementById("main-footer").appendChild(d), 
            c = document.getElementById("spotify-api-bar");
        }
        this.trackInfo.error ? (a = "Error: ", b = "<strong>" + this.trackInfo.message + "</strong>") : (a = this.trackInfo.playing ? "Now Playing: " : "Last Played: ", 
        b = '<a href="http://www.manikrathee.com/spotify/" title="@ManikRathee is listening to "' + this.trackInfo.artist + ' on Spotify" itemprop="url"><div><p>' + this.trackInfo.artist + " - " + this.trackInfo.song + "</p></div></a>"), 
        "home" === $("body").attr("id") && (c.innerHTML = b);
    }
};

if (function() {
    var a, b;
    a = function() {
        function a(a, b) {
            var c, d;
            if (this.options = {
                target: "instafeed",
                get: "popular",
                resolution: "thumbnail",
                sortBy: "none",
                links: !0,
                mock: !1,
                useHttp: !1
            }, "object" == typeof a) for (c in a) d = a[c], this.options[c] = d;
            this.context = null != b ? b : this, this.unique = this._genKey();
        }
        return a.prototype.hasNext = function() {
            return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0;
        }, a.prototype.next = function() {
            return this.hasNext() ? this.run(this.context.nextUrl) : !1;
        }, a.prototype.run = function(b) {
            var c, d, e;
            if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
            if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
            return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), 
            "undefined" != typeof document && null !== document && (e = document.createElement("script"), 
            e.id = "instafeed-fetcher", e.src = b || this._buildUrl(), c = document.getElementsByTagName("head"), 
            c[0].appendChild(e), d = "instafeedCache" + this.unique, window[d] = new a(this.options, this), 
            window[d].unique = this.unique), !0;
        }, a.prototype.parse = function(a) {
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
            if ("object" != typeof a) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), 
                !1;
                throw new Error("Invalid JSON response");
            }
            if (200 !== a.meta.code) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, a.meta.error_message), 
                !1;
                throw new Error("Error from Instagram: " + a.meta.error_message);
            }
            if (0 === a.data.length) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), 
                !1;
                throw new Error("No images were returned from Instagram");
            }
            if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, a), 
            this.context.nextUrl = "", null != a.pagination && (this.context.nextUrl = a.pagination.next_url), 
            "none" !== this.options.sortBy) switch (o = "random" === this.options.sortBy ? [ "", "random" ] : this.options.sortBy.split("-"), 
            n = "least" === o[0] ? !0 : !1, o[1]) {
              case "random":
                a.data.sort(function() {
                    return .5 - Math.random();
                });
                break;

              case "recent":
                a.data = this._sortBy(a.data, "created_time", n);
                break;

              case "liked":
                a.data = this._sortBy(a.data, "likes.count", n);
                break;

              case "commented":
                a.data = this._sortBy(a.data, "comments.count", n);
                break;

              default:
                throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.");
            }
            if ("undefined" != typeof document && null !== document && this.options.mock === !1) {
                if (i = a.data, null != this.options.limit && i.length > this.options.limit && (i = i.slice(0, this.options.limit + 1 || 9e9)), 
                c = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (i = this._filter(i, this.options.filter)), 
                null != this.options.template && "string" == typeof this.options.template) {
                    for (e = "", g = "", k = "", p = document.createElement("div"), q = 0, t = i.length; t > q; q++) f = i[q], 
                    h = f.images[this.options.resolution].url, this.options.useHttp || (h = h.replace("http://", "//")), 
                    g = this._makeTemplate(this.options.template, {
                        model: f,
                        id: f.id,
                        link: f.link,
                        image: h,
                        caption: this._getObjectProperty(f, "caption.text"),
                        likes: f.likes.count,
                        comments: f.comments.count,
                        location: this._getObjectProperty(f, "location.name")
                    }), e += g;
                    for (p.innerHTML = e, w = [].slice.call(p.childNodes), r = 0, u = w.length; u > r; r++) m = w[r], 
                    c.appendChild(m);
                } else for (s = 0, v = i.length; v > s; s++) f = i[s], j = document.createElement("img"), 
                h = f.images[this.options.resolution].url, this.options.useHttp || (h = h.replace("http://", "//")), 
                j.src = h, this.options.links === !0 ? (b = document.createElement("a"), b.href = f.link, 
                b.appendChild(j), c.appendChild(b)) : c.appendChild(j);
                document.getElementById(this.options.target).appendChild(c), d = document.getElementsByTagName("head")[0], 
                d.removeChild(document.getElementById("instafeed-fetcher")), l = "instafeedCache" + this.unique, 
                window[l] = void 0;
                try {
                    delete window[l];
                } catch (x) {}
            }
            return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), 
            !0;
        }, a.prototype._buildUrl = function() {
            var a, b, c;
            switch (a = "https://api.instagram.com/v1", this.options.get) {
              case "popular":
                b = "media/popular";
                break;

              case "tagged":
                if ("string" != typeof this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                b = "tags/" + this.options.tagName + "/media/recent";
                break;

              case "location":
                if ("number" != typeof this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                b = "locations/" + this.options.locationId + "/media/recent";
                break;

              case "user":
                if ("number" != typeof this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                if ("string" != typeof this.options.accessToken) throw new Error("No access token. Use the 'accessToken' option.");
                b = "users/" + this.options.userId + "/media/recent";
                break;

              default:
                throw new Error("Invalid option for get: '" + this.options.get + "'.");
            }
            return c = "" + a + "/" + b, c += null != this.options.accessToken ? "?access_token=" + this.options.accessToken : "?client_id=" + this.options.clientId, 
            null != this.options.limit && (c += "&count=" + this.options.limit), c += "&callback=instafeedCache" + this.unique + ".parse";
        }, a.prototype._genKey = function() {
            var a;
            return a = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            }, "" + a() + a() + a() + a();
        }, a.prototype._makeTemplate = function(a, b) {
            var c, d, e, f, g;
            for (d = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, c = a; d.test(c); ) e = c.match(d)[1], 
            f = null != (g = this._getObjectProperty(b, e)) ? g : "", c = c.replace(d, "" + f);
            return c;
        }, a.prototype._getObjectProperty = function(a, b) {
            var c, d;
            for (b = b.replace(/\[(\w+)\]/g, ".$1"), d = b.split("."); d.length; ) {
                if (c = d.shift(), !(null != a && c in a)) return null;
                a = a[c];
            }
            return a;
        }, a.prototype._sortBy = function(a, b, c) {
            var d;
            return d = function(a, d) {
                var e, f;
                return e = this._getObjectProperty(a, b), f = this._getObjectProperty(d, b), c ? e > f ? 1 : -1 : f > e ? 1 : -1;
            }, a.sort(d.bind(this)), a;
        }, a.prototype._filter = function(a, b) {
            var c, d, e, f, g;
            for (c = [], e = function(a) {
                return b(a) ? c.push(a) : void 0;
            }, f = 0, g = a.length; g > f; f++) d = a[f], e(d);
            return c;
        }, a;
    }(), b = "undefined" != typeof exports && null !== exports ? exports : window, b.Instafeed = a;
}.call(this), "home" === $("body").attr("id")) {
    var instagramActive = !1, feed = new Instafeed({
        get: "user",
        userId: 262351,
        clientId: "f7f319ceb411486593db148972918108",
        accessToken: "262351.1677ed0.d90081329df94cbe8353f5039bac6d76",
        target: "instagram-api-bar",
        limit: 6,
        links: 1,
        resolution: "standard_resolution",
        template: '<li class="instagram-photo" data="{{id}}"><p><a class="instagram-link" href="{{link}}" title="{{caption}}"><img src="{{image}}" alt="{{caption}}"></a></p></li>'
    });
    feed.run();
}

$(document).ready(function() {
    var a = $("body");
    a.find(".progressively-loaded") && $(".progressively-loaded li img").lazyload({
        effect: "fadeIn",
        threshold: 50
    });
}), function(a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function(c) {
        function f() {
            var b = 0;
            h.each(function() {
                var c = a(this);
                if (!i.skip_invisible || c.is(":visible")) if (a.abovethetop(this, i) || a.leftofbegin(this, i)) ; else if (a.belowthefold(this, i) || a.rightoffold(this, i)) {
                    if (++b > i.failure_limit) return !1;
                } else c.trigger("appear"), b = 0;
            });
        }
        var g, h = this, i = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null
        };
        return c && (d !== c.failurelimit && (c.failure_limit = c.failurelimit, delete c.failurelimit), 
        d !== c.effectspeed && (c.effect_speed = c.effectspeed, delete c.effectspeed), a.extend(i, c)), 
        g = i.container === d || i.container === b ? e : a(i.container), 0 === i.event.indexOf("scroll") && g.bind(i.event, function(a) {
            return f();
        }), this.each(function() {
            var b = this, c = a(b);
            b.loaded = !1, c.one("appear", function() {
                if (!this.loaded) {
                    if (i.appear) {
                        var d = h.length;
                        i.appear.call(b, d, i);
                    }
                    a("<img />").bind("load", function() {
                        c.hide().attr("src", c.data(i.data_attribute))[i.effect](i.effect_speed), b.loaded = !0;
                        var d = a.grep(h, function(a) {
                            return !a.loaded;
                        });
                        if (h = a(d), i.load) {
                            var e = h.length;
                            i.load.call(b, e, i);
                        }
                    }).attr("src", c.data(i.data_attribute));
                }
            }), 0 !== i.event.indexOf("scroll") && c.bind(i.event, function(a) {
                b.loaded || c.trigger("appear");
            });
        }), e.bind("resize", function(a) {
            f();
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
            b.originalEvent.persisted && h.each(function() {
                a(this).trigger("appear");
            });
        }), a(b).load(function() {
            f();
        }), this;
    }, a.belowthefold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.height() + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), 
        g <= a(c).offset().top - f.threshold;
    }, a.rightoffold = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), 
        g <= a(c).offset().left - f.threshold;
    }, a.abovethetop = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, 
        g >= a(c).offset().top + f.threshold + a(c).height();
    }, a.leftofbegin = function(c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, 
        g >= a(c).offset().left + f.threshold + a(c).width();
    }, a.inviewport = function(b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c));
    }, a.extend(a.expr[":"], {
        "below-the-fold": function(b) {
            return a.belowthefold(b, {
                threshold: 0
            });
        },
        "above-the-top": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            });
        },
        "right-of-screen": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            });
        },
        "left-of-screen": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            });
        },
        "in-viewport": function(b) {
            return a.inviewport(b, {
                threshold: 0
            });
        },
        "above-the-fold": function(b) {
            return !a.belowthefold(b, {
                threshold: 0
            });
        },
        "right-of-fold": function(b) {
            return a.rightoffold(b, {
                threshold: 0
            });
        },
        "left-of-fold": function(b) {
            return !a.rightoffold(b, {
                threshold: 0
            });
        }
    });
}(jQuery, window, document), "function" != typeof renderTwitters && function() {
    function a(a) {
        var b, c = a;
        for (b in a.user) c["user_" + b] = a.user[b];
        return c.time = e(a.created_at), c;
    }
    function b(a) {
        i ? a.call() : h.push(a);
    }
    function c() {
        i = !0;
        for (var a; a = h.shift(); ) a.call();
    }
    function d() {
        if (document.addEventListener && !f.webkit) document.addEventListener("DOMContentLoaded", c, !1); else if (f.msie) {
            document.write("<script id=__ie_init defer=true src=//:></script>");
            var a = document.getElementById("__ie_init");
            a && (a.onreadystatechange = function() {
                "complete" == this.readyState && (this.parentNode.removeChild(this), c.call());
            }), a = null;
        } else if (f.webkit) var b = setInterval(function() {
            ("loaded" == document.readyState || "complete" == document.readyState) && (clearInterval(b), 
            b = null, c.call());
        }, 10);
    }
    function e(a) {
        function b(a) {
            var b = a.getHours(), c = a.getMinutes() + "", d = "AM";
            return 0 == b ? b = 12 : 12 == b ? d = "PM" : b > 12 && (b -= 12, d = "PM"), 1 == c.length && (c = "0" + c), 
            b + ":" + c + " " + d;
        }
        function c(a) {
            var b = (a.toDateString().split(/ /), j[a.getMonth()]), c = a.getDate() + "", d = parseInt(c), e = a.getFullYear(), f = new Date().getFullYear(), g = "th";
            return d % 10 == 1 && "1" != c.substr(0, 1) ? g = "st" : d % 10 == 2 && "1" != c.substr(0, 1) ? g = "nd" : d % 10 == 3 && "1" != c.substr(0, 1) && (g = "rd"), 
            "0" == c.substr(0, 1) && (c = c.substr(1)), b + " " + c + g + (f != e ? ", " + e : "");
        }
        var d = a.split(" "), e = Date.parse(d[1] + " " + d[2] + ", " + d[5] + " " + d[3]), f = new Date(e), g = arguments.length > 1 ? arguments[1] : new Date(), h = parseInt((g.getTime() - e) / 1e3), i = "";
        return h += 60 * g.getTimezoneOffset(), i = 5 > h ? "less than 5 seconds ago" : 30 > h ? "half a minute ago" : 60 > h ? "less than a minute ago" : 120 > h ? "1 minute ago" : 2700 > h ? parseInt(h / 60).toString() + " minutes ago" : 10800 > h ? "about 1 hour ago" : 86400 > h ? "about " + parseInt(h / 3600).toString() + " hours ago" : 172800 > h ? b(f) + " yesterday" : b(f) + " " + c(f);
    }
    var f = function() {
        var a = navigator.userAgent.toLowerCase();
        return {
            webkit: /(webkit|khtml)/.test(a),
            opera: /opera/.test(a),
            msie: /msie/.test(a) && !/opera/.test(a),
            mozilla: /mozilla/.test(a) && !/(compatible|webkit)/.test(a)
        };
    }(), g = 0, h = [], i = !1, j = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    window.ify = function() {
        return {
            link: function(a) {
                return a.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/gi, function(a) {
                    return '<a href="' + a + '">' + (a.length > 25 ? a.substr(0, 24) + "..." : a) + "</a>";
                });
            },
            at: function(a) {
                return a.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g, function(a, b, c) {
                    return b + '@<a href="http://twitter.com/' + c + '">' + c + "</a>";
                });
            },
            hash: function(a) {
                return a.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g, function(a, b, c) {
                    return b + '#<a href="http://search.twitter.com/search?q=%23' + c + '">' + c + "</a>";
                });
            },
            clean: function(a) {
                return this.hash(this.at(this.link(a)));
            }
        };
    }(), window.renderTwitters = function(b, c) {
        function d(a) {
            return document.createElement(a);
        }
        function f(a) {
            return document.createTextNode(a);
        }
        var g, h, i, j, k = document.getElementById(c.twitterTarget), l = null, m = d("ul"), n = b.length > c.count ? c.count : b.length;
        for (j = 0; n > j && b[j]; j++) if (l = a(b[j]), c.ignoreReplies && "@" == b[j].text.substr(0, 1)) n++; else {
            if (g = d("li"), c.template) g.innerHTML = c.template.replace(/%([a-z_\-\.]*)%/gi, function(a, b) {
                var d = l[b] + "" || "";
                return "text" == b && c.enableLinks && (d = ify.clean(d)), d;
            }); else {
                if (h = d("span"), h.className = "twitterStatus", i = d("span"), i.className = "twitterTime", 
                h.innerHTML = b[j].text, 1 == c.enableLinks && (h.innerHTML = ify.clean(h.innerHTML)), 
                i.innerHTML = e(b[j].created_at), c.prefix) {
                    var o = d("span");
                    o.className = "twitterPrefix", o.innerHTML = c.prefix.replace(/%(.*?)%/g, function(a, c) {
                        return b[j].user[c];
                    }), g.appendChild(o), g.appendChild(f(" "));
                }
                g.appendChild(h), g.appendChild(f(" ")), g.appendChild(i);
            }
            c.newwindow && (g.innerHTML = g.innerHTML.replace(/<a href/gi, '<a target="_blank" href')), 
            m.appendChild(g);
        }
        if (c.clearContents) for (;k.firstChild; ) k.removeChild(k.firstChild);
        k.appendChild(m), "function" == typeof c.callback && c.callback();
    }, window.getTwitters = function(a, c, d, e) {
        g++, "object" == typeof c && (e = c, c = e.id, d = e.count), d || (d = 1), e ? e.count = d : e = {}, 
        e.timeout || "function" != typeof e.onTimeout || (e.timeout = 10), "undefined" == typeof e.clearContents && (e.clearContents = !0), 
        e.withFriends && (e.withFriends = !1), e.twitterTarget = a, "undefined" == typeof e.enableLinks && (e.enableLinks = !0), 
        window["twitterCallback" + g] = function(a) {
            e.timeout && clearTimeout(window["twitterTimeout" + g]), renderTwitters(a, e);
        }, b(function(a, b) {
            return function() {
                if (document.getElementById(a.twitterTarget)) {
                    var d = "http://www.twitter.com/statuses/" + (a.withFriends ? "friends_timeline" : "user_timeline") + "/" + c + ".json?callback=twitterCallback" + b + "&count=20&cb=" + Math.random();
                    a.timeout && (window["twitterTimeout" + b] = setTimeout(function() {
                        a.onTimeoutCancel && (window["twitterCallback" + b] = function() {}), a.onTimeout.call(document.getElementById(a.twitterTarget));
                    }, 1e3 * a.timeout));
                    var e = document.createElement("script");
                    e.setAttribute("src", d), document.getElementsByTagName("head")[0].appendChild(e);
                }
            };
        }(e, g));
    }, d();
}();

var viewModeContainer = $("#view-mode--container"), viewModeToggle = $("#view-mode--toggle"), viewMode = {
    init: function() {
        this.addEventListeners();
    },
    addEventListeners: function() {
        var a = this;
        viewModeToggle.on("click", function() {
            a.eval();
        });
    },
    eval: function() {
        var a = document.getElementById("view-mode--toggle").checked;
        a === !0 ? this.darkMode() : this.lightMode();
    },
    darkMode: function() {
        $body.addClass("view-mode--dark");
    },
    lightMode: function() {
        $body.removeClass("view-mode--dark");
    }
};

viewMode.init(), $(function(a) {
    function b() {
        d = Math.floor(Math.random() * postURL.length), postURL[d] === e ? b() : c();
    }
    function c() {
        var a = postURL[d], b = postTitle[d], c = postImage[d], e = postMeta[d], f = postGeo[d], g = "/img/photos/" + c, h = $("#photo-metadata"), i = $(".photo-metadata--link"), j = $(".footer-bg-photo-posts"), k = $(".photo-metadata--camera"), l = $(".photo-metadata--geo");
        j.css("background-image", "url(" + g + ")"), i.prop("href", a).prop("title", b), 
        k.text(e), l.text(f), j.addClass("is-visible"), h.addClass("is-visible");
    }
    var d, e = window.location.pathname;
    b();
});

var $body = $("body");

if (LastFMStatus.init({
    username: "mrathee"
}), $("body").hasClass("sequential")) {
    var win = $("window"), current = 1, donateForm = $("#donate-form"), group1 = $("#select-amount-header, #amounts-cont"), group2 = $("#firstname-cont, #lastname-cont, #addr1-cont, #city-cont, #state_cd-cont, #zip-cont, #email-cont, #phone-cont"), group3 = $(".qd-info.cc_number_related.cc_expir_group_related, #cc-type-cont, #cc-number-cont, #cc-expiration-cont, #recurring-cont"), group4 = $("#personalized-content, .employer_related.occupation_related, #employer-cont, #occupation-cont, #employer-occupation-helper, #ovf-switch"), personalizedContent = $("#personalized-content"), next = $("#next"), replacementSubmit = $("#submit-button"), inputFields = $(":input"), amountInputs = $("#amounts input"), amountOther = $("#amount-cont-8 input"), breadcrumb = $("#breadcrumbs"), breadcrumbItem = $(".breadcrumb-item"), breadcrumbName = $("#breadcrumb-name"), breadcrumbPayment = $("#breadcrumb-payment"), breadcrumbEmployment = $("#breadcrumb-employment"), premature = $("span.premature"), goNext, overLimit, underLimit, hasSavedPayment, errorFullForm, inputTel = $("#amount-other, #phone, #zip, #cc_number"), inputEmail = $("#email"), inputChanges = $("#amount-other, #zip, #cc_number, #phone, #email"), $formContent = $("#donate-form-content"), runValidation = !0, minDonationLimit, amountOtherClean, keycode = !1;
    $("body").addClass("sequential-active"), $(window).resize(function() {
        adjustInputTypes();
    }), $(document).ready(function() {
        adjustInputTypes();
    }), win.minDonationLimit = minDonationLimit && "number" == typeof minDonationLimit ? win.minDonationLimit : 3, 
    $("body").hasClass("ovf-gateway") || win.ofaOvfSwitch && donateForm.data("bsd_ovf_slug") ? win.maxDonationLimit = win.maxDonationLimit && "number" == typeof win.maxDonationLimit && !win.ofaOvfSwitch ? win.maxDonationLimit : 73300 : win.maxDonationLimit = win.maxDonationLimit && "number" == typeof win.maxDonationLimit ? win.maxDonationLimit : 2500;
    var noPulse, animateFrames = function(a) {
        var b = [ "#00abeb", "#085775" ], c = a ? 0 : 1;
        1 === current ? next.animate({
            backgroundColor: b[a]
        }, 140, "linear", function() {
            noPulse = setTimeout(function() {
                animateFrames(c);
            }, 500);
        }) : next.css("background-color", "#1297c9");
    };
    if ($(window).width() > 767 && $("body").hasClass("sequential-active")) {
        $(".row.content-area-bg").removeClass("no-js"), group1.addClass("group1"), group2.addClass("group2"), 
        group3.addClass("group3"), group4.addClass("group4"), $("#personalized-content").addClass("hide"), 
        breadcrumbItem.each(function() {
            $(this).attr("data-breadcrumb-number", $(this).index() + 1);
        }), $(".group1, .group2, .group3, .group4").addClass("hide"), showContent(), replacementSubmit.hide(), 
        next.attr("tabindex", "19");
        var currentInputs = $(".group" + current).find("input");
        group1.find("input").attr("checked", !1), $(document).keydown(function(a) {
            var b = a.target.nodeName.toLowerCase();
            return 8 === a.which && ("input" === b || a.preventDefault()), 13 === a.which && 3 >= current ? (1 === current && ($("#amount-other").val($("#amount-other").val().replace(/ +/g, "")).blur(), 
            win.ofa.ee.emitEvent("amount:change", [ $("#amount-other").val() ])), 2 === current && $("#zip").val($("#zip").val().replace(/ +/g, "")), 
            next.click(), !1) : 13 === a.which && 4 === current ? (replacementSubmit.click(), 
            !1) : void 0;
        }), $("#personalized-content").on("click", "#qd-edit-info", function() {
            showContent(), $(".employer_related.occupation_related, #employer-cont, #occupation-cont").show(), 
            $("#personalized-content").fadeOut(800), replacementSubmit.fadeOut(400), next.show(), 
            hasSavedPayment = !1, savePaymentBreadcrumbs(), breadcrumbPayment.removeClass("completed"), 
            breadcrumbEmployment.removeClass("completed"), replacementSubmit.removeClass("saved-payment"), 
            $("#employer-occupation-helper").show(), current = 1, current++, updateBreadcrumb(current), 
            showContent();
        }), $(".amount-cont").click(function() {
            $(this).removeClass("active"), amountInputs.attr("checked", !1), premature.fadeOut("1200"), 
            $("#amount-header").removeClass("error"), $(".amount-cont").find("input").removeClass("error"), 
            "amount-cont-8" === $(this).attr("id") && ($(this).find("input").attr("checked", !0), 
            $("#other-amount-radio").attr("checked", !0), amountOther.val(""), errorFullForm || next.fadeIn(400));
        }), $(".amount-cont").find("label").click(function() {
            var a = $(this), b = a.parent().find("input");
            amountOther.val(""), $("#other-amount-radio").attr("checked", !1), a.addClass("active"), 
            b.attr("checked", !0), errorFullForm || (next.click(), hasSavedPayment || next.fadeIn(600), 
            replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Donate  $' + a.parent().find("label").html().replace("$", "")));
        }), amountOther.change(function() {
            var a = $(this);
            premature.fadeOut("1200"), $("#amount-header").removeClass("error"), $(".amount-cont").find("input").removeClass("error"), 
            a.val(a.val().replace(/ +/g, "")), "" === a.val() && (a.attr("checked", !1), $("#other-amount-radio").attr("checked", !1)), 
            errorFullForm || amountOther.on("blur.otherField", function() {
                amountOtherClean = amountOther.text($(this).val().replace("$", "")).text(), replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Donate  $' + amountOtherClean);
            });
        }), $("#zip").focus(function() {
            $("#zip").removeClass("error");
        }), $("#zip").change(function() {
            $(this).val($(this).val().replace(/ +/g, ""));
        }), $("#email, #phone").change(function() {
            $(this).val($(this).val().replace(/ +/g, ""));
        }), $("#email, #phone").focus(function() {
            $(this).removeClass("error");
        }), $("#cc_number").change(function() {
            $(this).val($(this).val().replace(/-/g, ""));
        }), inputFields.focus(function() {
            premature.fadeOut("1200"), $(this).removeClass("error");
        }), inputFields.change(function() {
            premature.fadeOut("1200"), $(this).removeClass("error");
        }), breadcrumbItem.click(function() {
            var a, b = $(".group1, .group2, .group3, .group4, .group5, .group6");
            $("this").focus(), a > current && validateForm(), $(this).hasClass("completed") && (a = $(this).attr("data-breadcrumb-number"), 
            a > current && validateForm(), goNext && (b.addClass("hide"), $(".group" + a).removeClass("hide"), 
            updateBreadcrumb(a), current = parseInt(a, 10)), 4 > current && (next.show(), replacementSubmit.hide())), 
            goNext || (validateForm(), goNext && (a = $(this).attr("data-breadcrumb-number"), 
            b.addClass("hide"), $(".group" + a).removeClass("hide"), updateBreadcrumb(a), current = parseInt(a, 10))), 
            1 === current && (next.attr("tabindex", "19"), keycode && personalizedContent.addClass("hide")), 
            2 === current && (next.attr("tabindex", "10"), keycode && personalizedContent.removeClass("hide")), 
            3 === current && (next.attr("tabindex", "26"), keycode && personalizedContent.addClass("hide")), 
            4 === current && (next.hide(), replacementSubmit.fadeIn(1800), keycode && personalizedContent.removeClass("hide"), 
            $formContent.addClass("ovfSwitch")), 4 !== current && (next.show(), replacementSubmit.hide(), 
            $formContent.removeClass("ovfSwitch")), goNext && premature.fadeOut(800);
        }), next.unbind("click").click(function(a) {
            a.preventDefault(), next.focus(), validateForm(), goNext && (premature.fadeOut("1200"), 
            showContent(), current++, current >= 4 && (current = 4), showContent(), updateBreadcrumb(current), 
            1 === current && (next.attr("tabindex", "19"), keycode && personalizedContent.addClass("hide")), 
            2 === current && ($("#firstname").focus(), next.attr("tabindex", "10"), keycode && personalizedContent.removeClass("hide")), 
            3 === current && ($("#cc_number").focus(), next.attr("tabindex", "26"), keycode && personalizedContent.addClass("hide")), 
            4 === current && ($("#employer").focus(), next.hide(), replacementSubmit.fadeIn(1e3), 
            keycode && personalizedContent.removeClass("hide"))), 4 !== current && (next.show(), 
            replacementSubmit.hide()), goNext && premature.fadeOut(800);
        }), replacementSubmit.click(function(a) {
            a.preventDefault(), $("body").hasClass("error") ? replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Processing').addClass("processingform") : (validateForm(), 
            goNext ? replacementSubmit.html('<span id="processingform">Thanks for your fake donation</span>Processing').addClass("processingform") : premature.css("bottom", bottomPx).text("Please correct your employment information.").fadeIn("800"));
        });
    }
}