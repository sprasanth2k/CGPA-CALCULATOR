renderPage()
document.addEventListener("DOMContentLoaded", (event) => document.querySelector('body').style.display = 'none')

function logout()
{
    localStorage.removeItem('userId')
    window.location.href = '/home'
}

var semesters
function renderPage()
{
    verifyUser()
    .then( response => {
        if(response.statusCode == 1)
        {
            semesters = response.semesters
            if(!semesters.length)
            {
                document.querySelector('.page-center').remove()

                let noSem = document.createElement('div')
                noSem.className = 'no-sem'

                let h3 = document.createElement('h3')
                h3.innerHTML = 'Please add atleast one semester marks to send mail '

                noSem.append(h3)
                document.querySelector('body').append(noSem)
            }
            document.querySelector('body').style.display = 'block'
        }
        else
        {
            window.location.href = '/home'
        }
    })
}

function verifyUser()
{
    if(!localStorage.getItem('userId'))
        window.location.href = '/login'
    
    const user = {userId : localStorage.getItem('userId')}
    return fetch('/account/verifyUser',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(response.ok)
            return response.json()
        else
        {
            let error = new Error('Error: ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    }, err => {
        let error = new Error(err)
        throw error
    })
    .catch(error => console.log(error))
}

function validateForm()
{
    document.querySelector('#emailids').classList.remove('valid-input')
    document.querySelector('#emailids').classList.remove('invalid-input')
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let emails = document.querySelector('#emailids').value.split(',')
    
    let i,f=1
    for(i=0;i<emails.length;i++)
    {
        emails[i] = emails[i].trim()
        if(!emails[i].length||!pattern.test(emails[i]))
        {
            f=0
            break;
        }
    }
    if(f)
        document.querySelector('#emailids').classList.add('valid-input')
    else
        document.querySelector('#emailids').classList.add('invalid-input')
    
    return f
}

function sendMail()
{
    event.preventDefault()
    if(validateForm())
    {
        let receivers = document.querySelector('#emailids').value.split(',')
        for(i=0;i<receivers.length;i++)
        {
            receivers[i] = receivers[i].trim()
        }
        let content = {
            userId: localStorage.getItem('userId'),
            receivers: receivers
        }
        
        fetch('/home/send_marks',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(response => {
            if(response.ok)
                return response.json()
            else
            {
                let error = new Error('Error: ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        }, err => {
            let error = new Error(err)
            throw error
        })
        .then((response) => {
            alert(response.statusText)
            window.location.href = '/home'
        })
        .catch(error => console.log(error))
    }
}