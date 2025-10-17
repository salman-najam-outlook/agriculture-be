const equipmentFuelTypes = ["Diesel", "Petrol", "Gas", "Coal_Wood"];
const equipmentLoanStatus = ["No_loan", "Cleared", "Uncleared"];

const equipmentTypes = ["single", "set"];

const defaultUserId = process.env.DEFAULT_USER_ID || 37
const defaultModeOfOperation = ['Manual (Human Energy)', 'Fuel Based', 'Electricity', 'Wind Energy', 'Solar'];
const gasUnits = ['mg/l', 'kg/ha', 'ppm'];
const modulesApiExcludedText = "admin";

const deforestationCredentials = {
  BASEURL:
    process.env.DEFORESTATION_SATELITE_URL ||
    "https://deforestation-api-dev.dimitra.dev",
  DETECT_DEFORESTATION: "/detect-deforestation",
  DEFORESTATION_API_KEY: "Kofj2lGvJXXT1P27y-qMqgpWyivbgtUpRMgZ2NQVbe7KjL21gvwKSSvWLIW3gCRDfYc",
  FETCH_IMAGE: "/get-image",
};

const soilApplicationStage = [
  'Land preparation',
  'Sowing/planting',
  'Top dressing',
  'Days after sowing (number of days)',
  'Crop height (height in cm or m)',
  'Tillering',
  'Flowering',
  'Heading',
  'Ripening',
  'Other '
];


const soilApplicationMethod = [
  'Surface/broadcasting application',
  'Surface application and deep ploughed',
  'Direct injection',
  'Raking',
  'Spading',
  'Aerial application',
];


const faq =   [
  {
      "id": "my_profile",
      "name": "My Profile",
      "qas": [
          {
              "question": "How can l enter my personal profile information?",
              "answer": "On your device you click on the icon on the left corner of your home page. You find a space to fill in your name and contact email address. You also have to fill in all details needed to create your accout"
          },
          {
              "question": "How do l edit my profile?",
              "answer": "To view and edit your profile details, you can either click on your name or the edit button right next to your name on the top of the screen"
          },
          {
              "question": "How do l save my profile updates?",
              "answer": "Whenever you create or make updates to your account information, you can confirm your changes by clicking on Save button located on the bottom of your screen. Once saved, the information will be automatically updated in the system"
          }
      ]
  },
  {
      "id": "my_farm",
      "name": "My Farm",
      "qas": [
          {
              "question": "How can I register my farm?",
              "answer": "You can click on My Farm section and select Farm registration. You can enter the information that is requested in the displayed form."
          },
          {
              "question": "How do l edit my farm registration information?",
              "answer": "Your farm registration details can be seen under My Farm module once you have filled out the form. To edit the deails, you can click on the edit button located on the detail confirmation screen"
          },
          {
              "question": "How do l find the location of my farm?",
              "answer": "Location or physical address of your farm, as well as more precise physical boundaries of your farm (Geofence) should be provided during the process of Farm Registration. The details can be accessed through My Location and My Geofence sections of My Farm where you can view the information you entered and make updates if needed"
          },
          {
              "question": "Why should I enter my goals?",
              "answer": "Adding information on your goals helps you track your progress against your predefined criteria and gives us a better understanding of the best ways we can help you meet your needs"
          },
          {
              "question": "Why should I fill out Farm Audit form?",
              "answer": "The purpose of the Farm Audit section is to determine whether a farmer is performing well against certain criteria related to various areas of the farm. We help you identify the areas that need to be rectified (improved) and areas where you are doing well. You can fill out our online audit form or you can provide/upload one of your existing audits for your reference"
          },
          {
              "question": "What is the purpose of My Documents section?",
              "answer": "You can upload various files and documents under My Documents section for the ease of the retrieval and future reference. You can organize your documents into folders, search and filter to find the appropriate files. You can upload the files related to various sections of the app from your device"
          }
      ]
  },
  {
      "id": "my_crops",
      "name": "My Crops",
      "qas": [
          {
              "question": "How can l register my crops?",
              "answer": "You can go to My Crops module and select Crop registration. Please enter the data mentioned in the form in order to register your crops in the system"
          },
          {
              "question": "How do l view and edit my crop registration details?",
              "answer":  "Once you fill out the details regarding your crops under the Crop registration screen, you can view the details in the confirmation screen where you can also edit the information by clicking on the edit button located on the same screen"
          },
          {
              "question":  "How can I specify the crop type and variety?",
              "answer": "Crop types and varieties should be entered during the Crop Registration process where you can select from the list of currently available crop types and varieties to choose from."
          },
          {
              "question": "What should I enter under Crop Observations section?",
              "answer": "Crop conditions, nutrient deficiencies and overall health-related details can be entered under the Crop Observation section to capture some additional details pertaining to your crop performance and condition. You can use this section as a diary for your periodic observations where you can also add extra notes and attach photos to help you track the condition over time."
          }
      ]
  },
  {
      "id": "my_livestock",
      "name": "My Livestock",
      "qas": [
          {
              "question": "How do l register my livestock?",
              "answer": "You can go to My Livestock Section and select Livestock registration. You enter your animal/s type, name / ID number and other information mentioned in the form to successfully register your animal details"
          },
          {
              "question": "How can I add my goal(s)?",
              "answer":  "You can enter your goal(s) in one in two ways: either by clicking on My Goals section under My Farm module where you can further choose whether you would like to enter a specific goal related to your crops or livestock. You can also locate my goals functionality under My Livestock or My Crops module to be able to enter information specific to the respective module. You can enter multiple goals."
          },
          {
              "question":  "How can I add observations on my animal/ animals?",
              "answer": "Animal Observations section located under My Livestock module is the best place to add any details on your animal observations. You can add observation details for either one of your individual (single) animals or a group of animals (herd)"
          },
          {
              "question": "What information about my livestock should I enter for a successful animal registration?",
              "answer": "Please follow the questions presented in the Livestock Registration form. Mandatory fields are marked with red asteryx and stand for the most crucial fields. We encourage you to provide as much information as possible as we will be able to provide more accurate recommendations and reports that meet your needs"
          }
      ]
  },
  {
      "id": "technical_issues",
      "name": "Technical Issues",
      "qas": [
          {
              "question": "For any technical issues, please contact us at help@dimitra.io with the explanation of your problem or fill out our online form which can be found in Contact Us section",
              "answer": ""
          }
      ]
  }
]

