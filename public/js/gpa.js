renderButtons()

function renderButtons()
{
    if(localStorage.getItem('userId'))
    {
        document.querySelector('.login-btn').style.display = 'none';
        document.querySelector('.logout-btn').style.display = 'block';
    }
    else
    {
        document.querySelector('.login-btn').style.display = 'block';
        document.querySelector('.logout-btn').style.display = 'none';
    }
}

function logout()
{
    localStorage.removeItem('userId')
    window.location.href = '/home'
}

function addInput()
{
    let n = document.querySelectorAll('.gpa-container .gpa-form .row').length
    
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
    
    if(row.length <= 2)
        alert('There should be atleast one subject..!')
    else
        row[row.length-1].remove()
}

function calculateGpa()
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
        let totalCredits = 0, credits = [], grades = []
        
        for(i=1;i<n;i+=3)
        {
            credits.push(parseInt(inputs[i].value))
            totalCredits += credits[credits.length-1]
            if(inputs[i+1].value == 'O')
                grades.push(10)
            else if(inputs[i+1].value == 'A+')
                grades.push(9)
            else if(inputs[i+1].value == 'A')
                grades.push(8)
            else if(inputs[i+1].value == 'B+')
                grades.push(7)
            else if(inputs[i+1].value == 'B')
                grades.push(6)
        }
        let gpa = 0
        for(i=0;i<credits.length;i++)
        {
            gpa +=(credits[i]*grades[i])
        }
        gpa /= totalCredits 
        gpa = gpa.toFixed(2)
        alert('Your GPA = ' + gpa)
    }
}