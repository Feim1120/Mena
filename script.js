// 1. APPLICATION STATE
const appState = {
    queries: [
        {
            "frage": "Was ist die Hauptstadt von Deutschland?",
            "optionen": ["Berlin", "München", "Hamburg", "Köln"],
            "antwort": "Berlin"
        },
        {
            "frage": "Wer hat die Relativitätstheorie entwickelt?",
            "optionen": [
                "Isaac Newton",
                "Albert Einstein",
                "Nikola Tesla",
                "Thomas Edison"
            ],
            "antwort": "Albert Einstein"
        },
        {
            "frage": "Was ist der größte Planet in unserem Sonnensystem?",
            "optionen": ["Erde", "Mars", "Jupiter", "Saturn"],
            "antwort": "Jupiter"
        },
        {
            "frage": "Wer hat das Buch '1984' geschrieben?",
            "optionen": [
                "George Orwell",
                "Aldous Huxley",
                "J.K. Rowling",
                "Stephen King"
            ],
            "antwort": "George Orwell"
        },
        {
            "frage": "Was ist die Quadratwurzel von 81?",
            "optionen": ["7", "8", "9", "10"],
            "antwort": "9"
        },
        {
            "frage": "Wer hat das World Wide Web erfunden?",
            "optionen": [
                "Bill Gates",
                "Steve Jobs",
                "Tim Berners-Lee",
                "Mark Zuckerberg"
            ],
            "antwort": "Tim Berners-Lee"
        },
        {
            "frage": "In welchem Jahr fiel die Berliner Mauer?",
            "optionen": ["1987", "1989", "1991", "1993"],
            "antwort": "1989"
        },
        {
            "frage": "Wer hat das iPhone erfunden?",
            "optionen": ["Microsoft", "Apple", "Samsung", "Nokia"],
            "antwort": "Apple"
        },
        {
            "frage": "Wer hat das Gemälde 'Die Mona Lisa' gemalt?",
            "optionen": [
                "Vincent Van Gogh",
                "Pablo Picasso",
                "Leonardo da Vinci",
                "Claude Monet"
            ],
            "antwort": "Leonardo da Vinci"
        },
        {
            "frage": "Was ist der höchste Berg der Welt?",
            "optionen": ["K2", "Mount Everest", "Kilimandscharo", "Mont Blanc"],
            "antwort": "Mount Everest"
        },
        {
            "frage": "Wer hat das Buch 'Der Herr der Ringe' geschrieben?",
            "optionen": [
                "J.K. Rowling",
                "George R.R. Martin",
                "J.R.R. Tolkien",
                "Stephen King"
            ],
            "antwort": "J.R.R. Tolkien"
        },
        {
            "frage": "Was ist der kleinste Kontinent der Welt?",
            "optionen": ["Afrika", "Australien", "Antarktis", "Europa"],
            "antwort": "Australien"
        },
        {
            "frage": "Wer hat die Glühbirne erfunden?",
            "optionen": [
                "Nikola Tesla",
                "Thomas Edison",
                "Alexander Graham Bell",
                "Benjamin Franklin"
            ],
            "antwort": "Thomas Edison"
        },
        {
            "frage": "In welchem Jahr wurde das Internet öffentlich zugänglich?",
            "optionen": ["1983", "1991", "1995", "2000"],
            "antwort": "1991"
        }
    ],
    currentQueryIndex: 0,
    totalScore: 0
};

// 2. STATE ACCESSORS/MUTATORS FN'S
function getCurrentQuery() {
    return appState.queries[appState.currentQueryIndex];
}

function increaseScore() {
    appState.totalScore++;
}

function goToNextQuery() {
    if (appState.currentQueryIndex < appState.queries.length - 1) {
        appState.currentQueryIndex++;
    }
}

// 3. DOM Node Refs
const queryElement = document.getElementById('query');
const choicesElement = document.getElementById('choices');
const scoreElement = document.getElementById('score');
const checkButton = document.getElementById('check');

// 4. DOM Node Creation Fn's
function createChoiceOption(option) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'radio';
    input.name = 'choice';
    input.value = option;
    label.innerText = option;

    div.appendChild(input);
    div.appendChild(label);
    return div;
}

// 5. RENDER FN
function renderQuery() {
    const currentQuery = getCurrentQuery();

    queryElement.innerText = currentQuery.frage;
    choicesElement.innerHTML = '';

    currentQuery.optionen.forEach(option => {
        choicesElement.appendChild(createChoiceOption(option));
    });
}

function renderScore() {
    scoreElement.innerText = `Score: ${appState.totalScore} / ${appState.queries.length}`;
}

// 6. EVENT HANDLERS
function onCheck() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption && selectedOption.value === getCurrentQuery().antwort) {
        increaseScore();
        renderScore();

        if (appState.currentQueryIndex < appState.queries.length - 1) {
            goToNextQuery();
            renderQuery();
        } else {
            alert('Quiz finished! Your score: ' + appState.totalScore);
            checkButton.disabled = true;
        }

    } else {
        alert('Falsche Antwort!');
    }
}

// 7. INIT BINDINGS
document.addEventListener("DOMContentLoaded", () => {
    renderQuery();
    renderScore();

    checkButton.addEventListener('click', () => {
        onCheck();
    });
});

// 8. INITIAL RENDER
renderQuery();
renderScore();
