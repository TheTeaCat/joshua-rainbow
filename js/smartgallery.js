function generateImageHTML(imageURL) {
    return "<div class=\"gallery-image-box\"><img src=\"" + imageURL + "\"></div>"
}

window.addEventListener("load", function () {
    var url = new URL(document.URL);
    var gallery = url.searchParams.get("gallery");

    if (gallery != null) {
        URL = "img/" + gallery.replace(".","/");
    } else {
        URL = "img";
    }

    var gallery = document.getElementById("gallery")
    gallery.innerHTML = "";

    function getNextImage (URL, i) {
        var img = new Image();
        var imgURL = URL+"/"+i+".jpg";
        img.addEventListener("load",function() {
            console.log("Got", imgURL);
            gallery.innerHTML += generateImageHTML(imgURL);
            getNextImage(URL,i+1);
        })
        img.addEventListener("error", function() {
            console.log("End of images.");
        })
        img.src = imgURL;
    }

    getNextImage(URL, 1);
})