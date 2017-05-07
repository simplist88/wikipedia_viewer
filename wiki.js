$('document').ready(function(){
  function parseSearchResult (data) {
    console.log(data);
    if(data[0] == undefined) {
      $('#search-status').html('');
      $('#result-list').html('');
      return;
    } else {
      $('#search-status').html(`search result of "${data[0]}"`);
      var list = "";
      for (var i = 0; i < data[1].length; i++) {
        var title = `<h3>${data[1][i]}</h3>`;
        var desc = `<p>${data[2][i]}</p>`;
        list += `<li><a href="${data[3][i]}" target="_blank">${title}${desc}</a></li>`;
      };
      return $('#result-list').html(list);
    }
  };
  function searchWiki (term) {
    console.log(term);
    $.ajax({
      url: `https://en.wikipedia.org/w/api.php`,
      data: {
        action: 'opensearch',
        search: `${term}`,
        format: 'json',
        origin: '*'
      },
      success: parseSearchResult,
      error: function(){
        console.log('your search attempted has failed');
      },
      cache: false
    });
  };
  $('.search-bar').on('input', function(e){
    searchWiki(e.currentTarget.value);
  });
});
