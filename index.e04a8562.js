!function(){var e=document.querySelector(".search-form"),n=new URLSearchParams({key:"18941965-072e6ae370689f800c64fac36",q:null,image_type:"photo",orientation:"horizontal",safesearch:!0});e.addEventListener("submit",(function(t){t.preventDefault();var a=e.querySelector('input[name="searchQuery"]').value;n.set("q",a);var o="https://pixabay.com/api/?".concat(n);fetch(o).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}))}))}();
//# sourceMappingURL=index.e04a8562.js.map
