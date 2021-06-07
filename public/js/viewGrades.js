renderPage()
document.addEventListener("DOMContentLoaded", (event) => document.querySelector('body').style.display = 'none')
var semesters
function logout()
{
    localStorage.removeItem('userId')
    window.location.href = '/home'
}

function renderPage()
{
    verifyUser()
    .then( response => {
        if(response.statusCode == 0)
        {
            window.location.href = '/home'
        }
        
        semesters = response.semesters
        if(!semesters.length)
        {
            let body = document.querySelector('body')
            body.style.justifyContent = 'center'
            body.style.alignItems = 'center'
            
            let noSem = document.createElement('div')
            noSem.className = 'no-sem'

            let h3 = document.createElement('h3')
            h3.innerHTML = 'Please add your semester marks to view here'

            noSem.append(h3)
            body.append(noSem)
            
        }
        else
        {
            let body = document.querySelector('body')
            let i,j
            for(i=0;i<semesters.length;i++)
            {
                let container = document.createElement('div')
                container.id = 'sem-'+(i+1)
                container.className = 'container gpa-container pb-3'
            
                let gpaForm = document.createElement('div')
                gpaForm.className = 'gpa-form'

                let semRow = document.createElement('div')
                semRow.className = 'row'

                let semCol = document.createElement('div')
                semCol.className = 'col-9 col-md-10 col-lg-11'
                let h3 = document.createElement('h3')
                h3.className = 'sem-no'
                h3.innerHTML = 'SEMESTER - ' + (i+1)

                semCol.append(h3)
                semRow.append(semCol)

                let updateCol = document.createElement('div')
                updateCol.className = 'col-3 col-md-2 col-lg-1'

                let editSpan = document.createElement('span')
                editSpan.id  = 'edit-'+(i+1)
                editSpan.className = 'fas fa-edit update-icons'
                editSpan.setAttribute('onclick','editSem()')

                let deleteSpan = document.createElement('span')
                deleteSpan.id = 'delete-'+(i+1)
                deleteSpan.className = 'fas fa-trash update-icons'
                deleteSpan.setAttribute('onclick','deleteSem()')

                updateCol.append(editSpan)
                updateCol.append(' ')
                updateCol.append(deleteSpan)
                semRow.append(updateCol)


                let lineRow = document.createElement('div')
                lineRow.className = 'row'

                let lineCol = document.createElement('div')
                lineCol.className = 'col-12'

                let line = document.createElement('div')
                line.className = 'line'

                lineCol.append(line)
                lineRow.append(lineCol)
                
                gpaForm.append(semRow)
                gpaForm.append(lineRow)

                let gpaHeading = document.createElement('div')
                gpaHeading.className = 'row mt-4 gpa-heading'

                let subjectCol = document.createElement('div')
                subjectCol.className = 'col-4 col-md-4 text-center'
                subjectCol.innerHTML = 'SUBJECT'

                let creditCol = document.createElement('div')
                creditCol.className = 'col-4 col-md-4 text-center'
                creditCol.innerHTML = 'CREDIT'
                
                let gradeCol = document.createElement('div')
                gradeCol.className = 'col-4 col-md-4 text-center'
                gradeCol.innerHTML = 'GRADE'

                gpaHeading.append(subjectCol)
                gpaHeading.append(creditCol)
                gpaHeading.append(gradeCol)
                gpaForm.append(gpaHeading)
                
                for(j=0;j<semesters[i].subjects.length;j++)
                {
                    let inputRow = document.createElement('div')
                    inputRow.className = 'row mt-3'

                    let subDiv = document.createElement('div')
                    subDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
                    let subInput = document.createElement('input')
                    subInput.className = 'form-control form-input'
                    subInput.type = "text"
                    subInput.placeholder = 'subject-'+(j+1)
                    subInput.id = 'subject-'+(i+1)+'-'+(j+1)
                    subInput.value = semesters[i].subjects[j]
                    subInput.disabled = true
                    subDiv.append(subInput)

                    let credDiv = document.createElement('div')
                    credDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
                    let credInput = document.createElement('input')
                    credInput.className = 'form-control form-input'
                    credInput.type = "text"
                    credInput.placeholder = 'credit-'+(j+1)
                    credInput.id = 'credit-'+(i+1)+'-'+(j+1)
                    credInput.value = semesters[i].credits[j]
                    credInput.disabled = true
                    credDiv.append(credInput)

                    let gradeDiv = document.createElement('div')
                    gradeDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
                    let gradeInput = document.createElement('input')
                    gradeInput.className = 'form-control form-input'
                    gradeInput.type = "text"
                    gradeInput.placeholder = 'grade-'+(j+1)
                    gradeInput.id = 'grade-'+(i+1)+'-'+(j+1)
                    gradeInput.value = semesters[i].grades[j]
                    gradeInput.disabled = true
                    gradeDiv.append(gradeInput)

                    inputRow.append(subDiv)
                    inputRow.append(credDiv)
                    inputRow.append(gradeDiv)
                    gpaForm.append(inputRow)
                }

                
                container.append(gpaForm)

                let gpaDiv = document.createElement('div')
                gpaDiv.className = 'gpa-div'
                
                let gpaRow = document.createElement('div')
                gpaRow.className = 'row mt-5'

                let gpaCol = document.createElement('div')
                gpaCol.className = 'col-11 d-flex justify-content-end'

                let gpaValue = document.createElement('h4')
                gpaValue.innerHTML = 'Your GPA: '+semesters[i].gpa

                gpaCol.append(gpaValue)
                gpaRow.append(gpaCol)
                gpaDiv.append(gpaRow)
                container.append(gpaDiv)

                if(i == semesters.length-1)
                {
                    let cgpaDiv = document.createElement('div')
                    cgpaDiv.className = 'gpa-div'
                    
                    let cgpaRow = document.createElement('div')
                    cgpaRow.className = 'row mt-1'

                    let cgpaCol = document.createElement('div')
                    cgpaCol.className = 'col-11 d-flex justify-content-end'

                    let cgpaValue = document.createElement('h4')
                    cgpaValue.innerHTML = 'Your CGPA: '+calculateCGPA()

                    cgpaCol.append(cgpaValue)
                    cgpaRow.append(cgpaCol)
                    cgpaDiv.append(cgpaRow)
                    container.append(cgpaDiv)
                }

                let formBtns = document.createElement('div')
                formBtns.id = 'formbtn-'+(i+1)
                formBtns.className = 'gpa-form-btns'
                formBtns.style.display = 'none'

                let btnRow = document.createElement('div')
                btnRow.className = 'row mt-5'

                let addCol = document.createElement('div')
                addCol.className = 'col-6 d-flex justify-content-center'

                let addBtn = document.createElement('div')
                addBtn.id = 'addbtn-'+(i+1)
                addBtn.className = 'add-btn'
                addBtn.setAttribute('onclick','addInput()')
                
                let addbtnSpan =  document.createElement('span')
                addbtnSpan.className = 'd-md-inline-block fas fa-plus-square'

                addBtn.append(addbtnSpan)
                addBtn.append(' Add subject')
                addCol.append(addBtn)
                btnRow.append(addCol)

                let delCol = document.createElement('div')
                delCol.className = 'col-6 d-flex justify-content-center'

                let delBtn = document.createElement('div')
                delBtn.id = 'delbtn-'+(i+1)
                delBtn.className = 'del-btn'
                delBtn.setAttribute('onclick','removeInput()')
                
                let delbtnSpan =  document.createElement('span')
                delbtnSpan.className = 'd-md-inline-block fas fa-trash'

                delBtn.append(delbtnSpan)
                delBtn.append(' Del subject')
                delCol.append(delBtn)
                btnRow.append(delCol)

                formBtns.append(btnRow)

                let submitRow = document.createElement('div')
                submitRow.className = 'row mt-4 mt-md-5'

                let submitCol = document.createElement('div')
                submitCol.className = 'col-12 d-flex justify-content-around'

                let submitDiv = document.createElement('div')
                submitDiv.id = 'submit-'+(i+1)
                submitDiv.className = 'calculate-btn text-center'
                submitDiv.setAttribute('onclick','validateGrades()')
                submitDiv.innerHTML = 'Submit'

                let cancelDiv = document.createElement('div')
                cancelDiv.id = 'cancel-'+(i+1)
                cancelDiv.className = 'calculate-btn text-center'
                cancelDiv.setAttribute('onclick','cancelEdit()')
                cancelDiv.innerHTML = 'Cancel'

                submitCol.append(submitDiv)
                submitCol.append(cancelDiv)
                submitRow.append(submitCol)
                
                formBtns.append(submitRow)
                
                container.append(formBtns)
                body.append(container)
            }
        }
        document.querySelector('body').style.display = 'block'
    })
}

