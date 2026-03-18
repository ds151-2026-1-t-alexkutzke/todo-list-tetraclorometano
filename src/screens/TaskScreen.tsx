import { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Text } from 'react-native';

interface TaskItem {
	id: string,
	text: string,
	done: bool,
}

const TaskListScreen = ({ }) => {
	const [text, setText] = useState('')
	const [tasks, setTasks] = useState<TaskItem[]>([]);
	
	const appendTask = (t) => {
		setTasks([...tasks,{
			id: Date.now().toString()+Math.random().toString(),
			done: false,
			text: t,
		}]);
	};
	
	const handleTaskClick = (id) => {
		console.log(id)
		const nextTasks = tasks.map(
			(t, i) => t.id != id ? t : {...t, done: !t.done}
		);
		console.log(nextTasks)
		setTasks(nextTasks);
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				placeholder="Tarefa"
				onChangeText={setText}
				onEndEditing={() => appendTask(text)}
				autoCapitalize="none"
				autoCorrect={false}
				value={text}
			/>
			<FlatList
				data={tasks}
				keyExtractor={item => item.id}
				renderItem={({item}) =>
					<Text
						style={styles[item.done.toString()]}
						onPress={() => {handleTaskClick(item.id)}}
					>- {item.text}</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	true: {
		color: "#777",
		textDecorationLine: "line-through",
		fontSize: 20,
	},
	false: {
		color: "#000",
		fontSize: 20,
	},
	input: {
		borderWidth: 1,
		borderRadius: 7.5,
		borderColor: "#ddd"
	}
})

export default TaskListScreen;
