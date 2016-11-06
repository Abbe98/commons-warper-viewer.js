(function(mw, $) {
  // stuff should only happen in the File namespace
  if (mw.config.values.wgCanonicalNamespace === 'File') {
    // use the Mediawiki API to check for the use of Template:Map on this page
    $.ajax({
      url: 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=templates&redirects=1&tllimit=100&pageids=' + mw.config.values.wgArticleId,
      success: function(result) {
        var templates = result.query.pages[mw.config.values.wgArticleId].templates;
        for (var key in templates) {
          if (templates[key].title === 'Template:Map') {
            var map = 'https://tools.wmflabs.org/warped-to-iframe/map.php?opacity=true&wmf=true&pageid=' + mw.config.values.wgArticleId;
            $('#mw-content-text')
              .append('<h2>Georeferenced Map</h2>')
              .append('<iframe src="' + map + '" width="640" height="480" style="border:0;"></iframe>');
            break;
          }
        }
      }
    });
  }
})(mediaWiki, jQuery);