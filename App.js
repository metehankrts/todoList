import React, {useState} from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View , ScrollView} from 'react-native';
import Task from './components/Task';

const App = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const getRandomColor = () => {
    const colors = ['#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    const newTask = { text: task, backgroundColor: getRandomColor(), isCompleted: false };
    setTaskItems([...taskItems, newTask]);
    setTask('');

    Alert.alert(
      'New task has been added',
      'Successfully added!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        { text: 'Exit', onPress: () => console.log('Exit Pressed'), style: 'cancel' }
      ], { cancelable: false }
    );
  }

  const confirmDeleteTask = (index) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => completeTask(index) }
      ],
      { cancelable: false }
    );
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const toggleCompleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isCompleted = !itemsCopy[index].isCompleted;
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item.text}
                  backgroundColor={item.backgroundColor}
                  isCompleted={item.isCompleted}
                  onCheck={() => toggleCompleteTask(index)}
                  onDelete={() => confirmDeleteTask(index)} />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  items: {},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: '#55BCF6',
    fontSize: 24,
  },
});

export default App;
