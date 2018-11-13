const toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ramdomString = (number) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  
    for (var i = 0; i < number; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

const TimeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " Yrs";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " Mos";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " Dys";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " Hrs";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " Mins";
    }
    return Math.floor(seconds) + " secs";
}

export {
    toDataUrl,
    validateEmail, 
    TimeSince,
    ramdomString
}