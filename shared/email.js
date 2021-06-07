const nodemailer = require('nodemailer')
const sender = require('./credentials')

function sendEmail(receiver, subject, msg){
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: sender.email,
		  pass: sender.password
		}
	})
	const mailOptions = {
		from: sender.email,
		to: receiver,
		subject: subject,
		html: msg
	}
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) 
		  console.log('Error: ' + error)
		else
		  console.log('Email Sent: ' + info.response)
	})
}

function getOTPMsg(receiver, otp){
	msg = `<div>
			   <h3>Hi ${receiver}!</h3>
			   <p>Thank you for registering in CGPA CALCULATOR.</p>
			   <p>Your OTP:</p>
			   <h2>${otp}</h2>
			   <p><i>Thanks & Regards,</i></p>
			   <h3><i><b>CGPA CALCULATOR Team</b></i></h3>
		   </div>`
	return msg
}

function getMarksMsg(semesters)
{
	style="border: 1px solid black;border-collapse: collapse;"
	let  message,i,j,cgpa=0,sum=0
	message=``
	for(i=0;i<semesters.length;i++)
	{
		cgpa += (parseFloat(semesters[i].gpa) * parseFloat(semesters[i].totalCredits))
		sum += parseFloat(semesters[i].totalCredits)
		message += `
					<h3 style="margin-top:20px">SEMESTER-${i+1}</h3>
					<table style="width:60%;border: 1px solid black;border-collapse: collapse;">
						<tr>
							<th style="border: 1px solid black;border-collapse: collapse;">SUBJECT</th>
							<th style="border: 1px solid black;border-collapse: collapse;">CREDIT</th> 
							<th style="border: 1px solid black;border-collapse: collapse;">GRADE</th>
						</tr>
					`
		for(j=0;j<semesters[i].subjects.length;j++)
		{
			message += `
						<tr>
							<td style="border: 1px solid black;border-collapse: collapse;text-align:center"> ${semesters[i].subjects[j]}</td>
							<td style="border: 1px solid black;border-collapse: collapse;text-align:center"> ${semesters[i].credits[j]}</td>
							<td style="border: 1px solid black;border-collapse: collapse;text-align:center"> ${semesters[i].grades[j]}</td>
						</tr>
					`
		}
		message += `
					<tr>
						<td></td>
						<td></td>
						<td style="border: 1px solid black;border-collapse: collapse;text-align:center;">GPA: ${semesters[i].gpa}</td>
					</tr>
					</table>
				`

	}
	cgpa /= sum
	cgpa = cgpa.toFixed(2)

	message += `
				<h2 style="margin-top:10px;">Your overall CGPA: ${cgpa}</h2>
			`
	

	return message
}

module.exports = { sendEmail, getOTPMsg,getMarksMsg }