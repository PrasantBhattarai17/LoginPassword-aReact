import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik } from 'formik';
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
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <SafeAreaView style={styles.appContainer}> 
        <View style={styles.formContainer}>
       <Text style={styles.TextStyle}>Password Generator</Text>
       <Formik
      initialValues={{passwordLength:'' }}
       validationSchema={passwordSChema}
      onSubmit={values=>{
        
        console.log(values )
        GeneratePassword(+values.passwordLength)

      }}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        handleChange,
        handleSubmit,
        handleReset
      }) => (
        <>
        <View>
        <Text style={styles.EnterColumn}>Enter Password Length:</Text>
        <TextInput style={styles.Inputcolumn}/>   
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Generate password</Text></TouchableOpacity>
        </View>
        </>
      )   
    }
    </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

appContainer:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  height:1000,
},
formContainer:{
  flex:1,
  alignItems:"center",
  justifyContent:'center'
},
Inputcolumn:{
  backgroundColor:"white",
  height:50,
  width:230,
  borderRadius:4,
  elevation:4,
  shadowColor:"black",
  margin:10

},
TextStyle:{
  textAlign:"center",
  fontSize:23,
  fontWeight:'900',
  color:"blueviolet",
  marginVertical:50

},
EnterColumn:{
  fontSize:18,
fontWeight:"bold",
textAlign:"center"
},
buttonWrapper:{
  width:200,
  flex:1,
  marginVertical:10,
},
button:{
  width:180,
  backgroundColor:"blueviolet",
  height:40,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:5,
  elevation:15,
  shadowColor:"black"
},
buttonText:{
  fontSize:18,
  fontWeight:"bold",
  color:"white",

}

})