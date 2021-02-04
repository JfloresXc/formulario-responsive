const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')
const useInput = {
    user: false,
    name: false,
    password: false,
    password2: false,
    email: false,
    cellphone: false
}

const expresiones = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cellphone: /^\d{7,9}$/ // 7 a 14 numeros.
}

const validateInput = (expresion, value, name) => {
    if (expresion.test(value)) {
        document.querySelector(`.form__group-${name}`).classList.remove('form__group-wrong')
        document.querySelector(`.form__group-${name}`).classList.add('form__group-success')
        document.querySelector(`.form__group-${name} .form__icon`).innerHTML = 'task_alt'
        useInput[`${name}`] = true
    } else {
        document.querySelector(`.form__group-${name}`).classList.add('form__group-wrong')
        document.querySelector(`.form__group-${name}`).classList.remove('form__group-success')
        document.querySelector(`.form__group-${name} .form__icon`).innerHTML = 'highlight_off'
        useInput[`${name}`] = false
    }
}

const validateInputPassword = () => {
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value

    if (password === password2) {
        document.querySelector(`.form__group-password2`).classList.remove('form__group-wrong')
        document.querySelector(`.form__group-password2`).classList.add('form__group-success')
        document.querySelector(`.form__group-password2 .form__icon`).innerHTML = 'task_alt'
        useInput[`password2`] = true
    } else {
        document.querySelector(`.form__group-password2`).classList.add('form__group-wrong')
        document.querySelector(`.form__group-password2`).classList.remove('form__group-success')
        document.querySelector(`.form__group-password2 .form__icon`).innerHTML = 'highlight_off'
        useInput[`password2`] = false
    }
}

const checkInput = (e) => {
    const { name, value } = e.target

    switch (name) {
        case 'user': validateInput(expresiones[`${name}`], value, name); break;

        case 'name': validateInput(expresiones[`${name}`], value, name); break;

        case 'password': validateInput(expresiones[`${name}`], value, name);
            validateInputPassword(); break;

        case 'password2': validateInputPassword(); break;

        case 'email': validateInput(expresiones[`${name}`], value, name); break;

        case 'cellphone': validateInput(expresiones[`${name}`], value, name); break;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const { user, name, password, password2, email, cellphone } = useInput
    const terms = document.getElementById('terms').checked
    if (user && name && password && password2 && email && cellphone && terms) {
        form.reset()
        document.querySelector('.form').classList.remove('form__wrong-submit')
        document.querySelector('.form__message-submit').classList.add('form__message-success-submit')

        setTimeout(() => {
            document.querySelector('.form__message-submit').classList.remove('form__message-success-submit')
        }, 3000);

        document.querySelectorAll('.form__icon').forEach((icon) => {
            icon.innerHTML = ''
        })

    } else {
        console.log('Wrong')
        document.querySelector('.form').classList.add('form__wrong-submit')
    }
})

inputs.forEach((input) => {
    input.addEventListener('keyup', checkInput)
    input.addEventListener('blur', checkInput)
})