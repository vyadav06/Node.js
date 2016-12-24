function validateForm() {

	var returnresult = false;
	jQuery(function ($) {
		var PerrorContainer = $("#sp-error-container");
		var PerrorContainerDown = $("#sp-error-container-down");
		var PerrorText = $("#sp-error-text");
		var PerrorTextDown = $("#sp-error-text-down");
		var formSignIn = $("#p-signin");

		PerrorContainer.addClass("hidden");
		PerrorContainerDown.addClass("hidden");
		formSignIn.addClass("hidden");
		var fN = $("#firstName").val();
		var lN = $("#lastName").val();
		var email = $("#email").val();
		var Occ = $("#occupation").val();
		var password = $("#password").val();
		var Cpassword = $("#c-password").val();

		try {
			var result = validation(fN, lN, email, Occ, password, Cpassword);
			returnresult = true;
		}
		catch (e) {
			var message = typeof e === "string" ? e : e.message;

			PerrorText.text(e);
			PerrorTextDown.text(e);
			PerrorContainer.removeClass("hidden");
			PerrorContainerDown.removeClass("hidden");
			returnresult = false;
		}

	});
	return returnresult;
}

function validation(fnVal, lnVal, email, Occupation, pass, cpass) {

	var alpabetsOnly = /^[A-z]+$/;
	var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	var splCharPatter = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
	var placeRegex = /^[a-zA-Z ]*$/;


	if (fnVal.length == 0 || !fnVal.match(alpabetsOnly)) {
		throw "Please enter a valid First Name !";
	} else if (lnVal.length == 0 || !lnVal.match(alpabetsOnly)) {
		throw "Please enter a valid Last Name !";
	} else if (!email_regex.test(email)) {
		throw "Please provide a valid Email address !";
	} else if (Occupation == null || Occupation == undefined) {
		throw "Please provide your Occupation";
	} else if (pass == undefined || pass.length < 8 || pass.length > 15) {
		throw "Please provide a Password containing atleast 8 characters and not more than 15 characters!";
	} else if (cpass == undefined || cpass !== pass) {
		throw "Please provide the same valid password for password confirmation!";
	}
	else {
		return true;
	}
}

(function ($, location, localStorage) {

	if ($("#createorUpdateBack").val() === 'N') {
		$("#wishText").text("Do you wish to update as");
		$("#firstName").prop("readonly", true);
		$("#lastName").prop("readonly", true);
		$("#email").prop("readonly", true);
		$("#occupation").prop("readonly", true);
		$("#password").prop("readonly", true);
		$("#c-password").prop("readonly", true);

	}
})(jQuery, window.location, window.localStorage);