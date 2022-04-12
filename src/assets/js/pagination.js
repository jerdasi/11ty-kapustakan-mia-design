// import appendToContainer from './index.js'



// Membuat Page Number berdasarkan banyaknya data

const paginationBuild = (index, data) => {
    let total = data.length
    let perPages = 10
    let minPerPages = index * perPages - perPages
    let maxPerPages = index * perPages > total ? total : index * perPages
    return data.slice(minPerPages, maxPerPages)
}



// Isi