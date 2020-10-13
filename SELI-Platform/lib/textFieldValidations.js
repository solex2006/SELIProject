export const validateOnlyNumbers = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  }
  else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\1/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault)   {
      theEvent.preventDefault();
    }
  }
}

export const validateOnlyLetters = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  }
  else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /^[a-zA-ZñığüşöçİĞÜŞÖÇ\s]*$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) {
      theEvent.preventDefault();
    }
  }
}

export const noSpecialCharacters = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste') {
    key = event.clipboardData.getData('text/plain');
  }
  else {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /^[a-zA-ZñığüşöçİĞÜŞÖÇ0-9 ]*$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) {
      theEvent.preventDefault();
    }
  }
}

export const onlySpaces = (evt) => {
  var value = true;
  if (evt && evt !== "") {
    var key = evt.split(" ");
    key.map((word) => {
      if (word !== "") {
        value = false;
      }
    })
  }
  return value;
}

export const validateLettersString = (evt) => {
  var value = true;
  var regex = /^[a-zA-ZñığüşöçİĞÜŞÖÇ\s ]*$/;
  if (!regex.test(evt)) {
    value = false;
  }
  return value;
}
