const searchBtn = document.getElementById("searchBtn");
const wordInput = document.getElementById("wordInput");
const result = document.getElementById("result");
const errorMsg = document.getElementById("errorMsg");

let audio;

searchBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if(word !== "") fetchWord(word);
});

const fetchWord = async (word) => {
    try {
        errorMsg.innerText = "";
        result.style.display = "none";

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error("Word not found");

        const data = await res.json();
        displayResult(data[0]);
        console.log(data);
        

    } catch (err) {
        errorMsg.innerText = err.message;
    }
};

const displayResult = (data) => {
    document.getElementById("word").innerText = data.word;
    document.getElementById("phonetic").innerText =
        data.phonetic || "";

    const meaningData = data.meanings[0];
    document.getElementById("meaning").innerText =
        meaningData.definitions[0].definition;

     const synonyms = meaningData.synonyms?.length > 0 
        ? meaningData.synonyms 
        : meaningData.definitions[0].synonyms;

    document.getElementById("Synonyms").innerText = 
        synonyms && synonyms.length > 0 ? synonyms.join(", ") : "No synonyms available.";

     const antonyms = meaningData.antonyms?.length > 0 
        ? meaningData.antonyms 
        : meaningData.definitions[0].antonyms;

    document.getElementById("Antonyms").innerText = 
        antonyms && antonyms.length > 0 ? antonyms.join(", ") : "No antonyms available.";

    audio = data.phonetics.find(p => p.audio)?.audio;

    result.style.display = "block";
};

document.getElementById("audioBtn").addEventListener("click", () => {
    if(audio){
        new Audio(audio).play();
    }
});