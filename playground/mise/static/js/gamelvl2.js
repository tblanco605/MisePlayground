window.addEventListener("load", function() {
    const buttons = document.querySelectorAll("button");
    const bar = document.querySelector("#bar");
    const submitButton = document.querySelector(".submit-button");
    const deleteButton = document.querySelector(".delete-button");
    const submitCounterSpan = document.querySelector('#submit-counter');
    const scoreCounter = document.querySelector('#score');
    const colorButtons = document.querySelectorAll(".color-button-section button");
    const image = document.getElementById("image");    
  
    let selectedColors = [];
    let submitCounter = 45;
    let count = parseFloat(sessionStorage.getItem("count"));

    if (isNaN(count)) {
        count = 0.00;
      }
    submitCounterSpan.textContent = submitCounter;
    let selectedColorsArray = [];
    let colorCounts = {};
    let colorCount = {};
    let previousSubmission = "";
    let previousSubmission2 = "";
    let previousSubmission3 = "";
    let previousSubmission4 = "";
    let previousSubmission5 = "";
    let mostUsedButton = null;
    let mostUsedButtonCount = 0;
    let mostUsedColor = null;
    let mostSubmittedColor = null;



    console.log("Count after navigation:", count);
  
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
          // Increment the count for the selected color
          if (colorCount[color]) {
            colorCount[color]++;
          } else {
            colorCount[color] = 1;
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

    let mostRecentButtonCount = 0;
    let mostRecentButtonColor = null;


    buttons.forEach(button => {
        button.addEventListener("click", function() {
          if (submitCounter >= 51 && submitCounter <= 100) {
            const clickedButtonColor = button.style.backgroundColor;
            const lastColor = selectedColors[selectedColors.length - 1];
            if (selectedColors.length === 4 && clickedButtonColor === mostRecentButtonColor && lastColor === mostRecentButtonColor) {
              // Reset the selected colors
              const currentSubmission = JSON.stringify(selectedColors);
              count -= 1.00;
              if (count < 0) {
                count = 0;
              }
              console.log("this is the wrong array: ", selectedColors);
              submitCounter++;
              submitCounterSpan.textContent = submitCounter;
              selectedColorsArray.push(selectedColors.slice());
              
              bar.innerHTML = "";
              scoreCounter.textContent = count.toFixed(2);
              selectedColors.push("-1.00");
              showDeductPopup();
              selectedColors = [];
              console.log("Previous submission:", previousSubmission);
              console.log("Previous submission 2:", previousSubmission2);
              console.log("Previous submission 3:", previousSubmission3);
              console.log("Previous submission 4:", previousSubmission4);
              console.log("Previous submission 5:", previousSubmission5);

              previousSubmission5 = previousSubmission4;
              previousSubmission4 = previousSubmission3;
              previousSubmission3 = previousSubmission2;
              previousSubmission2 = previousSubmission;
              previousSubmission = currentSubmission;

            }
          }
        });
      });

      buttons.forEach(button => {
        button.addEventListener("click", function() {
          if (submitCounter >= 151 && submitCounter <= 200) {
            const clickedButtonColor = button.style.backgroundColor;
            const lastColor = selectedColors[selectedColors.length - 1];
            if (selectedColors.length === 4 && clickedButtonColor === mostRecentButtonColor && lastColor === mostRecentButtonColor) {
                // Reset the selected colors
                const currentSubmission = JSON.stringify(selectedColors);
                count -= 1.00;
                if (count < 0) {
                  count = 0;
                }
                console.log("this is the wrong array: ", selectedColors);
                submitCounter++;
                submitCounterSpan.textContent = submitCounter;
                selectedColorsArray.push(selectedColors.slice());
                
                bar.innerHTML = "";
                scoreCounter.textContent = count.toFixed(2);
                selectedColors.push("-1.00");
                showDeductPopup();
                selectedColors = [];
                console.log("Previous submission:", previousSubmission);
                console.log("Previous submission 2:", previousSubmission2);
                console.log("Previous submission 3:", previousSubmission3);
                console.log("Previous submission 4:", previousSubmission4);
                console.log("Previous submission 5:", previousSubmission5);
  
                previousSubmission5 = previousSubmission4;
                previousSubmission4 = previousSubmission3;
                previousSubmission3 = previousSubmission2;
                previousSubmission2 = previousSubmission;
                previousSubmission = currentSubmission;
  
              }
          }
        });
      });
      
    
  
    submitButton.addEventListener("click", function () {
        if (selectedColors.length === 4) {
          // Submit the selected colors to the server
          console.log("Selected colors:", selectedColors);
    
          const currentSubmission = JSON.stringify(selectedColors);

          if (submitCounter === 50 || submitCounter === 100 || submitCounter === 150){
            disableButtonsFor(4000);
          }
    
          if (submitCounter > 1 && submitCounter < 51) {
            Object.keys(colorCount).forEach(color => {
                if (colorCount[color] > mostRecentButtonCount && color === selectedColors[selectedColors.length-1]) {
                  mostRecentButtonColor = color;
                  mostRecentButtonCount = colorCount[color];

                }
              });
              
              console.log("Most recent button color:", mostRecentButtonColor);
          }

          if (submitCounter >= 101 && submitCounter <= 151) {
            Object.keys(colorCount).forEach(color => {
                if (colorCount[color] > mostRecentButtonCount && color === selectedColors[selectedColors.length-1]) {
                  mostRecentButtonColor = color;
                  mostRecentButtonCount = colorCount[color];
                }
              });
              
              console.log("Most recent button color:", mostRecentButtonColor);
          }
    
          if (submitCounter > 1 && submitCounter < 51) {

            // If the submission is in rounds 1-50, check the previous four submissions
            const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2 || 
            currentSubmission === previousSubmission3 || currentSubmission === previousSubmission4 || currentSubmission === previousSubmission5;
    
            console.log("Previous submission:", previousSubmission);
            console.log("Previous submission 2:", previousSubmission2);
            console.log("Previous submission 3:", previousSubmission3);
            console.log("Previous submission 4:", previousSubmission4);
            console.log("Previous submission 5:", previousSubmission5);
        
            if (submitCounter === 1 || submitCounter === 2 || submitCounter === 3 || submitCounter === 4 || submitCounter === 5 || skipAddScore) {
            showNoMoneyPopup();
            } else {
            count += 0.10;
            scoreCounter.textContent = count.toFixed(2);
        
            selectedColors.push("+0.10");
            showMoneyPopup();
            }
        
            previousSubmission5 = previousSubmission4;
            previousSubmission4 = previousSubmission3;
            previousSubmission3 = previousSubmission2;
            previousSubmission2 = previousSubmission;
            previousSubmission = currentSubmission;
        }
          

        else if (submitCounter >= 51 && submitCounter <= 100) {
            // If the submission is in rounds 51-100, check the previous submission
            const skipAddScore = currentSubmission === previousSubmission;
            
            console.log("Previous submission:", previousSubmission);
            console.log("Previous submission 2:", previousSubmission2);
            console.log("Previous submission 3:", previousSubmission3);
            console.log("Previous submission 4:", previousSubmission4);
            console.log("Previous submission 5:", previousSubmission5);
          
            // Check if the last button added to the selected colors array is the same as the most used button
            if (submitCounter === 51 || submitCounter === 52 || submitCounter === 53 || submitCounter === 54 || submitCounter === 55 || skipAddScore) {
              showNoMoneyPopup();
            } else {
              count += 0.10;
              scoreCounter.textContent = count.toFixed(2);
              selectedColors.push("+0.10");
              showMoneyPopup();
            }
          
            previousSubmission5 = previousSubmission4;
            previousSubmission4 = previousSubmission3;
            previousSubmission3 = previousSubmission2;
            previousSubmission2 = previousSubmission;
            previousSubmission = currentSubmission;
          }
          
          

        else if (submitCounter >= 101 && submitCounter <= 150) {
            
           // If the submission is in rounds 1-50, check the previous four submissions
           const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2 || 
            currentSubmission === previousSubmission3 || currentSubmission === previousSubmission4 || currentSubmission === previousSubmission5;
   
           console.log("Previous submission:", previousSubmission);
           console.log("Previous submission 2:", previousSubmission2);
           console.log("Previous submission 3:", previousSubmission3);
           console.log("Previous submission 4:", previousSubmission4);
           console.log("Previous submission 5:", previousSubmission5);
       
           if (submitCounter === 101 || submitCounter === 102 || submitCounter === 103 || submitCounter === 104 || submitCounter === 105 || skipAddScore) {
           showNoMoneyPopup();
           } else {
           count += 0.10;
           scoreCounter.textContent = count.toFixed(2);
       
           selectedColors.push("+0.10");
           showMoneyPopup();
           }
       
           previousSubmission5 = previousSubmission4;
           previousSubmission4 = previousSubmission3;
           previousSubmission3 = previousSubmission2;
           previousSubmission2 = previousSubmission;
           previousSubmission = currentSubmission;
       }

        else if (submitCounter >= 151 && submitCounter <= 200) {
          // If the submission is in rounds 51-100, check the previous submission
          const skipAddScore = currentSubmission === previousSubmission || currentSubmission === previousSubmission2 || 
            currentSubmission === previousSubmission3 || currentSubmission === previousSubmission4 || currentSubmission === previousSubmission5;
            
          console.log("Previous submission:", previousSubmission);
          console.log("Previous submission 2:", previousSubmission2);
          console.log("Previous submission 3:", previousSubmission3);
          console.log("Previous submission 4:", previousSubmission4);
          console.log("Previous submission 5:", previousSubmission5);
        
          // Check if the last button added to the selected colors array is the same as the most used button
          if (submitCounter === 151 || submitCounter === 152 || submitCounter === 153 || submitCounter === 154 || submitCounter === 155 || skipAddScore) {
            showNoMoneyPopup();
          } else {
            count += 0.10;
            scoreCounter.textContent = count.toFixed(2);
            selectedColors.push("+0.10");
            showMoneyPopup();
          }
        
          previousSubmission5 = previousSubmission4;
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

        if ((submitCounter >= 1 && submitCounter < 51) || (submitCounter >= 101 && submitCounter <= 150)) {
            image.src = "https://cdn.discordapp.com/attachments/1005329043203293244/1077428444058628106/Condition_A_Arbitrary_Stimuli.jpg";
          } else {
            image.src = "https://cdn.discordapp.com/attachments/1005329043203293244/1077428443819561001/Condition_B_Arbitrary_Stimuli.jpg";
          }
    
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
    
        if (submitCounter === 201) {
          // create a popup with two buttons
          const popup = document.createElement("div");
          popup.classList.add("popup");
          const popupBox = document.createElement("div");
          popupBox.classList.add("popup-box");
          popupBox.innerHTML = `
            <h2>Level Complete</h2>
            <p>Congratulations, you have completed level 1!</p>
            <div class="button-container">
              <button class="download-button">Download Results</button>
              <button class="next-level-button">Home</button>
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
            window.location.href = "/index";
          });
        }        
      
    
        // Reset the selected colors
        selectedColors = [];
      }
    });
  
    function showMoneyPopup(){
      // Show pop-up message with the earned money
      
      const earnedMoney = "$0.10 earned. Close me to Continue!";
      const popup = document.getElementById("myModal");
      const earnedMoneyText = document.getElementById("earned-money");
      earnedMoneyText.textContent = earnedMoney;
      earnedMoneyText.classList.add("earned-money"); // add the earned-money class
      earnedMoneyText.classList.add("green-text");
      popup.style.display = "block";
      // Close the modal when the user clicks on the X
      const closeBtn = document.getElementsByClassName("close")[0];
      closeBtn.onclick = function () {
        popup.style.display = "none";
      };
    }
    
    function showNoMoneyPopup() {
      const noMoney = "Close me to Continue!";
      const popup = document.getElementById("myModal");
      const earnedMoneyText = document.getElementById("earned-money");
      earnedMoneyText.textContent = noMoney;
      earnedMoneyText.classList.add("normal-text");
      popup.style.display = "block";
      // Close the modal when the user clicks on the X
      const closeBtn = document.getElementsByClassName("close")[0];
      closeBtn.onclick = function () {
        popup.style.display = "none";
      };
    }

    function showDeductPopup() {
        const noMoney = "You lost $1.00! Close me to Continue!";
        const popup = document.getElementById("myModal");
        const earnedMoneyText = document.getElementById("earned-money");
        earnedMoneyText.textContent = noMoney;
        earnedMoneyText.classList.add("red-text"); // add the red-text class
        popup.style.display = "block";
        // Close the modal when the user clicks on the X
        const closeBtn = document.getElementsByClassName("close")[0];
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
  