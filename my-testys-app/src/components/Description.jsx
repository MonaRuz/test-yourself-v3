const Description = () => {
	return (
		<div>
			<p>
				Vítej v aplikaci, která ti umožní jednoduše si otestovat znalosti z
				jakékoliv oblasti. Aplikace slouží jako jakási databáze otázek a
				odpovědí, které si můžeš nadefinovat jen ty sám/sama.
			</p>
			<h3>Jak začít?</h3>
			<p>
				Stací si založit novou kategorii symbolem (+) pod tímto článkem. Potom
				budeš vyzván/vyzvána k zadání názvu kategorie. Po potvrzení se tvá
				kategorie zobrazí v levé části aplikace. Po kliknutí na zvolenou kategorii se zobrazí seznam otázek, jsou-li k dispozici. Pokud ne, lze je vytvořit kliknutím na (+). Je vhodné k otázkám psát i odpovědi, ať si můžeš své odpovědi během testu zkontrolovat. Otázky a odpovědi lze v této části aplikace dodatečně upravovat, mazat a přidávat. <br />
                Pozor! Aby nově vytvořené otázky byly součástí testu, musí se test resetovat!
			</p>
            <p>
                Po vytvoření všech otázek lze spustit test. Otázky budou v náhodném pořadí. Ke každé otázce budou 3 tlačítka: Správně, Špatně/Nevím a Zobrazit odpověď. Pokud na otázku odpovíš dobře, znovu se tato otázka opakovat nebude. Pokud ale odpovíš špatně, otázka se bude vracet v náhodném sledu do té doby, dokud neodpovíš správně. Test lze kdykoliv přerušit a začít znovu. Aplikaci je také možné vypnout v průběhu testu, aniž by byl ztracen postup. Takže při opětovném zapnutí můžeš začít tam, kde jsi předtím skončil.
            </p>
		</div>
	)
}

export default Description
