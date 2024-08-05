document.getElementById('cv-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'cv') {
            const file = formData.get('cv');
            const reader = new FileReader();
            reader.onload = function(e) {
                jsonData[key] = e.target.result;
                saveData(jsonData);
            };
            reader.readAsDataURL(file);
        } else {
            jsonData[key] = value;
        }
    });
});

function saveData(data) {
    const existingData = JSON.parse(localStorage.getItem('cvData')) || [];
    existingData.push(data);
    localStorage.setItem('cvData', JSON.stringify(existingData));
    alert('Currículum registrado exitosamente.');
    document.getElementById('cv-form').reset();
}

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchTerm = event.target['search-term'].value.toLowerCase();
    const cvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const results = cvData.filter(entry => entry.nombre.toLowerCase().includes(searchTerm) || entry.dni.toLowerCase().includes(searchTerm));

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    if (results.length > 0) {
        results.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'result-entry';
            entryElement.innerHTML = `
                <p><strong>Nombre:</strong> ${entry.nombre}</p>
                <p><strong>Apellido:</strong> ${entry.apellido}</p>
                <p><strong>DNI:</strong> ${entry.dni}</p>
                <p><strong>Dirección:</strong> ${entry.direccion}</p>
                <p><strong>Teléfono:</strong> ${entry.telefono}</p>
                <p><strong>Edad:</strong> ${entry.edad}</p>
                <p><strong>Currículum:</strong> <a href="${entry.cv}" download="curriculum-${entry.nombre}-${entry.apellido}.pdf">Descargar</a></p>
                <button class="edit-btn" onclick="editEntry(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteEntry(${index})">Eliminar</button>
            `;
            resultsContainer.appendChild(entryElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    }
});

function editEntry(index) {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    const entry = cvData[index];

    document.getElementById('edit-nombre').value = entry.nombre;
    document.getElementById('edit-apellido').value = entry.apellido;
    document.getElementById('edit-dni').value = entry.dni;
    document.getElementById('edit-direccion').value = entry.direccion;
    document.getElementById('edit-telefono').value = entry.telefono;
    document.getElementById('edit-edad').value = entry.edad;

    document.getElementById('edit-section').style.display = 'block';
    document.getElementById('edit-form').onsubmit = function(e) {
        e.preventDefault();
        saveEditedData(index);
    };
}

function saveEditedData(index) {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    const editedEntry = {
        nombre: document.getElementById('edit-nombre').value,
        apellido: document.getElementById('edit-apellido').value,
        dni: document.getElementById('edit-dni').value,
        direccion: document.getElementById('edit-direccion').value,
        telefono: document.getElementById('edit-telefono').value,
        edad: document.getElementById('edit-edad').value,
        cv: cvData[index].cv
    };

    const fileInput = document.getElementById('edit-cv');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            editedEntry.cv = e.target.result;
            updateData(index, editedEntry);
        };
        reader.readAsDataURL(file);
    } else {
        updateData(index, editedEntry);
    }
}

function updateData(index, data) {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    cvData[index] = data;
    localStorage.setItem('cvData', JSON.stringify(cvData));
    alert('Datos actualizados exitosamente.');
    document.getElementById('edit-form').reset();
    document.getElementById('edit-section').style.display = 'none';
    document.getElementById('search-results').innerHTML = '';
}

function deleteEntry(index) {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        cvData.splice(index, 1);
        localStorage.setItem('cvData', JSON.stringify(cvData));
        alert('Registro eliminado exitosamente.');
        document.getElementById('search-results').innerHTML = '';
    }
}
document.getElementById('show-all-btn').addEventListener('click', function () {
    const cvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const recordsContainer = document.getElementById('all-records');
    recordsContainer.innerHTML = '';

    if (cvData.length > 0) {
        cvData.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'record-entry';
            entryElement.innerHTML = `
                <p><strong>Nombre:</strong> ${entry.nombre}</p>
                <p><strong>Apellido:</strong> ${entry.apellido}</p>
                <p><strong>DNI:</strong> ${entry.dni}</p>
                <p><strong>Dirección:</strong> ${entry.direccion}</p>
                <p><strong>Teléfono:</strong> ${entry.telefono}</p>
                <p><strong>Edad:</strong> ${entry.edad}</p>
                <p><strong>Currículum:</strong> <a href="${entry.cv}" download="curriculum-${entry.nombre}-${entry.apellido}.pdf">Descargar</a></p>
            `;
            recordsContainer.appendChild(entryElement);
        });
        document.getElementById('download-all-btn').style.display = 'block';
    } else {
        recordsContainer.innerHTML = '<p>No hay registros almacenados.</p>';
        document.getElementById('download-all-btn').style.display = 'none';
    }
});

document.getElementById('show-all-btn').addEventListener('click', function () {
    const cvData = JSON.parse(localStorage.getItem('cvData')) || [];
    const recordsContainer = document.getElementById('all-records');
    recordsContainer.innerHTML = '';

    if (cvData.length > 0) {
        cvData.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'record-entry';
            entryElement.innerHTML = `
                <p><strong>Nombre:</strong> ${entry.nombre}</p>
                <p><strong>Apellido:</strong> ${entry.apellido}</p>
                <p><strong>DNI:</strong> ${entry.dni}</p>
                <p><strong>Dirección:</strong> ${entry.direccion}</p>
                <p><strong>Teléfono:</strong> ${entry.telefono}</p>
                <p><strong>Edad:</strong> ${entry.edad}</p>
                <p><strong>Currículum:</strong> <a href="${entry.cv}" download="curriculum-${entry.nombre}-${entry.apellido}.pdf">Descargar</a></p>
            `;
            recordsContainer.appendChild(entryElement);
        });
        document.getElementById('download-all-btn').style.display = 'block';
    } else {
        recordsContainer.innerHTML = '<p>No hay registros almacenados.</p>';
        document.getElementById('download-all-btn').style.display = 'none';
    }
});

document.getElementById('download-all-btn').addEventListener('click', async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const cvData = JSON.parse(localStorage.getItem('cvData')) || [];

    if (cvData.length === 0) {
        alert('No hay datos para descargar.');
        return;
    }

    let y = 10; // starting vertical position
    cvData.forEach((entry, index) => {
        doc.text(`Registro ${index + 1}`, 10, y);
        y += 10;
        doc.text(`Nombre: ${entry.nombre}`, 10, y);
        y += 10;
        doc.text(`Apellido: ${entry.apellido}`, 10, y);
        y += 10;
        doc.text(`DNI: ${entry.dni}`, 10, y);
        y += 10;
        doc.text(`Dirección: ${entry.direccion}`, 10, y);
        y += 10;
        doc.text(`Teléfono: ${entry.telefono}`, 10, y);
        y += 10;
        doc.text(`Edad: ${entry.edad}`, 10, y);
        y += 10;

        // Add a line break after each entry
        y += 10;
        if (y > 280) { // Check if the page is full
            doc.addPage();
            y = 10;
        }
    });

    doc.save('todos-los-registros.pdf');
});

