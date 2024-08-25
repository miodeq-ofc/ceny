document.addEventListener("DOMContentLoaded", () => {
    const compareButton = document.getElementById('compareButton');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const detailsText = document.getElementById('detailsText');

    // Funkcja konwertująca wartości do jednostek bazowych (gramy, mililitry, sztuki)
    function convertToBaseUnit(amount, unit) {
        switch (unit) {
            case 'kg':
                return amount * 1000; // kilogramy na gramy
            case 'g':
                return amount; // gramy
            case 'l':
                return amount * 1000; // litry na mililitry
            case 'ml':
                return amount; // mililitry
            case 'szt':
                return amount; // sztuki
            default:
                return null;
        }
    }

    // Funkcja zwracająca nazwę jednostki do wyświetlenia
    function getDisplayUnit(unit) {
        switch (unit) {
            case 'kg':
            case 'g':
                return 'kg'; // Zawsze wyświetlaj w zł/kg
            case 'l':
            case 'ml':
                return 'l'; // Zawsze wyświetlaj w zł/l
            case 'szt':
                return 'sztuka';
            default:
                return '';
        }
    }

    // Funkcja przeliczająca cenę na odpowiednią jednostkę do wyświetlenia
    function calculatePricePerDisplayUnit(price, baseAmount, unit) {
        switch (unit) {
            case 'kg':
            case 'g':
                return (price / baseAmount) * 1000; // Zawsze przeliczaj na zł/kg
            case 'l':
            case 'ml':
                return (price / baseAmount) * 1000; // Zawsze przeliczaj na zł/l
            case 'szt':
                return price / baseAmount; // Cena za sztukę
            default:
                return 0;
        }
    }

    compareButton.addEventListener('click', () => {
        // Pobranie i konwersja wartości dla Produktu 1
        const amount1 = parseFloat(document.getElementById('amount1').value.replace(',', '.'));
        const unit1 = document.getElementById('unit1').value;
        const price1 = parseFloat(document.getElementById('price1').value.replace(',', '.'));

        // Pobranie i konwersja wartości dla Produktu 2
        const amount2 = parseFloat(document.getElementById('amount2').value.replace(',', '.'));
        const unit2 = document.getElementById('unit2').value;
        const price2 = parseFloat(document.getElementById('price2').value.replace(',', '.'));

        // Walidacja danych
        if (
            isNaN(amount1) || amount1 <= 0 ||
            isNaN(price1) || price1 <= 0 ||
            isNaN(amount2) || amount2 <= 0 ||
            isNaN(price2) || price2 <= 0
        ) {
            alert('Proszę wprowadzić poprawne i dodatnie wartości dla obu produktów.');
            return;
        }

        // Konwersja do jednostek bazowych
        const baseAmount1 = convertToBaseUnit(amount1, unit1);
        const baseAmount2 = convertToBaseUnit(amount2, unit2);

        const displayUnit1 = getDisplayUnit(unit1);
        const displayUnit2 = getDisplayUnit(unit2);

        // Obliczenie ceny za jednostkę wyświetlaną (kg/l/sztuka)
        const displayPrice1 = calculatePricePerDisplayUnit(price1, baseAmount1, unit1);
        const displayPrice2 = calculatePricePerDisplayUnit(price2, baseAmount2, unit2);

        // Ustalenie bardziej opłacalnego produktu
        let resultMessage = '';
        if (displayPrice1 < displayPrice2) {
            resultMessage = 'Produkt 1<br>jest bardziej opłacalny.';
        } else if (displayPrice1 > displayPrice2) {
            resultMessage = 'Produkt 2<br>jest bardziej opłacalny.';
        } else {
            resultMessage = 'Oba produkty<br>są równie opłacalne.';
        }

        // Szczegóły cen za jednostkę wyświetlaną
        const detailsMessage = `
            Cena za ${displayUnit1}: ${displayPrice1.toFixed(2)} zł/${displayUnit1}<br>
            Cena za ${displayUnit2}: ${displayPrice2.toFixed(2)} zł/${displayUnit2}
        `;

        // Wyświetlenie wyników
        resultText.innerHTML = resultMessage;
        detailsText.innerHTML = detailsMessage;
        resultDiv.style.display = 'block';
    });
});
