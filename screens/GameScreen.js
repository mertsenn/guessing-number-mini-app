import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import {Ionicons} from '@expo/vector-icons';


import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary=1;
    maxBoundary=100;
  },[]);
  
  function nextGuessHandler(direction) {
    
    // direction => 'lower', 'greater'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
      
    } else {
      minBoundary = currentGuess + 1;
      
    }
    
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((previousGuessNumber) => 
      [newRndNumber, ...previousGuessNumber]
    );
  }
  const guessRoundsListLenght = guessRounds.length;

  return (
    

    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.cardContainer}>
        <Text style={styles.headerOfCard}>Higher or lower?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color= "white"/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton  onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color= "white"/>
            </PrimaryButton>
          </View>
        </View>
       </View>
      <View style={styles.listContainer}> 
        {/*{guessRounds.map((latestGuesNumber) => <GuessLogItem guess={latestGuesNumber} roundName={guessRounds} key={latestGuesNumber}> {latestGuesNumber} </GuessLogItem> )}*/}
        <FlatList 
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundName={guessRoundsListLenght - itemData.index} guess={itemData.item}/> }
          keyExtractor={(item) => item}
         />
        
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop:50
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  headerOfCard: {
    fontSize: 24,
    color: "#ddb52f",
    marginBottom:20
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer:{
    flex:1,
    padding:16,
  }
});