const syntheticFertilizers = [
  {
  'name': 'Urea',
  'n': '46%',
  'p': '0%',
  'k': '0%'
  },
  {
    'name': 'NPK',
    'n': '10%',
    'p': '26%',
    'k': '26%'
  },
  {
    'name': 'NPK',
    'n': '12%',
    'p': '32%',
    'k': '16%'
  },
  {
    'name': 'CAN',
    'n': '27%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'NPK',
    'n': '18%',
    'p': '46%',
    'k': '0%'
  },
  {
    'name': 'Potassium chloride',
    'n': '0%',
    'p': '0%',
    'k': '50%'
  },
  {
    'name': 'Monoammonium phosphate',
    'n': '12%',
    'p': '61%',
    'k': '50%'
  },
  {
    'name': 'Ammonium nitrate',
    'n': '35%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Ammonium sulphate',
    'n': '21%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Ammonium chloride',
    'n': '26%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Anhydrous ammonia',
    'n': '82%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Calcium nitrate',
    'n': '16%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Sodium nitrate',
    'n': '16%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Ammonium nitrate',
    'n': '32%',
    'p': '0%',
    'k': '0%'
  },
  {
    'name': 'Triple superphosphate',
    'n': '0%',
    'p': '46%',
    'k': '0%'
  },
  {
    'name': 'Single superphosphate',
    'n': '0%',
    'p': '16%',
    'k': '0%'
  },
  {
    'name': 'Potasium nitrate',
    'n': '13%',
    'p': '0%',
    'k': '36%'
  },
  {
    'name': 'Potasium sulphate',
    'n': '0%',
    'p': '0%',
    'k': '48%'
  },
  {
    'name': 'Potasium chloride',
    'n': '0%',
    'p': '0%',
    'k': '60%'
  },
  {
    'name': 'Muriate of potash',
    'n': '0%',
    'p': '0%',
    'k': '50%'
  },
  {
    'name': 'Rock phosphate',
    'n': '0%',
    'p': '30%',
    'k': '0%'
  },
  {
    'name': 'Potasium phosphate',
    'n': '0%',
    'p': '52%',
    'k': '34%'
  },
];

