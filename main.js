document.getElementsByClassName('mobile-close')[0].addEventListener('click', function () {
    document.getElementsByClassName('open-menu-holder')[0].classList.toggle('open');
})


const createMeeting = (meeting) => {
    
    const meetingMessage = document.querySelector('.meeting-message');

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(meeting)
    })
        .then(res => res.json())
        .then(resJSON => {
            console.log(resJSON);
            meetingMessage.classList.add('send');
            meetingMessage.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś/aś zapisany/a!`;

        });
}

document.getElementById('meeting-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const meetingMessage = document.querySelector('.meeting-message');
    let formFields = document.getElementsByClassName('form-field');
    let allFields = false;


    let meeting = {
        name: document.getElementById('meeting-name').value,
        email: document.getElementById('meeting-email').value,
        service: document.getElementById('meeting-service').value,
        phone: document.getElementById('meeting-phone').value,
        date: document.getElementById('meeting-date').value,
        time: document.getElementById('meeting-time').value,
        message: document.getElementById('meeting-message').value

    }

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value === '') {
            allFields = false;
            formFields[i].classList.add('error');
        } else {
            allFields = true;
            formFields[i].classList.remove('error');
        }
    }

    if (allFields) {
        console.log(meeting);

    } else {
        meetingMessage.classList.add('error');
        meetingMessage.innerText = 'wypełnij wymagane pole';
    }

    // console.log('wysłano');
})