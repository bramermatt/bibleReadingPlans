document.addEventListener('DOMContentLoaded', () => {
    const plans = [
        { name: 'Plan 1', description: 'Description of Plan 1' },
        { name: 'Plan 2', description: 'Description of Plan 2' },
        // Add more plans as needed
    ];

    const plansContainer = document.getElementById('plans-container');

    plans.forEach(plan => {
        const planElement = document.createElement('div');
        planElement.classList.add('plan');
        planElement.innerHTML = `
            <h3>${plan.name}</h3>
            <p>${plan.description}</p>
        `;
        plansContainer.appendChild(planElement);
    });

    document.getElementById('export-button').addEventListener('click', () => {
        exportToPDF();
    });
});

function exportToPDF() {
    const plansContainer = document.getElementById('plans-container');
    const pdfContent = plansContainer.innerHTML;

    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`
        <html>
            <head>
                <title>Bible Reading Plans</title>
            </head>
            <body>
                ${pdfContent}
            </body>
        </html>
    `);
    pdfWindow.document.close();
    pdfWindow.print();
}