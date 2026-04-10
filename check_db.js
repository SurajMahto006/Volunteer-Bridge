const PROJECT_ID = 'volunteerbridge-5a97c';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function checkData() {
    console.log("Checking needs...");
    const nResp = await fetch(`${BASE_URL}/needs`);
    const nData = await nResp.json();
    console.log("Needs count:", nData.documents ? nData.documents.length : 0);

    console.log("Checking volunteers...");
    const vResp = await fetch(`${BASE_URL}/volunteers`);
    const vData = await vResp.json();
    console.log("Volunteers count:", vData.documents ? vData.documents.length : 0);
    
    if (vData.documents) {
        console.log("First volunteer data:", JSON.stringify(vData.documents[0].fields, null, 2));
    }
}

checkData();
