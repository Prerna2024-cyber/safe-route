import React, { useState } from "react";
import { View, Button, Alert, Linking } from "react-native";
import call from "react-native-phone-call";
import SendSMS from "react-native-sms";
import Geolocation from "react-native-geolocation-service";

const SOSButton = () => {
  const emergencyNumber = "911"; // Replace with your country's emergency number
  const relativeNumber = "1234567890"; // Replace with your emergency contact
  
  const [location, setLocation] = useState(null);

  // Get current location
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        sendEmergencySMS(latitude, longitude);
      },
      (error) => {
        Alert.alert("Location Error", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Make an emergency call
  const makeCall = (number) => {
    const args = { number, prompt: false };
    call(args).catch((err) => console.error(err));
  };

  // Send emergency SMS
  const sendEmergencySMS = (latitude, longitude) => {
    const message = `🚨 SOS! I need help. My location: https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    SendSMS.send(
      {
        body: message,
        recipients: [relativeNumber],
        successTypes: ["sent", "queued"],
      },
      (completed, cancelled, error) => {
        if (completed) {
          Alert.alert("SOS Alert", "Emergency message sent successfully!");
        } else if (cancelled) {
          Alert.alert("SOS Alert", "Message sending was cancelled.");
        } else {
          Alert.alert("SOS Alert", "Failed to send message.");
        }
      }
    );
  };

  // Handle SOS button click
  const handleSOS = () => {
    Alert.alert("SOS Alert", "Are you sure you want to send SOS?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => {
          makeCall(emergencyNumber);  // Call 911
          makeCall(relativeNumber);   // Call relative
          getLocation();              // Get location & send SMS
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="🚨 SOS Emergency" onPress={handleSOS} color="red" />
    </View>
  );
};

export default SOSButton;
