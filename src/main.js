document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const imageInput = document.getElementById('image-input');
    const previewImage = document.getElementById('preview-image');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);

        fetch('/api/legofy', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.blob())
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            previewImage.src = imageUrl;
            previewImage.onload = () => URL.revokeObjectURL(imageUrl); // Free memory
        })
        .catch(error => console.error('Error:', error));
    });
});
