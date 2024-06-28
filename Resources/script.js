document.addEventListener('DOMContentLoaded', () => {
    const userInfoForm = document.getElementById('userInfoForm');
    const updateMessage = document.getElementById('updateMessage');

    userInfoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(userInfoForm);
        const userInfo = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/updateUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if (!response.ok) {
                throw new Error('Failed to update user information');
            }

            const result = await response.json();
            updateMessage.textContent = result.message; // Update message on the page
        } catch (error) {
            console.error('Error:', error);
            updateMessage.textContent = 'An error occurred while updating user information';
        }
    });
});


// save new entry
document.addEventListener('DOMContentLoaded', () => {
    const newEntryForm = document.getElementById('newEntryForm');
    const entryMessage = document.getElementById('entryMessage');

    // Function to save new entry
    async function saveNewEntry() {
        const entryDate = document.getElementById('entryDate').value;
        const ministeredTo = document.getElementById('ministeredTo').value;
        const itemsDonated = document.getElementById('itemsDonated').value;
        const workHours = document.getElementById('workHours').value;

        if (entryDate && ministeredTo && workHours) {
            const entryData = {
                entryDate,
                ministeredTo,
                itemsDonated,
                workHours
            };

            try {
                const response = await fetch('/saveNewEntry', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(entryData)
                });

                if (!response.ok) {
                    throw new Error('Failed to save entry');
                }

                const result = await response.json();
                entryMessage.textContent = result.message;
            } catch (error) {
                console.error('Error:', error);
                entryMessage.textContent = 'An error occurred while saving entry';
            }
        } else {
            entryMessage.textContent = 'Please fill out all required fields.';
        }
    }

    // Attach saveNewEntry function to button click
    const saveButton = document.querySelector('button');
    saveButton.addEventListener('click', saveNewEntry);
});
