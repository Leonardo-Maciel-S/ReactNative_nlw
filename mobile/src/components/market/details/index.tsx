import { View, Text } from "react-native";
import {
	IconPhone,
	IconMapPin,
	IconTicket,
	IconMap,
} from "@tabler/icons-react-native";

import { Info } from "../info";

import { s } from "./syles";

export type PropsDetails = {
	name: string;
	description: string;
	address: string;
	phone: string;
	coupons: number;
	rules: {
		id: string;
		description: string;
	}[];
};

type Props = {
	data: PropsDetails;
};

export default function Details({ data }: Props) {
	return (
		<View style={s.container}>
			<Text style={s.name}>{data.name}</Text>

			<Text style={s.description}>{data.description}</Text>

			<View style={s.group}>
				<Text style={s.title}>Informações</Text>

				<Info
					icon={IconTicket}
					description={`${data.coupons} cupons disponíveis`}
				/>
				<Info icon={IconMap} description={data.description} />
				<Info icon={IconPhone} description={data.phone} />
			</View>

			<View style={s.group}>
				<Text style={s.title}>Regulamento</Text>
				{data.rules.map((item) => (
					<Text key={item.id} style={s.rule}>
						{`\u2022 ${item.description}`}
					</Text>
				))}
			</View>
		</View>
	);
}