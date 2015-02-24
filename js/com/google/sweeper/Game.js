// TODO: Use this font for timer: http://www.dafont.com/digital-7.font
CLASS({
  package: 'com.google.sweeper',
  name: 'Game',

  extendsModel: 'View',

  requires: [ 'com.google.sweeper.Board' ],

  properties: [
    {
      model: 'IntProperty',
      name: 'time'
    },
    {
      name: 'board',
      lazyFactory: function() { return this.Board.create(); }
    }
  ],

  methods: {
    init: function() {
      this.SUPER();
      this.tick();
    }
  },

  listeners: [
    {
      name: 'tick',
      isMerged: 1000,
      code: function() {
        this.time++;
        this.tick();
      }
    }
  ],

  templates: [
    function CSS() {/*
      body {
        -webkit-user-select: none;
      }

    */},
    function toHTML() {/*
      $$time{mode: 'read-only'}
      <br>
      %%board
    */}
  ]

});
