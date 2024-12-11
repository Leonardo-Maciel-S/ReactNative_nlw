import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { api } from "@/services/api";

export default function Home() {
	const [categories, setCategories] = useState([]);

	async function fetchCategories() {
		try {
			const { data } = await api.get("/categories");
			setCategories(data);
		} catch (e) {
			console.log(e);
			Alert.alert("Categorias", "Não foi possível encontrar resultados.");
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	return <View></View>;
}
