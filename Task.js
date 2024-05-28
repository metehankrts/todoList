import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const Task = (props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.item, { backgroundColor: props.backgroundColor, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onCheck}>
          <View style={styles.checkBox}>
            {props.isCompleted ? <Text style={styles.checkMark}>✓</Text> : null}
          </View>
        </TouchableOpacity>
        <Text style={props.isCompleted ? styles.itemTextCompleted : styles.itemText}>
          {props.text}
        </Text>
      </View>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={props.onDelete}>
        <Text style={styles.deleteBox}>X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center', 
    flexWrap: 'wrap',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderColor: '#55BCF6',
    borderWidth: 2,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 15,
    color: '#55BCF6',
  },
  itemText: {
    maxWidth: '80%',
  },
  itemTextCompleted: {
    maxWidth: '80%',
    textDecorationLine: 'line-through',
    color: '#C0C0C0',
  },
  deleteBox: {
    fontSize: 20,
    color: '#FF5252',
  },
});

export default Task;
