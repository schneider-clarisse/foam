CLASS({
   "model_": "Model",
   "id": "com.google.mail.FOAMGMailMessage",
   "package": "com.google.mail",
   "name": "FOAMGMailMessage",
   "extendsModel": "com.google.mail.GMailMessage",
   "plural": "messages",
   "requires": [
      "foam.util.Base64Decoder",
      "foam.util.Base64Encoder"
   ],
   "imports": [],
   "exports": [],
   "properties": [
      {
         "model_": "StringProperty",
         "name": "historyId",
         "help": "The ID of the last history record that modified this message."
      },
      {
         "model_": "StringProperty",
         "name": "id",
         "help": "The immutable ID of the message."
      },
      {
         "model_": "StringArrayProperty",
         "name": "labelIds",
         "help": "List of IDs of labels applied to this message."
      },
      {
         "model_": "Property",
         "name": "payload",
         "subType": "MessagePart",
         "help": "The parsed email structure in the message parts."
      },
      {
         "model_": "StringProperty",
         "name": "raw",
         "help": "The entire email message in an RFC 2822 formatted string. Returned in messages.get and drafts.get responses when the format=RAW parameter is supplied."
      },
      {
         "model_": "IntProperty",
         "name": "sizeEstimate",
         "help": "Estimated size in bytes of the message."
      },
      {
         "model_": "StringProperty",
         "name": "snippet",
         "help": "A short part of the message text."
      },
      {
         "model_": "StringProperty",
         "name": "threadId",
         "help": "The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: \u000a- The requested threadId must be specified on the Message or Draft.Message you supply with your request. \u000a- The References and In-Reply-To headers must be set in compliance with the <a href=\"https://tools.ietf.org/html/rfc2822\"RFC 2822 standard. \u000a- The Subject headers must match."
      },
      {
         "model_": "BooleanProperty",
         "name": "deleted"
      },
      {
         "model_": "BooleanProperty",
         "name": "isSent",
         "defaultValue": false
      },
      {
         "model_": "IntProperty",
         "name": "clientVersion"
      },
      {
         "model_": "StringProperty",
         "name": "draftId"
      },
      {
         "model_": "StringProperty",
         "name": "messageId"
      }
   ],
   "actions": [],
   "constants": [
      {
         "model_": "Constant",
         "name": "FOAM_MESSAGEID_HEADER",
         "value": "X-FOAM-Message-ID"
      }
   ],
   "messages": [],
   "methods": [
      {
         "model_": "Method",
         "name": "getHeader",
         "code": function (name) {
      if ( ! this.payload ) return null;
      for ( var i = 0; i < this.payload.headers.length; i++ ) {
        if ( this.payload.headers[i].name === name )
          return this.payload.headers[i].value;
      }
      return null;
    },
         "args": []
      },
      {
         "model_": "Method",
         "name": "setHeader",
         "code": function (name, value) {
      if ( ! this.payload ) return;

      for ( var i = 0; i < this.payload.headers.length; i++ ) {
        if ( this.payload.headers[i].name === name ) {
          this.payload.headers[i].value = value;
          return;
        }
      }
      this.payload.headers.push({
        name: name,
        value: value
      });
    },
         "args": []
      },
      {
         "model_": "Method",
         "name": "toRaw",
         "code": function () {
      var buffer = "";

      var self = this;
      function doPart(p) {
        for ( var i = 0, header; header = p.headers[i]; i++ ) {
          buffer += header.name + ": " + header.value + "\r\n";
          if ( header.name === "Content-Type" && header.value.startsWith("multipart") )
            var boundary = header.value.match(/boundary=([\S]+)/)[1];
        }
        buffer += "\r\n";

        if ( p.body && p.body.size > 0 ) {
          var decoder = self.Base64Decoder.create({ sink: this.X.IncrementalUtf8.create(), bufsize: p.body.size });
          decoder.put(p.body.data);
          decoder.eof();

          buffer += decoder.sink.string;
        }

        if ( p.parts && p.parts.length > 0 ) {
          for ( var i = 0, part; part = p.parts[i]; i++ ) {
            buffer += "--" + boundary + "\r\n";
            doPart(part);
            buffer += "\r\n";
          }
          buffer += "--" + boundary + "--\r\n";
        }
      }

      var obj = this.clone();
      obj.clearProperty('payload');
      if ( ! obj.raw )  {
        doPart(this.payload);
        obj.raw = this.Base64Encoder.create({ urlSafe: true }).encode(new Uint8Array(stringtoutf8(buffer)));
      }
      return obj;
    },
         "args": []
      }
   ],
   "listeners": [],
   "templates": [],
   "models": [],
   "tests": [],
   "relationships": [],
   "issues": []
});
