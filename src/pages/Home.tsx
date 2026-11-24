import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Link } from "@tanstack/react-router";

export const Home = (): FunctionComponent => {
	const [t, i18n] = useTranslation();

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center">
			<div className="flex justify-between items-center mb-4">
				<Link
					to="/login"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Login
				</Link>
			</div>

			<p className="text-white text-6xl">{t("home.greeting")}</p>
			<button
				className="hover:cursor-pointer"
				type="submit"
				onClick={onTranslateButtonClick}
			>
				translate
			</button>
		</div>
	);
};
