function splitStrings(str) {
  var payload = {
    paragraph: str
  }
  var reqDetails = {
    method: 'POST',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify(payload)
  }
  return $.ajax('/api/sentence_boundary_detection', reqDetails);
}

function combineStrings(strs) {
  return strs.reduce(function(cur, next) {
    next = next.trim()
    return cur + " " + next
  }, "").trim()
}

function makeTextAreaHtml(str) {
  return `
  <div class="row">
  <div class="col-md-10" >
      <textarea placeholder="Sentence" class="form-control a-sentence" rows="2">${str}</textarea>
  </div>
  <div class="col-md-2">
    <div class=" btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default read-button">Read</button>
    </div>
  </div>
  </div>
  <br>
  `
}

function read(str, voiceName) {
  var payload = {
    text: str,
    voice: voiceName
  }
  var reqDetails = {
    method: 'POST',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify(payload)
  }
  $.ajax('/api/read', reqDetails).then(function(d) {
    $("#audio").html(`
      <audio controls autoplay="true">
        <source src="/api/audio/${d.audio_name}" type="audio/wav">
        <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
      </audio>
      `)
  });
}

var Voice = Backbone.Model.extend({
  updateVoiceName: function(voiceName) {
    this.set({name: voiceName});
  }
});

window.voice = new Voice;
window.voice.updateVoiceName('allison')

function getVoiceName() {
  return window.voice.get("name").toLowerCase()
}

window.voice.on('change', function(d) {
  var h = `${window.voice.get("name")} <span class="caret"></span>`
  $("#voice_name").html(h)
})

function getAllSentences() {
  return $(".a-sentence").map(function(e, textArea) {
    return textArea.value
  }).toArray().filter(function(s) {
    return s !== ""
  })
}

function onCombineButton() {
  // iterate through each text area and collect each string
  // join all the strings together
  // render one text area with this string
  // replace the current html with this one
  renderAllsentences(makeTextAreaHtml(combineStrings(getAllSentences())))
}

function onSplitButton() {
  // iterate through each text area and collect each string
  var sentences = getAllSentences()
  // join all teh strings together
  var paragraph = combineStrings(sentences)
  // split the strings sentence by sentence
  var promise = splitStrings(paragraph)
  // then for each string render html for text area with the string as the value
  // join all the rendered html together
  // replace the current gui with this newly rendered html
  promise.then(function success(res) {
    var h = res.arr.map(makeTextAreaHtml).join("")
    renderAllsentences(h)
  })
}

function renderAllsentences(h) {
  $('.all-sentences').html(h)
  $('button.read-button').on('click', onReadTextArea)
}

function updateVoiceSelection(voiceName, voiceKey) {

}

function onReadTextArea(e) {
  var rowElm = e.currentTarget.parentNode.parentNode.parentNode
  var txtarea = $(rowElm).find('.a-sentence')
  // console.log(txtarea)
  var txt = txtarea.map(function(e, ta) {
    return ta.value
  }).toArray().join("")
  // console.log(txt)
  read(txt, getVoiceName())
}

function onReadButton() {
  var text = getAllSentences().join(" ")
  read(text, getVoiceName())
}

function onSelectVoice(e) {
  window.voice.updateVoiceName($(e.currentTarget).text())
}

$(function() {
  $("#split_button").on('click', onSplitButton)
  $("#combine_button").on('click', onCombineButton)
  $("#read_all_button").on('click', onReadButton)
  $(".voice-selection").on('click', onSelectVoice)
  renderAllsentences([""].map(makeTextAreaHtml).join(""))
})

function capitalize(sentence){
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
