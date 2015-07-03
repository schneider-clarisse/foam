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

CLASS({
  package: 'foam.graphics.webgl',
  name: 'ArrayBuffer',
  imports: ['gl'],

  properties: [
    {
      name: 'vertices',
      postSet: function(old,nu) {
        if ( ! equals(old, nu) ) {
          this.destroy();
        }
      }
    },
    {
      name: 'buffer',
      getter: function() {
        if ( ! this.instance_.buffer ) {
          this.compile();
        }
        return this.instance_.buffer;
      }
    }
  ],

  methods: [
    function compile() {
      this.instance_.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.instance_.buffer);
      // dump this.vertices into gl object this.instance_.buffer, static mode (write once, read many)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    },
    function destroy() {
      if ( this.instance_.buffer ) {
        this.gl.deleteBuffer(this.instance_.buffer);
        delete this.instance_.buffer;
      }
    }
  ]

});