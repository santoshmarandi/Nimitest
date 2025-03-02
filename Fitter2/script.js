const questions = [
    { qNum: 51, question: "What is the advantage of using Gib headed key? Gib headed key का उपयोग करने का क्या लाभ है?", options: ["Used for tapered fittings / टेपर्ड फिटिंग्स के लिए उपयोग किया जाता है", "Can be withdrawn easily / आसानी से वापस लिया जा सकता है", "Provides unidirectional torque / एक दिशात्मक टॉर्क प्रदान करता है", "Good in high speed application / उच्च गति अनुप्रयोग में अच्छा है"], answer: 1, image: "" },
    { qNum: 52, question: "Which file is used for finishing sharp corners? तेज कोनों को खत्म करने के लिए किस फाइल का उपयोग किया जाता है?", options: ["Pillar file / पिलर फाइल", "Riffler file / रिफ्लर फाइल", "Barrette file / बैरेट फाइल", "Warding file / वार्डिंग फाइल"], answer: 2, image: "" },
    { qNum: 53, question: "What is the name of file? फाइल का नाम क्या है?", options: ["Tinker's file / टिंकर की फाइल", "Crossing file / क्रॉसिंग फाइल", "Swiss pattern file / स्विस पैटर्न फाइल", "Dread naught file / ड्रेड नॉट फाइल"], answer: 0, image: "" },
    { qNum: 54, question: "Which device is used to check the workpiece to confirm the shape? वर्कपीस के आकार की पुष्टि करने के लिए किस उपकरण का उपयोग किया जाता है?", options: ["Profile gauge / प्रोफाइल गेज", "Snap / स्नैप", "Caliper gauge / कैलिपर गेज", "Answer-a"], answer: 0, image: "" },
    { qNum: 55, question: "What is the purpose of feeler gauge? फीलर गेज का उद्देश्य क्या है?", options: ["Check the depth of drilled hole / ड्रिल किए गए छेद की गहराई की जांच करना", "Check the pitch of screw thread / स्क्रू थ्रेड की पिच की जांच करना", "Check the radius of workpiece / वर्कपीस की त्रिज्या की जांच करना", "Check the gap between the mating parts / मेटिंग पार्ट्स के बीच की गैप की जांच करना"], answer: 3, image: "" },
    { qNum: 56, question: "What is the name of gauge? गेज का नाम क्या है?", options: ["Drill gauge / ड्रिल गेज", "Centre / सेंटर", "Profile gauge / प्रोफाइल गेज", "Standard / स्टैंडर्ड"], answer: 3, image: "" },
    { qNum: 57, question: "Which gauge is used to check the outside diameter of a cylindrical shaft? सिलिंड्रिकल शाफ्ट के बाहरी व्यास की जांच करने के लिए किस गेज का उपयोग किया जाता है?", options: ["Plug gauge / प्लग गेज", "Plain / प्लेन", "Taper ring gauge / टेपर रिंग गेज", "Progressive plug gauge / प्रोग्रेसिव प्लग गेज"], answer: 1, image: "" },
    { qNum: 58, question: "What is the act of joining the slip gauges together for building up sizes? स्लिप गेज को आकार बनाने के लिए एक साथ जोड़ने की क्रिया क्या है?", options: ["Glazing / ग्लेज़िंग", "Pinning / पिनिंग", "Loading / लोडिंग", "Wringing / रिंगिंग"], answer: 3, image: "" },
    { qNum: 59, question: "What material is used to make sine bar? साइन बार बनाने के लिए किस सामग्री का उपयोग किया जाता है?", options: ["Invar steel / इन्वार स्टील", "High speed steel / हाई स्पीड स्टील", "High carbon steel / हाई कार्बन स्टील", "Stabilized chromium steel / स्टेबलाइज्ड क्रोमियम स्टील"], answer: 3, image: "" },
    { qNum: 60, question: "How the length of sine bar is specified? साइन बार की लंबाई कैसे निर्दिष्ट की जाती है?", options: ["Distance between outer point of roller / रोलर के बाहरी बिंदु के बीच की दूरी", "Distance between inner point of roller / रोलर के आंतरिक बिंदु के बीच की दूरी", "Distance between centre point of rollers / रोलर्स के केंद्र बिंदु के बीच की दूरी", "Distance between the edges of sine bar / साइन बार के किनारों के बीच की दूरी"], answer: 2, image: "" },
    { qNum: 61, question: "Which one forms the hypotenuse of the triangle while checking with sine bar? साइन बार से जांच करते समय त्रिभुज का कर्ण कौन बनाता है?", options: ["Surface plate / सरफेस प्लेट", "Sine bar width / साइन बार की चौड़ाई", "Sine bar length / साइन बार की लंबाई", "Slip gauges height / स्लिप गेज की ऊंचाई"], answer: 2, image: "" },
    { qNum: 62, question: "What is the effect of excessive application of abrasive compound in lapping operation? लैपिंग ऑपरेशन में अत्यधिक अपघर्षक यौगिक के उपयोग का क्या प्रभाव होता है?", options: ["Developing inaccuracies / अशुद्धियों का विकास होना", "Bright spots will be visible / चमकदार धब्बे दिखाई देंगे", "Obstruct component movement / घटक की गति में बाधा उत्पन्न होना", "Lapping compound will be sticky / लैपिंग यौगिक चिपचिपा हो जाएगा"], answer: 0, image: "" },
    { qNum: 63, question: "What is caused if the lap is harder than the workpiece? यदि लैप वर्कपीस से अधिक कठोर है तो क्या होता है?", options: ["Workpiece will cut the lap / वर्कपीस लैप को काट देगा", "Accuracy can’t be obtained / सटीकता प्राप्त नहीं की जा सकती", "Lap will cut the workpiece / लैप वर्कपीस को काट देगा", "Lapping operation leaves high spots / लैपिंग ऑपरेशन उच्च स्थान छोड़ता है"], answer: 0, image: "" },
    { qNum: 64, question: "Which material is used to make small diameter laps? छोटे व्यास के लैप बनाने के लिए किस सामग्री का उपयोग किया जाता है?", options: ["Cast iron / कास्ट आयरन", "Aluminium / एल्युमीनियम", "Bronze or zinc / कांस्य या जिंक", "Copper or brass / तांबा या पीतल"], answer: 3, image: "" },
    { qNum: 65, question: "What is the name of surface texture measuring instrument? सतह की बनावट मापने वाले उपकरण का नाम क्या है?", options: ["Dial test indicator / डायल टेस्ट इंडिकेटर", "Electrical surface indicator / इलेक्ट्रिकल सरफेस इंडिकेटर", "Electronic surface indicator / इलेक्ट्रॉनिक सरफेस इंडिकेटर", "Mechanical surface indicator / मैकेनिकल सरफेस इंडिकेटर"], answer: 3, image: "" },
    { qNum: 66, question: "Why manual stroking is preferred for large quantities in honing operation? होनिंग ऑपरेशन में बड़ी मात्रा के लिए मैन्युअल स्ट्रोकिंग को क्यों पसंद किया जाता है?", options: ["To reduce cost / लागत कम करने के लिए", "To reduce time / समय कम करने के लिए", "To keep close tolerance / करीबी टॉलरेंस बनाए रखने के लिए", "To reduce maintenance cost / रखरखाव लागत कम करने के लिए"], answer: 2, image: "" },
    { qNum: 67, question: "What is the purpose of hardening? हार्डनिंग का उद्देश्य क्या है?", options: ["Refine the structure / संरचना को परिष्कृत करना", "Increase toughness / कठोरता बढ़ाना", "Increase cutting ability / कटिंग क्षमता बढ़ाना", "Relieve stress and strain / तनाव और प्रतिबल को दूर करना"], answer: 2, image: "" },
    { qNum: 68, question: "Which method of heat treatment to improve machinability and ductility in the job? किस हीट ट्रीटमेंट विधि से जॉब में मशीनीकरण और लचीलापन सुधारा जा सकता है?", options: ["Annealing / ऐनीलिंग", "Hardening / हार्डनिंग", "Tempering / टेम्परिंग", "Normalizing / नॉर्मलाइजिंग"], answer: 0, image: "" },
    { qNum: 69, question: "What is the disadvantage of flame hardening in the heat treatment process? हीट ट्रीटमेंट प्रक्रिया में फ्लेम हार्डनिंग का नुकसान क्या है?", options: ["More distortion / अधिक विरूपण", "Long hardening time / लंबा हार्डनिंग समय", "Small depth of hardening / हार्डनिंग की कम गहराई", "Not suitable for small workpieces / छोटे वर्कपीस के लिए उपयुक्त नहीं"], answer: 3, image: "" },
    { qNum: 70, question: "What is the name of method in metallic coating done by rolling or drawing the layers of metal on the base metal? बेस मेटल पर धातु की परतों को रोलिंग या ड्राइंग द्वारा लगाने की विधि का नाम क्या है?", options: ["Spraying / स्प्रेइंग", "Cladding / क्लैडिंग", "Enameling / एनामेलिंग", "Molten metal bath / मोल्टन मेटल बाथ"], answer: 1, image: "" },
    { qNum: 71, question: "Which type of key used if the hub of pulley has to axially slide on the shaft to some distance? यदि पुली के हब को शाफ्ट पर कुछ दूरी तक अक्षीय रूप से स्लाइड करना हो तो किस प्रकार की की का उपयोग किया जाता है?", options: ["Feather key / फीदर की", "Flat saddle key / फ्लैट सैडल की", "Circular taper key / सर्कुलर टेपर की", "Hallow saddle key / हॉलो सैडल की"], answer: 0, image: "" },
    { qNum: 72, question: "What is the name of file? फाइल का नाम क्या है?", options: ["Pillar file / पिलर फाइल", "Warding file / वार्डिंग फाइल", "Dreadnaught file / ड्रेडनॉट फाइल", "Swiss pattern file / स्विस पैटर्न फाइल"], answer: 1, image: "" },
    { qNum: 73, question: "Which nut protects the bolt end thread from damages? कौन सा नट बोल्ट के अंतिम थ्रेड को नुकसान से बचाता है?", options: ["Cap nut / कैप नट", "Castle nut / कैसल नट", "Slotted nut / स्लॉटेड नट", "Knurled nut / नर्ल्ड नट"], answer: 0, image: "" },
    { qNum: 74, question: "Which grade slip gauge is used for precision tool room applications? प्रिसिजन टूल रूम अनुप्रयोगों के लिए किस ग्रेड के स्लिप गेज का उपयोग किया जाता है?", options: ["Grade 00 / ग्रेड 00", "Grade 0 / ग्रेड 0", "Grade I / ग्रेड I", "Grade II / ग्रेड II"], answer: 2, image: "" },
    { qNum: 75, question: "Which material is used to make slip gauge block? स्लिप गेज ब्लॉक बनाने के लिए किस सामग्री का उपयोग किया जाता है?", options: ["Tool steel / टूल स्टील", "Low grade steel / लो ग्रेड स्टील", "High grade steel with low thermal expansion / कम थर्मल विस्तार वाला हाई ग्रेड स्टील", "High carbon steel / हाई कार्बन स्टील"], answer: 2, image: "" },
    { qNum: 76, question: "Which operation is performed with fine abrasive particles? बारीक अपघर्षक कणों के साथ कौन सा ऑपरेशन किया जाता है?", options: ["Filing / फाइलिंग", "Lapping / लैपिंग", "Scraping / स्क्रैपिंग", "Polishing / पॉलिशिंग"], answer: 1, image: "" },
    { qNum: 77, question: "What is the purpose of normalising? नॉर्मलाइजिंग का उद्देश्य क्या है?", options: ["Add cutting ability / कटिंग क्षमता जोड़ना", "Develop high hardness / उच्च कठोरता विकसित करना", "Increase wear resistance / घिसाव प्रतिरोध बढ़ाना", "Remove stress and strain / तनाव और प्रतिबल को दूर करना"], answer: 3, image: "" },
    { qNum: 78, question: "Which structure of steel contain 0% carbon? स्टील की कौन सी संरचना में 0% कार्बन होता है?", options: ["Ferrite / फेराइट", "Pearlite / पर्लाइट", "Austenite / ऑस्टेनाइट", "Cementite / सीमेंटाइट"], answer: 0, image: "" },
    { qNum: 79, question: "What is the method of surface hardening? सतह को कठोर बनाने की विधि क्या है?", options: ["Nitriding / नाइट्राइडिंग", "Case hardening / केस हार्डनिंग", "Flame hardening / फ्लेम हार्डनिंग", "Induction hardening / इंडक्शन हार्डनिंग"], answer: 3, image: "" },
    { qNum: 80, question: "Which type of key is used for transmitting high torque on both direction of rotation? घूर्णन की दोनों दिशाओं में उच्च टॉर्क संचारित करने के लिए किस प्रकार की की का उपयोग किया जाता है?", options: ["Flat saddle key / फ्लैट सैडल की", "Taper sunk key / टेपर सन्क की", "Woodruft key / वुड्रफ की", "Tangential key / स्पर्शीय की"], answer: 3, image: "" },
    { qNum: 81, question: "What is the use of ring gauge? रिंग गेज का उपयोग क्या है?", options: ["Check hole diameter / छेद के व्यास की जांच करना", "Check shaft diameter / शाफ्ट के व्यास की जांच करना", "Check tapered shaft diameter / टेपर शाफ्ट के व्यास की जांच करना", "Check internal thread diameter / आंतरिक थ्रेड के व्यास की जांच करना"], answer: 1, image: "" },
    { qNum: 82, question: "Which gauge is used to check the accuracy of an internal thread? आंतरिक थ्रेड की सटीकता की जांच करने के लिए किस गेज का उपयोग किया जाता है?", options: ["Ring gauge / रिंग गेज", "Snap gauge / स्नैप गेज", "Thread plug gauge / थ्रेड प्लग गेज", "Centre gauge / सेंटर गेज"], answer: 2, image: "" },
    { qNum: 83, question: "What is the name of the gauge? गेज का नाम क्या है?", options: ["Ring gauge / रिंग गेज", "Snap gauge / स्नैप गेज", "Taper ring gauge / टेपर रिंग गेज", "Internal thread gauge / आंतरिक थ्रेड गेज"], answer: 2, image: "" },
    { qNum: 84, question: "What is the procedure to select the slip gauge for particular dimension? विशेष आयाम के लिए स्लिप गेज का चयन करने की प्रक्रिया क्या है?", options: ["Built with grade accuracy / ग्रेड सटीकता के साथ बनाया गया", "Minimum number of blocks / ब्लॉक की न्यूनतम संख्या", "Maximum number of block / ब्लॉक की अधिकतम संख्या", "Start wringing with large size slip gauge / बड़े आकार के स्लिप गेज से रिंगिंग शुरू करें"], answer: 3, image: "" },
    { qNum: 85, question: "Which process improves the quality of fit between the mating components? कौन सी प्रक्रिया मेटिंग घटकों के बीच फिट की गुणवत्ता में सुधार करती है?", options: ["Filing / फाइलिंग", "Turning / टर्निंग", "Grinding / ग्राइंडिंग", "Lapping / लैपिंग"], answer: 3, image: "" },
    { qNum: 86, question: "Which abrasive is used for lapping hardened steel and cast iron? हार्डन्ड स्टील और कास्ट आयरन के लैपिंग के लिए किस अपघर्षक का उपयोग किया जाता है?", options: ["Silicon carbide / सिलिकॉन कार्बाइड", "Boron carbide / बोरॉन कार्बाइड", "Aluminium oxide / एल्युमीनियम ऑक्साइड", "Fused aluminum / फ्यूज्ड एल्युमीनियम"], answer: 0, image: "" },
    { qNum: 87, question: "Which finishing operation is performed by the tool that rotate and reciprocate simultaneously? कौन सी फिनिशिंग ऑपरेशन उस टूल द्वारा की जाती है जो एक साथ घूमता और आगे-पीछे चलता है?", options: ["Drilling / ड्रिलिंग", "Honing / होनिंग", "Lapping / लैपिंग", "Grinding / ग्राइंडिंग"], answer: 1, image: "" },
    { qNum: 88, question: "Why holes are provided in ring type lapping? रिंग टाइप लैपिंग में छेद क्यों प्रदान किए जाते हैं?", options: ["Lubrication / लुब्रिकेशन के लिए", "Removal of heat / गर्मी को दूर करने के लिए", "Hold lapping compound / लैपिंग कंपाउंड को पकड़ने के लिए", "Increase the efficiency / दक्षता बढ़ाने के लिए"], answer: 2, image: "" },
    { qNum: 89, question: "Which type of key has one face curvature to match shaft surface? किस प्रकार की की में शाफ्ट सतह से मेल खाने के लिए एक चेहरे पर वक्रता होती है?", options: ["Sunk key / सन्क की", "Flat saddle key / फ्लैट सैडल की", "Circular taper key / सर्कुलर टेपर की", "Hallow saddle key / हॉलो सैडल की"], answer: 3, image: "" },
    { qNum: 90, question: "What is the name of key? की का नाम क्या है?", options: ["Parallel sunk key / पैरेलल सन्क की", "Gib head key / गिब हेड की", "Wood ruff key / वुड रफ की", "Tapper sunk key / टेपर सन्क की"], answer: 0, image: "" },
    { qNum: 91, question: "Which type of cutting tool is tempered by heating upto 230°C? 230°C तक गर्म करके किस प्रकार के कटिंग टूल को टेम्पर किया जाता है?", options: ["Taps / टैप्स", "Drills / ड्रिल्स", "Turning tool / टर्निंग टूल", "Reamers / रीमर्स"], answer: 2, image: "" },
    { qNum: 92, question: "Why normalising process is carried out in steel? स्टील में नॉर्मलाइजिंग प्रक्रिया क्यों की जाती है?", options: ["To add cutting ability / कटिंग क्षमता जोड़ने के लिए", "To develop high hardness / उच्च कठोरता विकसित करने के लिए", "To remove stress and strain / तनाव और प्रतिबल को दूर करने के लिए", "To increase wear resistance / घिसाव प्रतिरोध बढ़ाने के लिए"], answer: 2, image: "" },
    { qNum: 93, question: "Which heat treatment process increases the wear resistance of steel? कौन सी हीट ट्रीटमेंट प्रक्रिया स्टील के घिसाव प्रतिरोध को बढ़ाती है?", options: ["Annealing / ऐनीलिंग", "Tempering / टेम्परिंग", "Hardening / हार्डनिंग", "Normalising / नॉर्मलाइजिंग"], answer: 2, image: "" },
    { qNum: 94, question: "What is the purpose of annealing? ऐनीलिंग का उद्देश्य क्या है?", options: ["To soften the steel / स्टील को नरम करने के लिए", "To add cutting ability / कटिंग क्षमता जोड़ने के लिए", "To increase wear resistance / घिसाव प्रतिरोध बढ़ाने के लिए", "To refine the grain structure of the steel / स्टील के दाने की संरचना को परिष्कृत करने के लिए"], answer: 0, image: "" },
    { qNum: 95, question: "Why square head screws are provided with collar? स्क्वायर हेड स्क्रू के साथ कॉलर क्यों प्रदान किया जाता है?", options: ["Protect work surface / कार्य सतह की सुरक्षा के लिए", "Raise the head width / हेड की चौड़ाई बढ़ाने के लिए", "Provide leak proof joint / लीक प्रूफ जोड़ प्रदान करने के लिए", "Provide access for tools / टूल्स के लिए पहुंच प्रदान करने के लिए"], answer: 0, image: "" },
    { qNum: 96, question: "What is the purpose of taper plug gauges? टेपर प्लग गेज का उद्देश्य क्या है?", options: ["Check the hole with perfect fit / पूर्ण फिट के साथ छेद की जांच करना", "Check the hole with perfect fit / पूर्ण फिट के साथ छेद की जांच करना", "Check tapered hole with perfect fit / पूर्ण फिट के साथ टेपर छेद की जांच करना", "Check the taper accuracy of outside dia / बाहरी व्यास की टेपर सटीकता की जांच करना"], answer: 2, image: "" },
    { qNum: 97, question: "Why slots are provided in the adjustable ring lap? एडजस्टेबल रिंग लैप में स्लॉट क्यों प्रदान किए जाते हैं?", options: ["For lubrication / लुब्रिकेशन के लिए", "Permit clearance / क्लीयरेंस की अनुमति देने के लिए", "For expansion / विस्तार के लिए", "Permit feeding of lapping compound / लैपिंग कंपाउंड को फीड करने की अनुमति देने के लिए"], answer: 3, image: "" },
    { qNum: 98, question: "Which abrasive has excellent cutting properties and expensive? किस अपघर्षक में उत्कृष्ट कटिंग गुण होते हैं और यह महंगा है?", options: ["Diamond / डायमंड", "Boron carbide / बोरॉन कार्बाइड", "Silicon carbide / सिलिकॉन कार्बाइड", "Aluminium oxide / एल्युमीनियम ऑक्साइड"], answer: 1, image: "" },
    { qNum: 99, question: "What is lapping? लैपिंग क्या है?", options: ["Filing operation / फाइलिंग ऑपरेशन", "Grinding operation / ग्राइंडिंग ऑपरेशन", "Chiseling operation / छेनी का ऑपरेशन", "Precision finishing operation / प्रिसिजन फिनिशिंग ऑपरेशन"], answer: 3, image: "" },
    { qNum: 100, question: "What is the name of lap tool? लैप टूल का नाम क्या है?", options: ["Split bush lap / स्प्लिट बुश लैप", "Adjustable ring lap / एडजस्टेबल रिंग लैप", "Adjustable solid lap / एडजस्टेबल सॉलिड लैप", "Charging cylindrical lap / चार्जिंग सिलिंड्रिकल लैप"], answer: 0, image: "" }
];

