var LENGTH = 66;

(function() {
    $.ajaxSetup({
      cache: false
    });

    var quote, loading, loadingTimer, more;
    var currentQuoteId;

    function getRandomQuoteId() {
        var quoteId;

        for (quoteId=Math.floor(Math.random() * LENGTH);
             currentQuoteId!=undefined && quoteId===currentQuoteId && LENGTH>1;
             quoteId=Math.floor(Math.random() * LENGTH));

        return quoteId;
    }

    function getQuoteFromHash() {
        var digits = /\d+/g;
        var match = location.hash.match(digits);
        if (match === null) {
            return null;
        } else {
            return parseInt(match[0], 10);
        }
    }

    function zfill(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function getQuote() {
        var quoteId = getQuoteFromHash();
        if (quoteId === null) {
            nextQuote();
            return;
        }
        more.hide();
        loadingTimer = setTimeout(function() {
            loading.show();
            quote.hide();
        }, 100);

        var url = "/json/" + zfill(quoteId, 5) + ".json";
        $.getJSON(url)
            .done(function(data) {
                currentQuoteId = data.release.id;
                renderQuote(data);
            })
            .fail(function() {
                clearTimeout(loadingTimer);
                nextQuote();
            });
    }

    function nextQuote() {
        var quoteId = getRandomQuoteId();
        location.hash = "#/" + quoteId;
    }

    function renderQuote(data) {
        var author = quote.find('.author');
        var release = quote.find('.release');
        author.text(data.author).prop("class", data.author + ' author');
        release.find('a').prop('href', data.release.link).text("№ " + data.release.id);
        release.find('.date').text(data.release.date);
        release.find('.time').text(data.time);
        quote.find('.text').text(data.text);

        clearTimeout(loadingTimer);
        loading.hide();
        quote.show();
    }

    window.onhashchange = getQuote;
    window.nextQuote = nextQuote;

    $(function() {
        quote = $('#quote, .more');
        loading = $('#loading');
        more = $('.more');

        getQuote();
    });

})();
