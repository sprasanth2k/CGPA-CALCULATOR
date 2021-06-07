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

function addGrades()
{
    if(!localStorage.getItem('userId'))
        window.location.href = '/login'
    else
    {
        window.location.href = '/home/add_grades'
    }
}

function viewGrades()
{
    if(!localStorage.getItem('userId'))
        window.location.href = '/login'
    else
        window.location.href = '/home/view_grades'
}

function sendMail()
{
    if(!localStorage.getItem('userId'))
        window.location.href = '/login'
    else
        window.location.href = '/home/send_marks'
}