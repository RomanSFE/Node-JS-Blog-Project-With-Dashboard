window.onload = function() {
    tinymce.init({
        selector: 'textarea#tiny-mce-form-body',
        plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker image imagetools',
        toolbar: 'bold italic underline alignleft aligncenter alignright a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table link image media', height: 380,
        automatic_uploads: true,

        toolbar_mode: 'floating',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',

        images_upload_url: '/uploads/postimage',
        relative_urls: false, 
        
        images_upload_handler: function( blobInfo, success, failure ) {
            let headers = new Headers()
            headers.append('Accept', 'Application/JSON')

            let formData = new FormData()
            formData.append('post-image', blobInfo.blob(), blobInfo.filename())

            let req = new Request('/uploads/postimage', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })

            fetch(req)
                .then(res => res.json())
                .then(data => success(data.imgUrl))
                .catch(() => failure('HTTP Error'))
        }

    })
}