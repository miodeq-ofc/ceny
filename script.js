document.addEventListener("DOMContentLoaded", () => {
    const priceForm = document.getElementById('priceForm');
    const priceList = document.getElementById('priceList');
    const totalCostElem = document.getElementById('totalCost');
    const clearDataButton = document.getElementById('clearData');

    let totalCost = 0;

    // Funkcja zapisująca dane w localStorage
    function saveData() {
        const items = [];
        priceList.querySelectorAll('li').forEach(li => {
            const text = li.textContent.split(': ')[1];
            const [productName, rest] = text.split(' x ');
            const [price, quantity] = rest.split(' = ');
            items.push({ productName, price: parseFloat(price.replace(' zł', '')), quantity: parseInt(quantity.replace(' zł', '')) });
        });

        localStorage.setItem('priceData', JSON.stringify({
            items,
            totalCost
        }));
    }

    // Funkcja wczytująca dane z localStorage
    function loadData() {
        const data = JSON.parse(localStorage.getItem('priceData'));
        if (data) {
            totalCost = data.totalCost;
            totalCostElem.textContent = totalCost.toFixed(2);

            data.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.productName || 'Brak Nazwy'}: ${item.price.toFixed(2)} zł x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} zł`;
                priceList.appendChild(listItem);
            });
        }
    }

    loadData();

    priceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value.trim() || 'Brak Nazwy';
        const price = parseFloat(document.getElementById('price').value);
        const quantity = document.getElementById('quantity').value.trim();
        const quantityNumber = quantity === '' ? 1 : parseInt(quantity, 10); // Domyślnie 1, jeśli nie podano

        if (isNaN(price) || isNaN(quantityNumber)) {
            alert('Wprowadź poprawne wartości dla ceny i ilości.');
            return;
        }

        const total = price * quantityNumber;
        totalCost += total;

        const listItem = document.createElement('li');
        listItem.textContent = `${productName}: ${price.toFixed(2)} zł x ${quantityNumber} = ${total.toFixed(2)} zł`;
        priceList.appendChild(listItem);

        totalCostElem.textContent = totalCost.toFixed(2);

        saveData(); // Zapisz dane do localStorage
        priceForm.reset();
    });

    clearDataButton.addEventListener('click', () => {
        priceList.innerHTML = '';
        totalCost = 0;
        totalCostElem.textContent = '0.00';

        localStorage.removeItem('priceData'); // Usuń dane z localStorage
    });
});
