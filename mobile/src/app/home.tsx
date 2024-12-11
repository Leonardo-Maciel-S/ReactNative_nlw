import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import { api } from "@/services/api";
import { Categories, type CategoriesProps } from "@/components/categories";
import type { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketProps = PlaceProps & {};

export default function Home() {
	const [categories, setCategories] = useState<CategoriesProps>([]);
	const [category, setCategory] = useState("");
	const [markets, setMarkets] = useState<MarketProps[]>([]);

	async function fetchCategories() {
		try {
			const { data } = await api.get("/categories");
			setCategories(data);
			setCategory(data[0].id);
		} catch (e) {
			console.log(e);
			Alert.alert("Categorias", "Não foi possível encontrar resultados.");
		}
	}

	async function fetchMarkets() {
		try {
			if (!category) {
				return;
			}

			const { data } = await api.get(`/markets/category/${category}`);
			setMarkets(data);
		} catch (error) {
			console.log(error);
			Alert.alert("Locais", "Não foi possível carregar os locais.");
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchMarkets();
	}, [category]);

	return (
		<View style={{ flex: 1, backgroundColor: "#CECECE" }}>
			<Categories
				data={categories}
				onSelected={setCategory}
				selected={category}
			/>

			<Places data={markets} />
		</View>
	);
}
