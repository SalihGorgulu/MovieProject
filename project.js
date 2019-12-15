const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body");
const clear = document.getElementById("clear-films");

const ui=new UI();
const storage=new Storage();
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
  
    cardbody.forEach((item)=>item.addEventListener("click",deleteFilm));
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e) {
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title===""||director===""||url===""){
        ui.displayMessages("Tüm alanaları doldurun!","danger");
        //hata
    }else{
        const newFilm=new Film(title,director,url);
        ui.addFilmToUI(newFilm);//Arayüze film ekleme
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("Film Başarıyla Eklendi","success");
    }
    ui.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme İşlemi Başarılı","success");
    }
}
function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}




