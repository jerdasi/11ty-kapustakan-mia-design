let globalData = []
let filteredData = []

// Return HTML For Build Card
const buildCardGallery = (src, nama) => {
    return `
    <img src="${src}" alt="gallery-item" class="picture-style">
    <div class="item-description absolute w-full bottom-0 hidden">
        <div class="bg-emas-keraton text-white font-bold h-full py-2 rounded-b-lg">
            <h1 class="text-lg tracking-widest text-center">${nama}</h1>
        </div>
    </div>
    `
}

// Pagination Function To-Left
const toLeft = () => {
    let active = document.querySelector(".pagination-container li.active")
    if (active.innerText > 1) {
        if (active.previousSibling.innerText == 1) {
            active.previousSibling.previousSibling.classList.add("cursor-not-allowed")
        } else {
            document.querySelector(".to-right").classList.remove("cursor-not-allowed")
        }
        active.classList.toggle("active")
        active.previousSibling.classList.add("active")
        appendToContainer(paginationBuild(parseInt(active.innerText) - 1, [...filteredData]))
    } else {
        document.querySelector(".to-left").classList.remove("cursor-not-allowed")
    }
}

// Pagination Function To-Right
const toRight = () => {
    let active = document.querySelector(".pagination-container li.active")
    let banyak = document.querySelectorAll(".pagination-container li").length
    if (active.innerText < banyak - 2) {
        if (active.nextSibling.innerText == banyak - 2) {
            active.nextSibling.nextSibling.classList.add("cursor-not-allowed")
        } else {
            document.querySelector(".to-left").classList.remove("cursor-not-allowed")
        }
        active.classList.toggle("active")
        active.nextSibling.classList.add("active")
        appendToContainer(paginationBuild(parseInt(active.innerText) + 1, [...filteredData]))
    } else {
        document.querySelector(".to-right").classList.remove("cursor-not-allowed")
    }
}

// Iniatilize Page Number For Pagination Based On Data Length
const initPageNumber = (total) => {
    let menu = document.createElement("ul")
    menu.classList.add("flex", "bg-white", "shadow")
    let list = document.createElement("li")
    menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-left cursor-not-allowed" onclick="toLeft()"><i class="fa-solid fa-angle-left"></i></li>`)
    let batasAkhir = Math.ceil(total / 10)
    for (let i = 1; i <= batasAkhir; i++) {
        let list = document.createElement("li")

        // Event Listener
        list.addEventListener("click", function() {
            let parent = this.parentNode.childNodes
            let onPage = this.innerText
            if (!this.classList.contains("active")) {
                if (onPage == batasAkhir || onPage == 1) {
                    if (onPage == 1) {
                        document.querySelector(".to-right").classList.remove("cursor-not-allowed")
                        this.previousSibling.classList.add("cursor-not-allowed")
                    } else {
                        document.querySelector(".to-left").classList.remove("cursor-not-allowed")
                        this.nextSibling.classList.add("cursor-not-allowed")
                    }
                } else {
                    document.querySelector(".to-left").classList.remove("cursor-not-allowed")
                    document.querySelector(".to-right").classList.remove("cursor-not-allowed")
                }

                parent.forEach(element => {
                    element.classList.remove("active")
                })
                this.classList.add("active")
                let result = paginationBuild(onPage, [...filteredData])
                appendToContainer(result)
            }
        })

        list.innerText = i

        i == 1 ? list.classList.add("px-3", "py-2", "active") : list.classList.add("px-3", "py-2")
        menu.insertAdjacentElement("beforeend", list)
    }
    batasAkhir == 1 ? menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-right cursor-not-allowed" onclick="toRight()"><i class="fa-solid fa-angle-right"></i></li>`) : menu.insertAdjacentHTML("beforeend", `<li class="px-3 py-2 to-right" onclick="toRight()"><i class="fa-solid fa-angle-right"></i></li>`)


    return menu
}

// Insert to Container
const appendToContainer = (data) => {
    var grid = document.querySelector(".gallery-container")
    grid.classList.toggle("opacity-0")
    document.querySelector(".loader-container").classList.toggle("hidden")
    var elems = []
    var fragment = document.createDocumentFragment()

    let container = document.querySelector(".gallery-container")
        // Iniatilize New Gallery
    let allGridItem = document.querySelectorAll(".grid-item").forEach(element => element.remove())

    for (let i = 0; i < data.length; i++) {
        let elem = document.createElement('div')
        elem.classList.add("grid-item", "relative", "column-1", "sm:column-2", "md:column-3", "lg:column-4")
        elem.innerHTML = buildCardGallery(data[i].url, data[i].nama)
        fragment.appendChild(elem)
        elems.push(elem)
    }



    grid.appendChild(fragment)

    // Membentuk Layout setelah beberapa detik
    setTimeout(function() {
        var msnry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer',
            percentPosition: true
        })
        initializeHover()
        document.querySelector(".loader-container").classList.toggle("hidden")
        grid.classList.toggle("opacity-0")
    }, 2500)
}

// To Fetch Data
fetch('./_data/gamelan.json').then(response => {
    return response.json()
}).then(data => {
    let result = paginationBuild(1, data)
    appendToContainer(result)
    globalData = [...data]
    filteredData = [...data]

    let pagination = document.querySelector(".pagination-container")
    pagination.appendChild(initPageNumber(data.length))
})

// Iniatialize Hover in Card
const initializeHover = () => {
    document.querySelectorAll('.grid-item').forEach(elemen => {

        let description = elemen.firstElementChild
        elemen.addEventListener('mouseenter', () => {
            description.classList.remove('border-4', 'border-emas-keraton')
            description.classList.add('shadow-mia-style')
            elemen.classList.add('scale-110')
            elemen.lastElementChild.classList.remove('hidden')
        })
        elemen.addEventListener('mouseleave', () => {
            description.classList.add('border-4', 'border-emas-keraton')
            description.classList.remove('shadow-mia-style')
            elemen.classList.remove('scale-110')
            elemen.lastElementChild.classList.add('hidden')
        })
    })
}

document.querySelectorAll(".option").forEach(elemen => {
    elemen.parentElement.addEventListener("click", function() {
        let optionClass = Array.from(elemen.classList) //Mengubah nama nama kelas di elemen ini menjadi Array
        let tipe = optionClass.pop() //Mendapatkan tipe dengan mengambil nama kelas terakhir

        if (tipe == "all") {
            filteredData = [...globalData]
        } else if (tipe == "hageng") {
            let result = [...globalData]
            filteredData = result.filter(elemen => elemen.jenis == "hageng")
        } else if (tipe == "pakurmatan") {
            let result = [...globalData]
            filteredData = result.filter(elemen => elemen.jenis == "pakurmatan")
        }

        let result = paginationBuild(1, filteredData)
        console.log(filteredData)
        appendToContainer(result)
        let pagination = document.querySelector(".pagination-container")
        pagination.replaceChild(initPageNumber(filteredData.length), pagination.firstElementChild)
    })
})