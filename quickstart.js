$(function () {
  // Get references to HTML elements for audio controls and volume indicators
  var speakerDevices = document.getElementById("speaker-devices");
  var ringtoneDevices = document.getElementById("ringtone-devices");
  var outputVolumeBar = document.getElementById("output-volume");
  var inputVolumeBar = document.getElementById("input-volume");
  var volumeIndicators = document.getElementById("volume-indicators");

  // Log the token request process
  log("Requesting Token...");

  // Fetch the Twilio token from the server via an AJAX request
  $.getJSON("token.php") // Replace with the actual token generation endpoint
    .done(function (data) {
      log("Got a token.");
      console.log("Token: " + data.token);

      // Setup Twilio.Device with the received token
      Twilio.Device.setup(data.token);

      // Twilio.Device is ready to make and receive calls
      Twilio.Device.ready(function (device) {
        log("Twilio.Device Ready!");
        document.getElementById("call-controls").style.display = "block";
      });

      // Handle Twilio.Device errors
      Twilio.Device.error(function (error) {
        log("Twilio.Device Error: " + error.message);
      });

      // Handle successful call connection
      Twilio.Device.connect(function (conn) {
        log("Successfully established call!");
        document.getElementById("button-call").style.display = "none";
        document.getElementById("button-hangup").style.display = "inline";
        volumeIndicators.style.display = "block";
        bindVolumeIndicators(conn); // Bind volume indicators to the current call
      });

      // Handle call disconnection
      Twilio.Device.disconnect(function (conn) {
        log("Call ended.");
        document.getElementById("button-call").style.display = "inline";
        document.getElementById("button-hangup").style.display = "none";
        volumeIndicators.style.display = "none";
      });

      // Handle incoming calls
      Twilio.Device.incoming(function (conn) {
        log("Incoming connection from " + conn.parameters.From);
        var archEnemyPhoneNumber = "+14157365698"; // Example number to reject

        // Reject call if it's from a specific number
        if (conn.parameters.From === archEnemyPhoneNumber) {
          conn.reject();
          log("It's your nemesis. Rejected call.");
        } else {
          // Accept the incoming connection and start two-way audio
          conn.accept();
        }
      });

      // Set the client identity in the UI
      setClientNameUI(data.identity);

      // Update device selection when there are changes in available devices
      Twilio.Device.audio.on("deviceChange", updateAllDevices);

      // Show audio selection options if supported by the browser
      if (Twilio.Device.audio.isSelectionSupported) {
        document.getElementById("output-selection").style.display = "block";
      }
    })
    .fail(function () {
      log("Could not get a token from server!"); // Handle failure in token request
    });

  // Bind button to initiate a call
  document.getElementById("button-call").onclick = function () {
    // Get the phone number to connect the call to
    var params = {
      To: document.getElementById("phone-number").value,
    };

    console.log("Calling " + params.To + "...");
    Twilio.Device.connect(params); // Connect the call to the given number
  };

  // Bind button to hang up the call
  document.getElementById("button-hangup").onclick = function () {
    log("Hanging up...");
    Twilio.Device.disconnectAll(); // Disconnect all ongoing calls
  };

  // Fetch available audio devices when requested
  document.getElementById("get-devices").onclick = function () {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(updateAllDevices);
  };

  // Handle speaker device selection change
  speakerDevices.addEventListener("change", function () {
    var selectedDevices = [].slice
      .call(speakerDevices.children)
      .filter(function (node) {
        return node.selected;
      })
      .map(function (node) {
        return node.getAttribute("data-id");
      });

    Twilio.Device.audio.speakerDevices.set(selectedDevices); // Set selected speaker devices
  });

  // Handle ringtone device selection change
  ringtoneDevices.addEventListener("change", function () {
    var selectedDevices = [].slice
      .call(ringtoneDevices.children)
      .filter(function (node) {
        return node.selected;
      })
      .map(function (node) {
        return node.getAttribute("data-id");
      });

    Twilio.Device.audio.ringtoneDevices.set(selectedDevices); // Set selected ringtone devices
  });

  // Bind volume indicators to show call audio levels
  function bindVolumeIndicators(connection) {
    connection.volume(function (inputVolume, outputVolume) {
      var inputColor = "red";
      if (inputVolume < 0.5) {
        inputColor = "green";
      } else if (inputVolume < 0.75) {
        inputColor = "yellow";
      }

      inputVolumeBar.style.width = Math.floor(inputVolume * 300) + "px";
      inputVolumeBar.style.background = inputColor;

      var outputColor = "red";
      if (outputVolume < 0.5) {
        outputColor = "green";
      } else if (outputVolume < 0.75) {
        outputColor = "yellow";
      }

      outputVolumeBar.style.width = Math.floor(outputVolume * 300) + "px";
      outputVolumeBar.style.background = outputColor;
    });
  }

  // Update the available speaker and ringtone devices
  function updateAllDevices() {
    updateDevices(speakerDevices, Twilio.Device.audio.speakerDevices.get());
    updateDevices(ringtoneDevices, Twilio.Device.audio.ringtoneDevices.get());
  }
});

// Update the device options in the dropdowns for speaker and ringtone devices
function updateDevices(selectEl, selectedDevices) {
  selectEl.innerHTML = "";
  Twilio.Device.audio.availableOutputDevices.forEach(function (device, id) {
    var isActive = selectedDevices.size === 0 && id === "default";
    selectedDevices.forEach(function (device) {
      if (device.deviceId === id) {
        isActive = true;
      }
    });

    var option = document.createElement("option");
    option.label = device.label;
    option.setAttribute("data-id", id);
    if (isActive) {
      option.setAttribute("selected", "selected");
    }
    selectEl.appendChild(option);
  });
}

// Log activity messages
function log(message) {
  var logDiv = document.getElementById("log");
  logDiv.innerHTML += "<p>&gt;&nbsp;" + message + "</p>";
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Display the client name in the UI
function setClientNameUI(clientName) {
  var div = document.getElementById("client-name");
  div.innerHTML = "Your client name: <strong>" + clientName + "</strong>";
}
