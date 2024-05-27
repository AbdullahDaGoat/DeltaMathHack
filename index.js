// ==UserScript==
// @name         DeltaMath Student Application Hack
// @namespace    http://tampermonkey.net/
// @version      2024-05-27
// @description  To improve the life of students
// @author       Abdullah Khan
// @match        https://www.deltamath.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deltamath.com
// @grant        none
// ==/UserScript==


// To do: Make it actually work now lol 

// make UI better

(function() {
    'use strict';

    function injectScript() {
        const cspMetaTag = document.createElement('meta');
        cspMetaTag.httpEquiv = 'Content-Security-Policy';
        cspMetaTag.content = 'default-src \'self\'; script-src \'self\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' https://www.google.com/s2/favicons data:;';
    // Insert the CSP meta tag before any other elements in the document head
    const head = document.querySelector('head');
    head.insertBefore(cspMetaTag, head.firstChild);

        const answerContainer = document.createElement('div');
        answerContainer.id = 'answerContainer';
        answerContainer.style.maxHeight = '150px';
        answerContainer.style.overflowY = 'auto';
        answerContainer.style.padding = '10px';
        answerContainer.style.backgroundColor = 'white';
        answerContainer.style.color = 'black';
        answerContainer.style.borderRadius = '5px';
        answerContainer.style.marginTop = '10px';

        const ui = createDraggableUI(answerContainer);
        document.body.appendChild(ui);

        const answerButton = ui.querySelector('#answer');
        answerButton.addEventListener('click', getAnswer);
    }

    function createDraggableUI(answerContainer) {
        const ui = document.createElement('div');
        ui.id = 'DeltaBot';
        ui.className = 'DeltaBot';
        ui.style.outline = 'none';
        ui.style.minHeight = '250px';
        ui.style.transform = 'translateX(0px) translateY(-32px)';
        ui.style.opacity = '0.95';
        ui.style.fontFamily = 'sans-serif';
        ui.style.width = '200px';
        ui.style.height = '250px';
        ui.style.background = 'linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)';
        ui.style.position = 'relative';
        ui.style.borderRadius = '10px';
        ui.style.display = 'flex';
        ui.style.flexDirection = 'column';
        ui.style.alignItems = 'center';
        ui.style.justifyContent = 'center';
        ui.style.color = 'white';
        ui.style.fontSize = 'larger';
        ui.style.zIndex = '99999';
        ui.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';

        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'Delta Bot';
        title.style.fontSize = '30px';
        title.style.marginBottom = '10px';

        const bottomTitle = document.createElement('h2');
        bottomTitle.className = 'bottomTitle';
        bottomTitle.textContent = '1.0';
        bottomTitle.style.fontSize = '20px';
        bottomTitle.style.marginTop = '0';

        const answerButton = document.createElement('button');
        answerButton.id = 'answer';
        answerButton.className = 'button';
        answerButton.textContent = 'Answer in Console';
        answerButton.style.padding = '10px 20px';
        answerButton.style.backgroundColor = 'transparent';
        answerButton.style.border = '2px solid white';
        answerButton.style.borderRadius = '5px';
        answerButton.style.color = 'white';
        answerButton.style.fontSize = '16px';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';

        answerButton.addEventListener('mouseenter', () => {
            answerButton.style.backgroundColor = 'white';
            answerButton.style.color = '#2980b9';
        });

        answerButton.addEventListener('mouseleave', () => {
            answerButton.style.backgroundColor = 'transparent';
            answerButton.style.color = 'white';
        });

        const clearButton = document.createElement('button');
        clearButton.id = 'clear';
        clearButton.className = 'button';
        clearButton.textContent = 'Clear';
        clearButton.style.padding = '5px 10px';
        clearButton.style.backgroundColor = 'transparent';
        clearButton.style.border = '2px solid white';
        clearButton.style.borderRadius = '5px';
        clearButton.style.color = 'white';
        clearButton.style.fontSize = '14px';
        clearButton.style.cursor = 'pointer';
        clearButton.style.transition = 'all 0.3s ease';
        clearButton.style.marginTop = '10px';

        clearButton.addEventListener('click', () => {
            answerContainer.innerHTML = '';
        });

        ui.appendChild(title);
        ui.appendChild(bottomTitle);
        ui.appendChild(answerButton);
        ui.appendChild(answerContainer);
        ui.appendChild(clearButton);

        makeDraggable(ui);
        return ui;
    }

    let isAnswered = false

  async function getAnswer() {

      if(isAnswered){
          return;
      }
      isAnswered = true
    try {
        const problemID = prompt("Enter Unique Identifier")
        const response = await fetch(`https://www.deltamath.com/api/${problemID}`, {
            headers: {
                ":authority:": "www.deltamath.com",
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImE3ODY2ZjVmLWM4YTktNGVlOC05YWJmLWYyNDEyOWI3YzI1MiJ9.eyJkYXRhIjp7InRlYWNoZXIiOjAsImlkIjoxODAxMDEyOCwibG9jYXRpb25IYXNoIjoiVTJGc2RHVmtYMTkyNi9haEdEVlBrRWJ0TDZNRTBHYzRDdFpaY3I5Y0ZPVUYzcFpqTFd5NGMvR0h0dEtRUXRGTGFpdzMrUm9qU3Q2TDdzMStFUnd3QkI5WlkycnQ0YndnRTFIQlBwNWRmenRPZlNJQ2hzVFBzOFlwUzM0eDV2Z0M2bnV5MXVUbU9RczcvRFRENEpsQUYrT3ZraFBwT0tpQkV4YlhZTHBzclZHNlJEenRURncyL3FZR3o1REFJZHRYcUxBODNGSERWUHZOVGFNRXBRQ3ZFd05vclVNZXFtVHJLTUpWemhGR0Z5WT0ifSwiaWF0IjoxNzE2NzczODI4LCJleHAiOjE3MTY3NzkyMjh9.OXaOfMBUMuXC-MNKRUd7zdyC4t4oHt3JAJfAk9mhkdQ',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'pragma': 'no-cache',
                'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin'
            },
            referrer: 'https://www.deltamath.com/app/student/3333976/23782034/97a6f125f7d0bc020b867a05bb7cd458',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: `{"pid":"${problemID}","futureProblems":[],"version":1681318993,"getTypeToId":true}`,
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await response.json();
        const answerContainer = document.getElementById('answerContainer');
        answerContainer.innerHTML = ''; // Clear the container before appending new answers

        for (let i = 0; i < data.length; i++) {
            if (data[i].data.answers.length === 0) {
                for (let j = 0; j < data[i].data.guidedSentenceAnswers.length; j++) {
                    const answer = document.createElement('p');
                    answer.textContent = data[i].data.guidedSentenceAnswers[j];
                    answerContainer.appendChild(answer);
                }
            } else {
                for (let k = 0; k < data[i].data.answers.length; k++) {
                    const answer = document.createElement('p');
                    answer.textContent = data[i].data.answers[k];
                    answerContainer.appendChild(answer);
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

    function makeDraggable(element) {
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        let active = false;

        element.addEventListener('mousedown', dragStart);
        element.addEventListener('mouseup', dragEnd);
        element.addEventListener('mousemove', drag);

        function dragStart(e) {
            e.preventDefault();

            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === element) {
                active = true;
            }
        }

        function dragEnd(e) {
            e.preventDefault();

            initialX = currentX;
            initialY = currentY;

            active = false;
        }

        function drag(e) {
            e.preventDefault();

            if (active) {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, element);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

    injectScript();
})();
