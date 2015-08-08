/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

MODEL({
  package: 'foam.demos.sevenguis',
  name: 'FlightBooker',
  extendsModel: 'foam.ui.View',
  requires: [ 'foam.ui.DateFieldView' ],
  properties: [
    {
      name: 'oneWay',
      defaultValue: true,
      view: {
        factory_: 'foam.ui.ChoiceView',
        choices: [
          [ true,  'one-way flight' ],
          [ false, 'return flight' ]
        ]
      }
    },
    {
      model_: 'DateProperty',
      name: 'departDate',
      factory: function() { return new Date(Date.now()+3600000*24); }
    },
    {
      model_: 'DateProperty',
      name: 'returnDate',
      factory: function() { return new Date(Date.now()+2*3600000*24); }
    }
  ],
  methods: [
    function initHTML() {
      this.SUPER();
      this.oneWay$.addListener(this.onOneWayChange);
      this.onOneWayChange();
    }
  ],
  templates: [
    function CSS() {/*
      body { padding: 10px !important; }
      .error { border: 2px solid red; }
      .title, .flight button, .flight input, .flight select {
        width: 160px; height: 24px; margin: 5px;
      }
      .title { font-size: 16px; }
    */},
    function toHTML() {/*
      <div class="flight">
        <div class="title">Book Flight</div>
        $$oneWay <br>
        $$departDate <br>
        $$returnDate <br>
        $$book <br>
      </div>
    */}
  ],
  listeners: [
    {
      name: 'onOneWayChange',
      code: function() {
        if ( this.oneWay )
          this.returnDateView.$.setAttribute('disabled', '');
        else
          this.returnDateView.$.removeAttribute('disabled');
      }
    }
  ],
  actions: [
    {
      name: 'book',
      isEnabled: function() {
        var oneWay     = this.oneWay,
            departDate = this.departDate,
            returnDate = this.returnDate;

        return departDate && ( oneWay || returnDate ) ;
      },
      action: function() {
        var depart = this.departDate.toLocaleDateString();

        window.alert('You have booked a ' + (this.oneWay ?
          'one-way flight on ' + depart :
          'flight departing on ' + depart + ' and returning ' + this.returnDate.toLocaleDateString() ) + '.');
      }
    }
  ]
});
