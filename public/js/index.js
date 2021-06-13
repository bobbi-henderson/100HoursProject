function toggleForm(clicked_id) {
    let el = document.getElementById(clicked_id).nextSibling.nextSibling
    let icon = document.getElementById(clicked_id).children[0]
    if(icon.classList.contains('fa-plus')){
        icon.classList.remove('fa-plus')
        icon.classList.add('fa-minus')
    } else {    
        icon.classList.remove('fa-minus')
        icon.classList.add('fa-plus')
    }
    if(el.style.display !== "block"){
        el.style.display = "block"
    } else {
        el.style.display = "none"
    }
    console.log(el.style.display)
}