import { View , Text, StyleSheet } from "react-native";

function GuessLogItem({roundName, guess}){
return (
<View style={styles.listItems}>
    <Text>#{roundName}</Text>
    <Text>Opponent's guess {guess}</Text>
</View>
);}

const styles = StyleSheet.create({
    listItems:{
        borderColor:'#3b021f',
        borderWidth:1,
        borderRadius:40,
        padding:12,
        marginVertical:8,
        backgroundColor:'#ddb52f',
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'100%',
        //for android shadow style
        elevation:4,
        //for ios shadow style
        shadowColor: 'black',
        textShadowOffset:{width:0, height:0},
        shadowOpacity:0.25,
        shadowRadius:3,

    }
})

export default GuessLogItem;