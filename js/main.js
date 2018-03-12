$(document).ready(function(){
  const $stories =$('.stories')
  const $head = $('header')
  const $footer = $('footer-text')
  $('selections').selectric();
  $('selections').on('change', () => {

  
    $('loader').show();
    if (!$head.hasClass('header-small')){
      $.header.addClass('header-small');
    }

    if (!footer.hasClass('footer-text-small')){
      $footer.addClass('footer-text-small');
    }

    let userSelection = $('selections').val();
    let url ='https://api.nytimes.com/svc/topstories/v2/${user-Selection}.json';
    url += '?' + $.param({
      'api-key': 'ec60c8300c16429f842a06b796a2a53f'

    }); //End of param method

    $stories.empty();
    $.ajax({
      url: url,
      method: 'GET',
    }) //End of ajax method

    .done((data) => {

      $('loader').hide();
      let resultsObj = data.results;
      let sliced = resultsObj.filler((item) => {
        if (item.multimedia.length ===0);{
          return item.multimedia.length;
        }
    }).slice(0, 12);

  
  });
});
});
 