const organicInputs = [
  'Cattle farm yard manure',
  'Sheep farm yard manure',
  'Pig farm yard manure',
  'Poultry litter',
  'Goat farm yard manure',
  'Turkey litter',
  'Pig slurry',
  'Cattle slurry',
  'Compost',
  'Biochar',
  'Green manure (clover, pigeon peas, e.t.c)',
  'Vermicompost',
]


const limingApplicationFrequency = [
  "Once every cropping season",
  "Annually",
  "Bi-annually",
  "Every two years",
  "Every five years"
]

const inputType = [
  "Lime",
  "Organic inputs",
  "Inorganic inputs",
]

const organicApplicationMethod = [
  "Banding",
  "Surface application",
  "Surface application and deep ploughed into the soil",
  "Direct injection"
]

const syntheticApplicationMethod = [
  "Broadcasting",
  "Plough placement",
  "Starter solutions",
  "Fertigation",
  "Direct injection",
  "Aerial application",
  "Drilling",
  "Side dressing",
  "Banding",
  "Pellet application",
]


const limingMaterial = [
  "Gypsum",
  "Dolomite",
  "Agricultural lime (calcium carbonate)",
  "Burnt lime",
  "Magnesite",
  "Cement kiln dust",
  "Crushed shells",
  "Other",
]

const langObj = {  en: "english",
hi: "hindi",
mr: "marathi",
ne: "nepali",
es: "spanish",
id: "indonesian",
in: "indonesian",
ar: "arabic",
pt: "portugese",
fr: "french",
vi: "vietnamese",
am: "amharic",
so: "somali",
om: "oromo",
bn: "bengali",
sw: "swahili",
el: "greek",
tr: "turkish",
nl: "dutch",
}

const cropRecLangObj = {  en: "recommendation",
hi: "hindi",
mr: "marathi",
ne: "nepali",
es: "spanish",
id: "indonesian",
in: "indonesian",
ar: "arabic",
pt: "portugese",
fr: "french",
vi: "vietnamese",
am: "amharic",
so: "somali",
om: "oromo",
bn: "bengali",
sw: "swahili",
el: "greek",
tr: "turkish",
nl: "dutch",
}

const equipmentActivityData = [
  {"name":"General", "category":1},
  {"name":"Land preparation", "category":2},
  {"name":"Transportations", "category":2},
  {"name":"Irrigation", "category":2},
  {"name":"Storage", "category":2},
  {"name":"Planting", "category":2},
  {"name":"Harvesting", "category":2},
  {"name":"Spraying", "category":2},
  {"name":"Weeding", "category":2},
  {"name":"Castration", "category":3},
  {"name":"Dehorning", "category":3},
  {"name":"Weighing", "category":3},
  {"name":"Eartagging/Animal Identification", "category":3},
  {"name":"Branding", "category":3},
  {"name":"Milking", "category":3},
  {"name":"Drying", "category":3},
  {"name":"Artificial insemination", "category":3},
  {"name":"Hoof care", "category":3},
  {"name":"Transportation", "category":4},
]

const roles = [
  {id: "super_admin", name: "Super Admin"},
  {id: "community_admin", name: "Community Admin"},
  {id: "content_manager", name: "Content Manager"},
  {id: "manager", name: "Manager"},
  {id: "end_user", name: "App User"},
];

const departments = [
  {id: "finance", name: "Finance"},
  {id: "marketing", name: "Marketing"},
];

const modules = {
  "My Farm" : {
    "Farm Registration" : ["farm"],
    "My Geofences" : ["geofencing"],
    "Crop Registration" : ["crop"],
    "My Documents" : ["documents"],
    "Soil Management" : ["soil", "audit"]
  },
  "My Crops": {
    "Land/Soil Preparation" : ["soilpreparation"],
    "Sowing/Planting"  : ["sowing"],
    "Irrigation" : ["irrigation"],
    "Weeding" : ["weed"],
    "Harvesting" : ["harvesting"],
    "Storage" : ["storage"],
    "Observations" : ["observation"],
    "My Goals" : ["users/goal"]
  },
} 