function calculateCGPA()
{
    let i,sum=0,cgpa=0
    
    for(i=0;i<semesters.length;i++)
    {
        cgpa += (semesters[i].gpa * semesters[i].totalCredits)
        sum += semesters[i].totalCredits 
    }
    cgpa /= sum 
    cgpa = cgpa.toFixed(2)
    return cgpa
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

function editSem()
{
    let semNo = parseInt(event.target.id.split('-')[1])
    
    let inputs = document.querySelectorAll('.form-input')
    let formBtns = document.querySelectorAll('.gpa-form-btns')
    for(i=0;i<inputs.length;i++)
    {
        inputs[i].disabled = true
        if(semNo == parseInt(inputs[i].id.split('-')[1]))
        {
            inputs[i].disabled = false
        }
    }
    
    for(i=0;i<formBtns.length;i++)
    {
        formBtns[i].style.display = 'none'
    }
    formBtns[semNo-1].style.display = 'block'
}

function deleteSem()
{
    let semNo = parseInt(event.target.id.split('-')[1])
    let result = confirm("Are you sure to delete \nSEMESTER-"+semNo)
    if(result)
    {
        semesters.splice(semNo-1,1)
        deleteGrades()
    }
}

function deleteGrades()
{
    let content = {
        userId: localStorage.getItem('userId'),
        semesters: semesters
    }
    
    fetch('/home/view_grades',{
        method: 'DELETE',
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
        window.location.reload()
    })
    .catch(error => console.log(error))
}

function cancelEdit()
{
    window.location.reload()
}

function addInput()
{
    let semNo = parseInt(event.target.id.split('-')[1])

    let n = document.querySelectorAll('#sem-'+semNo+' .gpa-form .row').length - 3
    
    let row = document.createElement('div')
    row.className = 'row mt-3'
    
    let subDiv = document.createElement('div')
    subDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let subInput = document.createElement('input')
    subInput.className = 'form-control form-input'
    subInput.type = "text"
    subInput.placeholder = 'subject-'+(n+1)
    subInput.id = 'subject-'+semNo+'-'+(n+1)
    subDiv.append(subInput)
    row.append(subDiv)

    let credDiv = document.createElement('div')
    credDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let credInput = document.createElement('input')
    credInput.className = 'form-control form-input'
    credInput.type = "text"
    credInput.placeholder = 'credit-'+(n+1)
    credInput.id = 'credit-'+semNo+'-'+(n+1)
    credDiv.append(credInput)
    row.append(credDiv)
    
    let gradeDiv = document.createElement('div')
    gradeDiv.className = 'col-4 col-md-4 d-flex justify-content-center'
    let gradeInput = document.createElement('input')
    gradeInput.className = 'form-control form-input'
    gradeInput.type = "text"
    gradeInput.placeholder = 'grade-'+(n+1)
    gradeInput.id = 'grade-'+semNo+'-'+(n+1)
    gradeDiv.append(gradeInput)
    row.append(gradeDiv)
    
    document.querySelector('#sem-'+semNo+' .gpa-form').append(row)
}

function removeInput()
{
    let semNo = parseInt(event.target.id.split('-')[1])
    let row = document.querySelectorAll('#sem-'+semNo+' .gpa-form .row')

    if(row.length <= 4)
        alert('There should be atleast one subject..!')
    else
        row[row.length-1].remove()
}

function validateGrades()
{
    let semNo = parseInt(event.target.id.split('-')[1])
    let f=1,i,n,inputs = document.querySelectorAll('#sem-'+semNo+' .form-input')
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
        
        semesters[semNo-1] = sem
        postGrades()
    }
}

function postGrades()
{
    let content = {
        userId: localStorage.getItem('userId'),
        semesters: semesters
    }
    
    fetch('/home/view_grades',{
        method: 'PUT',
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
        window.location.reload()
    })
    .catch(error => console.log(error))
}