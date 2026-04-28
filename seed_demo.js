const PROJECT_ID = 'volunteerbridge-5a97c';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function deleteCollection(collection) {
    console.log(`Purging ${collection}...`);
    const resp = await fetch(`${BASE_URL}/${collection}`);
    const data = await resp.json();
    if (data.documents) {
        for (const doc of data.documents) {
            const docPath = doc.name;
            await fetch(`https://firestore.googleapis.com/v1/${docPath}`, { method: 'DELETE' });
        }
    }
    console.log(`${collection} purged.`);
}

async function addDoc(collection, fields) {
    const formattedFields = {};
    for (const [key, value] of Object.entries(fields)) {
        if (Array.isArray(value)) {
            formattedFields[key] = {
                arrayValue: {
                    values: value.map(v => ({ stringValue: v }))
                }
            };
        }
        else if (typeof value === 'string') formattedFields[key] = { stringValue: value };
        else if (typeof value === 'number') formattedFields[key] = { integerValue: value.toString() };
        else if (value === null) formattedFields[key] = { nullValue: null };
        else if (value instanceof Date) formattedFields[key] = { timestampValue: value.toISOString() };
    }
    
    const resp = await fetch(`${BASE_URL}/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: formattedFields })
    });
    if (!resp.ok) console.error("Error adding doc:", await resp.text());
}

const NEEDS = [
    // Kalyan Medical Cluster (High Urgency -> Red Hotspot)
    { title: "Oxygen supply critical", category: "Medical", location: "Kalyan East", urgency: "high", affected: 450, ngoName: "HealthLink India", createdAt: new Date(), status: "active" },
    { title: "Insulin shortage for 200 patients", category: "Medical", location: "Kalyan West", urgency: "high", affected: 200, ngoName: "HealthLink India", createdAt: new Date(), status: "active" },
    { title: "Emergency ambulance dispatch needed", category: "Medical", location: "Kalyan Central", urgency: "high", affected: 15, ngoName: "LifeCare Trust", createdAt: new Date(), status: "active" },
    { title: "Blood bag shortage (O Negative)", category: "Medical", location: "Kalyan Circle", urgency: "high", affected: 50, ngoName: "LifeCare Trust", createdAt: new Date(), status: "active" },
    
    // Ambarnath Water Cluster (Medium Urgency -> Yellow/Orange Hub)
    { title: "Pipeline burst - No water for 1000 households", category: "Water", location: "Ambarnath North", urgency: "medium", affected: 4000, ngoName: "GreenEarth NGO", createdAt: new Date(), status: "active" },
    { title: "Contaminated water signal", category: "Water", location: "Ambarnath South", urgency: "medium", affected: 1200, ngoName: "GreenEarth NGO", createdAt: new Date(), status: "active" },
    { title: "Purification tablets required", category: "Water", location: "Ambarnath MIDC", urgency: "low", affected: 500, ngoName: "PureFlow NGO", createdAt: new Date(), status: "active" },

    // Thane/Mumbai General
    { title: "Flash floods - Temporary shelter needed", category: "Disaster", location: "Thane Station", urgency: "high", affected: 300, ngoName: "Disaster Response Unit", createdAt: new Date(), status: "active" },
    { title: "Dry ration for 50 familes", category: "Food", location: "Mumbai Central", urgency: "low", affected: 250, ngoName: "Rural Relief", createdAt: new Date(), status: "active" },
    { title: "Educational kits for slum school", category: "Education", location: "Thane Mumbra", urgency: "low", affected: 100, ngoName: "Teach All", createdAt: new Date(), status: "active" }
];

const VOLUNTEERS = [
    { name: "Dr. Sarah D'Souza", skills: ["Pediatrician", "Healthcare"], availability: ["Weekdays", "Mornings"], location: "Kalyan", experience: 12, phone: "+91 9811122233", createdAt: new Date() },
    { name: "Michael Rodriguez", skills: ["Heavy Vehicle Driver", "Logistics"], availability: ["Full-time"], location: "Thane", experience: 8, phone: "+91 9822233344", createdAt: new Date() },
    { name: "Elena Gilbert", skills: ["Civil Engineer", "Water Sanitation"], availability: ["Weekends", "Remote only"], location: "Ambarnath", experience: 5, phone: "+91 9833344455", createdAt: new Date() },
    { name: "Suresh Raina", skills: ["Paramedic", "First Aid"], availability: ["Evenings"], location: "Kalyan East", experience: 7, phone: "+91 9844455566", createdAt: new Date() },
    { name: "Aditi Rao", skills: ["Nurse Practitioner", "Healthcare"], availability: ["Weekdays"], location: "Kalyan West", experience: 6, phone: "+91 9855566677", createdAt: new Date() },
    { name: "Rajesh Kumar", skills: ["Construction", "Logistics"], availability: ["Mornings"], location: "Ambarnath North", experience: 15, phone: "+91 9866677788", createdAt: new Date() },
    { name: "Priya Sharma", skills: ["Translation (Hindi/English)", "Communication"], availability: ["Remote only"], location: "Mumbai", experience: 3, phone: "+91 9877788899", createdAt: new Date() },
    { name: "David Miller", skills: ["Warehouse Manager", "Retail"], availability: ["Full-time"], location: "Thane West", experience: 10, phone: "+91 9888899900", createdAt: new Date() },
    { name: "Anjali Gupta", skills: ["Software Developer", "Data Entry"], availability: ["Evenings", "Remote only"], location: "Kalyan", experience: 4, phone: "+91 9899900011", createdAt: new Date() },
    { name: "Vikram Singh", skills: ["Plumbing", "Electrical"], availability: ["Weekends"], location: "Ambarnath", experience: 20, phone: "+91 9800011122", createdAt: new Date() },
    { name: "Samira Khan", skills: ["Psychologist", "Crisis Counseling"], availability: ["Weekdays", "Evenings"], location: "Mumbai East", experience: 9, phone: "+91 9911122233", createdAt: new Date() },
    { name: "Robert Chen", skills: ["Chef", "Mass Cooking", "Logistics"], availability: ["Full-time"], location: "Thane", experience: 15, phone: "+91 9922233344", createdAt: new Date() },
    { name: "Fatima Bi", skills: ["Social Worker", "Child Care"], availability: ["Weekdays"], location: "Kalyan West", experience: 8, phone: "+91 9933344455", createdAt: new Date() }
];

async function seed() {
    try {
        await deleteCollection('requirements');
        await deleteCollection('volunteers');
        
        console.log("Seeding Requirements...");
        for (const n of NEEDS) await addDoc('requirements', n);
        
        console.log("Seeding Volunteers...");
        for (const v of VOLUNTEERS) await addDoc('volunteers', v);
        
        console.log("Demo Seeding Complete!");
    } catch (e) {
        console.error("Seeding Failed:", e);
    }
}

seed();