const admin_modules = {
  "Community Admin" : {
    "Permissions" : ["permissions"],
    "Activity Log" : ["activity_log"],
    "Profile Authentication" : ["users/profiles"],
    "User Listing" : ["users/userList"]
  },
  "Content Manager" : {
    "Permissions" : ["permissions"],
    "Activity Log" : ["activity_log"],
    "Profile Authentication" : ["users/profiles"],
    "User Listing" : ["users/userList"]
  },
  "Manager" : {
    "Permissions" : ["permissions"],
    "Activity Log" : ["activity_log"],
    "Profile Authentication" : ["users/profiles"],
    "User Listing" : ["users/userList"]
  },
  "Super Admin" : {
    "Permissions" : ["permissions"],
    "Activity Log" : ["activity_log"],
    "Profile Authentication" : ["users/profiles"],
    "User Listing" : ["users/userList"]
  }
} 

const admin_roles = [
  {id: "super_admin", name: "Super Admin"},
  {id: "community_admin", name: "Community Admin"},
  {id: "content_manager", name: "Content Manager"},
  {id: "manager", name: "Manager"},
]

const admin_roles_arr = [
  "super_admin",
  "community_admin",
  "content_manager",
  "manager"
]

const admin_sidebar_menu = [
  {id: "permissions", name: "Permissions"},
  {id: "activity_log", name: "Activity Log"},
  {id: "profile_authentication", name: "Profile Authentication"},
  {id: "user_listing", name: "User Listing"}
]

const access_types = {
  "GET": "VIEW",
  "PUT": "UPDATE",
  "POST": "CREATE",
  "DELETE": "DELETE",
}

const profile_authentication_settings = {
  "auto_log_off_value": 30,
  "auto_log_off_value_type":  "mins",
  "unsuccessful_login_attempts_value": 5,
  "unsuccessful_login_attempts_value_type": "per_hour",
  "unsuccessful_login_lockout_value": 30,
  "unsuccessful_login_lockout_value_type": "mins",
  "password_length": 8,
  "number_of_unique_passwords": 7,
  "maximum_password_age_value": 30,
  "maximum_password_age_value_type": "days",
  "password_acceptable_characters": {
    "upper_case": true,
    "lower_case": true,
    "special_characters": true,
    "numbers": true,
    "unique_symbols": false
  }
}

const permissions = ["get", "put", "post", "delete"]

 const cropReportTypeData = [
   "Sowing/Land Prepration Report",
   "Soil Management Report",
   "Irrigation Report",
   "Weeding Report",
   "Pest and Disease Management Report",
   "Harvesting Report",
   "Storage Report",
   "General Information Report"
 ] 

 const comprehensiveReportTypeData= [
   {
    "cropName":"potato", "fileS3Key":"Soil/Potato.pdf",
   },
 ]

 const cropReportsTypeData= [
  {
   "cropName":"onion", "fileS3Key":"Soil/Onion.pdf"
  },
  {
    "cropName":"sugarcane", "fileS3Key":"Soil/sugarcane.pdf"
   },
   {
    "cropName":"potato", "fileS3Key":"Soil/potato.pdf"
   },
   {
    "cropName":"cassava", "fileS3Key":"Soil/cassava.pdf"
   },
]
 
 const landPreperationAndSowingReportData = [
  {
   "cropTypeId":2,
   "landPreprationWindowRecommendation":'{ "regions":[ {"Hilly areas":{"seasons":["Rabi","Summer"],"month-range":["August - September","October - November"]}}, {"Punjab, Haryana, UP, Bihar, Rajasthan":{"seasons":["Kharif","Rabi"],"month-range":["April - June","September - October"]}}, {"Orissa and West Bengal":{"seasons":["Kharif","Late Kharif","Rabi"],"month-range":["April - June","July - August","August - September"]}}, {"Maharashtra and parts of Gujarat":{"seasons":["Early Kharif","Kharif","Late Kharif","Rabi"],"month-range":["January - February","April - May","July - August","September - October"]}}, {"Andhra Pradesh, Tamil Nadu, Karnataka":{"seasons":["Early Kharif","Kharif","Rabi"],"month-range":["January - February","April - May","August - September"]}} ] }',
   "activitiesRecommendation":'{"data":["1. One/first plough","2. Harrowing to break soil clods into smaller mass and incorporate plant residue","3. Levelling the surface"]}',
   "plantingWindowRecommendation":'{ "regions":[ {"Hilly areas":{"seasons":["Rabi","Summer"],"month-range":["September - October","November - December"]}}, {"Punjab, Haryana, UP, Bihar, Rajasthan":{"seasons":["Kharif","Rabi"],"month-range":["June - July","October - November"]}}, {"Orissa and West Bengal":{"seasons":["Kharif","Late Kharif","Rabi"],"month-range":["June - July","August - September","September - October"]}}, {"Maharashtra and parts of Gujarat":{"seasons":["Early Kharif","Kharif","Late Kharif","Rabi"],"month-range":["February - March","May - June","August - September","October - November"]}}, {"Andhra Pradesh, Tamil Nadu, Karnataka":{"seasons":["Early Kharif","Kharif","Rabi"],"month-range":["February - April","May - June","September - October"]}} ] }',
   "plantingMaterialRecommendation":'{"data":["Division/sets","Seeds","Seedlings"]}',
   "plantingRateRecommendation":'{"data":["8 - 10 kg","20 - 25 kg"],"comment":["Direct seeding","Broadcasting"]}',
   "interRawSpacingRecommendation":'{"data":["30","15","15"],"comment":["Large onions/nursery","Small onions/nursery","Transplanting"]}',
   "intraRawSpacingRecommendation":'{"data":["10","10","7.5"],"comment":["Large onions","Small onions","Transplanting"]}',
   "plantPopulationDensityPerHectareRecommendation":'{"data":["328,510 to 414,960 plants"],"comment":[]}',
   "plantingDepthRecommendation":'{"data":["1 - 2","2.5 - 3","2.5 - 3"],"comment":["Nursery/seeds","Seedlings (transplanting)","Division/sets"]}'
  }
] 


