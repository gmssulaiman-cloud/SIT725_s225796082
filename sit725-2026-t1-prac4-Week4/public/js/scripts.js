$(document).ready(function() {
  console.log('✅ Page loaded, initializing...');
  
  // Init ALL Materialize components FIRST
  $('.modal').modal();
  $('.materialboxed').materialbox();
  
  // Load books button
  $('#loadBooksButton').click(function() {
    console.log('🔄 Reloading books...');
    fetchBooks();
  });
  
  // Form submit button
  $('#formSubmit').click(function(e) {
    e.preventDefault();
    submitForm();
  });
  
  // Auto-load books on page load
  fetchBooks();
});

// Fetch books from MongoDB API
const fetchBooks = () => {
  $.get('/api/books')
    .done((response) => {
      console.log('📚 Books received:', response);
      if (response.statusCode === 200) {
        displayBooks(response.data);
      } else {
        console.error('❌ API error:', response.message);
      }
    })
    .fail((xhr, status, error) => {
      console.error('❌ Fetch failed:', error, xhr.responseText);
    });
};

// Display books with your images
const displayBooks = (books) => {
  console.log('🎨 Rendering', books.length, 'books');
  const container = $('#books-container');
  container.empty();
  
  if (books.length === 0) {
    container.html('<div class="col s12 center-align"><h5>No books in database</h5></div>');
    return;
  }
  
  books.forEach(book => {
    container.append(`
      <div class="col s12 m6 l4">
        <div class="card hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator responsive-img" src="${book.coverImage}" 
                 alt="${book.title}" style="height: 280px; object-fit: cover;">
          </div>
          <div class="card-content">
            <!-- FIXED: Removed truncate + better title styling -->
            <span class="card-title activator blue-text text-darken-2" style="font-size: 1.2rem; line-height: 1.4; height: auto; max-height: 3em; overflow: hidden;">
              ${book.title}
              <i class="material-icons right" style="font-size: 1.5rem;">more_vert</i>
            </span>
            <p style="margin: 0.5rem 0; font-size: 0.95rem;">
              <strong style="color: #424242;">${book.author}</strong>
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #666;">
              <i class="material-icons tiny">category</i> ${book.genre}
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #f57c00;">
              <i class="material-icons tiny">star</i> ${book.rating}/5
            </p>
            <p style="margin: 0.5rem 0; font-size: 0.85rem; color: #555; line-height: 1.3;">
              ${book.summary}
            </p>
        </div>
      </div>
    `);
  });
  
  // Re-init
  setTimeout(() => {
    $('.materialboxed').materialbox();
    console.log('✅ Cards rendered + Materialize ready');
  }, 200);
};