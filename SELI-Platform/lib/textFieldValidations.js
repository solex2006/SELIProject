export const validateOnlyNumbers = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste')
  {
    key = event.clipboardData.getData('text/plain');
  }
  else
  {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\1/;
  if (!regex.test(key))
  {
    theEvent.returnValue = false;
    if (theEvent.preventDefault)
    {
      theEvent.preventDefault();
    }
  }
}

export const validateOnlyLetters = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste')
  {
    key = event.clipboardData.getData('text/plain');
  }
  else
  {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /^[a-zA-Z\s]*$/;
  if (!regex.test(key))
  {
    theEvent.returnValue = false;
    if (theEvent.preventDefault)
    {
      theEvent.preventDefault();
    }
  }
}

export const noSpecialCharacters = (evt) => {
  var theEvent = evt || window.event;
  if (theEvent.type === 'paste')
  {
    key = event.clipboardData.getData('text/plain');
  }
  else
  {
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
  }
  var regex = /^[a-zA-Z0-9 ]*$/;
  if (!regex.test(key))
  {
    theEvent.returnValue = false;
    if (theEvent.preventDefault)
    {
      theEvent.preventDefault();
    }
  }
}
