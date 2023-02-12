import { handleSubmit } from './js/formHandler'
import { checkForName } from './js/nameChecker'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


// we should add an event listener to the submit button in the body and link it to the handlesubmit function
const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', event => handleSubmit(event))


console.log(checkForName);

// alert("I EXIST")
// console.log("CHANGE!!");
