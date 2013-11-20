function launchController() {
  chrome.app.window.create('empty.html', {width: 1000, height: 800}, function(w) {
    w.contentWindow.onload = function() {
      var window = self.window = w.contentWindow;
      apar(
        arequire('GridView'),
        arequire('CIssueTileView'),
        arequire('CIssueBrowser')
      )(function (_, _, CIssueBrowser) {
        var b = CIssueBrowser.create({window: window});
        window.browser = b; // for debugging
        $addWindow(window);
        window.document.body.innerHTML = b.toHTML();
        b.initHTML();
        w.focus();
      });
/*
      self.window = w.contentWindow;
      $addWindow(w.contentWindow);
      self.window.document.body.innerHTML = view.toHTML();
      view.initHTML();
      w.focus();
      opt_cb && opt_cb(self.window);
*/
    };
    w.onClosed.addListener(function() {
      $removeWindow(self.window);
    });
 });
}

if ( chrome.app.runtime ) {
  chrome.app.runtime.onLaunched.addListener(function() {
    console.log('launched');
    launchController();
  });

}
