window.addEventListener("load", function() {
  const buttons = document.querySelectorAll("button");
  const bar = document.querySelector("#bar");
  const submitButton = document.querySelector(".submit-button");
  const deleteButton = document.querySelector(".delete-button");
  const submitCounterSpan = document.querySelector('#submit-counter');
  const scoreCounter = document.querySelector('#score');
  const colorButtons = document.querySelectorAll(".color-button-section button");

  let selectedColors = [];
  let submitCounter = 61;
  submitCounterSpan.textContent = submitCounter;
  let count = 0;
  let selectedColorsArray = [];
  let previousSubmissions = [];
  //let previousSubmission = [];
  let colorCount = [];
  let previousSubmission = "";
  let previousSubmission2 = "";
  let previousSubmission3 = "";
  let previousSubmission4 = "";
  let previousSubmission5 = null;
  

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const color = this.style.backgroundColor;
      if (selectedColors.length < 4) {
        selectedColors.push(color);
        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;
        colorBox.style.width = "150px";
        colorBox.style.height = "150px";
        bar.appendChild(colorBox);
        if (selectedColors.length === 4) {
          submitButton.disabled = false;
        }
      }
    });
  });

  deleteButton.addEventListener("click", function () {
    if (selectedColors.length > 0) {
      // Remove all color boxes from the bar
      const colorBoxes = bar.querySelectorAll(".color-box");
      colorBoxes.forEach((colorBox) => {
        bar.removeChild(colorBox);
      });
      // Clear the selected colors array
      selectedColors = [];
      // Disable the submit button
      submitButton.disabled = true;
    }
  });

  submitButton.addEventListener("click", function () {
    if (selectedColors.length === 4) {
      // Submit the selected colors to the server
      console.log("Selected colors:", selectedColors);
  
      const currentSubmission = JSON.stringify(selectedColors);

      if (submitCounter === 20 || submitCounter === 40 || submitCounter === 60){
        disableButtonsFor(4000);
      }
  
      if (submitCounter > 1 && submitCounter < 21) {
        // If the submission is within the first 10 rounds, check the previous submission only
        const skipAddScore = currentSubmission === previousSubmission;
        previousSubmission = currentSubmission;
  
        if (!skipAddScore) {
          count += 0.05;
          scoreCounter.textContent = count.toFixed(2);
          // Add +0.05 to the end of the array
          selectedColors.push("+0.05");
          showMoneyPopup();
        }
        else {
          showNoMoneyPopup();
        }
      }
      else if (submitCounter >= 22 && submitCounter <= 40) {
        // If the submission is in rounds 12-20, check the previous two submissions
        const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2;
  
        if (submitCounter === 21 || submitCounter === 22 || skipAddScore) {
          // Trials 1, 11, and 12 should not get money
          showNoMoneyPopup();
        }
        else {
          count += 0.05;
          scoreCounter.textContent = count.toFixed(2);
          // Add +0.05 to the end of the array
          selectedColors.push("+0.05");
          showMoneyPopup();
        }
  
        previousSubmission2 = previousSubmission;
        previousSubmission = currentSubmission;
      }
      else if (submitCounter >= 43 && submitCounter <= 60) {
        // If the submission is in rounds 23-30, check the previous three submissions
        const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2 || currentSubmission === previousSubmission3;

        console.log("Previous submission:", previousSubmission);
        console.log("Previous submission 2:", previousSubmission2);
        console.log("Previous submission 3:", previousSubmission3);
        console.log("Previous submission 4:", previousSubmission4);
  
        if (submitCounter === 41 || submitCounter === 42 || submitCounter === 43 || skipAddScore) {
          showNoMoneyPopup();
        }
        else {
          count += 0.05;
          scoreCounter.textContent = count.toFixed(2);
  
          selectedColors.push("+0.05");
          showMoneyPopup();
        }
  
        previousSubmission3 = previousSubmission2;
        previousSubmission2 = previousSubmission;
        previousSubmission = currentSubmission;
      }
      else if (submitCounter >= 64 && submitCounter <= 80) {
        // If the submission is in rounds 34-40, check the previous four submissions
        const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2 || 
        currentSubmission === previousSubmission3 || currentSubmission === previousSubmission4;

        console.log("Previous submission:", previousSubmission);
        console.log("Previous submission 2:", previousSubmission2);
        console.log("Previous submission 3:", previousSubmission3);
        console.log("Previous submission 4:", previousSubmission4);

        if (submitCounter === 61 || submitCounter === 62 || submitCounter === 63 || submitCounter === 64 || skipAddScore) {
          showNoMoneyPopup();
        }
        else {
          count += 0.05;
          scoreCounter.textContent = count.toFixed(2);
  
          selectedColors.push("+0.05");
          showMoneyPopup();
        }
        
      
        previousSubmission4 = previousSubmission3;
        previousSubmission3 = previousSubmission2;
        previousSubmission2 = previousSubmission;
        previousSubmission = currentSubmission;
      }
      
      else {
        // Trials 1 and 2 should not get money
        showNoMoneyPopup();
        previousSubmission4 = previousSubmission3;
        previousSubmission3 = previousSubmission2;
        previousSubmission2 = previousSubmission;
        previousSubmission = currentSubmission;
        console.log("Previous submission:", previousSubmission);
        console.log("Previous submission 2:", previousSubmission2);
        console.log("Previous submission 3:", previousSubmission3);
        console.log("Previous submission 4:", previousSubmission4);
      }
        
      // Increment the count for the selected color
      selectedColors.forEach(color => {
        if (colorCount[color]) {
          colorCount[color]++;
        } else {
          colorCount[color] = 1;
        }
      });
  
      // Update the submit counter
      submitCounter++;
      submitCounterSpan.textContent = submitCounter;
  
      // Reset the bar
      bar.innerHTML = "";
      // Disable the submit button
      submitButton.disabled = true;
  
      // Add the selected colors to the array
      selectedColorsArray.push(selectedColors.slice());
  
      let colorCountStr = "\nColor counts:\n";
      Object.keys(colorCount).forEach(color => {
        colorCountStr += `${color}: ${colorCount[color]}\n`;
      });
  
      if (submitCounter === 81) {
        // create a popup with two buttons
        sessionStorage.setItem("count", count.toFixed(2));
        console.log("Count before navigation:", count);
        const popup = document.createElement("div");
        popup.classList.add("popup");
        const popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        popupBox.innerHTML = `
          <h2>Level Complete</h2>
          <p>Congratulations, you have completed level 1!</p>
          <div class="button-container">
            <button class="download-button">Download Results</button>
            <button class="next-level-button">Go to Level 2</button>
          </div>
        `;
        popup.appendChild(popupBox);
        document.body.appendChild(popup);
      
        // add event listener for download button
        const downloadButton = document.querySelector(".download-button");
        downloadButton.addEventListener("click", function() {
          // write the selected colors to a TXT file
          const txtContent = "Pre-Training: \n" +
            selectedColorsArray.map(row => row.join(",")).join("\n") + "\nTotal Score: " + count.toFixed(2) + colorCountStr;
          downloadTXT(txtContent);
        });
      
        // add event listener for next level button
        const nextLevelButton = document.querySelector(".next-level-button");
        nextLevelButton.addEventListener("click", function() {
          // navigate to the next level
          window.location.href = "/gamelvl2";
        });
      }        
    
  
      // Reset the selected colors
      selectedColors = [];
    }
  });

  function showMoneyPopup(){
    // Show pop-up message with the earned money
    const earnedMoney = "$0.05 earned. Close me to Continue!";
    const popup = document.getElementById("myModalMoney");
    const earnedMoneyText = document.getElementById("earned-money");
    earnedMoneyText.textContent = earnedMoney;
    earnedMoneyText.classList.add("earned-money"); // add the earned-money class
    earnedMoneyText.classList.add("green-text");
    popup.style.display = "block";
    // Close the modal when the user clicks on the X
    const closeBtn = popup.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
      popup.style.display = "none";
    };
  }
  
  function showNoMoneyPopup() {
    const noMoney = "Close me to Continue!";
    const popup = document.getElementById("myModalNoMoney");
    const noMoneyText = document.getElementById("no-money");
    noMoneyText.textContent = noMoney;
    noMoneyText.classList.add("no-money"); // add the no-money class
    popup.style.display = "block";
    // Close the modal when the user clicks on the X
    const closeBtn = popup.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
      popup.style.display = "none";
    };
  }
  function downloadTXT(txtData) {
    const blob = new Blob([txtData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Trials.txt";
    link.click();
  }

  function disableButtonsFor(duration) {
    // Get all the buttons on the page
    const buttons = document.querySelectorAll("button");
  
    // Disable all the buttons
    buttons.forEach(button => {
      button.disabled = true;
    });
  
    // Enable the buttons after the specified duration
    setTimeout(() => {
      buttons.forEach(button => {
        button.disabled = false;
      });
    }, duration);
  }
  

  //Button Positions:
  const buttonElements = document.querySelectorAll(".button-row button");
  const buttonContainer = document.querySelector(".button-row");
  const buttonContainerWidth = buttonContainer.clientWidth;
  const buttonContainerHeight = buttonContainer.clientHeight;
  const buttonSize = 50;
  const buttonCount = buttonElements.length;
  const buttonPositions = [
    { top: -20, left: -200 },
    { top: 60, left: -700 },
    { top: 10, left: 290 },
    { top: 60, left: -30 },
    { top: -10, left: 88 },
    { top: 100, left: -377 },
    { top: 70, left: 500 },
  ];

  for (let i = 0; i < buttonCount; i++) {
    const button = buttonElements[i];
    const buttonPosition = buttonPositions[i];

    button.style.top = buttonPosition.top + "px";
    button.style.left = buttonPosition.left + "px";
  }
});


