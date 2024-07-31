import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from "yup";

export default function Body() {
 
  const [password,setPassword]=useState("");
  const [isGenerated,setisGenerated]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);
  const [lowercase,setLowercase]=useState(false);
  const [uppercase,setuppercase]=useState(false);

  const passwordSChema=Yup.object().shape({
    passwordLength:Yup.number()
    .min(8,"Should be atleast of 8 letters")
    .max(16,"should be of max 16 letters")
    .required("should conatain 8 letters")
  });


  const GeneratePassword=(passwordLength:number)=>{ 
    let characterLists="";
    const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
    const lowerCaseChar ='abcdefghijklmnopqrstuvwxyz' ;
    const numberAll= '1234567890' ;
    const symbolAll= '!@#$%^&()_+~`|}{[]:;?><,./-=';


    if(uppercase)
      characterLists+=upperCaseChar;

    if(lowercase)
      characterLists+=lowerCaseChar;
    if(symbols)
      characterLists+=symbolAll;
    if(numbers)
      characterLists+=numberAll;

    const passwordResult=Createpassword(characterLists,passwordLength);
    setPassword(passwordResult);
    setisGenerated(true);

   };
  const Createpassword=(characters:string,passwordLength:number)=>{

    let result='';
    for(let i=0;i<passwordLength;i++){
      let char=Math.floor(Math.random()*characters.length)
      result+=characters.charAt(char);
    }
   return result;

  };
  const resetPassword=()=>{

    setPassword('');
    setisGenerated(false);
    setLowercase(true);
    setuppercase(false);
    setSymbols(false);
    setNumbers(false);


  };
  return (
    <View>
      <Text>Body</Text>
    </View>
  )
}

const styles = StyleSheet.create({})