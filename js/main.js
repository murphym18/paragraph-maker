function splitStrings(str) {
  var p = str.split(/\.\s+/g).map(function(s) {
    if (s !== "" && s[s.length - 1] !== "." && s[s.length - 1] !== "?" && s[s.length - 1] !== "!") {
      return s.trim() + "."
    }
    return s.trim()
  });
  var tmp = []
  p.map(function(s) {
    var q = s.split(/\?/g)
    return q.map(function(w) {
      if (w !== "" && w[w.length - 1] !== "." && s[s.length - 1] !== "!") {
        return w.trim() + "?"
      }
      return w.trim()
    })
  }).forEach(function(arr) {
    arr.forEach(function(e) {
      tmp.push(e)
    })
  })
  var result = []
  tmp.map(function(s) {
    return s.split(/\!/g).map(function (w) {
      if (w !== "" && w[w.length - 1] !== "." && w[w.length - 1] !== "?") {
        return w.trim() + "!"
      }
      return w.trim()
    })
  }).forEach(function(arr) {
    arr.forEach(function(e) {
      result.push(e)
    })
  })
  return result.filter(function(s) {
    return s !== ""
  })
}

function combineStrings(strs) {
  return strs.reduce(function(cur, next) {
    next = next.trim()
    var lastChar = next[next.length - 1];
    if (lastChar !== "." && lastChar !== "?" && lastChar !== "!") {
      next = next + "."
    }
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
  // join all teh strings together
  // then split the strings sentence by sentence
  // then for each string render html for text area with the string as the value
  // join all the rendered html together
  // replace the current gui with this newly rendered html
  var h = splitStrings(combineStrings(getAllSentences())).map(makeTextAreaHtml).join("")
  $('.all-sentences').html(h)
}

$(function() {
  $("#split_button").on('click', onSplitButton)
  $("#combine_button").on('click', onCombineButton)
  $('.all-sentences').html([""].map(makeTextAreaHtml).join(""))
})
