document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('publish-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        document.querySelectorAll('[data-error]').forEach(el => {
            el.removeAttribute('data-error');
        });
        document.querySelectorAll('[data-error-tooltip]').forEach(el => {
            el.remove();
        });
        let isValid = true;

        const authorName = document.getElementById("publish-author");
        const authorNameValue = authorName.value.trim();
        if (authorNameValue === '') {
            showError(authorName, "Enter author name");
            isValid = false;
        } else if (authorNameValue.length > 20) {
            showError(authorName, "Max length: 20 characters");
            isValid = false;
        }

        const title = document.getElementById("publish-title");
        const titleValue = title.value.trim();
        if (titleValue === '') {
            showError(title, "Enter palette title");
            isValid = false;
        } else if (titleValue.length > 20) {
            showError(title, "Max length: 20 characters");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = document.getElementById("publish-email");
        const emailValue = email.value.trim();
        if (!emailPattern.test(emailValue)) {
            showError(email, "Enter email");
            isValid = false;
        }

        const description = document.getElementById("publish-description");
        const descriptionValue = description.value.trim();
        if (descriptionValue.length > 100) {
            showError(description, "Max length: 100 characters");
            isValid = false;
        }

        if (isValid) {
            const formData = {
                author: authorNameValue,
                title: titleValue,
                email: emailValue,
                description: descriptionValue
            }

            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);

            alert('Form submitted');
        }
    });
    function showError(input, message) {
        input.setAttribute("data-error","");
        const tooltip = document.createElement('p');
        tooltip.setAttribute("data-error-tooltip","")
        tooltip.textContent = message;
        input.parentNode.appendChild(tooltip);
    }

});