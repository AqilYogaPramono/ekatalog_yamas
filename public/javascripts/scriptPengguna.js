document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const clearSearchButton = document.getElementById('clear-search');

    if (searchInput && clearSearchButton) {
        if (searchInput.value.trim() !== "") {
            clearSearchButton.classList.remove('d-none');
        }

        searchInput.addEventListener('input', function () {
            if (searchInput.value.trim() !== "") {
                clearSearchButton.classList.remove('d-none');
            } else {
                clearSearchButton.classList.add('d-none');
            }
        });

        clearSearchButton.addEventListener('click', function () {
            searchInput.value = '';
            clearSearchButton.classList.add('d-none');
            window.location.href = '/';
        });
    }

    const modal = document.getElementById("myModal");
    const img = document.getElementById("book-cover") || document.getElementById("magazine-cover");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const link = document.getElementById("book-cover-link") || document.getElementById("magazine-cover-link");

    if (modal && img && modalImg && captionText && link) {
        link.onclick = function(event){ 
            event.preventDefault(); 
            modal.style.display = "block";
            modalImg.src = img.src; 
            captionText.innerHTML = img.alt; 
        }
        
        const span = document.getElementsByClassName("close")[0];
        if (span) {
            span.onclick = function() { 
                modal.style.display = "none";
            }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});