let timeLeft = 1500; // 25 minutes (1500 seconds) for 50 questions
let score = 0;

function displayQuestions() {
    const container = document.getElementById('question-container');
    questions.forEach((q) => {
        let html = `
            <div class="question" id="question-${q.qNum}">
                <h3>Question ${q.qNum}: ${q.question}</h3>
                ${q.image ? `<img src="${q.image}" alt="Question ${q.qNum} diagram">` : ''}
                <div class="options" id="options-${q.qNum}">`;
        
        q.options.forEach((option, i) => {
            html += `
                <label class="option-label">
                    <input type="radio" name="q${q.qNum}" value="${i}">
                    <span class="option-text" id="option-${q.qNum}-${i}">${option}</span>
                </label>`;
        });
        
        html += `
                </div>
                <div class="status" id="status-${q.qNum}"></div>
            </div>`;
        container.innerHTML += html;
    });
}

function startTimer() {
    const timer = document.getElementById('timer');
    const interval = setInterval(() => {
        timeLeft--;
        timer.textContent = Math.floor(timeLeft / 60) + ':' + (timeLeft % 60).toString().padStart(2, '0');
        if (timeLeft <= 0) {
            clearInterval(interval);
            submitQuiz();
        }
    }, 1000);
}

function goBack() {
    window.location.href = '../index.html'; // Adjust this to your actual topics page URL
}

