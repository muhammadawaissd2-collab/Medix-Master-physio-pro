import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enrichDisorders = () => {
    const disPath = path.join(__dirname, 'disorders.json');
    let disData = JSON.parse(fs.readFileSync(disPath, 'utf8'));

    disData = disData.map((d: any) => {
        // Add more deep details
        if (!d.special_tests) {
            d.special_tests = [];
        }
        if (!d.msk_tests) {
            d.msk_tests = [];
        }
        if (!d.treatment_plan && !d.pt_plan) {
            d.treatment_plan = {
                acute: "Manage pain, control inflammation (RICE), patient education.",
                subacute: "Gradual ROM restoration, early strengthening, isometric exercises.",
                chronic: "Progressive resistive exercises, functional training, return-to-sport protocols."
            };
        }
        if (!d.diagnostic_tips) {
            d.diagnostic_tips = "Diagnosis based on comprehensive clinical examination and patient history. Imaging (MRI/X-ray) as indicated to rule out structural damage.";
        }
        if (!d.red_flags) {
            d.red_flags = ["Unremitting night pain", "Unexpected weight loss", "Progressive neurological deficit", "Fever/systemic symptoms"];
        }
        
        // Enrich specific conditions implicitly based on name keywords if lacking tests
        if (d.name.includes("Herniation") || d.name.includes("Sciatica")) {
            d.msk_tests = [...new Set([...d.msk_tests, "Straight Leg Raise", "Slump Test", "Crossed Straight Leg Raise"])];
        }
        if (d.name.includes("Shoulder") || d.name.includes("Rotator") || d.name.includes("Labrum") || d.name.includes("Labral")) {
            d.msk_tests = [...new Set([...d.msk_tests, "Empty Can / Jobe Test", "Drop Arm Test", "Biceps Load Test II", "Posterior Apprehension Test", "Crank Test"])];
        }
        if (d.name.includes("Knee") || d.name.includes("ACL") || d.name.includes("Meniscus")) {
            d.msk_tests = [...new Set([...d.msk_tests, "Lachman Test", "McMurray Test", "Thessaly Test", "Apley's Compression Test"])];
        }

        return d;
    });

    fs.writeFileSync(disPath, JSON.stringify(disData, null, 2));
};

const enrichSportsInjuries = () => {
    const siPath = path.join(__dirname, 'sports-injuries.json');
    let siData = JSON.parse(fs.readFileSync(siPath, 'utf8'));

    siData = siData.map((si: any) => {
        if (!si.msk_tests) {
            si.msk_tests = [];
        }
        if (si.name.includes("Knee") || si.name.includes("Patellar")) {
            si.msk_tests = [...new Set([...si.msk_tests, "Single Leg Decline Squat", "Lachman Test"])];
        }
        if (si.name.includes("Shoulder") || si.name.includes("SLAP")) {
            si.msk_tests = [...new Set([...si.msk_tests, "O'Brien Active Compression", "Kim Test", "Jerk Test"])];
        }
        if (si.name.includes("Concussion")) {
            si.msk_tests = [...new Set([...si.msk_tests, "SCAT5", "VOMS", "BESS"])];
        }
        if (si.name.includes("Elbow") || si.name.includes("Epicondyle")) {
            si.msk_tests = [...new Set([...si.msk_tests, "Cozens Test", "Mills Test", "Maudsley Test"])];
        }
        if (si.name.includes("Tunnel") || si.name.includes("Carpal")) {
            si.msk_tests = [...new Set([...si.msk_tests, "Phalen Test", "Reverse Phalen", "Tinel Sign at Wrist", "Carpal Compression Test (Durkan)"])];
        }
        if (!si.diagnostic_tips) {
            si.diagnostic_tips = "Utilize functional testing and sport-specific biomechanical analysis. Advanced imaging only if conservative management fails.";
        }
        if (!si.prevention) {
            si.prevention = ["Load management", "Strength & conditioning program", "Biomechanical correction", "Adequate rest periods"];
        }
        if (!si.severity) {
            si.severity = "Variable based on grade of strain/sprain.";
        }
        return si;
    });

    fs.writeFileSync(siPath, JSON.stringify(siData, null, 2));
};

enrichDisorders();
enrichSportsInjuries();
console.log('Successfully enriched all disorders and sports injuries with extra details and MSK tests.');
