function generateImageHTML(imageURL, i) {
    return "<div class=\"gallery-image-box\"><img id=\"img" + i + "\" src=\"" + imageURL + "\"></div>"
}

function getOrientationChecker(imgID) { 
    return function() {
        var img = document.getElementById(imgID);
        if (img.width > img.height) {
            img.parentNode.className = "gallery-image-box-landscape";
        }
    }
}

window.addEventListener("load", function () {
    var gallery = null;

    if (document.URL.split("?").length > 1) {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i++) {
            if (params[i].split("=")[0] == "gallery") {
                gallery = params[i].split("=")[1]
            }
        }    
    }

    if (gallery != null) {
        URL = "img/" + gallery.replace(".","/");
                
        var request = new XMLHttpRequest();
        request.open("GET",URL+"/img-list.txt");
        request.responseType = "text";
        request.onload = function() {
            if (request.status == 200) {
                var galleryElement = document.getElementById("gallery")
                galleryElement.innerHTML = "";

                var imgs =  request.response.split("\n");

                for (var i = 0; i < imgs.length; i++) {
                    galleryElement.innerHTML += generateImageHTML(URL+"/"+imgs[i], i);
                    document.getElementById("img"+i).addEventListener("load", getOrientationChecker("img"+i));
                }
            }
        };
        request.send();
    }
})