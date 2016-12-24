
(function ($, location, localStorage) {


    var lUsername = $("#l-email");
    var lpassword = $("#l-password");
    var lsubmit = $("#l-submit");
    var lErrorContainer = $("#l-error-container");
    var sErrorContainer = $("#s-error-container");
    var sErrorText = $("#s-error-text");

    function emailCheck(user, pass) {
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        if (!email_regex.test(user)) {
            throw "Please provide a valid username";
        } else if (user == undefined) {
            throw "Please provide a valid username";
        } else if (pass.length = 0 || pass == '' || pass == undefined) {
            throw "Please provide a valid Password";
        } else {
            return true;
        }

    }

    lsubmit.click(function (event) {
        event.preventDefault();

        lErrorContainer.addClass("hidden");
        var userNameVal = lUsername.val();
        var passwordVal = lpassword.val();
        var textInputVal = $("#txtInput").val();
        var textCaptchaVal = $("#txtCaptcha").val();

        var captchaCheck = checkform(textInputVal, textCaptchaVal);
        if (captchaCheck) {
            try {
                var result = emailCheck(userNameVal, passwordVal);
                if (result) {
                    var requestConfig = {
                        method: "POST",
                        url: "/signup/validateUser",
                        contentType: 'application/json',
                        data: JSON.stringify({
                            email: userNameVal,
                            password: passwordVal

                        })
                    };

                    $.ajax(requestConfig).then(function (responseMessage) {
                        if (responseMessage.error) {
                            lErrorContainer.text(responseMessage.message);
                            lErrorContainer.removeClass("hidden");
                        } else if (responseMessage.success) {
                            window.location = "http://localhost:3000/users/profile";
                        }

                    });
                }

            } catch (e) {

                var message = typeof e === "string" ? e : e.message;
                lErrorContainer.text(e);
                lErrorContainer.removeClass("hidden");
                event.preventDefault();
            }
        }
        $('#txtInput').val('');

        function checkform(txtInput, txtCaptcha) {
            var why = "";

            if (txtInput == "") {
                why += "- Security code should not be empty.\n";
            }
            if (txtInput != "") {
                if (ValidCaptcha(txtInput) == false) {
                    why += "- Security code did not match.\n";
                }
            }
            if (why != "") {
                lErrorContainer.text(why);
                lErrorContainer.removeClass("hidden");
                return false;
            } else {
                return true;
            }
        }


        function ValidCaptcha() {
            var str1 = removeSpaces($('#txtCaptcha').val());
            var str2 = removeSpaces($('#txtInput').val());
            if (str1 == str2) {
                return true;
            } else {
                return false;
            }
        }

        function removeSpaces(string) {
            return string.split(' ').join('');
        }


    });
    var UserDeleteAccount = $("#deleteAccount");

    UserDeleteAccount.click(function (event) {
        event.preventDefault();
        alert("inside user js scripts");
        try {

            var requestConfig = {
                method: "DELETE",
                url: "/signup/delete"

            };

            $.ajax(requestConfig).then(function (responseMessage) {
                window.location = "http://localhost:3000/signup/deletedprofile";


            });

        } catch (e) {
            var message = typeof e === "string" ? e : e.message;

            alert(e);
            event.preventDefault();

        }
    });

})(jQuery, window.location, window.localStorage);