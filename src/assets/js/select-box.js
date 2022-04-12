document.querySelector(".default_option").addEventListener('click', function() {
    document.querySelector(".select_ul").classList.toggle("hidden")
})

document.querySelectorAll(".select_ul li").forEach(elemen => {
    elemen.addEventListener("click", function() {
        var currentSelect = elemen.innerHTML

        document.querySelector(".default_option li").innerHTML = currentSelect
        document.querySelector(".select_ul").classList.toggle("hidden")
    })
})