function submitQuiz() {
    let correct = 0;
    let wrong = 0;
    let notAttempted = 0;
    const total = questions.length;

    questions.forEach((q) => {
        const selected = document.querySelector(`input[name="q${q.qNum}"]:checked`);
        const userAnswer = selected ? parseInt(selected.value) : -1;
        const statusDiv = document.getElementById(`status-${q.qNum}`);
        const correctOption = document.getElementById(`option-${q.qNum}-${q.answer}`);

        correctOption.classList.add('correct-answer');

        if (userAnswer === -1) {
            statusDiv.textContent = "Not Attempted";
            statusDiv.classList.add('not-attempted');
            notAttempted++;
        } else if (userAnswer === q.answer) {
            correct++;
        } else {
            const wrongOption = document.getElementById(`option-${q.qNum}-${userAnswer}`);
            wrongOption.classList.add('incorrect-answer');
            wrong++;
        }

        document.querySelectorAll(`input[name="q${q.qNum}"]`).forEach(radio => radio.disabled = true);
    });

    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="result-box">
            <h2>Result</h2>
            <p>Correct Answers: ${correct}</p>
            <p>Wrong Answers: ${wrong}</p>
            <p>Not Attempted: ${notAttempted}</p>
            <p>Percentage Correct: ${((correct / total) * 100).toFixed(2)}%</p>
            <p>Percentage Wrong: ${((wrong / total) * 100).toFixed(2)}%</p>
            <p>Percentage Not Attempted: ${((notAttempted / total) * 100).toFixed(2)}%</p>
        </div>`;
    document.getElementById('submit-btn').disabled = true;
}

window.onload = () => {
    displayQuestions();
    startTimer();
};
