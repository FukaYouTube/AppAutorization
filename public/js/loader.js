document.body.onload = function(){
    let preloader = document.getElementById('pre-loader')
    setTimeout(function(){
        if(!preloader.classList.contains('pre-loader-not_active')){
            preloader.classList.add('pre-loader-not_active')
            setTimeout(function(){ preloader.remove() }, 200)
        }
    }, 500)
}