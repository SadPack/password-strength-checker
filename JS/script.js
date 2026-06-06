// Get password input and show button from HTML
const passwordInput = document.getElementById("passwordInput");
const showBtn = document.getElementById("showBtn");

// Show or hide password when button is clicked
showBtn.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        showBtn.textContent = "Show";
    }
});

// Get strength bar and strength text from HTML
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Get password rule elements from HTML
const lengthRule = document.getElementById("lengthRule");
const longRule = document.getElementById("longRule");
const upperRule = document.getElementById("upperRule");
const lowerRule = document.getElementById("lowerRule");
const numberRule = document.getElementById("numberRule");
const specialRule = document.getElementById("specialRule");
const spaceRule = document.getElementById("spaceRule");
const repeatRule = document.getElementById("repeatRule");
const sequenceRule = document.getElementById("sequenceRule");

// Run password checker whenever user types
passwordInput.addEventListener("input", checkPasswordStrength);

function checkPasswordStrength() {
    const password = passwordInput.value;
    let score = 0;

    // Password rules
    const hasMinLength = password.length >= 8;
    const hasGoodLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    const hasNoRepeats = !/(.)\1\1/.test(password);
    const hasNoSequences = !hasSimpleSequence(password);

    // Update rule status on screen
    updateRule(lengthRule, hasMinLength);
    updateRule(longRule, hasGoodLength);
    updateRule(upperRule, hasUppercase);
    updateRule(lowerRule, hasLowercase);
    updateRule(numberRule, hasNumber);
    updateRule(specialRule, hasSpecial);
    updateRule(spaceRule, hasNoSpaces);
    updateRule(repeatRule, hasNoRepeats);
    updateRule(sequenceRule, hasNoSequences);

    // Reset checker if password input is empty
    if (password.length === 0) {
        resetChecker();
        return;
    }

    // Calculate password score
    if (hasMinLength) {
        score++;
    }

    if (hasGoodLength) {
        score++;
    }

    if (hasUppercase) {
        score++;
    }

    if (hasLowercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }

    if (hasNoSpaces) {
        score++;
    }

    if (hasNoRepeats) {
        score++;
    }

    if (hasNoSequences) {
        score++;
    }

    // Display final strength
    displayStrength(score);
}

function updateRule(ruleElement, isValid) {
    if (isValid) {
        ruleElement.classList.add("valid");
        ruleElement.classList.remove("invalid");
    } else {
        ruleElement.classList.add("invalid");
        ruleElement.classList.remove("valid");
    }
}

function displayStrength(score) {
    if (score <= 3) {
        strengthFill.style.width = "25%";
        strengthFill.style.background = "#ef4444";
        strengthText.textContent = "Strength: Weak";
        strengthText.style.color = "#fecaca";
    } else if (score <= 5) {
        strengthFill.style.width = "50%";
        strengthFill.style.background = "#f59e0b";
        strengthText.textContent = "Strength: Medium";
        strengthText.style.color = "#fde68a";
    } else if (score <= 7) {
        strengthFill.style.width = "75%";
        strengthFill.style.background = "#38bdf8";
        strengthText.textContent = "Strength: Strong";
        strengthText.style.color = "#bae6fd";
    } else {
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strength: Very Strong";
        strengthText.style.color = "#bbf7d0";
    }
}

function resetChecker() {
    strengthFill.style.width = "0%";
    strengthFill.style.background = "#94a3b8";
    strengthText.textContent = "Strength: Not Checked";
    strengthText.style.color = "#ffffff";

    lengthRule.classList.remove("valid", "invalid");
    longRule.classList.remove("valid", "invalid");
    upperRule.classList.remove("valid", "invalid");
    lowerRule.classList.remove("valid", "invalid");
    numberRule.classList.remove("valid", "invalid");
    specialRule.classList.remove("valid", "invalid");
    spaceRule.classList.remove("valid", "invalid");
    repeatRule.classList.remove("valid", "invalid");
    sequenceRule.classList.remove("valid", "invalid");
}

function hasSimpleSequence(password) {
    const lowerPassword = password.toLowerCase();

    const sequences = [
        "123",
        "234",
        "345",
        "456",
        "567",
        "678",
        "789",
        "abc",
        "bcd",
        "cde",
        "def",
        "qwe",
        "asd",
        "zxc",
        "qwerty",
        "password"
    ];

    for (let i = 0; i < sequences.length; i++) {
        if (lowerPassword.includes(sequences[i])) {
            return true;
        }
    }

    return false;
}