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

    function Dialog(id, conf) {
        var $dialog = $('<div class="modal" id="dialog_' + id + '" tabindex="-1" role="dialog"></div>');
        $('body').append($dialog);
        $dialog.html('<div class="modal-dialog" role="document"><div class="modal-content"></div></div>');
        var $content = $dialog.find('.modal-content');
        if (conf.header) {
            var header = '<div class="modal-header"><h5 class="modal-title">' + (conf.header.title || '') + '</h5>';
            if (conf.header.close) {
                header += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            }
            header += '</div>';
            $content.append(header);
        }
        this.$body = $('<div class="modal-body"></div>');
        if (conf.body) {
            this.$body.html(conf.body);
        }
        $content.append(this.$body);
        if (conf.ok !== undefined || conf.cancel !== undefined) {
            var footer = '<div class="modal-footer">';
            if (conf.ok !== undefined) {
                footer += '<button type="button" class="btn btn-primary">' + conf.ok + '</button>';
            }
            if (conf.cancel !== undefined) {
                footer += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + conf.cancel + '</button>';
            }
            footer += '</div>';
            $content.append(footer);
        }
        this.$dialog = $dialog;
    }

    Dialog.prototype.body = function () {
        return this.$body;
    };

    Dialog.prototype.show = function () {
        this.$dialog.modal('show');
    };

    Dialog.prototype.hide = function () {
        this.$dialog.modal('hide');
        this.$dialog.hide();
    };

    function createDialog(id, conf) {
        return new Dialog(id, conf);
    }

    function tipBox(msg) {
        var dialog = new Dialog('tip', {
            body: msg,
        });
        dialog.show();
        return dialog;
    }

    function messageBox(title, msg) {
        var dialog = new Dialog('msg', {
            header: {
                title: title,
                close: true,
            },
            body: msg,
            ok: '确定',
            cancel: '取消',
        });
        dialog.show();
        return dialog;
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
        messageBox: messageBox,
        tipBox: tipBox,
        createDialog: createDialog,
        checkLogin: checkLogin,
        apiPost: apiPost,
        logout: logout,
    }
})(window);
