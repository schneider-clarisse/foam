/**
 * @license
 * Copyright 2014 Google Inc. All Rights Reserved.
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

CLASS({
  name: 'Gesture',
  package: 'foam.input.touch',
  help: 'Installed in the GestureManager to watch for a particular kind of gesture',

  properties: [
    { name: 'name', required: true }
  ],

  // YES   = "This gesture was definitely recognized."
  // NO    = "This gesture is definietly not recognized."
  // MAYBE = "This gesture might be recognized. If nothing else is recognized,
  //          default to this one."
  // WAIT  = "We are not done attempting to recognize this gesture yet. Do not
  //          default to any MAYBEs until we are."
  constants: {
    YES: 3,
    MAYBE: 2,
    WAIT: 1,
    NO: 0
  },

  methods: {
    recognize: function(map) {
      return this.NO;
    },

    attach: function(handlers) {
      // Called on recognition, with the array of handlers listening to this gesture.
      // Usually there's just one, but it could be multiple.
      // Each gesture defines its own callbacks for these handlers.
    },

    newPoint: function(point) {
      // A new point to stick into the map. Most gestures can ignore this.
      // Only called after recognition of this gesture.
    }

    /*
    // TODO: Am I necessary? FOAM listening to the properties on the points works well.
    update: function(changedTouches) {
      // Only called after this gesture has been recognized.
      // Called each time one of the points has updated. Given the ids of the changed points.
    }
    */
  }
});

