import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from "yup";
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
export default function Body() {
 
  const [password,setPassword]=useState("");
  const [isGenerated,setisGenerated]=useState(false);
  const [numbers,setNumbers]=useState(false);
  const [symbols,setSymbols]=useState(false);
  const [lowercase,setLowercase]=useState(false);
  const [uppercase,setuppercase]=useState(false);

  const passwordSChema=Yup.object().shape({
    passwordLength:Yup.number()
    .min(8,"Should  atleast  be length of 8 letters")
    .max(16,"should be of max length 16 letters")
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
        <View style={styles.boxParent}>
        <View>
        <Text style={styles.EnterColumn}>Enter Password Length:</Text>
        <TextInput 
        style={styles.Inputcolumn}  
        value={values.passwordLength}
        onChangeText={handleChange('passwordLength')}
        keyboardType='numeric'
        placeholder='For Example:7'
        />   
        {touched.passwordLength&& errors.passwordLength &&(
          <Text style={styles.errorText}>{errors.passwordLength}</Text>
        )}
        </View>

        <View style={styles.checkboxAll}>
          <Text style={styles.headingText}>Include Lowercases</Text>
        <BouncyCheckbox
        isChecked={lowercase}
        onPress={()=>setLowercase(!lowercase)}
        fillColor='blueviolet'
        />
        </View>
        <View style={styles.checkboxAll}>
          <Text style={styles.headingText}>Include Uppercases</Text>
        <BouncyCheckbox
        isChecked={uppercase}
        onPress={()=>setuppercase(!uppercase)}
        fillColor='blueviolet'
        />
        </View>
        <View style={styles.checkboxAll}>
          <Text style={styles.headingText}>Include Special Symbols</Text>
        <BouncyCheckbox
        isChecked={symbols}
        onPress={()=>setSymbols(!symbols)}
        fillColor='blueviolet'
        />
        </View>
        <View style={styles.checkboxAll}>
          <Text style={styles.headingText}>Include Numbers</Text>
        <BouncyCheckbox
        isChecked={numbers}
        onPress={()=>setNumbers(!numbers)}
        fillColor='blueviolet'
        />
        </View>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity disabled={!isValid} onPress={()=>handleSubmit()} style={styles.button}><Text style={styles.buttonText}> Generate password</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{handleReset()
            resetPassword()
          }} style={styles.buttonTwo}><Text style={styles.buttonTextTwo}> Reset</Text></TouchableOpacity>
        </View>
        </>
      )   
    }
    </Formik>
        {
          (isGenerated)?<>
          <View style={styles.result}>
           <Text style={styles.resultText}>Password:</Text>
            <Text style={styles.resultText}>{password}</Text>
          </View>
          </>:null
        }
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
  width:250,
  borderRadius:4,
  elevation:4,
  shadowColor:"black",
  marginVertical:25,
  fontSize:16,
  fontWeight:"bold"
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
  marginVertical:10,
  alignItems:"center",
  gap:20
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

},
buttonTwo:{
  width:100,
  backgroundColor:"red",
  height:30,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:5,
  elevation:15,
  shadowColor:"black"
},
buttonTextTwo:{
  fontSize:18,
  fontWeight:"bold",
  color:"white",

},
checkboxAll:{
  width:300,
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:5
},
headingText:{
  fontSize:16,
  fontWeight:"500"
},
boxParent:{
 gap:10
},
result:{
  marginVertical:20,
  height:100,
  width:200,
  backgroundColor:"blueviolet",
  borderRadius:8,
  elevation:10,
  shadowColor:"black",
  flexDirection:'column',
  justifyContent:"center",
  alignItems:'center'
},
resultText:{
  fontSize:18,
  fontWeight:"bold",
  color:"white"
},
errorText:{
  fontSize:16,
  fontWeight:"bold",
  color:"red",

}

})