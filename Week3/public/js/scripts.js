const addCards = (items) => {
    items.forEach((item) => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="${item.link}">About this book</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>`;
        $('#card-section').append(itemToAppend);
    });
};

const submitForm = () => {
    let formData = {};
    formData.firstname = $('#first_name').val();
    formData.lastname = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log('Form Data Submitted', formData);
};

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#clickMeButton').click(function() {
        fetch('/api/books')
            .then(res => res.json())
            .then(addCards);
    });
    $('#formSubmit').click(submitForm);
});
