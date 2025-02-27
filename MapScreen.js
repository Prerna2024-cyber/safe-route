import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  // Initial map position
  const [region, setRegion] = useState({
    latitude: 37.7749,  // Default location (San Francisco)
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Move map function
  const moveMap = (direction) => {
    let newRegion = { ...region };

    const moveAmount = 0.01; // Adjust for faster/slower movement

    if (direction === "up") newRegion.latitude += moveAmount;
    if (direction === "down") newRegion.latitude -= moveAmount;
    if (direction === "left") newRegion.longitude -= moveAmount;
    if (direction === "right") newRegion.longitude += moveAmount;

    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Current Location" />
      </MapView>

      {/* Control Buttons */}
      <View style={styles.controls}>
        <Button title="⬆️" onPress={() => moveMap("up")} />
        <View style={styles.horizontalControls}>
          <Button title="⬅️" onPress={() => moveMap("left")} />
          <Button title="➡️" onPress={() => moveMap("right")} />
        </View>
        <Button title="⬇️" onPress={() => moveMap("down")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    alignItems: "center",
  },
  horizontalControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginVertical: 10,
  },
});

export default MapScreen;
