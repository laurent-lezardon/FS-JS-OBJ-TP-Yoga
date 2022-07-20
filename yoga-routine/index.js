const main = document.querySelector("main");
console.log(main);
let exercisesArray = [{
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

class Exercice {

}

const utils = {
    pageContent: function(title, content, btn) {
        document.querySelector('h1').innerHTML = title;
        main.innerHTML = content;
        document.querySelector('.btn-container').innerHTML = btn;

    }
}

const page = {
    lobby: function() {
        exercisesMap = exercisesArray.map((exercice) => {
            return `
        <li>
          <div class="card-header">
            <input type="number" id=${exercice.picture} min="1" max="10" value=${exercice.duration}>
            <span>min</span>
          </div>
          <img src="./img/${exercice.picture}.png" />
          <i class="fas fa-arrow-circle-left arrow" data-pic=${exercice.picture}></i>
        </li>
        `
        })
        utils.pageContent(
            'Paramétrage <i id="reboot" class="fas fa-undo"></i>',
            '<ul>' + exercisesMap.join("") + '</ul>',
            '<button id="start">Commencer<i class="far fa-play-circle"></i>'
        )
    },
    routine: function() {
        utils.pageContent(
            'Routine',
            'Exercices avec chrono',
            null
        )

    },
    finish: function() {
        utils.pageContent(
            'Terminé !',
            '<button id="start">Once more</button>',
            '<button id="reboot" class="btn-reboot">Paramétrer <i class="fas fa-times-circle"></i></button>'
        )

    }
}

page.lobby();