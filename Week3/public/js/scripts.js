const addCards = (items) => {
    $('#card-section').empty();

    items.forEach((item) => {
        let itemToAppend = `
            <div class="col s12 m6 l4">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><a href="${item.link}">About this book</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `;
        $('#card-section').append(itemToAppend);
    });
};

const submitForm = () => {
    let formData = {};
    formData.firstname = $('#firstname').val();
    formData.lastname = $('#lastname').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log('Form Data Submitted', formData);
};

const loadBooks = () => {
    $.get('/api/books', function(result) {
        addCards(result);
    });
};

$(document).ready(function() {
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#loadBooksButton').click(loadBooks);
    $('#formSubmit').click(submitForm);
});