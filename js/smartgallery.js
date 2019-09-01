function generateImageHTML(imageURL, i) {
    return "<div class=\"gallery-image-box\"><img id=\"img" + i + "\" src=\"" + imageURL + "\"></div>"
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
    
    var galleryElement = document.getElementById("gallery")
    galleryElement.innerHTML = "";    

    if (gallery != null) {
        URL = "img/" + gallery.replace(".","/");

        function getOrientationChecker(img) { 
            return function() {
                if (img.width > img.height) {
                    img.parentNode.className = "gallery-image-box-landscape";
                }
            }
        }
        
        function getNextImage (URL, i) {
            var img = new Image();
            var imgURL = URL+"/"+i+".jpg";
            img.addEventListener("load",function() {
                console.log("Got", imgURL);
                galleryElement.innerHTML += generateImageHTML(imgURL, i);

                var img = document.getElementById("img"+i);
                img.addEventListener("load", getOrientationChecker(img));

                getNextImage(URL,i+1);
            })
            img.addEventListener("error", function() {
                console.log("End of images.");
            })
            img.src = imgURL;
        }
    
        getNextImage(URL, 1);
    
    } else {
        galleryElement.innerHTML += generateImageHTML("img/index.jpg");
    }

})