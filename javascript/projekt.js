//lägg in info om projekt (typ som en json)
const projects = [
  {
    id: 1,
    heading: "LOGIN PAGE",
    description: "Detta projekt är en login-sida som gjordes som enn uppgift i kursen 'webbutveckling med javascript grund'. Sidan är gjord endast med HTML och CSS och har därför ingen störe funktionalitet utan syftet var snarare att bli bekväm med att använda enklare layout-metoder med hjälp av CSS.",
    image: "../images/login_page_closeup.png"
  },
  {
    id: 2,
    heading: "STEN, SAX, PÅSE",
    description: "Detta projekt gjordes under en genomgång i kursen 'webbutveckling med javascript grund'. Det är ett enkelt spel där man spelar sten, sax, påse mot datorn som i sin tur väljer alternativ slumpmässigt. Syftet var att bli bekväm med att jobba med enklare javascript.",
    image: "../images/rock-paper-scissors.png"
  },
  {
    id: 3,
    heading: "DRAWING CANVAS",
    description: "Detta projekt gjordes under en genomgång i kursen 'webbutveckling med javascript grund'. Det är en ruta där man kan rita med olika färger genom att hålla inne musen. Man kan även byta färg med en färg-väljare samt med tangenterna b (blå), r (röd), g (grön) samt e för att sudda.",
    image: "../images/drawing-canvas.png"
  },
  {
    id: 4,
    heading: "NÄSTA PROJEKT!",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime sunt atque deleniti magni animi? Accusantium maiores voluptas, est distinctio modi ipsam dignissimos, adipisci tempora aut a tenetur. Minima magni provident laborum velit itaque sunt veniam aperiam.",
    image: "../images/js-kod.jpg"
  },
];

//hämta projekt info divvar och skapa variabler
const img = document.getElementById('project-img');
const heading = document.querySelector('.project-heading');
const description = document.querySelector(".project-description");

//hämta knappar och skapa variabler
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

//första projektet = index 0
//currentItem kontrolleras med next- och prev-knapparna
let currentItem = 0;

// funktion för att visa projekt info som hör till varje enskilt projekt: bild, rubrik och beskrivning
function showProject(projectItem){
  const item = projects[projectItem];
  img.src = item.image;
  heading.textContent = item.heading;
  description.textContent = item.description;
}

//funktion för att ladda första projektet när sidan laddas
window.addEventListener("DOMContentLoaded", function(){
  showProject(currentItem);
});


// funktion för next-knapp
nextBtn.addEventListener('click', function(){
  currentItem++;

  //gå tillbaka till index 0 om listan tar slut!
  // -1 på length eftersom listan är längre än vad den har index
  //konstigt förklarat men den har 4 objekt (längd) men currentitem kan inte vara 4 eftersom indexerna inte är 1-4 utan 0-3
  if(currentItem > projects.length - 1) {
    currentItem = 0;
  }
  showProject(currentItem);
});

// funktion för prev-knapp (motsatt till next-knapp)
prevBtn.addEventListener('click', function(){
  currentItem--;

  //gå till sist i listan om du backar för mycket
  if(currentItem < 0) {
    currentItem = projects.length -1;
  }
  showProject(currentItem);
});

//inspiration till detta script är från: https://www.youtube.com/watch?v=3PHXvlpOkf4&t=508s (project "reviews")

