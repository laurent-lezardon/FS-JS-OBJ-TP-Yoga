const main = document.querySelector("main");
console.log(main);
const exercisesRef = [{
        picture: 0,
        duration: 1,
    },
    {
        picture: 1,
        duration: 1,
    },
    {
        picture: 2,
        duration: 1,
    },
    {
        picture: 3,
        duration: 1,
    },
    {
        picture: 4,
        duration: 1,
    },
    {
        picture: 5,
        duration: 1,
    },
    {
        picture: 6,
        duration: 1,
    },
    {
        picture: 7,
        duration: 1,
    },
    {
        picture: 8,
        duration: 1,
    },
    {
        picture: 9,
        duration: 1,
    },
];

// Get stored exercice array
let exercisesArray = (localStorage.yogaSession) ? JSON.parse(localStorage.yogaSession) : [...exercisesRef];


class Exercice {}

//=================== utilitaires ======================================================
const utils = {
    //-------------- construction d'une page (titre h1, contenu, bouton) ------------------
    pageContent: function(title, content, btn) {
        document.querySelector("h1").innerHTML = title;
        main.innerHTML = content;
        document.querySelector(".btn-container").innerHTML = btn;
    },
    //------------ mise à jour tableau d'exercice lors modification d'une durée d'exercice
    handleEventMinutes: function() {
        document.querySelectorAll('input[type="number"]').forEach((input, index) => {
            input.addEventListener("input", (e) => {
                console.log(index, e.target.value);
                exercisesArray[index].duration = parseInt(e.target.value);
                utils.storeExercises();
            });
        });
    },
    //------------ changement de l'odre d'exercice par les flèches --------------------
    handleEventArrow: function() {
        document.querySelectorAll('.arrow').forEach((arrow) => {
            arrow.addEventListener('click', (a) => {
                //console.log(a.target.dataset.pic);
                let index = parseInt(a.target.dataset.pic);
                if (index != 0) {
                    [exercisesArray[index - 1], exercisesArray[index]] = [exercisesArray[index], exercisesArray[index - 1]];
                    //console.log(exercisesArray);
                } else {
                    let nbExercises = exercisesArray.length - 1;
                    [exercisesArray[0], exercisesArray[nbExercises]] = [exercisesArray[nbExercises], exercisesArray[0]];
                    // console.log(exercisesArray);
                }
                //utils.storeExercises();
                page.lobby();
            })
        })
    },
    // ---------------- suppression d'un exercice -------------------------------------
    deleteItem: function() {
        document.querySelectorAll('.deleteBtn').forEach((item) => {
            item.addEventListener('click', (sup) => {
                console.log(sup.target.dataset.pic);
                exercisesArray.splice(sup.target.dataset.pic, 1);
                //utils.storeExercises();
                page.lobby();
            })
        })
    },
    // ------------------- reboot exercices -------------------------------------------
    rebootExercices: function() {
        reboot.addEventListener('click', () => {
            console.log("reboot !");
            exercisesArray = [...exercisesRef];
            console.log("Exercices : ", exercisesArray);


            page.lobby();
        })

    },
    // ---------------------- stockage des paramètres -------------------------------
    storeExercises: function() {
        localStorage.yogaSession = JSON.stringify(exercisesArray);
    },
    // --------------------- demarrage des exercices ------------------------------
    start: function() {
        start.addEventListener('click', () => {
            page.routine();
        })

    },


};


// ================== construction des pages ======================================================
const page = {
    // ------------------ page de paramétrage des exercices -------------------------------------------------
    lobby: function() {
        // --- generation des cartes d'exercices
        //console.log(exercisesArray);

        exercisesMap = exercisesArray.map((exercice, index) => {
            //console.log(exercice);
            return `
        <li>
          <div class="card-header">
            <input type="number" id=${exercice.picture} min="1" max="10" value=${exercice.duration}>
            <span>min</span>
          </div>
          <img src="./img/${exercice.picture}.png" />
          <i class="fas fa-arrow-circle-left arrow" data-pic=${index}></i>
          <i class="fas fa-times-circle deleteBtn" data-pic=${index}></i>
        </li>
        `;
        });
        utils.pageContent(
            'Paramétrage <i id="reboot" class="fas fa-undo"></i>',
            "<ul>" + exercisesMap.join("") + "</ul>",
            '<button id="start">Commencer<i class="far fa-play-circle"></i>'
        );
        utils.storeExercises();
        utils.handleEventMinutes();
        utils.handleEventArrow();
        utils.deleteItem();
        utils.rebootExercices();
        utils.start();
    },
    // -------------- sceance d'exercice ----------------------------------------------
    routine: function() {

        let exerciceTime = `
        <div class="exercice-container">
        <p><span class="minutes">${exercisesArray[0].duration}</span> : <span class="secondes">00</span></p>
        <img src="./img/${exercisesArray[0].picture}.png" />
        <div>1/${exercisesArray.length}</div>
        </div>
         `
        utils.pageContent("Routine", exerciceTime, null);
        const minutes = document.querySelector('.minutes');
        const secondes = document.querySelector('.secondes');
        console.log(minutes, secondes);
        let ellapseTime = exercisesArray[0].duration * 60;
        console.log(ellapseTime);

        ellapseTime -= 1;
        console.log(ellapseTime);




    },
    // ---------------- page pour quitter ou recommencer --------------------------------
    finish: function() {
        utils.pageContent(
            "Terminé !",
            '<button id="start">Once more</button>',
            '<button id="reboot" class="btn-reboot">Paramétrer <i class="fas fa-times-circle"></i></button>'
        );
    },
};

page.lobby();
//console.log("durée ", exercisesArray[0].duration)