const syntheticFertilizersContentUnitTypes = [
  "SythenticFertilizerNitrogenUnit",
  "SythenticFertilizerPhosphorousUnit",  
  "SythenticFertilizerPotassiumUnit"
  ]

  const syntheticFertilizersContentBaseUnits = [
    {
    "name": "Milligrams (N)/Liter",
    "abbvr": "mg/l",
    "unitType": 42,
    "factor": null
    },
    {
    "name": "Kg (N)/hectare",
    "abbvr": "kg/ha",
    "unitType": 42,
    "factor": "2.0000000000"
    },
    {
    "name": "parts (N)/million",
    "abbvr": "ppm",
    "unitType": 42,
    "factor": "1.0011423030"
    },
    {
      "name": "Milligrams (P2O5)/Liter",
      "abbvr": "mg/l",
      "unitType": 43,
      "factor": null
    },
    {
      "name": "Kg (P2O5)/hectare",
      "abbvr": "kg/ha",
      "unitType": 43,
      "factor": "2.0000000000"
    },
    {
      "name": "parts (P2O5)/million",
      "abbvr": "ppm",
      "unitType": 43,
      "factor": "1.0011423030"
    },
    {
      "name": "Milligrams (K20)/Liter",
      "abbvr": "mg/l",
      "unitType": 44,
      "factor": null
    },
    {
      "name": "Kg (K20)/hectare",
      "abbvr": "kg/ha",
      "unitType": 44,
      "factor": "2.0000000000"
    },
    {
      "name": "parts (K20)/million",
      "abbvr": "ppm",
      "unitType": 44,
      "factor": "1.0011423030"
    }
  ]

  const membershipValidityUnits = {
    'day(s)': 1, 
    'week(s)': 7, 
    'month(s)': 30, 
    'year(s)': 365
  }


module.exports = {
  access_types,
  admin_roles_arr,
  admin_sidebar_menu,
  admin_roles,
  admin_modules,
  permissions,
  modules,
  roles,
  faq,
  defaultModeOfOperation,
  equipmentFuelTypes,
  equipmentLoanStatus,
  equipmentTypes,
  defaultUserId,
  departments,
  gasUnits,
  soilApplicationStage,
  soilApplicationMethod,
  syntheticFertilizers,
  limingApplicationFrequency,
  inputType,
  organicInputs,
  organicApplicationMethod,
  syntheticApplicationMethod,
  limingMaterial,
  profile_authentication_settings,
  langObj,
  equipmentActivityData,
  cropReportTypeData,
  landPreperationAndSowingReportData,
  comprehensiveReportTypeData,
  cropReportsTypeData,
  syntheticFertilizersContentUnitTypes,
  syntheticFertilizersContentBaseUnits,
  modulesApiExcludedText,
  cropRecLangObj,
  deforestationCredentials
};

