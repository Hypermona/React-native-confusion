import React from "react";
import { View, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

export default function ContactUs() {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  };
  return (
    <View>
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information">
          <Text>121, Clear Water Bay Road</Text>
          <Text>Clear Water Bay, Kowloon</Text>
          <Text>HONG KONG</Text>
          <Text>Tel: +852 1234 5678</Text>
          <Text>Fax: +852 8765 4321</Text>
          <Text>Email:confusion@food.net</Text>
          <Button
            title="Send Email"
            buttonStyle={{ backgroundColor: "#512DA8", marginTop: 20 }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={sendMail}
          />
        </Card>
      </Animatable.View>
    </View>
  );
}
