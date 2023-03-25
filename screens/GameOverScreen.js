import { Text, View, StyleSheet, Image } from "react-native";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
  return (
    <View style={styles.endingContaine}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <View>
        <Text style={styles.summaryPart}>
          
          Your number <Text style={styles.highlightedValuse}>{userNumber}</Text> was guessed in <Text style={styles.highlightedValuse}> {roundsNumber} </Text>Round
        </Text>
        <PrimaryButton onPress={onStartNewGame}> Restart</PrimaryButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  endingContaine: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 150,
    borderWidth: 3,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlightedValuse:{
    color:"#990000"
  },
  summaryPart:{
    fontSize:24,
    textAlign:'center',
    marginVertical:20
  }
});
export default GameOverScreen;
