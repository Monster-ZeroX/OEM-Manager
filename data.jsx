const data = {
    indian: [
        {
            id: "alto800",
            name: "Suzuki Alto 800",
            year: "2015",
            flag: "🇮🇳",
            type: "Indian",
            parts: [
                {
                    category: "Engine", items: [
                        { name: "Air filter", pn: "13780-68L00" },
                        { name: "Oil filter", pn: "16510-61A31" },
                        { name: "Engine oil 10W-30 (600cc)", pn: "—" },
                        { name: "Spark plugs NGK BKR5E", pn: "NGK: BKR5E / 4644" },
                        { name: "Timing chain kit", pn: "12761-68L00 (guide)" },
                        { name: "Piston rings set STD", pn: "12140-68L00" },
                        { name: "Valve seals set", pn: "09289-05001" },
                        { name: "Cylinder head gasket", pn: "11141-68L01" },
                        { name: "Engine mount front", pn: "11610-68L00" },
                        { name: "Engine mount rear", pn: "11620-68L00" },
                        { name: "Crankshaft front seal", pn: "09283-38011" },
                        { name: "Crankshaft rear seal", pn: "09283-72011" },
                        { name: "Throttle body gasket", pn: "13411-68L00" },
                        { name: "Rocker cover gasket", pn: "11189-68L00" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Radiator cap", pn: "17730-78J00" },
                        { name: "Coolant / LLC", pn: "99000-99032-13E" },
                        { name: "Thermostat", pn: "17670-68L00" },
                        { name: "Water pump", pn: "17400-68L00" },
                        { name: "Radiator hose upper", pn: "17871-68L00" },
                        { name: "Radiator hose lower", pn: "17881-68L00" },
                        { name: "Fan belt", pn: "17521-68L00" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 35Ah MF", pn: "Market: 35B20L" },
                        { name: "Alternator", pn: "31400-68L62" },
                        { name: "Starter motor", pn: "31100-68L62" },
                        { name: "Ignition coil", pn: "33410-68L00" },
                        { name: "Fuse set", pn: "09482-10803" },
                        { name: "Headlight bulb H4", pn: "NGK / Philips H4 60/55W" },
                        { name: "Wiper blades", pn: "38340-76G00 (driver)" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-68L00" },
                        { name: "Rear brake shoes", pn: "53200-68L00" },
                        { name: "Rear brake drum", pn: "53111-68L00" },
                        { name: "Front disc rotor", pn: "55311-68L00" },
                        { name: "Brake master cylinder", pn: "51100-68L02" },
                        { name: "Wheel cylinder rear", pn: "53400-68L00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Handbrake cable", pn: "54430-68L00" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "41600-68L02" },
                        { name: "Rear shock absorber", pn: "41800-68L02" },
                        { name: "Front coil spring", pn: "41411-68L00" },
                        { name: "Lower ball joint", pn: "45202-68L00" },
                        { name: "Tie rod end outer", pn: "48810-68L00" },
                        { name: "Tie rod end inner", pn: "48820-68L00" },
                        { name: "Steering rack boot kit", pn: "48746-68L00" },
                        { name: "Strut mount bearing", pn: "41741-68L00" },
                        { name: "Stabilizer link", pn: "42420-68L00" },
                    ]
                },
                {
                    category: "Transmission & Clutch", items: [
                        { name: "Clutch plate", pn: "22400-68L01" },
                        { name: "Pressure plate", pn: "22300-68L01" },
                        { name: "Release bearing", pn: "23265-68L00" },
                        { name: "Clutch cable", pn: "23710-68L00" },
                        { name: "Gear oil 75W-90", pn: "99000-22B50-02E" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Fuel filter", pn: "15410-68L00" },
                        { name: "Fuel pump assembly", pn: "15100-68L61" },
                        { name: "Fuel cap", pn: "89390-68L00" },
                        { name: "Fuel hose", pn: "15861-68L00" },
                    ]
                },
                {
                    category: "Body & Rubber", items: [
                        { name: "Wiper motor", pn: "38110-68L00" },
                        { name: "Door handle outer (front)", pn: "69220-68L00" },
                        { name: "Door handle inner", pn: "69205-68L00" },
                        { name: "Door mirror glass LH", pn: "84702-68L00" },
                        { name: "Tail light assembly LH", pn: "35615-68L00" },
                        { name: "Headlight assembly LH", pn: "35320-68L00" },
                        { name: "Bonnet rubber seal", pn: "75841-68L00" },
                        { name: "Door rubber seal front", pn: "72821-68L00" },
                    ]
                },
                {
                    category: "Wheels & Tyres", items: [
                        { name: "Tyre 145/80 R12", pn: "Market spec" },
                        { name: "Front wheel bearing", pn: "09265-40003" },
                        { name: "Rear wheel bearing", pn: "09265-35004" },
                        { name: "Wheel studs & nuts", pn: "43220-68L00" },
                    ]
                },
            ]
        },
        {
            id: "altoLxi",
            name: "Suzuki Alto Lxi",
            year: "2010",
            flag: "🇮🇳",
            type: "Indian",
            parts: [
                {
                    category: "Engine", items: [
                        { name: "Air filter", pn: "13780-68L00 / 13780-62J00" },
                        { name: "Oil filter", pn: "16510-61A21" },
                        { name: "Spark plugs NGK BKR5E", pn: "NGK: BKR5E" },
                        { name: "Timing belt kit (F10D)", pn: "12761-62J00 (belt) / 12721-62J00 (tensioner)" },
                        { name: "Engine oil 10W-30", pn: "—" },
                        { name: "Valve cover gasket", pn: "11189-62J00" },
                        { name: "Crankshaft front seal", pn: "09283-38011" },
                        { name: "Engine mount front", pn: "11610-62J00" },
                        { name: "Engine mount rear", pn: "11620-62J00" },
                        { name: "Intake manifold gasket", pn: "13141-62J00" },
                        { name: "Exhaust manifold gasket", pn: "14141-62J00" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Thermostat", pn: "17670-62J00" },
                        { name: "Water pump", pn: "17400-62J00" },
                        { name: "Radiator hose upper", pn: "17871-62J00" },
                        { name: "Radiator hose lower", pn: "17881-62J00" },
                        { name: "Coolant", pn: "99000-99032-13E" },
                        { name: "Radiator cap", pn: "17730-78J00" },
                        { name: "Fan belt", pn: "17521-62J00" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 35Ah", pn: "Market: 35B20L" },
                        { name: "Alternator brushes", pn: "31400-62J60" },
                        { name: "Ignition module", pn: "33410-62J00" },
                        { name: "Fuse box set", pn: "09482-10803" },
                        { name: "Headlight H4 bulb", pn: "Philips 12342 / NGK" },
                        { name: "Wiper blades", pn: "38340-62J00" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-62J00" },
                        { name: "Rear brake shoes", pn: "53200-62J00" },
                        { name: "Rear brake drum", pn: "53111-62J00" },
                        { name: "Front disc rotor", pn: "55311-62J00" },
                        { name: "Brake master cylinder kit", pn: "51100-62J01" },
                        { name: "Rear wheel cylinder", pn: "53400-62J00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Brake hose front", pn: "51564-62J00" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "41600-62J01" },
                        { name: "Rear shock absorber", pn: "41800-62J01" },
                        { name: "Lower ball joint", pn: "45202-62J00" },
                        { name: "Tie rod end outer", pn: "48810-62J00" },
                        { name: "Steering rack boot", pn: "48746-62J00" },
                        { name: "Strut mount", pn: "41741-62J00" },
                        { name: "Control arm bush", pn: "45260-62J00" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "22400-62J01" },
                        { name: "Pressure plate", pn: "22300-62J01" },
                        { name: "Release bearing", pn: "23265-62J00" },
                        { name: "Clutch cable", pn: "23710-62J00" },
                        { name: "Gear oil 75W-90", pn: "99000-22B50-02E" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Fuel filter", pn: "15410-62J00" },
                        { name: "Fuel pump", pn: "15100-62J60" },
                        { name: "Carburettor kit", pn: "13200-62J10 (carb assy)" },
                        { name: "Fuel cap", pn: "89390-62J00" },
                    ]
                },
            ]
        },
        {
            id: "maruti800",
            name: "Suzuki Maruti 800",
            year: "2003",
            flag: "🇮🇳",
            type: "Indian",
            parts: [
                {
                    category: "Engine", items: [
                        { name: "Air filter", pn: "13780-80EA0" },
                        { name: "Oil filter", pn: "16510-80EB1" },
                        { name: "Spark plugs NGK B6EB", pn: "NGK: B6EB" },
                        { name: "Carburetor rebuild kit", pn: "13200-80EA0 (carb assy)" },
                        { name: "Engine oil 20W-40", pn: "—" },
                        { name: "Piston rings STD", pn: "12140-80EA0" },
                        { name: "Valve seals set", pn: "09289-05001" },
                        { name: "Head gasket", pn: "11141-80EA0" },
                        { name: "Timing belt", pn: "12761-80EA0" },
                        { name: "Engine mount front", pn: "11610-80EA0" },
                        { name: "Rocker arm set", pn: "12840-80EA0" },
                        { name: "Valve cover gasket", pn: "11189-80EA0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Fan belt", pn: "17521-80EA0" },
                        { name: "Water pump", pn: "17400-80EA0" },
                        { name: "Thermostat", pn: "17670-80EA0" },
                        { name: "Radiator cap", pn: "17730-78J00" },
                        { name: "Radiator hose upper", pn: "17871-80EA0" },
                        { name: "Coolant", pn: "99000-99032-13E" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 35Ah", pn: "Market: 35B20L" },
                        { name: "Distributor cap", pn: "33162-80EA0" },
                        { name: "Distributor rotor", pn: "33163-80EA0" },
                        { name: "Ignition leads HT set", pn: "33711-80EA0" },
                        { name: "Points & condenser set", pn: "33164-80EA0" },
                        { name: "Alternator", pn: "31400-80EA0" },
                        { name: "Starter motor", pn: "31100-80EA0" },
                        { name: "Headlight H4", pn: "Philips 12342" },
                        { name: "Fuse set", pn: "09482-10803" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-80EA0" },
                        { name: "Rear brake shoes", pn: "53200-80EA0" },
                        { name: "Rear brake drum", pn: "53111-80EA0" },
                        { name: "Front disc rotor", pn: "55311-80EA0" },
                        { name: "Master cylinder kit", pn: "51100-80EA0" },
                        { name: "Wheel cylinder kit rear", pn: "53400-80EA0" },
                        { name: "Handbrake cable", pn: "54430-80EA0" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber", pn: "41600-80EA0" },
                        { name: "Rear shock absorber", pn: "41800-80EA0" },
                        { name: "Ball joint lower", pn: "45202-80EA0" },
                        { name: "Tie rod end outer", pn: "48810-80EA0" },
                        { name: "Rack boot kit", pn: "48746-80EA0" },
                        { name: "Control arm bush", pn: "45260-80EA0" },
                    ]
                },
                {
                    category: "Clutch", items: [
                        { name: "Clutch plate", pn: "22400-80EA0" },
                        { name: "Pressure plate", pn: "22300-80EA0" },
                        { name: "Release bearing", pn: "23265-80EA0" },
                        { name: "Clutch cable", pn: "23710-80EA0" },
                    ]
                },
                {
                    category: "Fuel", items: [
                        { name: "Fuel filter", pn: "15410-80EA0" },
                        { name: "Fuel pump mechanical", pn: "15100-80EA0" },
                        { name: "Fuel cap gasket", pn: "89390-80EA0" },
                    ]
                },
            ]
        },
        {
            id: "tataAce",
            name: "Tata Ace",
            year: "",
            flag: "🇮🇳",
            type: "Indian",
            parts: [
                {
                    category: "Engine", items: [
                        { name: "Air filter", pn: "269992300009" },
                        { name: "Oil filter", pn: "269992400013" },
                        { name: "Fuel filter", pn: "269992600159" },
                        { name: "Engine oil 15W-40 (4L)", pn: "—" },
                        { name: "Injector nozzle", pn: "269992500019" },
                        { name: "Head gasket set", pn: "269993200001" },
                        { name: "Valve set inlet", pn: "269993100007" },
                        { name: "Valve set exhaust", pn: "269993100008" },
                        { name: "Piston & liner kit", pn: "269992100017" },
                        { name: "Connecting rod bearing", pn: "269992200042" },
                        { name: "Main bearing set", pn: "269992200041" },
                        { name: "Crankshaft front seal", pn: "269997000142" },
                        { name: "Crankshaft rear seal", pn: "269997000143" },
                        { name: "Engine mount set", pn: "269995800004" },
                        { name: "Rocker cover gasket", pn: "269993400003" },
                        { name: "Timing gear set", pn: "269992700001" },
                        { name: "Glow plugs", pn: "269992800003" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump", pn: "269994600004" },
                        { name: "Thermostat", pn: "269994700001" },
                        { name: "Radiator cap", pn: "269994900001" },
                        { name: "Radiator hose upper", pn: "269994800005" },
                        { name: "Fan belt", pn: "269995200002" },
                        { name: "Coolant", pn: "—" },
                    ]
                },
                {
                    category: "Fuel / Injection", items: [
                        { name: "Injection pump repair kit", pn: "269992600005" },
                        { name: "High pressure pipe set", pn: "269992600161" },
                        { name: "Fuel lift pump", pn: "269992600160" },
                        { name: "Fuel tank cap", pn: "269996900001" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 60Ah", pn: "Market: 60B24L or 55D26L" },
                        { name: "Alternator", pn: "269996400001" },
                        { name: "Starter motor", pn: "269996200001" },
                        { name: "Glow plug relay", pn: "269996800003" },
                        { name: "Headlight H4", pn: "269997400001" },
                        { name: "Wiper blades", pn: "269998000001" },
                        { name: "Fuse set", pn: "269997300001" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "269995500010" },
                        { name: "Rear brake shoes", pn: "269995500011" },
                        { name: "Rear drum", pn: "269995400001" },
                        { name: "Master cylinder kit", pn: "269995600001" },
                        { name: "Wheel cylinder rear", pn: "269995600002" },
                        { name: "Brake hose front", pn: "269995700003" },
                        { name: "Brake fluid DOT3", pn: "—" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "269996100001" },
                        { name: "Leaf spring bush set", pn: "269996000005" },
                        { name: "U-bolt set", pn: "269996000006" },
                        { name: "Ball joint", pn: "269995900003" },
                        { name: "Tie rod end", pn: "269995900004" },
                        { name: "King pin set", pn: "269995900001" },
                    ]
                },
                {
                    category: "Clutch", items: [
                        { name: "Clutch plate", pn: "269997200001" },
                        { name: "Pressure plate", pn: "269997200002" },
                        { name: "Release bearing", pn: "269997200003" },
                        { name: "Clutch cable", pn: "269997200005" },
                        { name: "Gear oil 80W-90", pn: "—" },
                    ]
                },
            ]
        },
        {
            id: "tataSuperAce",
            name: "Tata Super Ace",
            year: "",
            flag: "🇮🇳",
            type: "Indian",
            parts: [
                {
                    category: "Engine (1.4 Dicor TCIC)", items: [
                        { name: "Air filter", pn: "285002300004" },
                        { name: "Oil filter", pn: "285002400004" },
                        { name: "Fuel filter", pn: "285002600004" },
                        { name: "Engine oil 15W-40 (5L)", pn: "—" },
                        { name: "Turbocharger", pn: "285003900001" },
                        { name: "Intercooler hose set", pn: "285004200002" },
                        { name: "Head gasket set", pn: "285003200001" },
                        { name: "Injectors", pn: "285002500004" },
                        { name: "Injection pump kit", pn: "285002600005" },
                        { name: "Valve set", pn: "285003100005" },
                        { name: "Piston & liner kit", pn: "285002100004" },
                        { name: "Main bearing set", pn: "285002200004" },
                        { name: "Crankshaft seal set", pn: "285007000004" },
                        { name: "Engine mount", pn: "285005800002" },
                        { name: "Timing belt kit", pn: "285002700004" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Radiator", pn: "285004900001" },
                        { name: "Water pump", pn: "285004600001" },
                        { name: "Thermostat", pn: "285004700001" },
                        { name: "Coolant hose set", pn: "285004800002" },
                        { name: "Fan belt", pn: "285005200001" },
                        { name: "Coolant", pn: "—" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 60Ah", pn: "Market: 55D26L" },
                        { name: "Alternator", pn: "285006400001" },
                        { name: "Starter motor", pn: "285006200001" },
                        { name: "Glow plugs", pn: "285002800001" },
                        { name: "ECU relay", pn: "285006800001" },
                        { name: "Headlight assembly", pn: "285007400001" },
                        { name: "Wiper blades", pn: "285008000001" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front disc pads", pn: "285005500004" },
                        { name: "Rear drum shoes", pn: "285005500005" },
                        { name: "Rear drum", pn: "285005400001" },
                        { name: "Brake hose", pn: "285005700001" },
                        { name: "Master cylinder kit", pn: "285005600001" },
                        { name: "Brake booster", pn: "285005600002" },
                        { name: "Brake fluid DOT3", pn: "—" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber", pn: "285006100001" },
                        { name: "Rear shock absorber", pn: "285006100002" },
                        { name: "Ball joint", pn: "285005900003" },
                        { name: "Tie rod end", pn: "285005900004" },
                        { name: "Wheel bearing front", pn: "285009300002" },
                    ]
                },
                {
                    category: "Clutch & Transmission", items: [
                        { name: "Clutch kit (plate+PP+bearing)", pn: "285007200001" },
                        { name: "Release bearing", pn: "285007200003" },
                        { name: "Gear oil 80W-90", pn: "—" },
                    ]
                },
            ]
        },
    ],
    japan: [
        {
            id: "wagonR55s",
            name: "Suzuki Wagon R MH55S",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (R06A)", items: [
                        { name: "Air filter", pn: "13780-50M00" },
                        { name: "Oil filter", pn: "16510-81403" },
                        { name: "Engine oil 0W-20 (2.7L)", pn: "99000-22R11-03E" },
                        { name: "Spark plugs NGK ILKAR7L11", pn: "NGK: ILKAR7L11 / 97942" },
                        { name: "PCV valve", pn: "11810-50M00" },
                        { name: "Engine mount front", pn: "11610-50M10" },
                        { name: "Engine mount rear", pn: "11620-50M10" },
                        { name: "Valve cover gasket", pn: "11189-50M00" },
                        { name: "Timing chain kit", pn: "12761-50M00 (guide)" },
                        { name: "VVT solenoid", pn: "18118-50M00" },
                        { name: "Crankshaft front seal", pn: "09283-38025" },
                    ]
                },
                {
                    category: "Belts", items: [
                        { name: "AC belt 4PK 709", pn: "OEM: 17521-50M41" },
                        { name: "Alternator belt 6PK 788", pn: "OEM: 17522-50MD1" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "99000-99032-13E" },
                        { name: "Thermostat", pn: "17670-50M10" },
                        { name: "Water pump", pn: "17400-50M10" },
                        { name: "Radiator cap", pn: "17730-50M00" },
                        { name: "Radiator hose upper", pn: "17871-50M10" },
                        { name: "Radiator hose lower", pn: "17881-50M10" },
                        { name: "Radiator", pn: "17700-50M10" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 38B20L MF", pn: "Market: 38B20L" },
                        { name: "Alternator", pn: "31400-50M60" },
                        { name: "Starter motor", pn: "31100-50M60" },
                        { name: "Ignition coil (x3)", pn: "33410-50M00" },
                        { name: "O2 sensor (upstream)", pn: "18213-50M00" },
                        { name: "MAF sensor", pn: "13800-50M10" },
                        { name: "Throttle position sensor", pn: "13400-50M00" },
                        { name: "Fuse set", pn: "09482-10803" },
                        { name: "Headlight H4 bulb", pn: "35120-50M00 (assy)" },
                        { name: "Wiper blades", pn: "38340-50M00 (driver)" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-50M00" },
                        { name: "Rear brake shoes", pn: "53200-50M00" },
                        { name: "Rear drum", pn: "53111-50M00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Rear wheel cylinder", pn: "53400-50M00" },
                        { name: "Front brake hose", pn: "51564-50M00" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "41603-50M02" },
                        { name: "Front shock absorber RH", pn: "41604-50M02" },
                        { name: "Rear shock absorber", pn: "41800-50M12" },
                        { name: "Strut mount bearing", pn: "41741-50M00" },
                        { name: "Lower ball joint", pn: "45202-50M00" },
                        { name: "Tie rod end outer", pn: "48810-50M00" },
                        { name: "Stabilizer link", pn: "42420-50M00" },
                        { name: "Control arm bush", pn: "45260-50M10" },
                    ]
                },
                {
                    category: "CVT Transmission", items: [
                        { name: "CVT fluid CVTF3317 (4.5L)", pn: "99000-22T02-001" },
                        { name: "CVT filter", pn: "28161-50M00" },
                        { name: "Gear oil seal set", pn: "09283-50010" },
                        { name: "Shift solenoid", pn: "28461-50M00" },
                        { name: "Drive shaft boot kit LH", pn: "44118-50M00" },
                        { name: "Drive shaft boot kit RH", pn: "44118-50M10" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "AC compressor", pn: "95200-50MA0" },
                        { name: "AC condenser", pn: "95300-50MA0" },
                        { name: "Cabin air filter", pn: "95861-50M00" },
                        { name: "Refrigerant R134a", pn: "99000-99100-04E" },
                        { name: "Expansion valve", pn: "95530-50MA0" },
                        { name: "AC pressure switch", pn: "95870-50MA0" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Fuel filter", pn: "15410-50M00" },
                        { name: "Fuel pump assembly", pn: "15100-50M61" },
                        { name: "Fuel injector", pn: "15710-50M00" },
                        { name: "Fuel cap", pn: "89390-50M00" },
                    ]
                },
            ]
        },
        {
            id: "wagonR44s",
            name: "Suzuki Wagon R MH44S",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (R06A)", items: [
                        { name: "Air filter", pn: "13780-50M00" },
                        { name: "Oil filter", pn: "16510-81403" },
                        { name: "Engine oil 0W-20 (2.7L)", pn: "99000-22R11-03E" },
                        { name: "Spark plugs NGK iridium", pn: "NGK: ILKAR7L11" },
                        { name: "Engine mount front", pn: "11610-50M00" },
                        { name: "Engine mount rear", pn: "11620-50M00" },
                        { name: "Valve cover gasket", pn: "11189-50M00" },
                        { name: "Timing chain kit", pn: "12761-50M00" },
                        { name: "PCV valve", pn: "11810-50M00" },
                        { name: "Crankshaft seal", pn: "09283-38025" },
                    ]
                },
                {
                    category: "Belts", items: [
                        { name: "AC belt (OEM)", pn: "17521-50M40" },
                        { name: "Alternator belt 5PK 777", pn: "17522-50M40" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "99000-99032-13E" },
                        { name: "Thermostat", pn: "17670-50M00" },
                        { name: "Water pump", pn: "17400-50M00" },
                        { name: "Radiator hose upper", pn: "17871-50M00" },
                        { name: "Radiator cap", pn: "17730-50M00" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 38B20L", pn: "Market: 38B20L" },
                        { name: "Ignition coil", pn: "33410-50M00" },
                        { name: "O2 sensor", pn: "18213-50M00" },
                        { name: "MAF sensor", pn: "13800-50M00" },
                        { name: "Wiper blades", pn: "38340-50M00" },
                        { name: "Headlight bulb H4", pn: "35120-50M00" },
                        { name: "Fuse set", pn: "09482-10803" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-50M00" },
                        { name: "Rear brake shoes", pn: "53200-50M00" },
                        { name: "Rear drum", pn: "53111-50M00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Rear wheel cylinder", pn: "53400-50M00" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber", pn: "41600-50M02" },
                        { name: "Rear shock absorber", pn: "41800-50M02" },
                        { name: "Lower ball joint", pn: "45202-50M00" },
                        { name: "Tie rod end outer", pn: "48810-50M00" },
                        { name: "Strut mount bearing", pn: "41741-50M00" },
                        { name: "Stabilizer link", pn: "42420-50M00" },
                    ]
                },
                {
                    category: "CVT Transmission", items: [
                        { name: "CVT fluid (4.5L)", pn: "99000-22T02-001" },
                        { name: "CVT filter", pn: "28161-50M00" },
                        { name: "Drive shaft boot LH", pn: "44118-50M00" },
                        { name: "Drive shaft boot RH", pn: "44118-50M10" },
                        { name: "Oil seal set", pn: "09283-50010" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "95861-50M00" },
                        { name: "AC compressor", pn: "95200-50M00" },
                        { name: "AC belt", pn: "17521-50M40" },
                        { name: "Refrigerant R134a", pn: "99000-99100-04E" },
                    ]
                },
            ]
        },
        {
            id: "aqua",
            name: "Toyota Aqua NHP10",
            year: "2012/2013",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (1NZ-FXE)", items: [
                        { name: "Air filter", pn: "17801-21050" },
                        { name: "Oil filter", pn: "90915-YZZD3" },
                        { name: "Engine oil 0W-20 (3.7L)", pn: "08880-10606" },
                        { name: "Spark plugs NGK DILKAR7C11H", pn: "NGK: DILKAR7C11H / 90048-51183" },
                        { name: "PCV valve", pn: "12204-21010" },
                        { name: "Engine mount front", pn: "12361-21100" },
                        { name: "Engine mount rear", pn: "12371-21100" },
                        { name: "Valve cover gasket", pn: "11213-21010" },
                        { name: "VVT solenoid", pn: "15330-21010" },
                        { name: "Timing chain kit", pn: "13506-21011 (guide)" },
                        { name: "Crankshaft front seal", pn: "90311-38090" },
                    ]
                },
                {
                    category: "Hybrid System", items: [
                        { name: "HV battery cooling fan filter", pn: "88880-52080" },
                        { name: "Inverter coolant (SLLC 2L)", pn: "08889-01005" },
                        { name: "Inverter coolant pump", pn: "16910-37010" },
                        { name: "HV battery module (cells)", pn: "G9280-47031 (module)" },
                        { name: "Hybrid transaxle fluid (4L)", pn: "08886-01705" },
                        { name: "HV contactor relay", pn: "G9240-47020" },
                        { name: "High voltage cable set", pn: "82272-47010" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Engine coolant SLLC (2L)", pn: "08889-01005" },
                        { name: "Thermostat", pn: "90916-03136" },
                        { name: "Radiator hose upper", pn: "16571-21050" },
                        { name: "Radiator hose lower", pn: "16572-21040" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Water pump", pn: "16100-29185" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "12V battery 46B24L", pn: "Market: 46B24L" },
                        { name: "Headlight H11 bulb", pn: "90981-11132" },
                        { name: "Wiper blade driver", pn: "85212-52220" },
                        { name: "Wiper blade passenger", pn: "85222-52220" },
                        { name: "O2 sensor upstream", pn: "89467-52020" },
                        { name: "MAF sensor", pn: "22204-21010" },
                        { name: "Fuse set", pn: "82641-52010" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-52220" },
                        { name: "Rear brake pads", pn: "04466-52050" },
                        { name: "Front disc rotor", pn: "43512-52140" },
                        { name: "Rear disc rotor", pn: "42431-52110" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                        { name: "Front caliper repair kit", pn: "04479-12180" },
                        { name: "Rear caliper repair kit", pn: "04479-52050" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "48520-52490" },
                        { name: "Front shock absorber RH", pn: "48510-52490" },
                        { name: "Rear shock absorber LH", pn: "48540-52231" },
                        { name: "Rear shock absorber RH", pn: "48530-52231" },
                        { name: "Strut mount bearing", pn: "43230-52030" },
                        { name: "Lower ball joint", pn: "43330-52060" },
                        { name: "Tie rod end outer", pn: "45046-09310" },
                        { name: "Stabilizer link front", pn: "48820-52040" },
                        { name: "Control arm bush front", pn: "48654-52010" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "87139-52040" },
                        { name: "AC compressor", pn: "88320-52640" },
                        { name: "AC condenser", pn: "88460-52370" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-52100" },
                        { name: "AC relay", pn: "88650-52750" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Fuel filter", pn: "23300-21010" },
                        { name: "Fuel pump assembly", pn: "23220-21010" },
                        { name: "Injector set", pn: "23250-21010" },
                        { name: "Fuel cap", pn: "77300-52040" },
                    ]
                },
            ]
        },
        {
            id: "prius",
            name: "Toyota Prius ZVW30",
            year: "2012/2013",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (2ZR-FXE)", items: [
                        { name: "Air filter", pn: "17801-37021" },
                        { name: "Oil filter", pn: "90915-YZZD3" },
                        { name: "Engine oil 0W-20 (4.2L)", pn: "08880-10606" },
                        { name: "Spark plugs NGK DILKAR7C11H", pn: "NGK: DILKAR7C11H / 90048-51183" },
                        { name: "PCV valve", pn: "12204-37010" },
                        { name: "Engine mount front", pn: "12361-37141" },
                        { name: "Engine mount rear", pn: "12371-37141" },
                        { name: "Valve cover gasket", pn: "11213-37010" },
                        { name: "VVT solenoid inlet", pn: "15330-37010" },
                        { name: "Timing chain kit", pn: "13506-37011" },
                    ]
                },
                {
                    category: "Hybrid System", items: [
                        { name: "HV battery module (Panasonic)", pn: "G9280-47031" },
                        { name: "HV battery cooling fan", pn: "87103-47050" },
                        { name: "HV battery fan filter", pn: "88880-47020" },
                        { name: "Inverter coolant pump", pn: "16910-37010" },
                        { name: "Inverter coolant SLLC (2L)", pn: "08889-01005" },
                        { name: "Inverter assembly", pn: "G9200-47280" },
                        { name: "HV DC/DC converter", pn: "G9370-47020" },
                        { name: "HV contactor relay set", pn: "G9240-47020" },
                        { name: "HV wiring harness", pn: "82272-47050" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Engine coolant SLLC (2L)", pn: "08889-01005" },
                        { name: "Water pump", pn: "16100-39415" },
                        { name: "Thermostat", pn: "90916-03136" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Radiator hose upper", pn: "16571-37010" },
                        { name: "Radiator fan motor", pn: "16363-37010" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "12V aux battery S34B20R", pn: "Market: S34B20R" },
                        { name: "Headlight HID D4S bulb", pn: "90981-20016" },
                        { name: "Wiper blade driver", pn: "85212-47070" },
                        { name: "Wiper blade passenger", pn: "85222-47050" },
                        { name: "O2 sensor upstream", pn: "89467-47050" },
                        { name: "MAF sensor", pn: "22204-37010" },
                        { name: "Fuse set", pn: "82641-47010" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-47050" },
                        { name: "Rear brake pads", pn: "04466-47010" },
                        { name: "Front disc rotor", pn: "43512-47050" },
                        { name: "Rear disc rotor", pn: "42431-47020" },
                        { name: "Brake actuator ABS/regen", pn: "44050-47221" },
                        { name: "Caliper repair kit front", pn: "04479-33160" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "48520-47060" },
                        { name: "Front shock absorber RH", pn: "48510-47060" },
                        { name: "Rear shock absorber LH", pn: "48540-47020" },
                        { name: "Rear shock absorber RH", pn: "48530-47020" },
                        { name: "Strut mount bearing", pn: "43230-47040" },
                        { name: "Lower ball joint", pn: "43330-47010" },
                        { name: "Tie rod end outer", pn: "45046-09310" },
                        { name: "Stabilizer link front", pn: "48820-47010" },
                        { name: "Control arm bush front", pn: "48654-47020" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "87139-47010" },
                        { name: "AC compressor (electric)", pn: "88370-47050" },
                        { name: "AC condenser", pn: "88460-47020" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-47010" },
                        { name: "AC relay", pn: "88650-47080" },
                    ]
                },
                {
                    category: "Transaxle", items: [
                        { name: "Transaxle fluid WS ATF (4L)", pn: "08886-01705" },
                        { name: "Transaxle oil seal", pn: "90311-T0002" },
                        { name: "Drive shaft boot LH", pn: "04427-47040" },
                        { name: "Drive shaft boot RH", pn: "04428-47040" },
                    ]
                },
            ]
        },
        {
            id: "swift",
            name: "Suzuki Swift ZC/ZD",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (K12B / Z12E)", items: [
                        { name: "Air filter", pn: "13780-58J00" },
                        { name: "Oil filter", pn: "16510-61A21" },
                        { name: "Engine oil 5W-30 (3.5L)", pn: "99000-22R07-03E" },
                        { name: "Spark plugs NGK iridium", pn: "NGK: ILKR7L11 / 93508" },
                        { name: "Timing chain kit", pn: "12761-58J00 (guide)" },
                        { name: "VVT solenoid", pn: "18118-58J00" },
                        { name: "Valve cover gasket", pn: "11189-58J00" },
                        { name: "Engine mount front", pn: "11610-58J00" },
                        { name: "Engine mount rear", pn: "11620-58J00" },
                        { name: "PCV valve", pn: "11810-58J00" },
                        { name: "Crankshaft front seal", pn: "09283-38025" },
                    ]
                },
                {
                    category: "Belts", items: [
                        { name: "Serpentine / AC belt", pn: "17521-58J00" },
                        { name: "Alternator belt", pn: "17522-58J00" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "99000-99032-13E" },
                        { name: "Water pump", pn: "17400-58J00" },
                        { name: "Thermostat", pn: "17670-58J00" },
                        { name: "Radiator cap", pn: "17730-58J00" },
                        { name: "Radiator hose upper", pn: "17871-58J00" },
                        { name: "Radiator fan relay", pn: "39420-58J00" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 46B24L", pn: "Market: 46B24L" },
                        { name: "Alternator", pn: "31400-58J60" },
                        { name: "Ignition coil set (x4)", pn: "33410-58J00" },
                        { name: "O2 sensor upstream", pn: "18213-58J00" },
                        { name: "Throttle position sensor", pn: "13400-58J00" },
                        { name: "Wiper blade driver", pn: "38340-58J00" },
                        { name: "Headlight H4 bulb", pn: "35120-58J00 (assy)" },
                        { name: "Fuse set", pn: "09482-10803" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-58J00" },
                        { name: "Rear brake shoes", pn: "53200-58J00" },
                        { name: "Front disc rotor", pn: "55311-58J00" },
                        { name: "Rear drum", pn: "53111-58J00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Brake hose front", pn: "51564-58J00" },
                        { name: "Caliper repair kit", pn: "55110-58J00" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "41603-58J02" },
                        { name: "Front shock absorber RH", pn: "41604-58J02" },
                        { name: "Rear shock absorber", pn: "41800-58J02" },
                        { name: "Strut mount bearing", pn: "41741-58J00" },
                        { name: "Lower ball joint", pn: "45202-58J00" },
                        { name: "Tie rod end outer", pn: "48810-58J00" },
                        { name: "Stabilizer link", pn: "42420-58J00" },
                        { name: "Control arm bush", pn: "45260-58J10" },
                    ]
                },
                {
                    category: "Transmission", items: [
                        { name: "Manual gear oil 75W-90", pn: "99000-22B50-02E" },
                        { name: "ATF fluid (auto)", pn: "99000-22T02-001" },
                        { name: "Drive shaft boot LH", pn: "44118-58J00" },
                        { name: "Drive shaft boot RH", pn: "44118-58J10" },
                        { name: "Clutch plate (manual)", pn: "22400-58J01" },
                        { name: "Pressure plate (manual)", pn: "22300-58J01" },
                        { name: "Release bearing (manual)", pn: "23265-58J00" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "95861-58J00" },
                        { name: "AC compressor", pn: "95200-58J00" },
                        { name: "Refrigerant R134a", pn: "99000-99100-04E" },
                        { name: "AC belt", pn: "17521-58J00" },
                    ]
                },
            ]
        },
        {
            id: "fitGP1",
            name: "Honda Fit GP1 Hybrid",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (LEA 1.3L)", items: [
                        { name: "Air filter", pn: "17220-RB0-000" },
                        { name: "Oil filter", pn: "15400-RTA-003" },
                        { name: "Engine oil 0W-20 (3.4L)", pn: "08221-99974" },
                        { name: "Spark plugs NGK IZFR6K-11S", pn: "NGK: IZFR6K-11S / 4547" },
                        { name: "Valve cover gasket", pn: "12030-RB0-000" },
                        { name: "Timing chain kit", pn: "14401-RB0-004 (chain)" },
                        { name: "PCV valve", pn: "17130-RB0-000" },
                        { name: "Engine mount front", pn: "50830-TF0-981" },
                        { name: "Engine mount rear", pn: "50840-TF0-981" },
                        { name: "VTC actuator", pn: "14310-RB0-003" },
                    ]
                },
                {
                    category: "IMA Hybrid System", items: [
                        { name: "IMA battery module (rebuild)", pn: "1D100-RCJ-003 (module)" },
                        { name: "IMA battery fan unit", pn: "80290-TF0-003" },
                        { name: "IMA battery fan filter", pn: "80291-TF0-000" },
                        { name: "MCM motor control module", pn: "1A200-RCJ-A04" },
                        { name: "BCM battery control module", pn: "1B000-RCJ-013" },
                        { name: "IMA main relay", pn: "39794-TF0-003" },
                        { name: "HV cable orange set", pn: "32200-TF0-003" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Engine coolant OL999-9011", pn: "OL999-9011 (pre-diluted)" },
                        { name: "Water pump", pn: "19200-RB0-004" },
                        { name: "Thermostat", pn: "19301-RB0-000" },
                        { name: "Radiator cap", pn: "19045-RB0-000" },
                        { name: "Radiator hose upper", pn: "19501-RB0-000" },
                        { name: "Radiator hose lower", pn: "19502-RB0-000" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "12V battery 34B17L", pn: "Market: 34B17L" },
                        { name: "Ignition coil (x4)", pn: "30520-RB0-S01" },
                        { name: "O2 sensor upstream", pn: "36531-RB0-004" },
                        { name: "O2 sensor downstream", pn: "36532-RB0-004" },
                        { name: "MAP sensor", pn: "37830-RB0-006" },
                        { name: "Wiper blade driver", pn: "76620-TF0-003" },
                        { name: "Headlight H4 bulb", pn: "33116-TF0-003 (assy)" },
                        { name: "Fuse set", pn: "38200-TF0-A01" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "45022-TF0-G51" },
                        { name: "Rear brake pads", pn: "43022-TF0-G51" },
                        { name: "Front disc rotor", pn: "45251-TF0-020" },
                        { name: "Rear disc rotor", pn: "42510-TF0-020" },
                        { name: "Brake fluid DOT3", pn: "08798-9008M" },
                        { name: "Caliper pin boot kit front", pn: "01462-S04-000" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "51602-TF0-G11" },
                        { name: "Front shock absorber RH", pn: "51601-TF0-G11" },
                        { name: "Rear shock absorber LH", pn: "52612-TF0-G01" },
                        { name: "Rear shock absorber RH", pn: "52611-TF0-G01" },
                        { name: "Strut mount bearing", pn: "51726-S6D-E01" },
                        { name: "Lower ball joint", pn: "51220-TF0-003" },
                        { name: "Tie rod end outer", pn: "53540-TF0-003" },
                        { name: "Stabilizer link front", pn: "51320-TF0-003" },
                        { name: "Control arm bush", pn: "51391-TF0-003" },
                    ]
                },
                {
                    category: "Transmission (CVT)", items: [
                        { name: "CVT fluid HCF-2 (3L)", pn: "08260-99902" },
                        { name: "CVT filter", pn: "25430-PLR-003" },
                        { name: "Drive shaft boot LH", pn: "44018-TF0-000" },
                        { name: "Drive shaft boot RH", pn: "44014-TF0-000" },
                        { name: "Gear oil seal set", pn: "91206-671-003" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "80292-TF0-003" },
                        { name: "AC compressor", pn: "38810-RB0-Z01" },
                        { name: "Refrigerant R134a", pn: "38899-RB0-Z01" },
                        { name: "Expansion valve", pn: "80221-TF0-003" },
                        { name: "AC relay", pn: "39794-TF0-003" },
                    ]
                },
            ]
        },
        {
            id: "fitGP5",
            name: "Honda Fit GP5 Hybrid",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (LEB 1.5L)", items: [
                        { name: "Air filter", pn: "17220-5R0-008" },
                        { name: "Oil filter", pn: "15400-RTA-003" },
                        { name: "Engine oil 0W-20 (3.5L)", pn: "08221-99974" },
                        { name: "Spark plugs NGK SILZKAR7C11", pn: "NGK: SILZKAR7C11 / 95049" },
                        { name: "Timing chain kit", pn: "14401-5R0-004" },
                        { name: "VTC actuator", pn: "14310-5R0-003" },
                        { name: "Engine mount front", pn: "50830-T5A-J81" },
                        { name: "Engine mount rear", pn: "50840-T5A-J81" },
                        { name: "Valve cover gasket", pn: "12030-5R0-000" },
                    ]
                },
                {
                    category: "Hybrid i-DCD System", items: [
                        { name: "Li-Ion HV battery module", pn: "1D100-5R1-A03" },
                        { name: "HV battery fan filter", pn: "80291-T5A-003" },
                        { name: "7-speed DCT fluid Z1 (4L)", pn: "08268-0020E" },
                        { name: "DCT solenoid set", pn: "28240-5R1-003" },
                        { name: "HV contactor relay", pn: "39794-T5A-J51" },
                        { name: "Drive motor unit", pn: "46100-T5C-A52" },
                        { name: "Power control unit PCU", pn: "1A200-5R1-A53" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Engine coolant (pre-diluted)", pn: "OL999-9011" },
                        { name: "Water pump", pn: "19200-5R0-004" },
                        { name: "Thermostat", pn: "19301-5R0-000" },
                        { name: "Radiator cap", pn: "19045-5R0-000" },
                        { name: "Radiator hose upper", pn: "19501-5R0-000" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "12V battery 34B17L", pn: "Market: 34B17L" },
                        { name: "Ignition coil (x4)", pn: "30520-5R0-S01" },
                        { name: "O2 sensor upstream", pn: "36531-5R0-004" },
                        { name: "MAP sensor", pn: "37830-5R0-003" },
                        { name: "Wiper blade driver", pn: "76620-T5A-003" },
                        { name: "Headlight H11 bulb", pn: "33116-T5A-003" },
                        { name: "Fuse set", pn: "38200-T5A-A01" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "45022-T5A-J51" },
                        { name: "Rear brake pads", pn: "43022-T5A-J51" },
                        { name: "Front disc rotor", pn: "45251-T5A-020" },
                        { name: "Rear disc rotor", pn: "42510-T5A-020" },
                        { name: "Brake fluid DOT3", pn: "08798-9008M" },
                        { name: "Front caliper repair kit", pn: "01462-S04-000" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "51602-T5A-G01" },
                        { name: "Front shock absorber RH", pn: "51601-T5A-G01" },
                        { name: "Rear shock absorber LH", pn: "52612-T5A-G01" },
                        { name: "Rear shock absorber RH", pn: "52611-T5A-G01" },
                        { name: "Lower ball joint", pn: "51220-T5A-003" },
                        { name: "Tie rod end outer", pn: "53540-T5A-003" },
                        { name: "Stabilizer link", pn: "51320-T5A-003" },
                        { name: "Strut mount bearing", pn: "51726-T5A-003" },
                    ]
                },
                {
                    category: "DCT Transmission", items: [
                        { name: "DCT fluid Z1 (4L)", pn: "08268-0020E" },
                        { name: "Drive shaft boot LH", pn: "44018-T5A-000" },
                        { name: "Drive shaft boot RH", pn: "44014-T5A-000" },
                        { name: "Gear oil seal set", pn: "91206-671-003" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "80292-T5A-003" },
                        { name: "AC compressor", pn: "38810-5R0-Z01" },
                        { name: "Refrigerant R134a", pn: "38899-5R0-Z01" },
                        { name: "Expansion valve", pn: "80221-T5A-003" },
                    ]
                },
            ]
        },
        {
            id: "corolla121",
            name: "Toyota Corolla 121 NZE/ZRE",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (1NZ-FE / 2ZR-FE)", items: [
                        { name: "Air filter (1NZ)", pn: "17801-21050" },
                        { name: "Air filter (2ZR)", pn: "17801-37021" },
                        { name: "Oil filter", pn: "90915-YZZD3" },
                        { name: "Engine oil 5W-30 (3.7L 1NZ / 4.4L 2ZR)", pn: "08880-80846" },
                        { name: "Spark plugs NGK (1NZ) BKR5EKB", pn: "NGK: BKR5EKB" },
                        { name: "Spark plugs NGK iridium (2ZR)", pn: "NGK: ILFR6A / 4338" },
                        { name: "Timing chain kit (1NZ)", pn: "13506-21011" },
                        { name: "VVT solenoid (1NZ)", pn: "15330-21010" },
                        { name: "Valve cover gasket", pn: "11213-21010 / 11213-37010" },
                        { name: "Engine mount front", pn: "12361-21100 / 12361-37141" },
                        { name: "PCV valve", pn: "12204-21010" },
                        { name: "Crankshaft front seal", pn: "90311-38090" },
                        { name: "Water pump (do w/ timing)", pn: "16100-29185" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant SLLC (2L)", pn: "08889-01005" },
                        { name: "Thermostat", pn: "90916-03136" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Radiator hose upper", pn: "16571-21050" },
                        { name: "Radiator hose lower", pn: "16572-21040" },
                        { name: "Radiator fan motor", pn: "16363-21010" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 46B24L", pn: "Market: 46B24L" },
                        { name: "Alternator", pn: "27060-21100" },
                        { name: "Starter motor", pn: "28100-21100" },
                        { name: "Ignition coil (x4)", pn: "90919-02255" },
                        { name: "O2 sensor upstream", pn: "89467-52020" },
                        { name: "MAF sensor", pn: "22204-21010" },
                        { name: "Wiper blade driver", pn: "85212-02190" },
                        { name: "Headlight H4 bulb", pn: "90981-11132" },
                        { name: "Tail light cluster LH", pn: "81561-02560" },
                        { name: "Fuse set", pn: "82641-12010" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-52220" },
                        { name: "Rear brake shoes", pn: "04495-02100" },
                        { name: "Rear drum", pn: "42431-02090" },
                        { name: "Front disc rotor", pn: "43512-52100" },
                        { name: "Master cylinder", pn: "47201-02470" },
                        { name: "Rear wheel cylinder", pn: "47560-02130" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                        { name: "Front brake hose", pn: "90947-02E35" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "48520-02740" },
                        { name: "Front shock absorber RH", pn: "48510-02740" },
                        { name: "Rear shock absorber LH", pn: "48540-02230" },
                        { name: "Rear shock absorber RH", pn: "48530-02230" },
                        { name: "Strut mount bearing", pn: "43230-02030" },
                        { name: "Lower ball joint", pn: "43330-02070" },
                        { name: "Tie rod end outer", pn: "45046-09360" },
                        { name: "Stabilizer link front", pn: "48820-02050" },
                        { name: "Control arm bush front", pn: "48654-02030" },
                        { name: "Rear lateral rod", pn: "48710-02050" },
                    ]
                },
                {
                    category: "Transmission", items: [
                        { name: "ATF Super T-IV (4L)", pn: "08886-81015" },
                        { name: "AT filter", pn: "35330-12010" },
                        { name: "Drive shaft boot LH", pn: "04427-02220" },
                        { name: "Drive shaft boot RH", pn: "04428-02250" },
                        { name: "Manual clutch plate", pn: "31250-02050" },
                        { name: "Manual pressure plate", pn: "31210-02061" },
                        { name: "Release bearing", pn: "31230-02041" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "87139-02090" },
                        { name: "AC compressor", pn: "88320-02300" },
                        { name: "AC belt", pn: "90916-02638" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-02120" },
                    ]
                },
            ]
        },
        {
            id: "vezel",
            name: "Honda Vezel RU series",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (LEB 1.5L)", items: [
                        { name: "Air filter", pn: "17220-5R0-008" },
                        { name: "Oil filter", pn: "15400-RTA-003" },
                        { name: "Engine oil 0W-20 (3.5L)", pn: "08221-99974" },
                        { name: "Spark plugs NGK ILZKAR8J8SY", pn: "NGK: ILZKAR8J8SY" },
                        { name: "Timing chain kit", pn: "14401-5R0-004" },
                        { name: "VTC actuator", pn: "14310-5R0-003" },
                        { name: "Engine mount front", pn: "50830-T7W-J81" },
                        { name: "Engine mount rear", pn: "50840-T7W-J81" },
                        { name: "Valve cover gasket", pn: "12030-5R0-000" },
                    ]
                },
                {
                    category: "Hybrid i-DCD System", items: [
                        { name: "Li-Ion HV battery module", pn: "1D100-5W1-A03" },
                        { name: "HV battery fan unit", pn: "80290-T7W-003" },
                        { name: "PCU power control unit", pn: "1A200-5W1-A53" },
                        { name: "DCT fluid Z1 (4L)", pn: "08268-0020E" },
                        { name: "DCT solenoid set", pn: "28240-5W1-003" },
                        { name: "HV contactor relay", pn: "39794-T7W-J51" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Engine coolant (pre-diluted)", pn: "OL999-9011" },
                        { name: "Water pump", pn: "19200-5R0-004" },
                        { name: "Thermostat", pn: "19301-5R0-000" },
                        { name: "Radiator cap", pn: "19045-5R0-000" },
                        { name: "Radiator hose upper", pn: "19501-5R0-000" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "12V battery", pn: "Market: 34B17L" },
                        { name: "O2 sensor upstream", pn: "36531-5R0-003" },
                        { name: "MAP sensor", pn: "37830-5R0-003" },
                        { name: "Ignition coil (x4)", pn: "30520-5R0-S01" },
                        { name: "Wiper blade driver", pn: "76620-T7W-003" },
                        { name: "Headlight LED assy", pn: "33100-T7W-J41" },
                        { name: "Fuse set", pn: "38200-T7W-A01" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "45022-T7W-H51" },
                        { name: "Rear brake pads", pn: "43022-T7W-H51" },
                        { name: "Front disc rotor", pn: "45251-T7W-020" },
                        { name: "Rear disc rotor", pn: "42510-T7W-020" },
                        { name: "Brake fluid DOT3", pn: "08798-9008M" },
                        { name: "Caliper repair kit front", pn: "01462-S04-000" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "51602-T7W-G01" },
                        { name: "Front shock absorber RH", pn: "51601-T7W-G01" },
                        { name: "Rear shock absorber LH", pn: "52612-T7W-G01" },
                        { name: "Rear shock absorber RH", pn: "52611-T7W-G01" },
                        { name: "Lower ball joint", pn: "51220-T7W-003" },
                        { name: "Tie rod end outer", pn: "53540-T7W-003" },
                        { name: "Stabilizer link front", pn: "51320-T7W-003" },
                        { name: "Strut mount bearing", pn: "51726-T7W-003" },
                    ]
                },
                {
                    category: "DCT Transmission", items: [
                        { name: "DCT fluid Z1 (4L)", pn: "08268-0020E" },
                        { name: "Drive shaft boot LH", pn: "44018-T7W-000" },
                        { name: "Drive shaft boot RH", pn: "44014-T7W-000" },
                        { name: "Gear oil seal set", pn: "91206-671-003" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "80292-T7W-003" },
                        { name: "AC compressor", pn: "38810-5R0-Z01" },
                        { name: "Refrigerant R134a", pn: "38899-5R0-Z01" },
                        { name: "Expansion valve", pn: "80221-T7W-003" },
                    ]
                },
            ]
        },
        {
            id: "everyDA17",
            name: "Suzuki Every DA17",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (R06A Turbo)", items: [
                        { name: "Air filter", pn: "13780-50M00" },
                        { name: "Oil filter", pn: "16510-81403" },
                        { name: "Engine oil 5W-30 (2.7L)", pn: "99000-22R07-03E" },
                        { name: "Spark plugs NGK ILZKAR7L11", pn: "NGK: ILZKAR7L11" },
                        { name: "Intercooler hose set", pn: "13887-58J00 (inlet)" },
                        { name: "Turbo oil feed pipe", pn: "15754-58J00" },
                        { name: "Engine mount", pn: "11610-58J50" },
                        { name: "Valve cover gasket", pn: "11189-50M00" },
                        { name: "Timing chain kit", pn: "12761-50M00" },
                        { name: "PCV valve", pn: "11810-50M00" },
                        { name: "Boost pressure solenoid", pn: "18912-58J00" },
                    ]
                },
                {
                    category: "Belts", items: [
                        { name: "AC belt", pn: "17521-58J50" },
                        { name: "Alternator belt", pn: "17522-58J50" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "99000-99032-13E" },
                        { name: "Water pump", pn: "17400-58J50" },
                        { name: "Thermostat", pn: "17670-58J50" },
                        { name: "Radiator hose upper", pn: "17871-58J50" },
                        { name: "Radiator cap", pn: "17730-58J50" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 38B20L", pn: "Market: 38B20L" },
                        { name: "Alternator", pn: "31400-58J60" },
                        { name: "Ignition coil (x3)", pn: "33410-58J50" },
                        { name: "O2 sensor", pn: "18213-58J50" },
                        { name: "MAF sensor", pn: "13800-58J50" },
                        { name: "Wiper blades", pn: "38340-58J50" },
                        { name: "Headlight H4", pn: "35120-58J50 (assy)" },
                        { name: "Fuse set", pn: "09482-10803" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-58J50" },
                        { name: "Rear brake shoes", pn: "53200-58J50" },
                        { name: "Rear drum", pn: "53111-58J50" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Rear wheel cylinder", pn: "53400-58J50" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "41603-58J52" },
                        { name: "Front shock absorber RH", pn: "41604-58J52" },
                        { name: "Rear shock absorber", pn: "41800-58J52" },
                        { name: "Lower ball joint", pn: "45202-58J50" },
                        { name: "Tie rod end outer", pn: "48810-58J50" },
                        { name: "Stabilizer link", pn: "42420-58J50" },
                    ]
                },
                {
                    category: "Transmission", items: [
                        { name: "Manual: gear oil 75W-90", pn: "99000-22B50-02E" },
                        { name: "CVT fluid (auto)", pn: "99000-22T02-001" },
                        { name: "CVT filter (auto)", pn: "28161-58J50" },
                        { name: "Drive shaft boot LH", pn: "44118-58J50" },
                        { name: "Clutch plate (manual)", pn: "22400-58J51" },
                        { name: "Release bearing (manual)", pn: "23265-58J50" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "95861-58J50" },
                        { name: "AC compressor", pn: "95200-58J50" },
                        { name: "AC belt", pn: "17521-58J50" },
                        { name: "Refrigerant R134a", pn: "99000-99100-04E" },
                    ]
                },
            ]
        },
        {
            id: "everyDA64",
            name: "Suzuki Every DA64",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (K6A)", items: [
                        { name: "Air filter", pn: "13780-76G00" },
                        { name: "Oil filter", pn: "16510-83010" },
                        { name: "Engine oil 5W-30 (2.6L)", pn: "99000-22R07-03E" },
                        { name: "Spark plugs NGK BKR6E", pn: "NGK: BKR6E / 4339" },
                        { name: "Timing belt kit K6A", pn: "12761-76G00 (belt) + 17521-76G00 (tensioner)" },
                        { name: "Engine mount front", pn: "11610-76G00" },
                        { name: "Valve cover gasket", pn: "11189-76G00" },
                        { name: "Turbocharger (turbo model)", pn: "13900-76G00" },
                        { name: "Turbo oil feed pipe", pn: "15754-76G00" },
                        { name: "Intercooler hose", pn: "13887-76G00" },
                    ]
                },
                {
                    category: "Belts", items: [
                        { name: "Timing belt K6A", pn: "12761-76G00" },
                        { name: "AC belt 3PK", pn: "17521-76G00" },
                        { name: "Alternator belt 4PK", pn: "17522-76G00" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "99000-99032-13E" },
                        { name: "Water pump", pn: "17400-76G00" },
                        { name: "Thermostat", pn: "17670-76G00" },
                        { name: "Radiator hose upper", pn: "17871-76G00" },
                        { name: "Radiator cap", pn: "17730-76G00" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 38B20L", pn: "Market: 38B20L" },
                        { name: "Alternator", pn: "31400-76G60" },
                        { name: "Ignition coil", pn: "33410-76G00" },
                        { name: "O2 sensor", pn: "18213-76G00" },
                        { name: "Wiper blades", pn: "38340-76G00" },
                        { name: "Headlight H4", pn: "35120-76G00 (assy)" },
                        { name: "Fuse set", pn: "09482-10803" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "55810-76G00" },
                        { name: "Rear brake shoes", pn: "53200-76G00" },
                        { name: "Rear drum", pn: "53111-76G00" },
                        { name: "Brake fluid DOT3", pn: "99000-99001-07E" },
                        { name: "Rear wheel cylinder", pn: "53400-76G00" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "41603-76G02" },
                        { name: "Front shock absorber RH", pn: "41604-76G02" },
                        { name: "Rear shock absorber", pn: "41800-76G02" },
                        { name: "Lower ball joint", pn: "45202-76G00" },
                        { name: "Tie rod end outer", pn: "48810-76G00" },
                    ]
                },
                {
                    category: "Transmission", items: [
                        { name: "Clutch plate (manual)", pn: "22400-76G01" },
                        { name: "Pressure plate (manual)", pn: "22300-76G01" },
                        { name: "Release bearing", pn: "23265-76G00" },
                        { name: "ATF fluid (auto)", pn: "99000-22T02-001" },
                        { name: "Drive shaft boot LH", pn: "44118-76G00" },
                        { name: "Gear oil seal", pn: "09283-50010" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "95861-76G00" },
                        { name: "AC compressor", pn: "95200-76G00" },
                        { name: "AC belt", pn: "17521-76G00" },
                        { name: "Refrigerant R134a", pn: "99000-99100-04E" },
                    ]
                },
            ]
        },
        {
            id: "axio",
            name: "Toyota Axio NZE/ZRE",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (1NZ-FE / 2ZR-FE)", items: [
                        { name: "Air filter (1NZ)", pn: "17801-21050" },
                        { name: "Air filter (2ZR)", pn: "17801-37021" },
                        { name: "Oil filter", pn: "90915-YZZD3" },
                        { name: "Engine oil 5W-30 (3.7–4.4L)", pn: "08880-80846" },
                        { name: "Spark plugs (1NZ) NGK BKR5EKB", pn: "NGK: BKR5EKB" },
                        { name: "Spark plugs (2ZR) NGK iridium", pn: "NGK: ILFR6A" },
                        { name: "Timing chain guide (1NZ)", pn: "13506-21011" },
                        { name: "VVT solenoid", pn: "15330-21010" },
                        { name: "Valve cover gasket", pn: "11213-21010" },
                        { name: "Engine mount front", pn: "12361-21100" },
                        { name: "PCV valve", pn: "12204-21010" },
                        { name: "Crankshaft front seal", pn: "90311-38090" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant SLLC (2L)", pn: "08889-01005" },
                        { name: "Water pump", pn: "16100-29185" },
                        { name: "Thermostat", pn: "90916-03136" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Radiator hose upper", pn: "16571-21050" },
                        { name: "Radiator hose lower", pn: "16572-21040" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 46B24L", pn: "Market: 46B24L" },
                        { name: "Alternator", pn: "27060-21100" },
                        { name: "Starter motor", pn: "28100-21100" },
                        { name: "Ignition coil (x4)", pn: "90919-02255" },
                        { name: "O2 sensor upstream", pn: "89467-52020" },
                        { name: "MAF sensor", pn: "22204-21010" },
                        { name: "Wiper blade driver", pn: "85212-12890" },
                        { name: "Headlight H4 bulb", pn: "90981-11132" },
                        { name: "Fuse set", pn: "82641-12010" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-52220" },
                        { name: "Rear brake shoes", pn: "04495-02100" },
                        { name: "Front disc rotor", pn: "43512-52100" },
                        { name: "Rear drum", pn: "42431-02090" },
                        { name: "Master cylinder", pn: "47201-02470" },
                        { name: "Rear wheel cylinder", pn: "47560-02130" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                        { name: "Front brake hose", pn: "90947-02E35" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber LH", pn: "48520-02740" },
                        { name: "Front shock absorber RH", pn: "48510-02740" },
                        { name: "Rear shock absorber LH", pn: "48540-02230" },
                        { name: "Rear shock absorber RH", pn: "48530-02230" },
                        { name: "Strut mount bearing", pn: "43230-02030" },
                        { name: "Lower ball joint", pn: "43330-02070" },
                        { name: "Tie rod end outer", pn: "45046-09360" },
                        { name: "Stabilizer link", pn: "48820-02050" },
                        { name: "Control arm bush", pn: "48654-02030" },
                    ]
                },
                {
                    category: "Transmission", items: [
                        { name: "ATF Super T-IV (4L)", pn: "08886-81015" },
                        { name: "AT filter", pn: "35330-12010" },
                        { name: "Drive shaft boot LH", pn: "04427-02220" },
                        { name: "Drive shaft boot RH", pn: "04428-02250" },
                        { name: "Gear oil seal", pn: "90311-T0002" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "87139-02090" },
                        { name: "AC compressor", pn: "88320-02300" },
                        { name: "AC belt", pn: "90916-02638" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-02120" },
                    ]
                },
            ]
        },
        {
            id: "bongo",
            name: "Mazda Bongo SKF/SGL",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (RF Diesel / WL)", items: [
                        { name: "Air filter", pn: "RF2A-13-Z40 (RF) / WL01-13-Z40 (WL)" },
                        { name: "Oil filter", pn: "RF2A-14-302A" },
                        { name: "Fuel filter", pn: "RF2A-13-480" },
                        { name: "Engine oil 15W-40 diesel", pn: "—" },
                        { name: "Injector nozzle set (RF)", pn: "RF2A-13-H50A" },
                        { name: "Glow plugs", pn: "RF2A-18-601A" },
                        { name: "Head gasket set", pn: "RF2A-10-271" },
                        { name: "Valve set inlet/exhaust", pn: "RF2A-12-111 / RF2A-12-121" },
                        { name: "Timing belt kit RF", pn: "RF2A-12-205A (belt) + tensioner" },
                        { name: "Water pump (with timing)", pn: "RF2A-15-010A" },
                        { name: "Engine mount front", pn: "RF2A-39-060A" },
                        { name: "Rocker cover gasket", pn: "RF2A-10-251A" },
                        { name: "Injection pump seal kit", pn: "RF2A-13-800A" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC", pn: "—" },
                        { name: "Thermostat", pn: "RF2A-15-171A" },
                        { name: "Radiator hose upper", pn: "RF2A-15-185A" },
                        { name: "Radiator hose lower", pn: "RF2A-15-186A" },
                        { name: "Radiator cap", pn: "B455-15-205A" },
                        { name: "Fan belt", pn: "RF2A-15-908A" },
                        { name: "Radiator fan motor", pn: "RF2A-15-150A" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator", pn: "RF2A-18-300A" },
                        { name: "Starter motor", pn: "RF2A-18-400A" },
                        { name: "Glow plug relay", pn: "RF2A-18-5X0A" },
                        { name: "Headlight H4", pn: "—" },
                        { name: "Wiper blades", pn: "—" },
                        { name: "Fuse set", pn: "—" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "GJ21-26-43Z" },
                        { name: "Rear brake shoes", pn: "GJ21-26-38Z" },
                        { name: "Rear drum", pn: "GJ21-26-251A" },
                        { name: "Front disc rotor", pn: "GJ21-33-251A" },
                        { name: "Master cylinder", pn: "GJ21-43-400A" },
                        { name: "Wheel cylinder", pn: "GJ21-26-370A" },
                        { name: "Brake fluid DOT3", pn: "—" },
                        { name: "Brake hose front", pn: "GJ21-43-540A" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber", pn: "GJ21-34-700A" },
                        { name: "Rear shock absorber", pn: "GJ21-28-700A" },
                        { name: "Ball joint lower", pn: "GJ21-34-350A" },
                        { name: "Tie rod end outer", pn: "GJ21-32-280A" },
                        { name: "Leaf spring bush rear", pn: "GJ21-28-156A" },
                        { name: "Wheel bearing front", pn: "GJ21-33-047A" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "GJ21-16-460A" },
                        { name: "Pressure plate", pn: "GJ21-16-410A" },
                        { name: "Release bearing", pn: "GJ21-16-510A" },
                        { name: "Gear oil 80W-90", pn: "—" },
                        { name: "Drive shaft boot LH", pn: "GJ21-22-530A" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "GJ21-61-J6X" },
                        { name: "AC compressor", pn: "GJ21-61-450A" },
                        { name: "Refrigerant R134a", pn: "—" },
                        { name: "AC belt", pn: "GJ21-15-909A" },
                        { name: "Expansion valve", pn: "GJ21-61-460A" },
                    ]
                },
            ]
        },
        {
            id: "isuzuNKR",
            name: "Isuzu NKR Light Truck",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (4JB1 / 4HG1)", items: [
                        { name: "Air filter 4JB1", pn: "8-97163290-0" },
                        { name: "Air filter 4HG1", pn: "8-97095575-0" },
                        { name: "Oil filter", pn: "5-87610013-0" },
                        { name: "Fuel filter", pn: "8-94151773-0" },
                        { name: "Engine oil 15W-40 (7L)", pn: "—" },
                        { name: "Injector nozzle set 4JB1", pn: "8-94392877-1 (nozzle)" },
                        { name: "Injection pump kit 4JB1", pn: "8-97260706-0" },
                        { name: "Glow plugs 4JB1", pn: "8-94155047-0" },
                        { name: "Head gasket set 4JB1", pn: "5-87812262-0" },
                        { name: "Piston & liner kit 4JB1", pn: "8-94391266-0 (piston set)" },
                        { name: "Main bearing set 4JB1", pn: "8-97047832-0" },
                        { name: "Big end bearing set 4JB1", pn: "8-97047833-0" },
                        { name: "Valve set 4JB1", pn: "8-94393601-0 (inlet)" },
                        { name: "Timing gear set 4JB1", pn: "8-97182455-0" },
                        { name: "Engine mount front", pn: "8-97361096-0" },
                        { name: "Rocker cover gasket", pn: "8-97049891-0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump 4JB1", pn: "8-94154873-0" },
                        { name: "Thermostat", pn: "8-97060659-0" },
                        { name: "Radiator", pn: "8-97358498-0" },
                        { name: "Radiator hose upper", pn: "8-97131685-0" },
                        { name: "Radiator cap", pn: "8-94152022-0" },
                        { name: "Fan belt", pn: "8-97163308-0" },
                        { name: "Fan clutch", pn: "8-97363095-0" },
                        { name: "Coolant", pn: "—" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator", pn: "8-97363095-0" },
                        { name: "Starter motor", pn: "8-97039245-1" },
                        { name: "Glow plug relay", pn: "8-97047851-0" },
                        { name: "Headlight H4", pn: "—" },
                        { name: "Wiper blades", pn: "—" },
                        { name: "Fuse set", pn: "—" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "8-97069046-0" },
                        { name: "Rear brake shoes", pn: "8-97069047-0" },
                        { name: "Rear drum", pn: "8-97041065-0" },
                        { name: "Master cylinder", pn: "8-97069048-0" },
                        { name: "Wheel cylinder rear", pn: "8-97069049-0" },
                        { name: "Brake hose front", pn: "8-97143020-0" },
                        { name: "Brake fluid DOT3", pn: "—" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "8-97105980-0" },
                        { name: "Leaf spring pin & bush set", pn: "8-97116041-0" },
                        { name: "U-bolt set", pn: "8-94115541-0" },
                        { name: "Ball joint lower", pn: "8-97030024-1" },
                        { name: "Tie rod end outer", pn: "8-97048026-0" },
                        { name: "King pin set", pn: "8-97027720-0" },
                        { name: "Steering drag link end", pn: "8-97048027-0" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "8-97054090-0" },
                        { name: "Pressure plate", pn: "8-97054091-0" },
                        { name: "Release bearing", pn: "8-97061092-0" },
                        { name: "Clutch booster kit", pn: "8-97361097-0" },
                        { name: "Gear oil 80W-90 (3L)", pn: "—" },
                        { name: "Gearbox output seal", pn: "8-94301565-0" },
                    ]
                },
            ]
        },
        {
            id: "isuzu4HF1",
            name: "Isuzu 4HF1 Engine",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine Overhaul Kit", items: [
                        { name: "Piston set STD (x4)", pn: "8-97176588-0" },
                        { name: "Liner set (x4)", pn: "8-94430492-0" },
                        { name: "Piston ring set STD", pn: "8-97176589-0" },
                        { name: "Main bearing set STD", pn: "8-97047852-0" },
                        { name: "Con rod bearing set STD", pn: "8-97047853-0" },
                        { name: "Thrust washer set", pn: "8-97047854-0" },
                        { name: "Inlet valve set (x4)", pn: "8-94393600-0" },
                        { name: "Exhaust valve set (x4)", pn: "8-94393601-0" },
                        { name: "Valve guide set", pn: "8-94391630-0" },
                        { name: "Valve stem seal set", pn: "8-94154690-0" },
                        { name: "Full gasket kit", pn: "5-87812263-0" },
                        { name: "Timing gear set", pn: "8-97176590-0" },
                        { name: "Camshaft", pn: "8-97176591-0" },
                        { name: "Rocker arm set", pn: "8-97176592-0" },
                        { name: "Push rod set (x8)", pn: "8-94154692-0" },
                        { name: "Oil pump", pn: "8-97176593-0" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Injector nozzle set (DLLA155S396)", pn: "8-94154880-0" },
                        { name: "Injection pump repair kit", pn: "8-97260707-0" },
                        { name: "High pressure pipe set", pn: "8-94431566-0" },
                        { name: "Fuel filter", pn: "8-94151773-0" },
                        { name: "Fuel lift pump", pn: "8-94392887-0" },
                        { name: "Overflow valve", pn: "8-94154882-0" },
                    ]
                },
                {
                    category: "Lubrication", items: [
                        { name: "Oil filter", pn: "5-87610013-0" },
                        { name: "Engine oil 15W-40 (8L)", pn: "—" },
                        { name: "Oil sump gasket", pn: "8-97176594-0" },
                        { name: "Rear main seal", pn: "9-09625-016-0" },
                        { name: "Front crankshaft seal", pn: "9-09625-017-0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump", pn: "8-97176595-0" },
                        { name: "Thermostat", pn: "8-97060659-0" },
                        { name: "Coolant LLC", pn: "—" },
                        { name: "Radiator hose set", pn: "8-97131686-0" },
                        { name: "Fan belt", pn: "8-97163309-0" },
                        { name: "Radiator cap", pn: "8-94152022-0" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Glow plugs (x4)", pn: "8-94155047-0" },
                        { name: "Glow plug relay", pn: "8-97047851-0" },
                        { name: "Starter motor", pn: "8-97039245-1" },
                        { name: "Alternator", pn: "8-97176596-0" },
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                    ]
                },
                {
                    category: "Clutch", items: [
                        { name: "Clutch plate", pn: "8-97176597-0" },
                        { name: "Pressure plate", pn: "8-97176598-0" },
                        { name: "Release bearing", pn: "8-97061092-0" },
                        { name: "Pilot bearing", pn: "8-97176599-0" },
                    ]
                },
            ]
        },
        {
            id: "isuzu4BE1",
            name: "Isuzu 4BE1 Engine (Elf)",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine Overhaul", items: [
                        { name: "Piston set STD (x4)", pn: "8-97042506-0" },
                        { name: "Liner set (x4)", pn: "8-97042507-0" },
                        { name: "Piston ring set STD", pn: "8-97042508-0" },
                        { name: "Main bearing set STD", pn: "8-97042509-0" },
                        { name: "Con rod bearing set STD", pn: "8-97042510-0" },
                        { name: "Full gasket kit", pn: "5-87812260-0" },
                        { name: "Valve set inlet", pn: "8-94380600-0" },
                        { name: "Valve set exhaust", pn: "8-94380601-0" },
                        { name: "Valve guide set", pn: "8-94380602-0" },
                        { name: "Valve stem seals", pn: "8-94154689-0" },
                        { name: "Timing gear set", pn: "8-97042511-0" },
                        { name: "Camshaft & bearings", pn: "8-97042512-0" },
                        { name: "Rocker arms set", pn: "8-97042513-0" },
                        { name: "Push rods (x8)", pn: "8-97042514-0" },
                        { name: "Oil pump", pn: "8-97042515-0" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Injector nozzle set", pn: "8-94154879-0" },
                        { name: "Injection pump kit", pn: "8-97042516-0" },
                        { name: "Fuel filter", pn: "8-94151773-0" },
                        { name: "High pressure pipes set", pn: "8-94042517-0" },
                        { name: "Fuel lift pump", pn: "8-94392887-0" },
                    ]
                },
                {
                    category: "Lubrication", items: [
                        { name: "Oil filter", pn: "5-87610013-0" },
                        { name: "Engine oil 15W-40 (8L)", pn: "—" },
                        { name: "Front crank seal", pn: "9-09625-015-0" },
                        { name: "Rear crank seal", pn: "9-09625-016-0" },
                        { name: "Oil sump gasket", pn: "8-97042518-0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump", pn: "8-97042519-0" },
                        { name: "Thermostat", pn: "8-97060659-0" },
                        { name: "Coolant LLC", pn: "—" },
                        { name: "Radiator hose set", pn: "8-97042520-0" },
                        { name: "Fan belt", pn: "8-97042521-0" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Glow plugs (x4)", pn: "8-94155046-0" },
                        { name: "Glow plug relay", pn: "8-97047851-0" },
                        { name: "Starter motor", pn: "8-97042522-0" },
                        { name: "Alternator", pn: "8-97042523-0" },
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                    ]
                },
                {
                    category: "Clutch", items: [
                        { name: "Clutch plate", pn: "8-97042524-0" },
                        { name: "Pressure plate", pn: "8-97042525-0" },
                        { name: "Release bearing", pn: "8-97061092-0" },
                    ]
                },
            ]
        },
        {
            id: "elfNKR250",
            name: "Isuzu Elf 250",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (4JB1T / 4HF1)", items: [
                        { name: "Air filter 4JB1T", pn: "8-97163290-0" },
                        { name: "Oil filter", pn: "5-87610013-0" },
                        { name: "Fuel filter", pn: "8-94151773-0" },
                        { name: "Engine oil 15W-40 (7L)", pn: "—" },
                        { name: "Injector nozzle 4JB1T", pn: "8-94392877-1" },
                        { name: "Head gasket kit", pn: "5-87812262-0" },
                        { name: "Piston & liner set", pn: "8-94391266-0" },
                        { name: "Main bearing set STD", pn: "8-97047852-0" },
                        { name: "Valve set", pn: "8-94393600-0" },
                        { name: "Timing gear set", pn: "8-97182455-0" },
                        { name: "Turbo 4JB1T", pn: "8-97163850-0" },
                        { name: "Intercooler hose set", pn: "8-97163851-0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump", pn: "8-94154873-0" },
                        { name: "Thermostat", pn: "8-97060659-0" },
                        { name: "Radiator", pn: "8-97358498-0" },
                        { name: "Radiator hose upper", pn: "8-97131685-0" },
                        { name: "Fan belt", pn: "8-97163308-0" },
                        { name: "Coolant LLC", pn: "—" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator", pn: "8-97363095-0" },
                        { name: "Starter motor", pn: "8-97039245-1" },
                        { name: "Glow plugs", pn: "8-94155047-0" },
                        { name: "Fuse set", pn: "—" },
                        { name: "Wiper blades", pn: "—" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "8-97069046-0" },
                        { name: "Rear brake shoes", pn: "8-97069047-0" },
                        { name: "Rear drum", pn: "8-97041065-0" },
                        { name: "Master cylinder", pn: "8-97069048-0" },
                        { name: "Wheel cylinder", pn: "8-97069049-0" },
                        { name: "Brake booster", pn: "8-97361097-0" },
                        { name: "Brake hose front", pn: "8-97143020-0" },
                        { name: "Brake fluid DOT3", pn: "—" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "8-97105980-0" },
                        { name: "Leaf spring pin & bush", pn: "8-97116041-0" },
                        { name: "U-bolt set", pn: "8-94115541-0" },
                        { name: "King pin set", pn: "8-97027720-0" },
                        { name: "Tie rod end outer", pn: "8-97048026-0" },
                        { name: "Drag link end", pn: "8-97048027-0" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "8-97054090-0" },
                        { name: "Pressure plate", pn: "8-97054091-0" },
                        { name: "Release bearing", pn: "8-97061092-0" },
                        { name: "Clutch booster kit", pn: "8-97361097-0" },
                        { name: "Gear oil 80W-90", pn: "—" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "AC compressor", pn: "8-97363096-0" },
                        { name: "Cabin air filter", pn: "8-97363097-0" },
                        { name: "Refrigerant R134a", pn: "—" },
                        { name: "AC belt", pn: "8-97163309-0" },
                    ]
                },
            ]
        },
        {
            id: "elfNKR350",
            name: "Isuzu Elf 350",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (4HF1 / 4HG1 / 4HK1)", items: [
                        { name: "Air filter 4HF1/4HG1", pn: "8-97095575-0" },
                        { name: "Air filter 4HK1", pn: "8-97363098-0" },
                        { name: "Oil filter", pn: "5-87610013-0" },
                        { name: "Fuel filter 4HF1", pn: "8-94151773-0" },
                        { name: "Fuel filter 4HK1 (common rail)", pn: "8-97363099-0" },
                        { name: "Engine oil 15W-40 (10L)", pn: "—" },
                        { name: "Injector nozzle set 4HF1", pn: "8-94154880-0" },
                        { name: "Injection pump kit 4HF1", pn: "8-97260707-0" },
                        { name: "Full gasket kit 4HF1", pn: "5-87812263-0" },
                        { name: "Full gasket kit 4HK1", pn: "5-87812264-0" },
                        { name: "Piston & liner kit 4HF1", pn: "8-97176588-0" },
                        { name: "Main bearing set 4HF1", pn: "8-97047852-0" },
                        { name: "Valve train set 4HF1", pn: "8-94393600-0" },
                        { name: "Timing gear set 4HF1", pn: "8-97176590-0" },
                        { name: "Turbocharger 4HK1", pn: "8-97363100-0" },
                        { name: "EGR valve 4HK1", pn: "8-97363101-0" },
                        { name: "DPF filter 4HK1", pn: "8-97363102-0" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump 4HF1", pn: "8-97176595-0" },
                        { name: "Water pump 4HK1", pn: "8-97363103-0" },
                        { name: "Thermostat", pn: "8-97060659-0" },
                        { name: "Radiator", pn: "8-97363104-0" },
                        { name: "Radiator hose set", pn: "8-97131686-0" },
                        { name: "Fan clutch", pn: "8-97363095-0" },
                        { name: "Fan belt", pn: "8-97163309-0" },
                        { name: "Coolant LLC", pn: "—" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 115D31L", pn: "Market: 115D31L" },
                        { name: "Alternator 90A", pn: "8-97363105-0" },
                        { name: "Starter motor", pn: "8-97039245-1" },
                        { name: "Glow plugs 4HF1 (x4)", pn: "8-94155047-0" },
                        { name: "ECM relay 4HK1", pn: "8-97363106-0" },
                        { name: "Headlight H4", pn: "—" },
                        { name: "Wiper blades", pn: "—" },
                        { name: "Fuse set", pn: "—" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads / drums", pn: "8-97069046-0" },
                        { name: "Rear brake shoes", pn: "8-97069047-0" },
                        { name: "Air brake chamber front", pn: "8-97363107-0" },
                        { name: "Slack adjuster", pn: "8-97363108-0" },
                        { name: "Air dryer cartridge", pn: "8-97363109-0" },
                        { name: "Brake drum rear", pn: "8-97041065-0" },
                        { name: "Wheel cylinder kit", pn: "8-97069049-0" },
                        { name: "Brake hose", pn: "8-97143020-0" },
                    ]
                },
                {
                    category: "Suspension", items: [
                        { name: "Front shock absorber", pn: "8-97105980-0" },
                        { name: "Leaf spring pin & bush", pn: "8-97116041-0" },
                        { name: "U-bolt set", pn: "8-94115541-0" },
                        { name: "King pin set", pn: "8-97027720-0" },
                        { name: "Tie rod end outer", pn: "8-97048026-0" },
                        { name: "Drag link end", pn: "8-97048027-0" },
                    ]
                },
                {
                    category: "Clutch & Drivetrain", items: [
                        { name: "Clutch plate", pn: "8-97054090-0" },
                        { name: "Pressure plate", pn: "8-97054091-0" },
                        { name: "Release bearing", pn: "8-97061092-0" },
                        { name: "Clutch booster", pn: "8-97361097-0" },
                        { name: "Propeller shaft UJ joint", pn: "8-97363110-0" },
                        { name: "Gear oil 80W-90", pn: "—" },
                    ]
                },
            ]
        },
        {
            id: "canter",
            name: "Mitsubishi Canter FE series",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (4D30 / 4D32 / 4M50)", items: [
                        { name: "Air filter 4D30/32", pn: "ME013340" },
                        { name: "Air filter 4M50", pn: "ME300746" },
                        { name: "Oil filter 4D32", pn: "ME014833" },
                        { name: "Oil filter 4M50", pn: "ME302706" },
                        { name: "Fuel filter 4D32", pn: "ME016257" },
                        { name: "Fuel filter 4M50", pn: "ME300708" },
                        { name: "Engine oil 15W-40 (10L)", pn: "—" },
                        { name: "Injector nozzle set 4D32", pn: "ME013257 (nozzle)" },
                        { name: "Injection pump kit 4D32", pn: "ME014254" },
                        { name: "Glow plugs 4D32", pn: "ME013012" },
                        { name: "Head gasket set 4D32", pn: "ME999225" },
                        { name: "Head gasket set 4M50", pn: "ME302507" },
                        { name: "Piston & liner kit 4D32", pn: "ME999226" },
                        { name: "Main bearing set 4D32", pn: "ME999227" },
                        { name: "Con rod bearing 4D32", pn: "ME999228" },
                        { name: "Valve set 4D32", pn: "ME999229" },
                        { name: "Timing gear set 4D32", pn: "ME013478" },
                        { name: "Turbo 4D33T / 4M50", pn: "49179-00260 (4D33T)" },
                        { name: "EGR valve 4M50", pn: "ME302589" },
                        { name: "Engine mount front", pn: "ME300350" },
                        { name: "Rocker cover gasket", pn: "ME013120" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Water pump 4D32", pn: "ME013326" },
                        { name: "Water pump 4M50", pn: "ME302510" },
                        { name: "Thermostat 4D32", pn: "ME013322" },
                        { name: "Thermostat 4M50", pn: "ME302508" },
                        { name: "Radiator hose upper 4D32", pn: "ME013320" },
                        { name: "Fan belt 4D32", pn: "ME013270" },
                        { name: "Fan belt 4M50 (serpentine)", pn: "ME302520" },
                        { name: "Radiator cap", pn: "ME013328" },
                        { name: "Coolant LLC", pn: "—" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator 4D32", pn: "A2T82091" },
                        { name: "Alternator 4M50", pn: "A3T13971" },
                        { name: "Starter motor 4D32", pn: "M2T56781" },
                        { name: "Starter motor 4M50", pn: "M009T60471" },
                        { name: "Glow plugs 4D32 (x4)", pn: "ME013012" },
                        { name: "Glow relay", pn: "ME012676" },
                        { name: "Wiper blades", pn: "—" },
                        { name: "Headlight H4", pn: "—" },
                        { name: "Fuse set", pn: "—" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "MC889484" },
                        { name: "Rear brake shoes", pn: "MC889485" },
                        { name: "Rear drum", pn: "MC889486" },
                        { name: "Master cylinder kit", pn: "MC889487" },
                        { name: "Wheel cylinder kit", pn: "MC889488" },
                        { name: "Brake hose front", pn: "MC889489" },
                        { name: "Brake booster", pn: "MC889490" },
                        { name: "Brake fluid DOT3", pn: "—" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber", pn: "MK160046" },
                        { name: "Leaf spring pin & bush", pn: "MK160047" },
                        { name: "U-bolt set", pn: "MC889491" },
                        { name: "King pin set full", pn: "MC120024" },
                        { name: "Tie rod end outer", pn: "MC889492" },
                        { name: "Drag link end", pn: "MC889493" },
                        { name: "Shackle pin set", pn: "MK160049" },
                    ]
                },
                {
                    category: "Clutch & Transmission", items: [
                        { name: "Clutch plate 4D32", pn: "ME521013" },
                        { name: "Pressure plate 4D32", pn: "ME521014" },
                        { name: "Release bearing", pn: "ME521015" },
                        { name: "Clutch booster kit", pn: "ME521016" },
                        { name: "Propeller shaft UJ joint", pn: "MK160050" },
                        { name: "Gear oil 80W-90 (3L)", pn: "—" },
                        { name: "Rear axle seal", pn: "ME521017" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "AC compressor", pn: "AKC200A204F" },
                        { name: "Cabin air filter", pn: "MB660768" },
                        { name: "Refrigerant R134a", pn: "—" },
                        { name: "AC belt", pn: "ME013271" },
                        { name: "AC condenser", pn: "MC889494" },
                    ]
                },
            ]
        },
        {
            id: "hiaceLH113",
            name: "Toyota Hiace LH113",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (3L Diesel 2.8L)", items: [
                        { name: "Air filter", pn: "17801-54070" },
                        { name: "Oil filter", pn: "90915-20003" },
                        { name: "Fuel filter", pn: "23390-64450" },
                        { name: "Engine oil 15W-40 (7L)", pn: "—" },
                        { name: "Injector nozzle 3L (DLLA150P)", pn: "23600-54410" },
                        { name: "Injection pump kit 3L", pn: "22100-54410" },
                        { name: "Glow plugs 3L (x4)", pn: "19850-54070" },
                        { name: "Head gasket set 3L", pn: "04111-54013" },
                        { name: "Piston & liner kit 3L STD", pn: "13010-54071" },
                        { name: "Main bearing set 3L STD", pn: "11701-54030" },
                        { name: "Con rod bearing set 3L STD", pn: "13202-54030" },
                        { name: "Valve set inlet (x4)", pn: "13711-54030" },
                        { name: "Valve set exhaust (x4)", pn: "13712-54030" },
                        { name: "Valve guides set", pn: "11128-54030" },
                        { name: "Timing chain kit 3L", pn: "13506-54030 (guide)" },
                        { name: "Water pump (with timing)", pn: "16100-54100" },
                        { name: "Engine mount front", pn: "12361-54050" },
                        { name: "Rocker cover gasket", pn: "11213-54030" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC (2L)", pn: "08889-01005" },
                        { name: "Thermostat", pn: "90916-03108" },
                        { name: "Radiator", pn: "16400-54140" },
                        { name: "Radiator hose upper", pn: "16571-54030" },
                        { name: "Radiator hose lower", pn: "16572-54030" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Fan belt 3L", pn: "90916-02587" },
                        { name: "Fan coupling", pn: "16210-54030" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator 3L", pn: "27060-54080" },
                        { name: "Starter motor 3L", pn: "28100-54080" },
                        { name: "Glow plug relay", pn: "28610-54020" },
                        { name: "Headlight H4 bulb", pn: "90981-11132" },
                        { name: "Indicator bulb 21W", pn: "90080-81098" },
                        { name: "Wiper blade driver", pn: "85212-26040" },
                        { name: "Wiper blade passenger", pn: "85222-26040" },
                        { name: "Fuse set", pn: "82641-26010" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-26130" },
                        { name: "Rear brake shoes", pn: "04495-26100" },
                        { name: "Rear drum", pn: "42431-26020" },
                        { name: "Master cylinder", pn: "47201-26220" },
                        { name: "Wheel cylinder rear", pn: "47560-26060" },
                        { name: "Front brake hose", pn: "90947-02D77" },
                        { name: "Brake booster", pn: "44610-26130" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                    ]
                },
                {
                    category: "Suspension & Steering", items: [
                        { name: "Front shock absorber LH", pn: "48520-26340" },
                        { name: "Front shock absorber RH", pn: "48510-26340" },
                        { name: "Rear shock absorber", pn: "48531-26260" },
                        { name: "Upper ball joint", pn: "43330-26010" },
                        { name: "Lower ball joint", pn: "43340-26010" },
                        { name: "Tie rod end outer", pn: "45047-26030" },
                        { name: "Stabilizer bush", pn: "90389-26003" },
                        { name: "Stabilizer link", pn: "48820-26030" },
                        { name: "King pin set", pn: "43290-26010" },
                        { name: "Front wheel bearing", pn: "90366-40056" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "31250-26110" },
                        { name: "Pressure plate", pn: "31210-26110" },
                        { name: "Release bearing", pn: "31230-26070" },
                        { name: "Clutch master cylinder", pn: "31420-26030" },
                        { name: "Clutch slave cylinder", pn: "31470-26030" },
                        { name: "Gear oil 80W-90 (3L)", pn: "08885-02506" },
                        { name: "Gearbox input seal", pn: "90311-38082" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "Cabin air filter", pn: "87139-26030" },
                        { name: "AC compressor", pn: "88320-26180" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "AC belt", pn: "90916-02547" },
                        { name: "Expansion valve", pn: "88515-26060" },
                        { name: "AC condenser", pn: "88460-26060" },
                    ]
                },
                {
                    category: "Fuel System", items: [
                        { name: "Fuel tank cap", pn: "77300-26020" },
                        { name: "Fuel injection pipes set", pn: "23281-54030" },
                        { name: "Fuel filter bowl seal", pn: "23390-64450" },
                    ]
                },
                {
                    category: "Body & Sliding Door", items: [
                        { name: "Sliding door top roller", pn: "68921-26020" },
                        { name: "Sliding door lower roller", pn: "68923-26020" },
                        { name: "Sliding door handle outer", pn: "69220-26020" },
                        { name: "Mirror glass LH", pn: "87961-26030" },
                        { name: "Windshield rubber seal", pn: "75535-26020" },
                        { name: "Rear door hinge", pn: "68770-26020" },
                        { name: "Wiper motor", pn: "85110-26100" },
                    ]
                },
            ]
        },
        {
            id: "CR41",
            name: "Toyota Land Cruiser CR41",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (2C / 2C-T Diesel)", items: [
                        { name: "Air filter", pn: "17801-64010" },
                        { name: "Oil filter", pn: "90915-20003" },
                        { name: "Fuel filter", pn: "23390-64450" },
                        { name: "Engine oil 15W-40 (5.5L)", pn: "—" },
                        { name: "Injector nozzle 2C (DLLA)", pn: "23600-64010" },
                        { name: "Injection pump kit 2C", pn: "22100-64010" },
                        { name: "Glow plugs 2C (x4)", pn: "19850-64010" },
                        { name: "Head gasket set 2C", pn: "04111-64012" },
                        { name: "Piston & liner kit 2C STD", pn: "13010-64030" },
                        { name: "Main bearing set 2C STD", pn: "11701-64020" },
                        { name: "Con rod bearing set 2C", pn: "13202-64020" },
                        { name: "Valve set inlet", pn: "13711-64020" },
                        { name: "Valve set exhaust", pn: "13712-64020" },
                        { name: "Timing belt kit 2C", pn: "13568-64020 (belt)" },
                        { name: "Timing belt idler", pn: "13505-64020" },
                        { name: "Water pump 2C (with timing)", pn: "16100-64030" },
                        { name: "Turbo 2C-T + oil pipe", pn: "17201-64040 (turbo)" },
                        { name: "Engine mount front", pn: "12361-64020" },
                        { name: "Rocker cover gasket", pn: "11213-64020" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC (2L)", pn: "08889-01005" },
                        { name: "Thermostat 2C", pn: "90916-03108" },
                        { name: "Radiator", pn: "16400-64050" },
                        { name: "Radiator hose upper", pn: "16571-64030" },
                        { name: "Radiator hose lower", pn: "16572-64030" },
                        { name: "Fan belt 2C", pn: "90916-02530" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator 2C", pn: "27060-64030" },
                        { name: "Starter motor 2C", pn: "28100-64030" },
                        { name: "Glow plug relay", pn: "28610-64030" },
                        { name: "Headlight H4 bulb", pn: "90981-11132" },
                        { name: "Wiper blades", pn: "85212-60030" },
                        { name: "Fuse set", pn: "82641-60030" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-60020" },
                        { name: "Rear brake shoes", pn: "04495-60020" },
                        { name: "Rear drum", pn: "42431-60020" },
                        { name: "Master cylinder", pn: "47201-60060" },
                        { name: "Wheel cylinder rear", pn: "47560-60020" },
                        { name: "Brake hose front", pn: "90947-02D65" },
                        { name: "Brake booster", pn: "44610-60040" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                    ]
                },
                {
                    category: "Suspension & Steering (4WD)", items: [
                        { name: "Front shock absorber LH", pn: "48520-60090" },
                        { name: "Front shock absorber RH", pn: "48510-60090" },
                        { name: "Rear shock absorber", pn: "48531-60070" },
                        { name: "Upper ball joint front", pn: "43330-60020" },
                        { name: "Lower ball joint front", pn: "43340-60020" },
                        { name: "Tie rod end outer", pn: "45047-60020" },
                        { name: "Drag link end", pn: "45464-60020" },
                        { name: "King pin set", pn: "43290-60020" },
                        { name: "Leaf spring pin & bush set", pn: "48203-60020" },
                        { name: "U-bolt set rear", pn: "90118-WB003" },
                        { name: "Swivel hub bearing", pn: "90366-55011" },
                    ]
                },
                {
                    category: "4WD / Transfer Case", items: [
                        { name: "Transfer case oil seal front", pn: "90311-50003" },
                        { name: "Transfer case fluid 75W-90 (2L)", pn: "08885-02506" },
                        { name: "Front diff oil seal", pn: "90311-38060" },
                        { name: "Front axle hub seal", pn: "90311-50003" },
                        { name: "Front propeller shaft UJ", pn: "04371-60020" },
                        { name: "Rear propeller shaft UJ", pn: "04371-60021" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "31250-60070" },
                        { name: "Pressure plate", pn: "31210-60070" },
                        { name: "Release bearing", pn: "31230-60040" },
                        { name: "Gear oil 80W-90 (3L)", pn: "08885-02506" },
                        { name: "Gearbox input seal", pn: "90311-38082" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "AC compressor", pn: "88320-60030" },
                        { name: "AC belt", pn: "90916-02535" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-60020" },
                        { name: "Cabin air filter", pn: "87139-60020" },
                    ]
                },
            ]
        },
        {
            id: "CR27",
            name: "Toyota Land Cruiser CR27",
            year: "",
            flag: "🇯🇵",
            type: "Japan",
            parts: [
                {
                    category: "Engine (2C Diesel 2.0L)", items: [
                        { name: "Air filter", pn: "17801-64010" },
                        { name: "Oil filter", pn: "90915-20003" },
                        { name: "Fuel filter", pn: "23390-64450" },
                        { name: "Engine oil 15W-40 (4.7L)", pn: "—" },
                        { name: "Injector nozzle DLLA155P24", pn: "23600-64060" },
                        { name: "Injection pump kit 2C", pn: "22100-64010" },
                        { name: "Glow plugs 2C (x4)", pn: "19850-64010" },
                        { name: "Full gasket kit 2C", pn: "04111-64012" },
                        { name: "Piston & liner kit STD", pn: "13010-64030" },
                        { name: "Main bearing set STD", pn: "11701-64020" },
                        { name: "Con rod bearing set STD", pn: "13202-64020" },
                        { name: "Valve set inlet (x4)", pn: "13711-64020" },
                        { name: "Valve set exhaust (x4)", pn: "13712-64020" },
                        { name: "Timing belt kit 2C", pn: "13568-64020" },
                        { name: "Timing belt idler pulley", pn: "13505-64020" },
                        { name: "Water pump 2C", pn: "16100-64030" },
                        { name: "Valve cover gasket", pn: "11213-64020" },
                        { name: "Engine mount front", pn: "12361-64020" },
                        { name: "Engine mount rear", pn: "12371-64020" },
                        { name: "Oil pump", pn: "15100-64010" },
                    ]
                },
                {
                    category: "Cooling", items: [
                        { name: "Coolant LLC (2L)", pn: "08889-01005" },
                        { name: "Thermostat 2C", pn: "90916-03108" },
                        { name: "Radiator", pn: "16400-64060" },
                        { name: "Radiator hose upper", pn: "16571-64020" },
                        { name: "Radiator hose lower", pn: "16572-64020" },
                        { name: "Fan belt 2C", pn: "90916-02530" },
                        { name: "Radiator cap", pn: "16401-0D020" },
                        { name: "Fan blade", pn: "16361-64010" },
                    ]
                },
                {
                    category: "Electrical", items: [
                        { name: "Battery 95D31L", pn: "Market: 95D31L" },
                        { name: "Alternator 2C", pn: "27060-64030" },
                        { name: "Alternator brushes set", pn: "27411-64030" },
                        { name: "Starter motor 2C", pn: "28100-64030" },
                        { name: "Glow plug relay", pn: "28610-64020" },
                        { name: "Headlight H4 bulb", pn: "90981-11132" },
                        { name: "Tail light cluster LH", pn: "81561-60020" },
                        { name: "Fuse set", pn: "82641-60020" },
                        { name: "Wiper blades", pn: "85212-60030" },
                    ]
                },
                {
                    category: "Brakes", items: [
                        { name: "Front brake pads", pn: "04465-60010" },
                        { name: "Rear brake shoes", pn: "04495-60010" },
                        { name: "Rear brake drum", pn: "42431-60010" },
                        { name: "Master cylinder", pn: "47201-60040" },
                        { name: "Rear wheel cylinder", pn: "47560-60010" },
                        { name: "Brake booster", pn: "44610-60020" },
                        { name: "Front brake hose", pn: "90947-02D60" },
                        { name: "Brake fluid DOT3", pn: "08823-80003" },
                    ]
                },
                {
                    category: "Suspension (Solid axle 4x4)", items: [
                        { name: "Front shock absorber LH", pn: "48520-60070" },
                        { name: "Front shock absorber RH", pn: "48510-60070" },
                        { name: "Rear shock absorber", pn: "48531-60050" },
                        { name: "Upper ball joint front", pn: "43330-60010" },
                        { name: "Lower ball joint front", pn: "43340-60010" },
                        { name: "Tie rod end outer", pn: "45047-60010" },
                        { name: "Drag link end", pn: "45464-60010" },
                        { name: "King pin full set", pn: "43290-60010" },
                        { name: "Leaf spring pin & bush set", pn: "48203-60010" },
                        { name: "U-bolt set rear", pn: "90118-WB003" },
                        { name: "Front wheel bearing hub set", pn: "90366-55010" },
                        { name: "Swivel hub oil seal", pn: "90311-50002" },
                    ]
                },
                {
                    category: "4WD / Transfer Case", items: [
                        { name: "Transfer case oil 75W-90 (2L)", pn: "08885-02506" },
                        { name: "Transfer case oil seal", pn: "90311-50003" },
                        { name: "Front diff oil seal", pn: "90311-38060" },
                        { name: "Front propeller shaft UJ", pn: "04371-60010" },
                        { name: "Rear propeller shaft UJ", pn: "04371-60011" },
                        { name: "Rear axle shaft seal", pn: "90311-38080" },
                    ]
                },
                {
                    category: "Clutch & Gearbox", items: [
                        { name: "Clutch plate", pn: "31250-60050" },
                        { name: "Pressure plate", pn: "31210-60050" },
                        { name: "Release bearing", pn: "31230-60020" },
                        { name: "Pilot bearing", pn: "90363-35010" },
                        { name: "Gear oil 80W-90 (3L)", pn: "08885-02506" },
                        { name: "Gearbox input seal", pn: "90311-38082" },
                        { name: "Gearbox output seal", pn: "90311-38083" },
                    ]
                },
                {
                    category: "AC System", items: [
                        { name: "AC compressor", pn: "88320-60020" },
                        { name: "AC belt", pn: "90916-02535" },
                        { name: "Refrigerant R134a", pn: "88899-01065" },
                        { name: "Expansion valve", pn: "88515-60010" },
                    ]
                },
                {
                    category: "Body", items: [
                        { name: "Door handle inner front", pn: "69205-60010" },
                        { name: "Door handle outer front", pn: "69220-60010" },
                        { name: "Window winder handle", pn: "69260-60010" },
                        { name: "Mirror glass LH", pn: "87961-60010" },
                        { name: "Door seal rubber front", pn: "67861-60010" },
                        { name: "Windshield seal", pn: "75535-60010" },
                        { name: "Bonnet hinge LH", pn: "53420-60010" },
                    ]
                },
            ]
        },
    ]
};
