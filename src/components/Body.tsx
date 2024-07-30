import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Yup from "yup";

export default function Body() {
  const passwordSChema=Yup.object().shape({
    passwordLength:Yup.number()
    .min(8,"Should be atleast of 8 letters")
    .max(16,"should be of max 16 letters")
    .required("should conatain 8 letters")
  });
  return (
    <View>
      <Text>Body</Text>
    </View>
  )
}

const styles = StyleSheet.create({})