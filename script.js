// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Call the adjustTextareaHeight function when the page loads
  adjustTextareaHeight('inputText');
  adjustTextareaHeight('teacherInput');
  adjustTextareaHeight('coachInput');

  // Add event listeners for the 'input' event on textareas
  document.getElementById('inputText').addEventListener('input', function () {
    adjustTextareaHeight('inputText');
  });
  document.getElementById('teacherInput').addEventListener('input', function () {
    adjustTextareaHeight('teacherInput');
  });
  document.getElementById('coachInput').addEventListener('input', function () {
    adjustTextareaHeight('coachInput');
  });
});

function adjustTextareaHeight(textareaId) {
  var textarea = document.getElementById(textareaId);
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function formatText() {
  var inputText = document.getElementById('inputText').value;
  var teacherInput = document.getElementById('teacherInput').value.trim().split('\n');
  var coachInput = document.getElementById('coachInput').value.trim().split('\n');

  var formattedText = format(inputText, teacherInput, coachInput);
  document.getElementById('formattedText').value = formattedText;
}

function format(text, teacherInput, coachInput) {
  var lines = text.split('\n');
  var formattedLines = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var parts = line.split('\t');

    // Remove unwanted strings
    parts = parts.filter(function (part) {
      return part !== 'C1' && part !== 'C2' && part !== 'C3' && part !== 'MDY' && part !== 'C5' && part !== 'ONLINE';
    });

    // Change the order of parts and replace parts[4] with initials
    if (parts.length >= 5) {
      if (teacherInput.includes(parts[4])) {
        parts[4] = 'T';
      } else if (coachInput.includes(parts[4])) {
        parts[4] = 'C';
      }
    }

    // Remove the entire sentence if it includes "CC", "(eve)", "(off)"
    var sentence = parts.join(' ');
    if (
      sentence.toLowerCase().includes('(off)') ||
      sentence.toLowerCase().includes('(eve)') ||
      sentence.includes('CC') ||
      sentence.toLowerCase().includes('level checks') ||
      sentence.toLowerCase().includes('n/a')
    ) {
      continue; // Skip this line and move to the next iteration
    }

    var formattedLine = parts[0] + ' | ' + parts[2] + ' | ' + parts[3] + ' | ' + parts[4] + '\n' + parts[1];
    formattedLines.push(formattedLine);
  }

  var formattedText = formattedLines.join('\n');

  return formattedText;
}
