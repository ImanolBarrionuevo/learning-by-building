/** Get DOM elements for user input and interaction */
const calculateBtnEl = document.getElementById("calculate-btn");
const targetDateEl = document.getElementById("target-date");
const clearBtnEl = document.getElementById("clear-btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

/** Calculate and display the age based on birthday and optional target date */
function calculateAge() {
    const birthDateValue = birthdayEl.value;
    const targetDateValue = targetDateEl.value;

    if (birthDateValue === "") {
        alert("Please enter your birthday");
        return;
    }

    /** Use target date if provided, otherwise default to today */
    const referenceDate = targetDateValue
        ? parseLocalDate(targetDateValue)
        : new Date();

    /** Compute age and format result */
    const age = getAge(birthDateValue, referenceDate);
    const formattedDate = targetDateValue
        ? formatDate(parseLocalDate(targetDateValue))
        : "today";

    const ageLabel = age === 1 ? "year" : "years";
    resultEl.innerText = `Age on ${formattedDate}: ${age} ${ageLabel}`;

    resultEl.classList.add("expanded");
}

/** Calculate age in years based on birthday and reference date */
function getAge(birthdayValue, referenceDate) {
    const birthDate = parseLocalDate(birthdayValue);
    let age = referenceDate.getFullYear() - birthDate.getFullYear();
    const month = referenceDate.getMonth() - birthDate.getMonth();

    /** Adjust age if birthday hasn't occurred yet this year */
    if (
        month < 0 ||
        (month === 0 && referenceDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

/** Format a Date object as DD/MM/YYYY */
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/** Convert a YYYY-MM-DD string into a local Date object */
function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
}

/** Remove result expansion when user modifies birthday input */
birthdayEl.addEventListener("input", () => {
    resultEl.classList.remove("expanded");
});

/** Trigger age calculation on button click */
calculateBtnEl.addEventListener("click", calculateAge);

/** Clear all inputs and reset result display */
clearBtnEl.addEventListener("click", () => {
    birthdayEl.value = "";
    resultEl.innerText = "";
    targetDateEl.value = "";
    resultEl.classList.remove("expanded");
});