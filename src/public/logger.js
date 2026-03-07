document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('formValid', function (event) {
        const formData = event.detail;

        console.log('author:', formData.author);
        console.log('title:', formData.title);
        console.log('email:', formData.email);
        console.log('description:', formData.description || '(not set)');

        const timestamp = new Date().toLocaleString();
        console.log('timestamp:', timestamp);
    });
});