import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

import FirebaseCreate from './services/FirebaseCreate';
import FirebaseRead from './services/FirebaseRead';
import FirebaseUpdate from './services/FirebaseUpdate';
import FirebaseDelete from './services/FirebaseDelete';

import LoginScreen from './LoginScreen';

import { auth } from './firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null); // usuário logado
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribeTasks = FirebaseRead.listenTasks(setTasks);
      return () => unsubscribeTasks();
    } else {
      setTasks({});
    }
  }, [user]);

  const handleAddTask = () => {
    if (!task) return;

    if (editId) {
      FirebaseUpdate.updateTask(editId, task);
      setEditId(null);
    } else {
      FirebaseCreate.addTask(task);
    }

    setTask('');
  };

  const handleEditTask = (id, title) => {
    setTask(title);
    setEditId(id);
  };

  const handleDeleteTask = (id) => {
    FirebaseDelete.deleteTask(id);
  };

  const handleLogout = () => {
    signOut(auth).catch(error => Alert.alert("Erro ao sair", error.message));
  };

  const renderItem = ({ item }) => {
    const [id, data] = item;
    return (
      <View style={styles.taskItem}>
        <Text>{data.title}</Text>
        <View style={styles.buttons}>
          <Button title="Editar" onPress={() => handleEditTask(id, data.title)} />
          <Button title="Excluir" color="red" onPress={() => handleDeleteTask(id)} />
        </View>
      </View>
    );
  };

  if (!user) {
    return <LoginScreen onLogin={() => {}} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Usuário: {user.email}</Text>
      <Button title="Sair" onPress={handleLogout} color="red" />
      <Text style={styles.title}>Lista de Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua tarefa"
        value={task}
        onChangeText={setTask}
      />
      <Button title={editId ? 'Atualizar' : 'Adicionar'} onPress={handleAddTask} />
      <FlatList
        data={Object.entries(tasks)}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, flex: 1 },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  taskItem: { marginBottom: 10, backgroundColor: '#eee', padding: 10, borderRadius: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
