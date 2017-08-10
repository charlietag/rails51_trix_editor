(function() {
  var host, uploadAttachment;

  //-----------------Upload Add File--------------------
  document.addEventListener("trix-attachment-add", function(event) {
    var attachment;
    attachment = event.attachment;
    if (attachment.file) {
      return uploadAttachment(attachment);
    }
  });

  document.addEventListener("trix-attachment-remove", function(event) {
    //console.log(event);
    var file_id;
    file_id = event.attachment.attachment.attributes.values.id;
    return removeAttachment(file_id);
  });

  //-----------------Remove File--------------------


  //-----------------Functions--------------------
  //host = "https://d13txem1unpe48.cloudfront.net/";
  host = "/pictures.json";  // Route: POST /pictures(.:format) pictures#create

  //-------Add File-----
  uploadAttachment = function(attachment) {
    var file, form, xhr;
    file = attachment.file;
    form = new FormData;
    form.append("Content-Type", file.type);
    //form.append("file", file);
    form.append("picture[path]", file);  // Form element for pictures/_form

    xhr = new XMLHttpRequest;

    xhr.responseType = 'json'; // Parse response json into xhr object
    xhr.open("POST", host, true);
    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));  // Add CSRF-Token into formData
    xhr.upload.onprogress = function(event) {
      var progress;
      progress = event.loaded / event.total * 100;
      return attachment.setUploadProgress(progress);
    };
    xhr.onload = function() {
      var id, href, url;
      if (xhr.status === 201) {
        url = href = xhr.response.path.url;
        id = xhr.response.id;
        //console.log(url);
        return attachment.setAttributes({
          id: id,
          url: url,
          href: href
        });
      }
    };
    return xhr.send(form);
  };
  //-------Remove File-----
  removeAttachment = function(file_id) {
    //console.log(file_id);
    return $.ajax({
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
      type: 'DELETE',
      dataType: 'json',
      url: '/pictures/' + file_id,
      cache: false,
      contentType: false,
      processData: false
    });
  };

  //-----------------Functions end--------------------

}).call(this);
