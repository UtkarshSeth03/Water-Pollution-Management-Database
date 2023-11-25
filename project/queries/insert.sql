USE miniProject;


INSERT INTO states (`name`, `region`) VALUES 
("Maharashtra", "West"),
("Tamil Nadu", "South"),
("Uttar Pradesh", "North"),
("Karnataka", "South"),
("Gujarat", "West"),
("Jammu and Kashmir", "North"),
("Kerala", "South"),
("Madhya Pradesh", "Central"),
("Punjab", "North"),
("Bihar", "East"),
("Assam", "Northeast"),
("West Bengal", "East"),
("Rajasthan", "West");


INSERT INTO rivers (`river_id`, `name`, `level_of_pollution`, `source`, `destination`) VALUES 
("R1", "Yamuna", "3", "Yamunotri", "Allahabad"),
("R2", "Ganges", "4", "Gangotri", "Sundarbans"),
("R3", "Krishna", "2", "Mahabaleshwar", "Bay of Bengal"),
("R4", "Cauvery", "1", "Talakaveri", "Bay of Bengal"),
("R5", "Sabarmati", "5", "Aravalli Range", "Gulf of Khambhat");


INSERT INTO lakes (`lake_id`, `name`, `level_of_pollution`, `location`, `type`, `state_name`) VALUES 
("L1", "Lonar Lake", "3", "Buldhana", "Natural", "Maharashtra"),
("L2", "Venna Lake", "1", "Mahabaleshwar", "Man-made", "Maharashtra"),
("L3", "Hemavathi Reservoir", "2", "Gorur", "Man-made", "Karnataka"),
("L4", "Kukkarahalli Lake", "4", "Mysuru", "Natural", "Karnataka"),
("L5", "Ulsoor Lake", "3", "Bengaluru", "Man-made", "Karnataka"),
("L6", "Sukhna Lake", "1", "Chandigarh", "Man-made", "Punjab"),
("L7", "Harike Wetland", "5", "Tarn Taran", "Natural", "Punjab"),
("L8", "Dhordo Reservoir", "2", "Kutch", "Man-made", "Gujarat"),
("L9", "Kanwar Lake", "4", "Begusarai", "Natural", "Bihar");


INSERT INTO pollutants (`pollutant_id`, `name`, `chemical_composition`, `source`, `type`, `severity`) VALUES 
("P1", "Mercury", "Hg", "Industrial Discharges", "Chemical", "High"),
("P2", "Polyethylene", "C2H4", "Plastic Waste", "Physical", "Medium"),
("P3", "Ammonia", "NH3", "Agricultural Runoff", "Chemical", "Low"),
("P4", "Benzene", "C6H6", "Industrial Discharges", "Chemical", "High"),
("P5", "Arsenic", "As", "Mining Runoff", "Chemical", "High"),
("P6", "Phthalates", "C8H4O2", "Plastic Waste", "Chemical", "Medium");


INSERT INTO man_made_structures (`structure_id`, `start_of_operation`, `scale`, `phone_number`, `email`, `river_id`) VALUES 
("S1", "2000-01-01", "Large", "9876543210", "structure1@example.com", "R1"),
("S2", "2015-05-15", "Medium", "8765432109", "structure2@example.com", "R3"),
("S3", "1995-10-20", "Small", "7654321098", "structure3@example.com", "R5"),
("S4", "2010-03-08", "Large", "6543210987", "structure4@example.com", "R2"),
("S5", "2005-12-25", "Medium", "5432109876", "structure5@example.com", "R4");


INSERT INTO river_pollutants (`river_id`, `pollutant_id`, `concentration`, `effect`) VALUES 
("R1", "P1", "15 ppm", "Impaired fish reproduction"),
("R2", "P2", "5 mg/L", "Harm to aquatic life"),
("R3", "P3", "10 mg/L", "Nutrient enrichment"),
("R4", "P4", "20 ppm", "Oil slick on water surface"),
("R5", "P5", "25 mg/L", "Reduced light penetration");


INSERT INTO lake_pollutants (`lake_id`, `pollutant_id`, `concentration`, `effect`) VALUES 
("L1", "P1", "8 ppm", "Algae growth"),
("L2", "P2", "3 mg/L", "Microplastic ingestion by fish"),
("L2", "P3", "5 mg/L", "Nutrient enrichment"),
("L2", "P4", "8 ppm", "Oil sheen on water"),
("L3", "P3", "7 mg/L", "Eutrophication"),
("L4", "P4", "12 ppm", "Oil sheen on water"),
("L5", "P5", "18 mg/L", "Sedimentation");


INSERT INTO rivers_in_state (`river_id`, `state_name`) VALUES 
("R1", "Uttar Pradesh"),
("R1", "Madhya Pradesh"),
("R2", "West Bengal"),
("R2", "Bihar"),
("R3", "Maharashtra"),
("R3", "Karnataka"),
("R4", "Karnataka"),
("R4", "Tamil Nadu"),
("R5", "Gujarat"),
("R5", "Rajasthan");


INSERT INTO pollutants_released (`structure_id`, `pollutant_id`, `amount_released`) VALUES 
("S1", "P1", "100 kg/year"),
("S2", "P2", "50 kg/year"),
("S3", "P3", "30 kg/year"),
("S4", "P4", "80 kg/year"),
("S5", "P5", "40 kg/year");


INSERT INTO government_bodies (`body_id`, `name`, `city/town`, `phone`, `email`, `state_name`) VALUES 
("GB1", "State Pollution Control Board", "Mumbai", "0123456789", "spcb@example.com", "Maharashtra"),
("GB2", "Environmental Department", "Chennai", "9876543210", "environment@example.com", "Tamil Nadu"),
("GB3", "Water Resources Authority", "Lucknow", "8765432109", "water_authority@example.com", "Uttar Pradesh"),
("GB4", "Forest and Environment Department", "Bangalore", "7654321098", "forest_env@example.com", "Karnataka"),
("GB5", "Gujarat Pollution Control Board", "Gandhinagar", "6543210987", "gpcb@example.com", "Gujarat");


INSERT INTO remedies (`pollutant_id`, `remedy_id`, `name`, `effect`, `scale`, `avg_price`) VALUES 
("P1", "REM1", "Phytoremediation", "Removes mercury from soil and water", "Large", 1000.00),
("P2", "REM2", "Beach Cleanup", "Reduces plastic pollution in coastal areas", "Medium", 500.00),
("P2", "REM3", "Innovative Packaging Solutions", "Promotes and implements eco-friendly packaging alternatives", "Medium", 400.00),
("P2", "REM4", "River Cleanup", "Removes polyethylene waste from rivers and water bodies", "Large", 800.00),
("P3", "REM5", "Nutrient Management", "Reduces ammonia runoff from agricultural fields", "Small", 300.00),
("P4", "REM6", "Air Quality Monitoring", "Monitors and controls benzene emissions", "Medium", 600.00),
("P4", "REM7", "Soil Remediation", "Remediates soil contaminated with benzene", "Medium", 500.00),
("P5", "REM8", "Water Treatment", "Removes arsenic from water sources", "Large", 800.00),
("P6", "REM9", "Plastic Recycling", "Recycles plastic to reduce phthalate pollution", "Medium", 450.00);


INSERT INTO admins (`id`, `first_name`, `last_name`, `password`) VALUES
(1, "Utkarsh", "Seth", "pass");