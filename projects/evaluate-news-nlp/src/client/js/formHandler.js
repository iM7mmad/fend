import { checkForName } from './nameChecker'

// global variables to target DOM elements

// const html_agreement = document.getElementsByClassName('agreement');
// const html_subjectivity = document.getElementsByClassName('subjectivity');
// const html_confiedence = document.getElementsByClassName('confiedence');
// const html_irony = document.getElementsByClassName('irony');



function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    //check if form is not empty
    if (formText == "") {
        alert('field cannot be empty')
    }
    else if (formText != "") {

        checkForName(formText)

        // defining method credentials and headers and then getting the response
        console.log("::: Form Submitted :::")

        //this type of fetch was provided in the starter code so i used it instead of try and catch
        fetch('http://localhost:8082/checkingURL', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: formText
            })
        })
            .then(res => res.json())
            .then(function (res) {
                const backend_text = res.text
                const backend_agreement = res.agreement
                const backend_subjectivity = res.subjectivity
                const backend_confidence = res.confidence
                const backend_irony = res.irony
                const backend_scoreTag = res.score_tag

                document.getElementById('results').innerHTML = `
                The resault is:${backend_text}
                <div class="container">
                    <div class="agreement"> Agreement is:${backend_agreement} </div>
                    <div class="subjectivity"> Subjectivity is:${backend_subjectivity} </div>
                    <div class="confiedence"> Confiedence is:${backend_confidence} </div>
                    <div class="irony"> irony is:${backend_irony} </div>
                    <div class="score-tag"> Score Tag is:${backend_scoreTag} </div>
                </div>
                `
            })
    }
}

export { handleSubmit }


//             text: backend_Text,
//             score_tag: backend_Score_tag,
//             agreement: backend_Agreement,
//             subjectivity: backend_Subjectivity,
//             confidence: backend_Confidence,
//             irony: backend_irony