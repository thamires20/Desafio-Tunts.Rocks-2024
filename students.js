const { google } = require('googleapis');
const keys = require('./credentials.json');

// Configure authentication
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const sheets = google.sheets({ version: 'v4', auth: client });

// Function for calculating the student's situation
function calculateSituation(average, absences) {
    if (absences > 0.25 * 60) {
        return 'Failed due to Absences';
    } else if (average < 5) {
        return 'Failed due to Grades';
    } else if (average < 7) {
        return 'Final Exam';
    } else {
        return 'Approved';
    }
}

// Function to calculate the grade for final approval (naf)
function calculateNaf(average, situation) {
    if (situation === 'Final Exam') {
        return Math.ceil((5 - average) * 2); //Formula to ensure that (average + naf) / 2 >= 5
    } else {
        return 0;
    }
}

async function processSpreadsheet() {
    try {
        const spreadsheetId = '1aTcGZrdLILJTpf7savruMwK3aAOon4S6jbvZ5iFClNA';
        const range = "'engenharia_de_software'!A4:H27"; // Starts from line 4

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const values = response.data.values;

        if (values) {
            for (let i = 0; i < values.length; i++) {
                const enrollment = values[i][0];
                const student = values[i][1];
                const absences = Number(values[i][2]);
                const P1 = Number(values[i][3]);
                const P2 = Number(values[i][4]);
                const P3 = Number(values[i][5]);

                const average = (P1 + P2 + P3) / 3;
                const studentSituation = calculateSituation(average, absences);
                const studentNaf = calculateNaf(average, studentSituation);

                // Update the spreadsheet
                const updateData = {
                    values: [[studentSituation, studentNaf]],
                };

                await sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: `'engenharia_de_software'!G${i + 4}:H${i + 4}`, // Column G and H, line 4 to 27
                    valueInputOption: 'USER_ENTERED',
                    resource: updateData,
                });

                console.log(`Enrollment ${enrollment}: ${student}`);
                console.log(`Average: ${average.toFixed(2)}`);
                console.log(`Situation: ${studentSituation}`);
                console.log(`Grade for Final Approval: ${studentNaf}`);
                console.log('Updated spreadsheet.');
                console.log('-------------------------');
            }
        } else {
            console.log('No data found in the spreadsheet.');
        }
    } catch (error) {
        console.error('Error processing the spreadsheet:', error.message);
    }
}

// Execute the function
processSpreadsheet();
