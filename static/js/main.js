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
  return `<div >
      <textarea placeholder="Sentence" class="form-control a-sentence" rows="9">${str}</textarea>
  </div><br>`
}

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
  $('.all-sentences').html(makeTextAreaHtml(combineStrings(getAllSentences())))
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
    $('.all-sentences').html(h)
  })
}

$(function() {
  $("#split_button").on('click', onSplitButton)
  $("#combine_button").on('click', onCombineButton)
  $('.all-sentences').html([""].map(makeTextAreaHtml).join(""))
})

function capitalize(sentence){
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
