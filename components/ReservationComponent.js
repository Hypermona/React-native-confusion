import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
    };
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + " requested",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
      },
    });
  }
  handleReservation() {
    Alert.alert(
      "Your Reservation Ok?",
      "Number of Guests : " +
        this.state.guests +
        "\nSmoking? " +
        this.state.smoking +
        "\nDate and Time : " +
        this.state.date,
      [
        {
          text: "Cancel",
          onPress: () => {
            this.resetForm();
          },
          style: " cancel",
        },
        {
          text: "Ok",
          text: "OK",
          onPress: () => {
            this.resetForm();
          },
        },
      ]
    );
    this.setState({
      show: false,
    });
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      mode: "date",
      show: false,
    });
  }
  render() {
    const { date } = this.state;
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor="#512DA8"
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button title="Select" />
                <Button
                  onPress={() => this.setState({ show: true, mode: "date" })}
                  title="Date"
                />
                <Button
                  onPress={() => this.setState({ show: true, mode: "time" })}
                  title="Time"
                />
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={this.state.mode}
                  is24Hour={true}
                  display="spinner"
                  onDismiss={() => {
                    this.setState({ show: false });
                  }}
                  onChange={(event, selectedDate) => {
                    this.setState({ date: selectedDate });
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => {
                this.presentLocalNotification(this.state.date);
                this.handleReservation();
              }}
              title="Reserve"
              color="#512DA8"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
