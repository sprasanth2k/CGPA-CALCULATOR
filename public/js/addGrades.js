
renderPage()
document.addEventListener("DOMContentLoaded", (event) => document.querySelector('body').style.display = 'none')

function logout()
{
    localStorage.removeItem('userId')
    window.location.href = '/home'
}

function renderPage()
{
    verifyUser()
    .then( response => {
        if(response.statusCode == 1)
        {
            document.querySelector('.sem-no').innerHTML += (response.semesters.length+1)
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

function validateGrades()
{
    let f=1,i,n,inputs = document.querySelectorAll('.form-input')
    n = inputs.length
    for(i=0;i<n;i+=3)
    {
        inputs[i].classList.add('invalid-input')
        inputs[i+1].classList.add('invalid-input')
        inputs[i+2].classList.add('invalid-input')
        
        if(inputs[i].value.length)
            inputs[i].classList.remove('invalid-input')
        else
            f=0
        if(inputs[i+1].value.length>=1&&inputs[i+1].value.length<=2&&!isNaN(inputs[i+1].value))
            inputs[i+1].classList.remove('invalid-input')
        else
            f=0
        if(inputs[i+2].value=='O' || inputs[i+2].value=='A' || inputs[i+2].value=='A+' || inputs[i+2].value=='B' || inputs[i+2].value=='B+')
            inputs[i+2].classList.remove('invalid-input')
        else
            f=0
    }
    if(!f)
    {
        alert('~~~~~~~~ Invalid input(s) ~~~~~~~~ \nSubject must contain atleast one character \nCredit must be 1 or 2 digit number \nGrade must be O,A,B,A+,B+')
    }
    else
    {
        let totalCredits = 0, credits = [], grades = [] , subjects = []
        
        for(i=0;i<n;i+=3)
        {
            subjects.push(inputs[i].value)
            credits.push(parseInt(inputs[i+1].value))
            grades.push(inputs[i+2].value)
            totalCredits += credits[credits.length-1]
        }
        let gpa = 0
        let x
        for(i=0;i<grades.length;i++)
        {
            if(grades[i] == 'O')
                x=10
            else if(grades[i] == 'A+')
                x=9
            else if(grades[i] == 'A')
                x=8
            else if(grades[i] == 'B+')
                x=7
            else if(grades[i] == 'B')
                x=6
            gpa +=(credits[i]*x)
        }
        gpa /= totalCredits 
        gpa = gpa.toFixed(2)

        let sem = {
            subjects : subjects,
            credits : credits,
            grades : grades,
            totalCredits : totalCredits,
            gpa : gpa
        }
        postGrades(sem)
    }
}

function postGrades(sem)
{
    let content = {
        userId: localStorage.getItem('userId'),
        sem: sem
    }
    
    fetch('/home/add_grades',{
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

function addInput()
{
    let n = document.querySelectorAll('.gpa-container .gpa-form .row').length-1
    
    let row = document.createElement('div')
    row.className = 'row mt-3'
    
    let subDiv = document.createElement('div')
    subDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let subInput = document.createElement('input')
    subInput.className = 'form-control form-input'
    subInput.type = "text"
    subInput.placeholder = 'subject-'+n
    subInput.id = 'subject-'+n
    subDiv.append(subInput)
    row.append(subDiv)

    let credDiv = document.createElement('div')
    credDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let credInput = document.createElement('input')
    credInput.className = 'form-control form-input'
    credInput.type = "text"
    credInput.placeholder = 'credit-'+n
    credInput.id = 'credit-'+n
    credDiv.append(credInput)
    row.append(credDiv)
    
    let gradeDiv = document.createElement('div')
    gradeDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let gradeInput = document.createElement('input')
    gradeInput.className = 'form-control form-input'
    gradeInput.type = "text"
    gradeInput.placeholder = 'grade-'+n
    gradeInput.id = 'grade-'+n
    gradeDiv.append(gradeInput)
    row.append(gradeDiv)
    
    document.querySelector('.gpa-form').append(row)
}

function removeInput()
{
    let row = document.querySelectorAll('.gpa-container .gpa-form .row')
    
    if(row.length-1 <= 2)
        alert('There should be atleast one subject..!')
    else
        row[row.length-1].remove()
}