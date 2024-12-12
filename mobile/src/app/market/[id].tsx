import { useEffect, useState } from "react";

import { Alert, Text, View } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";

import { api } from "@/services/api";

import Loading from "@/components/loading";
import { Cover } from "@/components/market/cover";

import type { PropsDetails } from "@/components/market/details";
import Details from "@/components/market/details";
import Coupon from "@/components/market/coupon";

type DataProps = PropsDetails & {
	cover: string;
};

export default function Market() {
	const [data, setData] = useState<DataProps>();
	const [coupon, setCoupon] = useState<string | null>(null);

	const [isLoading, setIsLoading] = useState(true);

	const params = useLocalSearchParams<{ id: string }>();

	async function fetchMarket() {
		try {
			const { data } = await api.get(`/markets/${params.id}`);
			setData(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			Alert.alert("Erro", "Não foi possível carregar os dados", [
				{ text: "OK", onPress: () => router.back() },
			]);
		}
	}

	useEffect(() => {
		fetchMarket();
	}, [params.id]);

	console.log(params.id);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return <Redirect href="/home" />;
	}

	return (
		<View style={{ flex: 1 }}>
			<Cover uri={data.cover} />

			<Details data={data} />

			{coupon && <Coupon code={coupon} />}
		</View>
	);
}
