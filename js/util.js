(function (W) {
    'use strict';

    function showAlert(el, msg, type, close) {
        var html = '<div class="alert alert-' + type + '">';
        if (close) {
            html += '<a href="#" class="close" data-dismiss="alert">&times;</a>';
        }
        html += '<strong>提示信息:</strong><a>' + msg + '</a></div>';
        $(el).html(html);
    }

    function checkLogin() {
        if ($.Eira.storage('user').token) {
            return true;
        } else {
            $.Eira.navigate('login');
            return false;
        }
    }

    function logout() {
        $.Eira.storage('user', null);
        $.Eira.navigate('login');
    }

    function apiPost(path, data) {
        return $.ajax({
            url: $.Eira.data('apiUrl') + path,
            method: "POST",
            timeout: 0,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $.extend({token: $.Eira.storage('user').token}, data),
        });
    }

    W.Utils = {
        showAlert: showAlert,
        checkLogin: checkLogin,
        apiPost: apiPost,
        logout: logout,
    }
})(window);
