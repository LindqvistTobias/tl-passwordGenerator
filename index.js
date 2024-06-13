const slider = document.getElementById("myRange");
var output = document.getElementById("character-length-number");
output.innerHTML = slider.value;


slider.addEventListener('input', () => {
  const value = slider.value;
  slider.style.setProperty('--thumb-position', `${(value - slider.min) / (slider.max - slider.min) * 100}%`);
  output.innerHTML = value;
});

slider.oninput = function() {
  output.innerHTML = this.value;
}

const generate = document.querySelector('.generate-container');

generate.addEventListener('click', function() {

    function strengthCheck(){
      let num = 0;
      const upperCase = document.getElementById("uppercase").checked;
      const lowerCase = document.getElementById("lowercase").checked;
      const numbers = document.getElementById("numbers").checked;
      const symbols = document.getElementById("symbols").checked;
      num = upperCase + lowerCase + numbers + symbols;      
      return num;
    }

    const strengthText = document.getElementById("strength-string");
    const strengthBox1 = document.getElementById("strength-one");
    const strengthBox2 = document.getElementById("strength-two"); 
    const strengthBox3 = document.getElementById("strength-three"); 
    const strengthBox4 = document.getElementById("strength-four");     
    const backgroundUnchecked = "#A638F6";
    const borderChecked = "unset";
    const borderUnchecked = "1px solid white";

    function toWeak() {
      strengthBox1.style.background = "#8B0000";
      strengthBox2.style.background = backgroundUnchecked;
      strengthBox3.style.background = backgroundUnchecked;
      strengthBox4.style.background = backgroundUnchecked;
      strengthBox1.style.border = borderChecked;
      strengthBox2.style.border = borderUnchecked;
      strengthBox3.style.border = borderUnchecked;
      strengthBox4.style.border = borderUnchecked;
      strengthText.textContent = "TO WEAK";
    }

    function weak() {
      strengthBox1.style.background = "#BDB76B";
      strengthBox2.style.background = "#BDB76B";
      strengthBox3.style.background = backgroundUnchecked;
      strengthBox4.style.background = backgroundUnchecked;
      strengthBox1.style.border = borderChecked;
      strengthBox2.style.border = borderChecked;
      strengthBox3.style.border = borderUnchecked;
      strengthBox4.style.border = borderUnchecked;
      strengthText.textContent = "WEAK";
    }

    function medium() {
      strengthBox1.style.background = "#BDB76B";
      strengthBox2.style.background = "#BDB76B";
      strengthBox3.style.background = "#BDB76B";
      strengthBox4.style.background = backgroundUnchecked;
      strengthBox1.style.border = borderChecked;
      strengthBox2.style.border = borderChecked;
      strengthBox3.style.border = borderChecked;
      strengthBox4.style.border = borderUnchecked;
      strengthText.textContent = "MEDIUM";
    }

    function strong() {
      strengthBox1.style.background = "#008000";
      strengthBox2.style.background = "#008000";
      strengthBox3.style.background = "#008000";
      strengthBox4.style.background = "#008000";
      strengthBox1.style.border = borderChecked;
      strengthBox2.style.border = borderChecked;
      strengthBox3.style.border = borderChecked;
      strengthBox4.style.border = borderChecked;
      strengthText.textContent = "STRONG";
    }

    if (slider.value < 12 && strengthCheck() <= 2) {
        toWeak();
    } else if (slider.value < 12 && strengthCheck() > 2) {
        weak();
    } else if (slider.value < 15 && strengthCheck() <= 2) {
        weak();
    } else if (slider.value < 15 && strengthCheck() > 2) {
        medium();
    } else if (slider.value >= 15 && strengthCheck() <= 2) {
        medium();
    } else {
        strong();
    }

    strengthCheck();
    
    const upperCaseCharCodes = arrayFromLowToHigh(65, 90);
    const lowerCaseCharCodes = arrayFromLowToHigh(97, 122);
    const numberCaseCharCodes = arrayFromLowToHigh(48, 57);
    const symbolCaseCharCodse = arrayFromLowToHigh(35, 47).concat(
      arrayFromLowToHigh(58, 64)
      ).concat(
        arrayFromLowToHigh(91, 96)
      ).concat(
        arrayFromLowToHigh(123, 126)
      );
    const upperCase = document.getElementById("uppercase").checked;
    const lowerCase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;
       
    const passwordId  = document.getElementById('password');
    const password = generatePassword(slider.value, upperCase, lowerCase, numbers, symbols);
    passwordId.innerText = password

    function generatePassword(slider, upperCase, lowerCase, numbers, symbols){
      if(strengthCheck() === 0){
        return "Check at least one checkbox"
      }else{
        let charCodes = []
        if (upperCase) charCodes = charCodes.concat(upperCaseCharCodes)
        if (numbers) charCodes = charCodes.concat(numberCaseCharCodes)
        if (symbols) charCodes = charCodes.concat(symbolCaseCharCodse)
        if (lowerCase) charCodes = charCodes.concat(lowerCaseCharCodes)      
              
        const passwordCharacters = []
        for(let i = 0; i < slider; i++){
          const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]       
          passwordCharacters.push(String.fromCharCode(characterCode))
        }
        return passwordCharacters.join('')
      }
    }

    function arrayFromLowToHigh(low, high) {
      const array = [];
      for (let i = low; i <= high; i++) {
        array.push(i);
      }
      return array;
    }
})


const copyPassword = document.querySelector('#copy-password')

function fadeOutEffect(){
  var fadeTarget = document.getElementById('copied');
  var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity -= 0.1;
      } else {
          clearInterval(fadeEffect);
      }
  }, 100);
}



copyPassword.addEventListener('click', function() {
    let copiedPassword = document.getElementById('password').innerHTML  

    $('#copied').show();
    $(function() {
      setTimeout(function() { $("#copied").fadeOut(1500); }, 1500)      
    })
    
    navigator.clipboard.writeText(copiedPassword)    

     
})



