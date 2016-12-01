'use strict'
;(function () {
    var self;

    function editMessage(elemOurMessage,message,error) {
        elemOurMessage.next().remove('.errorText');
        elemOurMessage.removeClass(self.success);
        elemOurMessage.addClass(error);
        elemOurMessage.after('<span class="errorText">' + message + '</span>');
    };

    function Validators(form) {
        self = this;
        this.form = $(form);
        this.configure = undefined;

        //default length
        this.min = 5;
        this.max = 25;

        //default classes
        this.error = 'errorInput';
        this.success = 'sucInput';

        //default messages
        this.errEmpty = 'Поле не заполнено';
        this.errLengthMin = 'Длинна поля меньше минимальной';
        this.errLengthMax = 'Длинна поля больше максимальной';
        this.errLogin = 'Ошибка логина';
        this.errPassword = 'Ошибка пароля';
        this.errEmail = 'Ошибка email';
        this.errTelephone = 'Ошибка телефона';
        this.errText = 'Ошибка текста';
        this.errName = 'Ошибка имени';
        this.errSpase = 'Ошибка имени';
    };

    Validators.prototype.init = function (dataConfiguration) {
        var configuration = dataConfiguration.configure,
            lengthElem = dataConfiguration.confLength,
            messageElem = dataConfiguration.message,
            classElem = dataConfiguration.classes,
            classElemError = this.error,
            classElemSuccess = this.success,
            errEmpty = this.errEmpty,
            errLengthMin = this.errLengthMin,
            errLengthMax = this.errLengthMax,
            errLogin = this.errLogin,
            errPassword = this.errPassword,
            errEmail = this.errEmail,
            errTelephone = this.errTelephone,
            errText = this.errText,
            errName = this.errName,
            errSpase = this.errSpase,
            min = this.min,
            max = this.max;

        for( var rule in configuration) {
            switch (rule) {
                case 'login':
                    this.form.find($(configuration.login)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.login)).on('blur', function () {
                        self.checkLogin($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errLogin,min,max,errSpase);
                    });
                    break;
                case 'password':
                    this.form.find($(configuration.password)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.password)).on('blur', function () {
                        self.checkPassword($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errPassword,min,max,errSpase);
                    });
                    break;
                case 'email':
                    this.form.find($(configuration.email)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.email)).on('blur', function () {
                        self.checkEmail($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errEmail,min,max,errSpase);
                    });
                    break;
                case 'telephone':
                    this.form.find($(configuration.telephone)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.telephone)).on('blur', function () {
                        self.checkTelephone($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errTelephone,min,max);
                    });
                    break;
                case 'text':
                    this.form.find($(configuration.text)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.text)).on('blur', function () {
                        self.checkText($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errText,min,max);
                    });
                    break;
                case 'name':
                    this.form.find($(configuration.name)).on('focus', function () {
                        $(this).removeClass(classElemSuccess);
                        $(this).removeClass(classElemError);
                        $(this).next().remove('span');
                    });
                    this.form.find($(configuration.name)).on('blur', function () {
                        self.checkName($(this),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errName,min,max,errSpase);
                    });
                    break;
                default:
                    console.log('Please select at least one field for validation ');
                    return false;
                    break;
            }
        }

        if(lengthElem !== undefined){
            for( var rule in lengthElem) {
                switch (rule) {
                    case 'default':
                        if(lengthElem.default !== undefined) {
                            min = lengthElem.default[0];
                            max = lengthElem.default[1];
                        }
                        break;
                    case 'login':
                        if(lengthElem.login !== undefined){
                            min = lengthElem.login[0];
                            max = lengthElem.login[1];
                        }
                        break;
                    case 'password':
                        if(lengthElem.password !== undefined){
                            min = lengthElem.password[0];
                            max = lengthElem.password[1];
                        }
                        break;
                    case 'email':
                        if(lengthElem.email !== undefined) {
                            min = lengthElem.email[0];
                            max = lengthElem.email[1];
                        }
                        break;
                    case 'telephone':
                        if(lengthElem.telephone !== undefined) {
                            min = lengthElem.telephone[0];
                            max = lengthElem.telephone[1];
                        }
                        break;
                    case 'text':
                        if(lengthElem.text !== undefined) {
                            min = lengthElem.text[0];
                            max = lengthElem.text[1];
                        }
                        break;
                    case 'name':
                        if(lengthElem.name !== undefined) {
                            min = lengthElem.name[0];
                            max = lengthElem.name[1];
                        }
                        break;
                }
            }
        }

        if(classElem !== undefined) {
            for( var rule in classElem) {
                switch (rule) {
                    case 'error':
                        classElemError = classElem.error;
                        break;
                    case 'success':
                        classElemSuccess = classElem.success;
                        break;
                }
            }
        }

        if(messageElem !== undefined) {
            for(var rule in messageElem) {
                switch (rule) {
                    case 'errEmpty':
                        errEmpty = messageElem.errEmpty;
                        break;
                    case 'errLengthMin':
                        errLengthMin = messageElem.errLengthMin;
                        break;
                    case 'errLengthMax':
                        errLengthMax = messageElem.errLengthMax;
                        break;
                    case 'errSpase':
                        errSpase = messageElem.errSpase;
                        break;
                    case 'errLogin':
                        errLogin = messageElem.errLogin;
                        break;
                    case 'errPassword':
                        errPassword = messageElem.errPassword;
                        break;
                    case 'errEmail':
                        errEmail = messageElem.errEmail;
                        break;
                    case 'errTelephone':
                        errTelephone = messageElem.errTelephone;
                        break;
                    case 'errText':
                        errText = messageElem.errText;
                        break;
                    case 'errName':
                        errName = messageElem.errName;
                        break;
                }
            }
        }

        this.form.on('submit', function (event) {
            var validPoint = true;
            for(var rule in configuration) {
                switch (rule) {
                    case 'login':
                        if(self.checkEmpty($(this).find($(configuration.login)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {

                            self.checkLogin($(this).find($(configuration.login)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errLogin,min,max);
                        }
                        break;
                    case 'password':
                        if(self.checkEmpty($(this).find($(configuration.password)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {
                            self.checkPassword($(this).find($(configuration.password)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errPassword,min,max);
                        }
                        break;
                    case 'email':
                        if(self.checkEmpty($(this).find($(configuration.email)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {
                            self.checkEmail($(this).find($(configuration.email)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errEmail,min,max);
                        } else {
                            validPoint = false;
                        }
                        break;
                    case 'telephone':
                        if(self.checkEmpty($(this).find($(configuration.telephone)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {
                            self.checkTelephone($(this).find($(configuration.telephone)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errTelephone,min,max);
                        }
                        break;
                    case 'text':
                        if(self.checkEmpty($(this).find($(configuration.text)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {
                            self.checkText($(this).find($(configuration.text)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errText,min,max);
                        } else {
                            validPoint = false;
                        }
                        break;
                    case 'name':
                        if(self.checkEmpty($(this).find($(configuration.name)),dataConfiguration,classElemError,classElemSuccess,errEmpty)) {
                            self.checkName($(this).find($(configuration.name)),dataConfiguration,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errName,min,max);
                        }
                        break;
                }
            }
            if(!validPoint) {
                event.preventDefault();
            }
        });
    };

    Validators.prototype.checkLogin = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errLogin,min,max,errSpase) {
        var regulars = elem.val();

        if(self.checkEmpty(elem)) {
            if((regulars.match(/\s+/))){
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errSpase);
                return false;
            }
            if(regulars.length < min) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMin);
                return false;
            }

            if(!(regulars.match(/^\w+/) && regulars.match(/[0-9]{1}/))) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLogin);
                return false;
            }

            if(regulars.length > max) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMax);
                return false;
            }
            else {
                elem.addClass(classElemSuccess);
                elem.next().remove('span');
            }
        } else {
            elem.addClass(classElemError);
            elem.removeClass(classElemSuccess);
            editMessage(elem,errEmpty);
        }
    };

    Validators.prototype.checkPassword = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errPassword,min,max,errSpase) {
        var regulars = elem.val(),
            first,second,flag = 0;

        if(self.checkEmpty(elem)) {
            if((regulars.match(/\s+/))){
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errSpase);
                return false;
            }
            if(regulars.length < min) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMin);
                return false;
            }

            if( !(regulars.match(/^\w+/) &&
                regulars.match(/[\!\@\#\$]/) &&
                regulars.match(/[A-Z]/) &&
                regulars.match(/[a-z]/) &&
                !regulars.match(/\s/))) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errPassword);
                return false;
            }

            if(regulars.length > max) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMax);
                return false;
            }
            else {
                elem.addClass(classElemSuccess);
                elem.next().remove('span');
            }
        } else {
            elem.addClass(classElemError);
            elem.removeClass(classElemSuccess);
            editMessage(elem,errEmpty);
        }

        if(elem.closest('form').find(configures.configure.password).length >= 2) {
            elem.closest('form').find(configures.configure.password).each(function () {
                flag++;

                if(flag == 1) {
                    first = $(this).val();
                };
                if(flag == 2) {
                    second = $(this).val();
                };
                if(second !== '' && second !== undefined) {
                    if(first === second) {
                        editMessage($(this),' Совпадают ');
                        $(this).closest('form').find(configures.configure.password).removeClass(classElemError);
                        $(this).closest('form').find(configures.configure.password).addClass(classElemSuccess);
                    } else {
                        editMessage($(this),' Пароли не совпадают ',classElemError);
                    }
                }
            });
        }
    };

    Validators.prototype.checkEmail = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errEmail,min,max,errSpase) {
        var regulars = elem.val();

        if(self.checkEmpty(elem)) {
            if((regulars.match(/\s+/))){
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errSpase);
                return false;
            }
            if(regulars.length < min) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMin);
                return false;
            }

            if( !(regulars.match(/^[a-zA-Z0-9\.\-\_]{6,64}@{1}[^\.]{2,64}\.{1}[a-zA-Z0-9\-\_]{2,64}$/))) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errEmail);
                return false;
            }

            if(regulars.length > max) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,messageMax);
                return false;
            }
            else {
                elem.addClass(classElemSuccess);
                elem.next().remove('span');
            }
        } else {
            elem.addClass(classElemError);
            elem.removeClass(classElemSuccess);
            editMessage(elem,errEmpty);
        }
    };

    Validators.prototype.checkTelephone = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errTelephone,min,max) {
        var regulars = elem.val();

        if(self.checkEmpty(elem)){
            if(regulars.length < min) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMin);
                return false;
            }

            if( !(regulars.match(/\([0-9]{3}\)\s[0-9]{3}\-[0-9]{4}/))) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errTelephone);
                return false;
            }

            if(regulars.length > max) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem,errLengthMax);
                return false;
            }
            else {
                elem.addClass(classElemSuccess);
                elem.next().remove('span');
            }
        } else {
            elem.addClass(classElemError);
            elem.removeClass(classElemSuccess);
            editMessage(elem,errEmpty);
        }
    };

    Validators.prototype.checkText = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errText,min,max) {
        var regulars = elem.val();

        if(regulars.length < min) {
            elem.removeClass(classElemSuccess);
            elem.addClass(classElemError);
            editMessage(elem,errLengthMin);
            return false;
        }

        if(regulars.match(/[\#\:\;]+/)) {
            elem.removeClass(classElemSuccess);
            elem.addClass(classElemError);
            editMessage(elem,errText);
            return false;
        }

        if(regulars.length > max) {
            elem.removeClass(classElemSuccess);
            elem.addClass(classElemError);
            editMessage(elem,errLengthMax);
            return false;
        }
        else {
            elem.addClass(classElemSuccess);
            elem.next().remove('span');
        }
    };

    Validators.prototype.checkName = function (elem,configures,classElemError,classElemSuccess,errEmpty,errLengthMin,errLengthMax,errName,min,max,errSpase) {
        var regulars = elem.val();

        if(self.checkEmpty(elem)) {
            if((regulars.match(/\s+/))){
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errSpase);
                return false;
            }

            if (regulars.length < min) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errLengthMin);
                return false;
            }

            if (!(regulars.match(/[a-zA-Z0-9]+/))) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errName);
                return false;
            }

            if (regulars.length > max) {
                elem.removeClass(classElemSuccess);
                elem.addClass(classElemError);
                editMessage(elem, errLengthMax);
                return false;
            }
            else {
                elem.addClass(classElemSuccess);
                elem.next().remove('span');
            }
        }
             else {
            elem.addClass(classElemError);
            elem.removeClass(classElemSuccess);
            editMessage(elem,errEmpty);
        }
    };

    Validators.prototype.checkEmpty = function (elem,configures,classElemError,classElemSuccess,errEmpty) {
        if(elem.val() === '') {
            elem.addClass(classElemError);
            editMessage(elem,errEmpty);
                return false;
            }
        return true;
    };

    function make(form) {
        var tmp = new Validators(form);
        return tmp;
    };

    window._ = make;
})();