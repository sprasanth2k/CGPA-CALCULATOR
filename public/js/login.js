if(localStorage.getItem('userId'))
    window.location.href = '/home'

changeForm('login')

function changeForm(str)
{
    if(str=='signup')
    {
        document.querySelector('#loginForm').reset()
        document.querySelector('#loginForm').style.display = "none"
        document.querySelector('#login-nav').classList.remove('active')

        document.querySelector('#signupForm').style.display = "block"
        document.querySelector('#signup-nav').classList.add('active')
        
        document.querySelector('#otpForm').reset()
        document.querySelector('#otpForm').style.display = "none"
    }
    else
    {
        document.querySelector('#loginForm').style.display = "block"
        document.querySelector('#login-nav').classList.add('active')
        
        document.querySelector('#signupForm').reset()
        document.querySelector('#signupForm').style.display = "none"
        document.querySelector('#signup-nav').classList.remove('active')

        document.querySelector('#otpForm').reset()
        document.querySelector('#otpForm').style.display = "none"
    }
}

function showPassword()
{
    if(document.getElementById("showpassword").checked)
    {
        document.getElementById('login-password').type = "text"
    }
    else
    {
        document.getElementById('login-password').type = "password"
    }    
}

function submitLoginForm()
{
    event.preventDefault();
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    if(email.length<3)
    {
        alert('Enter valid email')
    }
    else if(password.length<3)
    {
        alert('Invalid password')
    }
    else
    {
        const user = {
            email: email,
            password: password
        }
        fetch('/login',{
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
        .then(response => {
            if(response.statusCode == 1)
            {
                localStorage.setItem('userId',response.userId)
                window.location.href = '/home'
            }
            else
            {
                alert('Invalid username or password')
            }
        })
        .catch(error => console.log(error))
    }
}

function submitSignupForm()
{
    event.preventDefault();
    var pwd=document.getElementById('signup-password').value
    var cpwd=document.getElementById('signup-confirmpassword').value
    var pattern=new RegExp("[a-zA-Z]{1}[a-zA-Z0-9_@#$&]{2,}")
    if(!pattern.test(pwd))
    {
        alert('Password should contain atleat 3 characters start with a-z or A-Z and can contain @,#,$,&,_')
    }
    else if(pwd!=cpwd)
    {
        window.alert('Password and confirm password does not match')
    }
    else
    {
        const email = document.getElementById('signup-email').value
        const password = document.getElementById('signup-password').value
        const user = {
            email: email,
            password: password
        }

        fetch('/signup',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok)
            {
                return response.json()
            }
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
            if(response.statusCode==1)
            {
                document.querySelector('#loginForm').style.display = "none"
                document.querySelector('#signupForm').style.display = "none"
                document.querySelector('#otpForm').style.display = "block"
            }
            else
            {
                alert(response.result)
            }
            
        })
        .catch(error => console.log(error))
    }
}

function submitOTP()
{
    event.preventDefault();
    let otp = document.getElementById('signup-otp').value
    let email = document.getElementById('signup-email').value
    let pattern =  new RegExp("[0-9]{6}")
    
    if(pattern.test(otp))
    {
        let user = {
            email : email,
            otp : otp,
        }
        fetch('/verifyOTP',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok)
            {
                return response.json()
            }
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
        .then(response => {
            alert(response.statusText)
            if(response.statusCode == 1)
            {
                window.location.reload()
            }
        })
    }
    else
    {
        alert('Invalid OTP')
    }
}
