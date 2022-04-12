let borderStatus = ["border", "border-black"]
document.querySelectorAll(".accordion").forEach(elemen => {
    elemen.addEventListener("click", function() {
        this.nextElementSibling.classList.toggle("hidden")
        borderStatus.map(item => {
            elemen.classList.toggle(item)
            this.parentElement.classList.toggle(item)
        })
    })
})