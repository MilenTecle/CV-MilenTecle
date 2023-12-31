function sendMail(contactForm) {
    emailjs.send("service_5h7u1ni","template_b3t9q1g", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
            contactForm.reset();

            const alertMessage = document.getElementById("alert-message");
            alertMessage.classList.remove('hide');
            alertMessage.classList.add('alert', 'alert-success');
        },
        function(error) {
            console.log("FAILED", error);
        }
    );

    return false;
}