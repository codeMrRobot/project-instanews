$(document).ready(() => {
  const $stories = $(".stories");
  const $head = $(".header");
  const $footer = $(".footer-text");
  $(".selections").on("change", () => {
    $(".loader").show();
    if (!$head.hasClass("header-small")) {
      $head.addClass("header-small");
    }

    if (!$footer.hasClass("footer-text-small")) {
      $footer.addClass("footer-text-small");
    }

    let userSelection = $(".selections").val();
    let url = 'https://api.nytimes.com/svc/topstories/v2/' + userSelection + '.json'; 
    url +=
      "?" +
      $.param({
        "api-key": "ec60c8300c16429f842a06b796a2a53f"
      });

    $stories.empty();
    $.ajax({
      url: url,
      method: "GET",
    })

      .done((data) => {
        $(".loader").hide();
        let resultsObj = data.results;
        let sliced = resultsObj
          .filter(item => {
            if (item.multimedia.length === 0);
            {
              return item.multimedia.length;
            }
          })
          .slice(0, 12);

        $.each(sliced, (index, value) => {
          let images = value.multimedia.length - 1,
            image = value.multimedia[images].url,
            articleText = value.abstract,
            articleLink = value.url;

          let output = "";
          output += "<li>";
          output += '<a href="' + articleLink + '" >';
          output +=
            '<div class="articlePic" style="background-image:url(' +
            image +
            ')">';
          output += '<p class="text">' + articleText + "</p></div>";
          output += "</a></li>";
          $("a").attr("target", "_blank");
          $("#stories").append(output);
        });
      })
      .fail(() => {
        $(".loader").hide();
        alert("No stories were found! Please selection a different section");
      });
  });
});
