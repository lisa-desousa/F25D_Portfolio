
function fetchCv() { //skapa en funktion för att importera json-datan

  fetch("/json/cv.json") //hämtar datan
  .then(response => response.json()) //konverterar till js
  .then(data => { //funktion som gör något med datan, kort sätt att skriva function(data)
    
    // createContainer skapar HTML för en sektion, den behöver sedan köras med parametrar (work_exp eller education)
    // dataarray är alltså en lista med alla jobb ELLER alla utbildningar, beroende på vilken av parametrarna man matar in när man kallar på funktionen
    function createContainer(dataArray, containerClass) {
      let container = document.querySelector(containerClass); //välj första elementet med klassnamnet du matar in
      container.innerHTML = ""; //Töm sektionen

      //för varje item i dataarray dvs varje jobb i work_exp ELLER varje utbildning i education:
      dataArray.forEach(item => { //item är då ett jobb eller en utbildning
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cv-item"); //skapa en div och ge den en klass för styling

        let heading = document.createElement("h2"); //skapa en heading
        heading.innerText = item.title; //sätta innehållet i heading till title i det aktuella cv-itemet
        heading.classList.add("cv-item-heading"); //ge den en klass för styling
        itemDiv.appendChild(heading); //samt ge den itemdiv (klass: cv-item) som förälder

        let taskList = document.createElement("ul"); //vi ska också skapa en lista för tasks
        taskList.classList.add("task-list"); //och lägga till ett klassnamn för senare funktioner
        
        //detta är alltså en NESTED foreach inuti dataarray.foreach för att nå listan av tasks inuti varje cv-item
        //viktigt att denna är nested eftersom att listan med task ska vara tillhörande sin titel
        item.tasks.forEach(task => {
          let li = document.createElement("li"); //för varje task skapa li
          li.textContent = task; // sätta innehållet till det aktuella tasket
          taskList.appendChild(li); //samt ge den SIN tasklist som förälder
        });//dessa är slutet på foreach TASK i varje CV-ITEM

        itemDiv.appendChild(taskList); //tasklist är barn till itemdiv (klass:cv-item)
        container.appendChild(itemDiv); //och den är i sin tur barn till container (work eller edu)
      }); //dessa är slutet på foreach CV-ITEM
      
    } //denna måsvinge är slutet på createContainer definitionen

    //nu ska alltså createContainer funktionen köras två gånger, en med datan från work_exp och en med datan från education, och den andra parametern är klassnamnet på rätt container så att alla cv-items hamnar under rätt header
    
    createContainer(data.work_exp, ".work-card");

    createContainer(data.education, ".education-card");
    


  //TOGGLE-TEXT:
  // funktionen måste ligga inuti fetchCV eftersom den inte hittar task-list annars då den genereras dynamiskt när sidan laddas (tror jag, funkade ej utanför fetchCV iaf)


  function toggleText(headerClass, cardClass){

    let btnMinus = document.querySelector(`${headerClass} .btn-minus`); //template literals för att välja endast knappen med klass btn-minus som är barn till headerClass
    let btnPlus = document.querySelector(`${headerClass} .btn-plus`); //samma för plus-knapp
    let cardSection = document.querySelector(cardClass); //välj aktuella card-sektionen
    let taskLists = cardSection.querySelectorAll(".task-list"); //välj alla task-lists inuti aktuella card-sektionen
  
    btnMinus.addEventListener("click", function(){ //lägg till händelse på klick av minus-knapp
      taskLists.forEach(list => { //för varje task-list
        list.classList.add("hide-text"); //lägg till klassen som gömmer de
      }); //slutet på foreach
    }); //slutet på eventlistener minusknapp

    btnPlus.addEventListener("click", function(){ //lägg till händelse på klick av plus-knapp
      taskLists.forEach(list => { //för varje task-list
        list.classList.remove("hide-text"); //ta bort klassen som gömmer de
      }); 
    }); //slutet på eventlistener plusknapp

  } //slutet på toggletext deklaration
  
  toggleText(".work-heading", ".work-card"); //kalla på funktionen både med work-card,
  toggleText(".edu-heading", ".education-card"); //och education-card

  //TOGGLE slut



  }) //detta e slutet på "then"

  //om fel uppstår vid hämtning visa felmeddelande i console
  .catch(error => console.error("Fel vid hämtning av JSON:", error));

} //detta e slutet på fetchCV

// Kör funktionen
fetchCv();

//inspiration till fetchCV (json inmatning): Reidars lektion
//inspiration till toggle-funktion: https://www.youtube.com/watch?v=3PHXvlpOkf4&t=508s (projekt "questions")
