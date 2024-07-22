const express = require("express");
const multer = require("multer");
const path = require("path");
const route = express.Router();
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { DisabilityJSON } = require("../../src/utilities"); //functions from mysqlmodule connection
const {
  //user function imports
  get_userId,

  //admin function imports
  get_adminId,
  post_EventJob,
  fetchJob,
  fetchEvent,
  job_post_edit,
  deletePost,
  dashboardQuery,
  filteredDashboardQuery,
  FetchAdminInboxFromClient,
  getAdmin,
  AdminMailInsert,
  GetSentMail,
  GetAllClientInformation,
  getRegistry,
  getRegistryInnerJoinPost,
  ArchivingPost,
  EventViewStats,
  JobViewStats,
  GetEventRow,
  GetEventRegisteredTicket_Count,
  UpdateEventTicketCount,
  GetJobRow,
  GetJobRegisteredTicket_Count,
  UpdateJobTicketCount,

  //function query for the clientuser
  clientuserLoginSession,
  ClientData,
  clientInformation,
  ClientMailInsert,
  GetClientSentMail,
  FetchInboxOfClient,
  NewFetchInboxClient,
  ALL_SendMaiL,
  getEventRegistry,
  getJobRegistry,
  InsertTikcetCodeEvent,
  InsertTicketCodeJob,
  TicketCancelationEvent,
  TicketCancelationJob,
} = require("../../src/mysqlmodule");

//Dashboard Class for Dashboard Utilities
class Dashboard {
  constructor(userDataArray) {
    this.user_data = userDataArray;
    this.user_data_length = this.user_data.length;

    this.Age = {
      minor_count: 0,
      adult_count: 0,
      senior_count: 0,
    };

    this.Gender = {
      male_count: 0,
      male_percentage: 0,
      female_percentage: 0,
      female_count: 0,

      MalePercentage: function () {
        this.male_percentage = this.male_count / (this.male_count + this.female_count);
      },

      FemalePercentage: function () {
        this.female_percentage = this.female_count / (this.male_count + this.female_count);
      },

      GetMalePercentage: function () {
        this.MalePercentage();
        return this.male_percentage;
      },
      GetFemalePercentage: function () {
        this.FemalePercentage();
        return this.female_percentage;
      },
    };

    // this.Disability = {
    //   physical: {
    //     'Amputation': 0,
    //     'Cerebral Palsy': 0,
    //     'Spinal Cord Injury': 0,
    //     'Muscular Dystrophy': 0,
    //     'Multiple Sclerosis': 0,
    //     'Spina Bifida': 0,
    //     'Arthritis': 0,
    //     'Osteogenesis Imperfecta': 0,
    //     'Poliomyelitis (Polio)': 0,
    //     'Stroke': 0,
    //     'Traumatic Brain Injury': 0,
    //     'Dwarfism': 0,
    //     'Chronic Pain': 0,
    //     'Fibromyalgia': 0,
    //     'Lou Gehrig\'s Disease (ALS)': 0,
    //     'Parkinson\'s Disease': 0,
    //     'Myasthenia Gravis': 0,
    //     'Guillain-Barré Syndrome': 0,
    //     'Chronic Fatigue Syndrome': 0,
    //     'Scoliosis': 0,
    //     'Cerebrovascular Disease': 0,
    //     'Peripheral Neuropathy': 0,
    //     'Complex Regional Pain Syndrome (CRPS)': 0,
    //     'Ehlers-Danlos Syndrome': 0,
    //     'Ankylosing Spondylitis': 0,
    //     'Rheumatoid Arthritis': 0,
    //     'Lupus': 0,
    //     'Chronic Obstructive Pulmonary Disease (COPD)': 0,
    //     'Cystic Fibrosis': 0,
    //     'Epilepsy': 0,
    //     'Hemiplegia': 0,
    //     'Paraplegia': 0,
    //     'Quadriplegia': 0,
    //     'Visual Impairment (Blindness)': 0,
    //     'Hearing Impairment (Deafness)': 0,
    //     'Osteoporosis': 0,
    //     'Marfan Syndrome': 0,
    //     'Charcot-Marie-Tooth Disease': 0,
    //     'Huntington\'s Disease': 0,
    //     'Tuberous Sclerosis': 0,
    //     'others': 0,
    //     },
    //   mental: {
    //     'Autism Spectrum Disorder (ASD)': 0,
    //     'Attention Deficit Hyperactivity Disorder (ADHD)': 0,
    //     'Down Syndrome': 0,
    //     'Intellectual Disability': 0,
    //     'Fragile X Syndrome': 0,
    //     'Fetal Alcohol Spectrum Disorders (FASD)': 0,
    //     'Prader-Willi Syndrome': 0,
    //     'Williams Syndrome': 0,
    //     'Rett Syndrome': 0,
    //     'Angelman Syndrome': 0,
    //     'Tourette Syndrome': 0,
    //     'Dyslexia': 0,
    //     'Dyscalculia': 0,
    //     'Dysgraphia': 0,
    //     'Specific Learning Disabilities (SLD)': 0,
    //     'Developmental Coordination Disorder (DCD)': 0,
    //     'Oppositional Defiant Disorder (ODD)': 0,
    //     'Conduct Disorder': 0,
    //     'Schizophrenia': 0,
    //     'Bipolar Disorder': 0,
    //     'Major Depressive Disorder': 0,
    //     'Anxiety Disorders': 0,
    //     'Obsessive-Compulsive Disorder (OCD)': 0,
    //     'Post-Traumatic Stress Disorder (PTSD)': 0,
    //     'Borderline Personality Disorder': 0,
    //     'Antisocial Personality Disorder': 0,
    //     'Schizoaffective Disorder': 0,
    //     'Psychotic Disorders': 0,
    //     'Pervasive Developmental Disorders (PDD)': 0,
    //     'Communication Disorders': 0,
    //     'Social (Pragmatic) Communication Disorder': 0,
    //     'Selective Mutism': 0,
    //     'Reactive Attachment Disorder': 0,
    //     'Disinhibited Social Engagement Disorder': 0,
    //     'Intermittent Explosive Disorder': 0,
    //     'Neurocognitive Disorders (e.g., Dementia, Alzheimer\'s Disease)': 0,
    //     'Traumatic Brain Injury (TBI) with cognitive impairments': 0,
    //     'Huntington\'s Disease with cognitive impairments': 0,
    //     'Parkinson\'s Disease with cognitive impairments': 0,
    //     'Multiple Sclerosis with cognitive impairments': 0,
    //     'Epilepsy with cognitive impairments': 0,
    //     'Learning Disabilities': 0,
    //     'Speech and Language Disorders': 0,
    //     'Global Developmental Delay': 0,
    //     'Nonverbal Learning Disorder (NLD)': 0,
    //     'Sensory Processing Disorder (SPD)': 0,
    //     'Chronic Traumatic Encephalopathy (CTE)': 0,
    //     'Klinefelter Syndrome': 0,
    //     'Turner Syndrome': 0,
    //     'Phenylketonuria (PKU) with cognitive impairments': 0,
    //     'others': 0,
    //     }
    // };

    this.Disability = {
      SensoryDisability: [
        "Visual Impairment (Blindness)",
        "Hearing Impairment (Deafness)",
        "Sensory Processing Disorder (SPD)",
      ],
      SensoryDisability_count: 0,
      SensoryDisability_percentage: 0,

      PhysicalDisability: [
        "Amputation",
        "Cerebral Palsy",
        "Spinal Cord Injury",
        "Muscular Dystrophy",
        "Multiple Sclerosis",
        "Spina Bifida",
        "Arthritis",
        "Osteogenesis Imperfecta",
        "Poliomyelitis (Polio)",
        "Stroke",
        "Traumatic Brain Injury (TBI)",
        "Dwarfism",
        "Chronic Pain",
        "Fibromyalgia",
        "Lou Gehrig's Disease (ALS)",
        "Parkinson's Disease",
        "Myasthenia Gravis",
        "Guillain-Barré Syndrome",
        "Chronic Fatigue Syndrome",
        "Scoliosis",
        "Cerebrovascular Disease",
        "Peripheral Neuropathy",
        "Complex Regional Pain Syndrome (CRPS)",
        "Ehlers-Danlos Syndrome",
        "Ankylosing Spondylitis",
        "Rheumatoid Arthritis",
        "Lupus",
        "Chronic Obstructive Pulmonary Disease (COPD)",
        "Cystic Fibrosis",
        "Hemiplegia",
        "Paraplegia",
        "Quadriplegia",
        "Osteoporosis",
        "Marfan Syndrome",
        "Charcot-Marie-Tooth Disease",
        "Huntington's Disease",
        "Tuberous Sclerosis",
      ],
      PhysicalDisability_count: 0,
      PhysicalDisability_percentage: 0,

      MentalHealthDisability: [
        "Schizophrenia",
        "Bipolar Disorder",
        "Major Depressive Disorder",
        "Anxiety Disorders",
        "Obsessive-Compulsive Disorder (OCD)",
        "Post-Traumatic Stress Disorder (PTSD)",
        "Borderline Personality Disorder",
        "Antisocial Personality Disorder",
        "Schizoaffective Disorder",
        "Psychotic Disorders",
        "Oppositional Defiant Disorder (ODD)",
        "Conduct Disorder",
        "Selective Mutism",
        "Reactive Attachment Disorder",
        "Disinhibited Social Engagement Disorder",
        "Intermittent Explosive Disorder",
      ],
      MentalHealthDisability_count: 0,
      MentalHealthDisability_percentage: 0,

      IntellectualDisability: [
        "Down Syndrome",
        "Intellectual Disability",
        "Fragile X Syndrome",
        "Fetal Alcohol Spectrum Disorders (FASD)",
        "Prader-Willi Syndrome",
        "Williams Syndrome",
        "Rett Syndrome",
        "Angelman Syndrome",
        "Tourette Syndrome",
        "Global Developmental Delay",
        "Nonverbal Learning Disorder (NLD)",
        "Klinefelter Syndrome",
        "Turner Syndrome",
        "Phenylketonuria (PKU) with cognitive impairments",
      ],
      IntellectualDisability_count: 0,
      IntellectualDisability_percentage: 0,

      LearningDisability: [
        "Autism Spectrum Disorder (ASD)",
        "Attention Deficit Hyperactivity Disorder (ADHD)",
        "Dyslexia",
        "Dyscalculia",
        "Dysgraphia",
        "Specific Learning Disabilities (SLD)",
        "Developmental Coordination Disorder (DCD)",
        "Pervasive Developmental Disorders (PDD)",
        "Communication Disorders",
        "Social (Pragmatic) Communication Disorder",
        "Speech and Language Disorders",
      ],
      LearningDisability_count: 0,
      LearningDisability_percentage: 0,

      InvisibleDisability: [
        "Chronic Fatigue Syndrome",
        "Epilepsy",
        "Neurocognitive Disorders (e.g., Dementia, Alzheimer's Disease)",
        "Traumatic Brain Injury (TBI) with cognitive impairments",
        "Huntington's Disease with cognitive impairments",
        "Parkinson's Disease with cognitive impairments",
        "Multiple Sclerosis with cognitive impairments",
        "Epilepsy with cognitive impairments",
        "Chronic Traumatic Encephalopathy (CTE)",
      ],
      InvisibleDisability_count: 0,
      InvisibleDisability_percetage: 0,

      OtherDisability: [],
      OtherDisability_count: 0,
      OtherDisability_percentage: 0,
    };

    // console.log(disabilities);

    this.Religion = {
      "Roman Catholicism": 0,
      Islam: 0,
      "Iglesia ni Cristo": 0,
      "Evangelical Christianity": 0,
      "Aglipayan Church": 0,
      Buddhism: 0,
      Hinduism: 0,
      Judaism: 0,
      "Jehovah's Witnesses": 0,
      "Seventh-day Adventist Church": 0,
      "Chruch of Jesus Christ of Latter-day Saints": 0,
      "Othrodox Christianity": 0,
      "Baha'i Faith": 0,
      Taosim: 0,
      Animism: 0,

      getReligionCount: function () {
        const religionList = Object.keys(this);

        let ReligionCountList = [];

        // religionList.forEach((religion) => {

        //   if(this.hasOwnProperty(religion) && typeof this[religion] !== 'function'){
        //     ReligionCountList.push(religion);
        //   }

        // });

        for (let i = 0; i < religionList.length; i++) {
          ReligionCountList.push([religionList[i], this[religionList[i]]]);

          if (religionList[i] == "Animism") {
            break;
          }
        }

        //return a list with element and count
        return ReligionCountList;
      },
    };

    this.Civil = {
      single: 0,
      married: 0,
      others: 0,

      getSingleCount: function () {
        return this.single;
      },
      getMarriedCount: function () {
        return this.married;
      },
      getOthersCount: function () {
        return this.others;
      },
    };

    this.Employment = {
      employed: 0,
      unemployed: 0,
      others: 0,

      getEmployed: function () {
        return this.employed;
      },
      getUnemployed: function () {
        return this.unemployed;
      },
      getOthers: function () {
        return this.others;
      },
    };

    this.InitialMethod();
  }

  InitialMethod = function () {
    //how do i access tge this.userdata in this scope?
    console.log(`log from InitialMethod`);
    console.log(this.user_data.length);

    this.user_data.forEach((row_data) => {
      //checks the rows age and assigned to associated age range or category
      if (row_data.age < 18) {
        this.Age.minor_count++;
      } else if (row_data.age >= 18 && row_data.age <= 59) {
        this.Age.adult_count++;
      } else {
        this.Age.senior_count++;
      }

      //check the rows gender
      if (row_data.gender.toLowerCase() == "male") {
        this.Gender.male_count++;
      } else {
        this.Gender.female_count++;
      }

      //gets the religion of the row. then increment to the object thas has the same region category

      const religionOfThisRow = row_data.religion;

      this.Religion[religionOfThisRow] += 1;

      //gets the civil status of the row. then incerement the objecct that has the same civil catgegory
      const civilStatusOfThisRow = row_data.civil;

      this.Civil[civilStatusOfThisRow] += 1;

      //gets the civil status of the row. then increment the object that has the same employment category
      const employmentStatusOfThisRow = row_data.employment;

      this.Employment[employmentStatusOfThisRow] += 1;

      //disability checking
      // if else ladder approach
      if (this.Disability.SensoryDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Sensory`);
        this.Disability.SensoryDisability_count += 1;
      } else if (this.Disability.PhysicalDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Physical`);
        this.Disability.PhysicalDisability_count += 1;
      } else if (this.Disability.MentalHealthDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Mental`);
        this.Disability.MentalHealthDisability_count += 1;
      } else if (this.Disability.IntellectualDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Intellectual`);
        this.Disability.IntellectualDisability_count += 1;
      } else if (this.Disability.LearningDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Learning`);
        this.Disability.LearningDisability_count += 1;
      } else if (this.Disability.InvisibleDisability.includes(row_data.disability)) {
        console.log(`${row_data.id} : ${row_data.disability} : Invisible`);
        this.Disability.InvisibleDisability_count += 1;
      }
    });

    //after the loop format the counted data

    // console.log('After the read of loop');

    // console.log(`Male Percentage: ${this.Gender.GetMalePercentage()}`);
    // console.log(`Female Percentage: ${this.Gender.GetFemalePercentage()}`);
    // console.log(`Religion Count List : ${this.Religion.getReligionCount()}`);
    // console.log(`Civil Count List : single=${this.Civil.getSingleCount()}, married=${this.Civil.getMarriedCount()}, others=${this.Civil.getOthersCount()}`);
    // console.log(`Employment Count: employed=${this.Employment.getEmployed()}, unemployed=${this.Employment.getUnemployed()}, others=${this.Employment.getOthers()}`);

    //assign percentage value to the Disability Property of this object

    this.Disability.SensoryDisability_percentage =
      this.Disability.SensoryDisability_count / this.user_data_length;

    this.Disability.PhysicalDisability_percentage =
      this.Disability.PhysicalDisability_count / this.user_data_length;

    this.Disability.MentalHealthDisability_percentage =
      this.Disability.MentalHealthDisability_count / this.user_data_length;

    this.Disability.IntellectualDisability_percentage =
      this.Disability.IntellectualDisability_count / this.user_data_length;

    this.Disability.LearningDisability_percentage =
      this.Disability.LearningDisability_count / this.user_data_length;

    this.Disability.InvisibleDisability_percentage =
      this.Disability.InvisibleDisability_count / this.user_data_length;

    //getting the missing values from the loop

    this.Disability.OtherDisability_count =
      this.user_data_length -
      (this.Disability.SensoryDisability_count +
        this.Disability.PhysicalDisability_count +
        this.Disability.MentalHealthDisability_count +
        this.Disability.IntellectualDisability_count +
        this.Disability.LearningDisability_count +
        this.Disability.InvisibleDisability_count);
  };

  ReadData = function () {
    console.log("read data operation");
  };

  DataLength = function () {
    return this.user_data.length;
  };

  ProcessedSelfInfo = function () {
    const ProcessInformation = {
      MetaInfo: {
        length: this.user_data_length,
      },

      Age: {
        minor_count: this.Age.minor_count,
        minor_percentage: Math.floor((this.Age.minor_count / this.user_data_length) * 100) + "%",
        adult_count: this.Age.adult_count,
        adult_percentage: Math.floor((this.Age.adult_count / this.user_data_length) * 100) + "%",
        senior_count: this.Age.senior_count,
        senior_percentage: Math.floor((this.Age.senior_count / this.user_data_length) * 100) + "%",
      },

      Gender: {
        male_count: this.Gender.male_count,
        female_count: this.Gender.female_count,
        // male_percentage : `${Math.floor(this.Gender.male_percentage * 100)}%` ,
        // female_percentage : `${Math.floor(this.Gender.female_percentage * 100)}%`
        male_percentage: `${Math.floor((this.Gender.male_count / this.user_data.length) * 100)}%`,
        female_percentage: `${Math.floor(
          (this.Gender.female_count / this.user_data.length) * 100
        )}%`,
      },

      // Disability : {
      //   physical : {
      //     count : Object.keys(this.Disability.physical).map(disability_name => this.Disability.physical[disability_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      //     percentage :  Object.keys(this.Disability.physical).map(disability_name => this.Disability.physical[disability_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.user_data_length,
      //     disability : this.Disability.physical
      //   },

      //   mental : {
      //     count : Object.keys(this.Disability.mental).map(disabilit_name => this.Disability.mental[disabilit_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      //     percentage : Object.keys(this.Disability.mental).map(disabilit_name => this.Disability.mental[disabilit_name]).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.user_data_length,
      //     disability : this.Disability.mental
      //   }
      // },

      Disability: this.Disability,

      Religion: {
        "Roman Catholicism": this.Religion["Roman Catholicism"],
        Islam: this.Religion["Islam"],
        "Iglesia ni Cristo": this.Religion["Iglesia ni Cristo"],
        "Evangelical Christianity": this.Religion["Evangelical Christianity"],
        "Aglipayan Church": this.Religion["Aglipayan Church"],
        Buddhism: this.Religion["Buddhism"],
        Hinduism: this.Religion["Hinduism"],
        Judaism: this.Religion["Judaism"],
        "Jehovah's Witnesses": this.Religion["Jehovah's Witnesses"],
        "Seventh-day Adventist Church": this.Religion["Seventh-day Adventist Church"],
        "Chruch of Jesus Christ of Latter-day Saints":
          this.Religion["Chruch of Jesus Christ of Latter-day Saints"],
        "Othrodox Christianity": this.Religion["Othrodox Christianity"],
        "Baha'i Faith": this.Religion["Baha'i Faith"],
        Taosim: this.Religion["Taosim"],
        Animism: this.Religion["Animism"],
      },

      Civil: {
        single: this.Civil.single,
        single_percentage: Math.floor((this.Civil.single / this.user_data_length) * 100) + "%",
        married: this.Civil.married,
        married_percentage: Math.floor((this.Civil.married / this.user_data_length) * 100) + "%",
      },

      Employment: {
        employed: this.Employment.employed,
        employment_percentage:
          Math.floor((this.Employment.employed / this.user_data_length) * 100) + "%",
        unemployed: this.Employment.unemployed,
        unemployment_percentage:
          Math.floor((this.Employment.unemployed / this.user_data_length) * 100) + "%",
        others: this.Employment.others,
        others_percentage: Math.floor((this.otehrs / this.user_data_length) * 100) + "%",
      },
    };

    return ProcessInformation;
  };
}
//function to delete the images to the directory
async function DelImage(filename) {
  const imagepath = path.join(__dirname, "FileUpload", filename);

  fs.unlink(imagepath, (err) => {
    if (err) {
      console.log("Error deleting image with the file name " + filename);
      throw err;
    }
  });
}

function RandomSelectedIndex(ArrayLength) {
  const randomIndex = Math.floor(Math.random() * ArrayLength);
  return randomIndex;
}

//multer configuration -> EventFile Storage Directory
const Eventstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "FileUpload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); //this line creates a new unique filename
  },
});

//object that handles the image file allocation from Events Post
const EventUpload = multer({ storage: Eventstorage }); // -> route to handle the form submission with this Multer Storage

//multer configuration -> JobPost Storage Directory
const Jobstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "JobsFile"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    x;
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

//objecct that handles the image file allocation from Jobs Post
const JobUpload = multer({ storage: Jobstorage });

route.get("/Devs", async (req, res) => {
  res.send({
    devs: ["pago", "solis", "alcoba"],
  });
});

// this form action is generic,  it will handle  tow kind of post 'event posting, job'
route.post("/Posting", EventUpload.array("uploadImages", 10), async (req, res) => {
  console.log("posting action is running the blocks");

  const formData = req.body;
  const creator_id = formData.creator_id;
  const postType = formData.category;
  const title = formData.title;
  const date = formData.date;
  const time = formData.time;
  const location = formData.location;
  const description = formData.description;
  const targetAudience = formData.targetAudience;
  const ticketLimit = formData.ticket_limit;
  let filenames = req.files.map((file) => file.filename);
  const original_filenames = filenames;
  const path_filenames = filenames.map((filename) => `./FileUpload/${filename}`);

  filenames = StringManipulate.RemoveSqrBrac(filenames.toString());

  console.log(creator_id);
  console.log(postType);
  console.log(title);
  console.log(date);
  console.log(time);
  console.log(location);
  console.log(description);
  console.log(targetAudience);
  console.log(`ticket limit ${ticketLimit}`);
  console.log(path_filenames);
  console.log(filenames);

  //cloudinary logic here

  //array of path to the FileUplod
  let URL_path = [];

  // try{
  //   for (const filepath of path_filenames){

  //     cloudinary.uploader.upload(filepath).then(result => {
  //       URL_path.push(result.url);
  //     });

  //   }

  //   console.log(URL_path);

  // }catch(error){
  //   console.log(error);
  // }

  try {
    const uploadPromises = path_filenames.map((filepath) => cloudinary.uploader.upload(filepath));

    // Wait for all upload promises to resolve
    const results = await Promise.all(uploadPromises);

    // Extract URLs from results
    const URL_path = results.map((result) => result.url);

    console.log(URL_path);

    const URL_path_string = URL_path.join(",");

    //deleting the file from FileUpload

    const deletePromises = original_filenames.map((filename) => DelImage(filename));

    const del_result = await Promise.all(deletePromises);

    await post_EventJob(
      postType,
      creator_id,
      title,
      date,
      time,
      location,
      description,
      targetAudience,
      ticketLimit,
      URL_path_string // it shoud be the URL_path
    );

    res.send({ status: true });
  } catch (error) {
    console.log("Error in ' /Posting Route '");
    throw error;
  }
});

route.get("/Delete/Image/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    await DelImage(filename);

    res.send("deleted");
  } catch (error) {
    throw error;
  }
});

//fetcing jobposting from the server
route.get("/fetchingJobPost/:clientuserId", async (req, res) => {
  const { clientuserId } = req.params;
  console.log(`clientuserId ${clientuserId}`);

  const ClientDataInfo = await ClientData(clientuserId);

  const disability = ClientDataInfo[0].disability;

  try {
    let filtered_content = [];

    const data = await fetchJob();

    for (const job_post of data) {
      let disability_category = job_post.target_group.split(",");

      for (const category of disability_category) {
        const formatted_category = category.replace(/\s+/g, "");

        if (DisabilityJSON[formatted_category].includes(disability)) {
          filtered_content.push(job_post);

          break;
        }
      }
    }

    //console.log(data);

    res.send(filtered_content);
  } catch (error) {
    throw error;
  }
});

//fetching eventposting from the server
route.get("/fetchingEventPost/:clientuserId", async (req, res) => {
  const { clientuserId } = req.params;

  console.log(`clienduserId: ${clientuserId}`);

  //get the data of this user
  const ClientDataInfo = await ClientData(clientuserId);
  console.log(ClientDataInfo);

  const disability = ClientDataInfo[0].disability;
  console.log(`disabilit: ${disability}`);
  try {
    let filtered_content = [];

    const data = await fetchEvent();
    // console.log(data);

    //logic here to filter the content of the post before sending to the frontend

    for (const event_post of data) {
      console.log(event_post);

      let disability_category = event_post.target_group.split(",");

      for (const category of disability_category) {
        console.log("category: ", category);
        const formatted_category = category.replace(/\s+/g, "");
        console.log("modif category", formatted_category);

        if (DisabilityJSON[formatted_category].includes(disability)) {
          filtered_content.push(event_post);

          break;
        }
      }
    }

    res.send(filtered_content);
    // res.send(data);
  } catch (error) {
    throw error;
  }
});

route.get("/fetchingJobPost", async (req, res) => {
  try {
    const data = await fetchJob();

    res.send(data);
  } catch (error) {
    throw error;
  }
});

route.get("/fetchingEventPost", async (req, res) => {
  try {
    const data = await fetchEvent();

    res.send(data);
  } catch (error) {
    throw error;
  }
});

route.post("/EventsPost", EventUpload.array("images", 10), async (req, res) => {
  const formData = req.body;
  const creator_id = formData.creator_id;
  const message = formData.message;
  const filenames = req.files.map((file) => file.filename); // const filenames is an array of file names in the formdata

  console.log(filenames.length);
  console.log(creator_id);
  console.log(message);
  console.log(message == "");
  console.log(filenames);

  //do not make query execution if there is no data to insert

  if (message === "" && filenames === 0) {
    return;
  }

  //this are is the query logic for the mysql data insertion

  try {
    await post_Event(creator_id, message, filenames);

    console.log("query executed");
    //res.send({OperationStatus: true});
    res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
  } catch (error) {
    throw error;
    console.log("query failed to execute");
    //res.send({OperationStatus: false});
  }
});

route.post("/JobsPost", JobUpload.array("images", 10), (req, res) => {
  const formData = req.body;
  const message = formData.message;
  const filenames = req.files.map((file) => file.filename); // new array with file name

  console.log(message);
  console.log(filenames);

  res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
});

route.post("/edit-job-post", async (req, res) => {
  const DataReceived = req.body;
  console.log(DataReceived.id);

  try {
    await job_post_edit(
      DataReceived.id,
      DataReceived.event_title,
      DataReceived.scheduled_date,
      DataReceived.scheduled_time,
      DataReceived.description
    );

    res.send({ ok: true });
  } catch (error) {
    throw error;
  }
});

//edit selected post
route.post("/jobeditpost", async (req, res) => {
  const DataReceived = req.body;

  console.log(`target_group: ${DataReceived.target_group}`);

  try {
    await job_post_edit(
      DataReceived.id,
      DataReceived.event_title,
      DataReceived.scheduled_date,
      DataReceived.scheduled_time,
      DataReceived.location,
      DataReceived.description,
      DataReceived.target_group,
      DataReceived.post_type
    );

    res.send({ ok: true });
  } catch (error) {
    throw error;
  }
});

route.post("/post_delete", async (req, res) => {
  const post_obj = req.body;

  //take the image file names -> array type
  const fileImages = post_obj.imagefiles.split(",");

  try {
    await deletePost(post_obj.id, post_obj.post_type);

    console.log(`post with id ${post_obj.id} at table ${post_obj.post_type} has been deleted.`);

    res.send({ ok: true });
  } catch (error) {
    req.send({ ok: false });
  }

  fileImages.forEach((filename) => {
    DelImage(filename);
  });

  console.log(`deleting post with id ${post_obj.id}`);
});

//this area is for the job posting multer configuration and route logic

//setting the module MIME type for JavaScript files
route.get("/module.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  res.sendFile(path.join(__dirname, "module.js"));
});

// get request of the html files
route.get("/", (req, res) => {
  //send the login_user.html from the public folder, but the html file is on the upper directory
  res.sendFile(path.join(__dirname, "..", "public", "login_admin.html"));
});

route.get("/adminlog", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login_admin.html"));
});

route.get("/homepage", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "testing.html"));
});

route.get("/home_admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home_admin.html"));
});

route.get("/adminCreatePost", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "create_post_admin.html"));
});

route.get("/uploadform", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "uploadform.html"));
});

route.get("/jobposting", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "jobposting.html"));
});

//app.post that will handle the form post request to validate login session
route.post("/loginSession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const row = await get_userId(email, password);

    if (row.length > 0) {
      res.send({ status: true, id: row[0].id });
    } else {
      res.send({ status: false, id: null });
    }
  } catch (error) {
    console.log(error);
    throw error;
    res.status(500).send("Something Broke!");
  }

  res.end();
});

//app.post that will handle the form post request to validate admin login session
route.post("/adminLoginSession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.module;

  //console.log(email, password, role);

  try {
    //send the id of the admin
    const row = await get_adminId(email, password, role);

    if (row.length > 0) {
      res.send({ status: true, id: row[0].id });
    } else {
      res.send({ status: false, id: null });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  res.end();
});

route.get("/FetchMailInbox/Admin/:AdminId", async (req, res) => {
  const AdminId = req.params.AdminId;

  // try {
  //   const InboxesData = await FetchAdminInboxFromClient(AdminId);

  //   if (InboxesData.length > 0) {
  //     res.send(InboxesData);
  //   } else {
  //     res.send([]);
  //   }
  // } catch (error) {
  //   throw error;
  // }

  //new logic

  // must return the array of the senderIDs

  try {
    const ClientInboxIdsArray = await FetchAdminInboxFromClient(AdminId);

    // return ClientInboxIdsArray;
    console.log(ClientInboxIdsArray);

    // const ClientIdsUnique = [...new Set(ClientInboxIdsArray)];

    // console.log(ClientIdsUnique);

    let ClientIdsUnique = [];

    ClientInboxIdsArray.forEach((element) => {
      if (!ClientIdsUnique.includes(element.senderID)) {
        ClientIdsUnique.push(element.senderID);
      }
    });

    console.log(ClientIdsUnique);

    res.send(ClientIdsUnique);
  } catch (error) {
    throw error;
  }
});

route.get(`/GetAdmin/Convo/WithClient/:adminId/:clientId`, async (req, res) => {
  const adminId = req.params.adminId;
  const clientId = req.params.clientId;

  //logic here to get the mail of the admin using the paramter senderID = adminId AND receiverID = clientId ||||| to get the mail of the client using the parameter senderId = clientId AND receiverID = adminId

  try {
    const Admin_SendMailArray = await ALL_SendMaiL(adminId, clientId);

    const Client_SendArray = await ALL_SendMaiL(clientId, adminId);

    let MergeSendmail = Admin_SendMailArray.concat(Client_SendArray);

    MergeSendmail.sort((a, b) => a.send_id - b.send_id);

    res.send(MergeSendmail);

    // res.send('this route is running at the line 441');
  } catch (error) {
    throw error;
  }
});

route.get("/Dashboard/Information", async (req, res) => {
  try {
    const [totalUser] = await GetAllClientInformation();
    console.log(`total user count: ${totalUser[0]["COUNT(*)"]}`);

    res.send({
      TotalRegistered: totalUser[0],
      percentageMale: 10 / totalUser[0]["COUNT(*)"],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

route.post("/Event/Archive/StatusChange", async (req, res) => {
  const { table } = req.body;
  const { event_post_id } = req.body;
  const { status } = req.body;

  console.log(table);
  console.log(event_post_id);
  console.log(status);

  //updating the column of this post from event_post
  try {
    await ArchivingPost(table, event_post_id, status);
  } catch (error) {
    throw error;
  }
  console.log("successfully updated.");
  res.send();
});

route.get("/EventPost/Stat/:event_id", async (req, res) => {
  const event_id = req.params.event_id;

  try {
    const EventRegisteredArray = await EventViewStats(event_id);

    res.send(EventRegisteredArray);
  } catch (error) {
    console.log(`error on the server.js on the '/EventPost/Stat/:event_id' route.`, error);
    throw error;
  }

  // console.log(event_id)

  // res.send('Event View Stats');
});

route.get("/JobPost/Stat/:job_id", async (req, res) => {
  const job_id = req.params.job_id;
  console.log("params", job_id);

  try {
    const JobRegisteredArray = await JobViewStats(job_id);

    res.send(JobRegisteredArray);

    // res.send('hello world');
  } catch (error) {
    console.log(`error on the server.js on the '/JobPost/Stat/:job_id' route.`, error);
    throw error;
  }
});

route.get("/returnboolean", async (req, res) => {
  res.send({ data: "ok" });
});

route.post("/clientuser/loginsession", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const id_logsession = await clientuserLoginSession(email, password);
    const value = id_logsession[0]; //invidual element contains and object, each value is accessible by the column name of the table in the query.

    if (value == null) {
      res.send({ IdLogSession: value });
    } else {
      console.log({ IdLogSession: value });

      res.send({ IdLogSession: value.id });
    }
  } catch (error) {
    throw error;
  }

  console.log(email);
  console.log(password);
});

route.get("/ClientData/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const clientInformation = await clientInformation(id);

    res.send({ UserInformation: clientInformation });
  } catch (error) {
    throw error;
  }
});

route.post("/ClientSendMail", EventUpload.array("files", 10), async (req, res) => {
  try {
    const { senderClientId, subject, message } = req.body;
    const files = req.files;

    let Filenames = [];
    let Imagenames = [];

    files.forEach((file) => {
      if (
        file.filename.includes(".jpg") ||
        file.filename.includes(".jpeg") ||
        file.filename.includes(".png")
      ) {
        Imagenames.push(file.filename);
      } else if (
        file.filename.includes(".pdf") ||
        file.filename.includes(".doc") ||
        file.filename.includes(".docx") ||
        file.filename.includes(".txt")
      ) {
        Filenames.push(file.filename);
      }
    });

    const Filenames_String = Filenames.join(",");
    const Imagenames_String = Imagenames.join(",");

    // logic here to upload on Cloudinary
    // let URL_path_Filenames = [];
    // let URL_path_Filenames_str = '';

    let URL_path_Imagenames = [];
    let URL_path_Imagenames_str = "";

    // if (Filenames.length != 0) {
    //     const FileUploadPromises = Filenames.map(Filename => cloudinary.uploader.upload(`./FileUpload/${Filename}`));
    //     const FileUploadPromises_results = await Promise.all(FileUploadPromises);

    //     URL_path_Filenames = FileUploadPromises_results.map(result => result.url);
    //     URL_path_Filenames_str = URL_path_Filenames.join(',');
    // }

    if (Imagenames.length != 0) {
      const ImageUploadPromises = Imagenames.map((Imagename) =>
        cloudinary.uploader.upload(`./FileUpload/${Imagename}`)
      );
      const ImageUploadPromises_results = await Promise.all(ImageUploadPromises);

      URL_path_Imagenames = ImageUploadPromises_results.map((result) => result.url);
      URL_path_Imagenames_str = URL_path_Imagenames.join(",");

      const deletePromises = Imagenames.map((Imagename) => DelImage(Imagename));

      const del_result = await Promise.all(deletePromises);
    }

    const AdminArray = await getAdmin();
    let AssignedAdmin;

    const RandomizedIndex = RandomSelectedIndex(AdminArray.length);
    AssignedAdmin = AdminArray[RandomizedIndex].id;

    // constructing the Object Parameter
    const MailObj = {
      SenderId: senderClientId,
      AssignedAdmin: AssignedAdmin,
      MailSubject: subject,
      MailBody: message,
      MailDocFile: Filenames_String,
      MailImageFile: URL_path_Imagenames_str, // replace by URL_path_Imagenames_str
    };

    await ClientMailInsert(MailObj);

    console.log(MailObj);

    res.status(200).send("Client Mail Compose Sent Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while sending the mail");
  }
});

route.get("/AdminSentItem/:senderID", async (req, res) => {
  const id = req.params.senderID;
  const ClientMailArray = await GetSentMail(id);
  res.send(ClientMailArray);
});

route.get("/GetAdmins", async (req, res) => {
  const AdminArray = await getAdmin();

  let AssignedAdmin;

  const RanIndex = RandomSelectedIndex(AdminArray.length);

  AssignedAdmin = AdminArray[RanIndex].id;

  res.send(AssignedAdmin);
});

route.post("/AdminMailInsert", async (req, res) => {
  const SenderId = req.body.SenderId;
  const ReceiverId = req.body.MailReceiverId;
  const Subject = req.body.MailSubject;
  const Body = req.body.MailBody;

  console.log(SenderId);
  console.log(ReceiverId);
  console.log(Subject);
  console.log(Body);

  try {
    const response = await AdminMailInsert({
      SenderId: SenderId,
      ReceiverId: ReceiverId,
      Subject: Subject,
      Body: Body,
    });

    console.log("\nresponse details: ");

    res.send(response);
  } catch (error) {
    throw error;
  }
});

route.get("/ClientSentMail/:senderID", async (req, res) => {
  const id = req.params.senderID;

  const ClientMailArray = await GetClientSentMail(id);
  res.send(ClientMailArray);
});

route.get("/FetchMailInbox/Client/:clienduserId", async (req, res) => {
  const clientId = req.params.clienduserId;

  try {
    let adminIdArray = [];

    const clientInboxArray = await FetchInboxOfClient(clientId);

    console.log(clientInboxArray);

    clientInboxArray.forEach((senderObj) => {
      if (!adminIdArray.includes(senderObj.senderID)) {
        adminIdArray.push(senderObj.senderID);
      }
    });

    console.log(`\nadminIdArray: ${adminIdArray}`);

    res.send(adminIdArray);
  } catch (error) {
    console.log(error);
    throw error;
  }

  //new logic
});

route.get("/New/FetchMailInbox/Client/:clientuserId", async (req, res) => {
  const clientId = req.params.clientuserId;

  try {
    let adminIdArray = [];

    const clientInboxArray = await NewFetchInboxClient(clientId);

    clientInboxArray.forEach((mailObj) => {
      if (!adminIdArray.includes(mailObj.receiverID)) {
        adminIdArray.push(mailObj.receiverID);
      }
    });

    // res.send(clientInboxArray);

    res.send(adminIdArray);
  } catch (error) {
    console.log(`error from the server.js @ '/New/FetchMail/Client/:clientuserId' route. `, error);
    throw error;
  }
});

route.get("/kainap/events", async (req, res) => {
  // logic here to get the data from the main server using defined sql query from the mysql module
});

route.get("/ClientDataRequest/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const clientdata = await ClientData(id);

    if (clientdata == null) {
      res.send("no data found");
    } else {
      res.send(clientdata);
    }
  } catch (error) {
    throw error;
  }

  //backend logic to connect to the actual database
  //call the function from the mysqlmodule.js
});

route.get("/GetClient/Convo/WithAdmin/:clientuserId/:adminId", async (req, res) => {
  const clientuserId = req.params.clientuserId;
  const adminId = req.params.adminId;

  //logic here to get the mail of the client using the parameter senderID = clientuserId AND receiverID = adminId ||||| to get the mail of the admin using the parameter senderID = adminID AND receiverID = clientuserId

  try {
    //get the mail of client
    const Client_MailSendArray = await ALL_SendMaiL(clientuserId, adminId);

    //get the mail of the admin
    const Admin_MailSendArray = await ALL_SendMaiL(adminId, clientuserId);

    //mergre adn sort the Client_MailSendArray & Admin_MailSendArray

    let MergedSendmail = Client_MailSendArray.concat(Admin_MailSendArray);

    MergedSendmail.sort((a, b) => a.send_id - b.send_id);

    res.send(MergedSendmail);
  } catch (error) {
    throw error;
  }
});

route.get("/Count/:event_id", async (req, res) => {
  const event_id = req.params.event_id;

  // const Count = await GetEventRegisteredTicket_Count(event_id);

  // console.log(Count);

  const EventRow = await GetEventRow(event_id);

  res.send(EventRow);
});

route.post("/UserRegister/Event", async (req, res) => {
  const { TicketCode } = req.body;

  //check here if the event_post is on the ticket limit
  const event_id = TicketCode.split("-")[0];

  console.log(TicketCode);
  // console.log('split ticket code');

  // const ticket_code_array = TicketCode.split('-');

  // const event_id = ticket_code_array[0];
  // const code = ticket_code_array[1];
  // const user_id = ticket_code_array[2];

  // console.log(ticket_code_array);

  //logic here to insert the ticket cdoe to the database
  let control_flow_result = null;
  try {
    //condition to check if there still a room for accepting ticket
    const TicketCapacity = await GetEventRow(event_id);
    console.log(`TicketCapacity: ${TicketCapacity.ticket_limit}`);
    const CurrentTicket = await GetEventRegisteredTicket_Count(event_id);
    console.log(`CurrentTicket: ${CurrentTicket}`);

    if (CurrentTicket < TicketCapacity.ticket_limit) {
      await InsertTikcetCodeEvent(TicketCode);

      //update the number of ticket of this post
      const RegistryCount = await GetEventRegisteredTicket_Count(event_id);
      console.log(`RegistryCount: ${RegistryCount}`);

      await UpdateEventTicketCount(event_id, RegistryCount);

      control_flow_result = true;
    }

    control_flow_result = false;
  } catch (error) {
    control_flow_result = false;
    throw error;
  } finally {
    res.send({ insertion_query: control_flow_result });
  }
});

route.post("/UserRegister/Job", async (req, res) => {
  const { TicketCode } = req.body;
  const job_id = TicketCode.split("-")[0];

  let control_flow_result = null;
  console.log(TicketCode);

  const TicketCapacity = await GetJobRow(job_id);
  const CurrentTicket = await GetJobRegisteredTicket_Count(job_id);

  try {
    if (CurrentTicket < TicketCapacity.ticket_limit) {
      await InsertTicketCodeJob(TicketCode);

      //update the number of ticket of this post

      const RegistryCount = await GetJobRegisteredTicket_Count(job_id);

      await UpdateJobTicketCount(job_id, RegistryCount);

      control_flow_result = true;
    }

    control_flow_result = false;
  } catch (error) {
    control_flow_result = false;
    throw error;
  }

  res.send({ insertion_query: control_flow_result });
});

route.get("/ExtractRegistry/:userId", async (req, res) => {
  const { userId } = req.params;

  let query_result = false;

  let RegistryObj;
  let NewRegistryObj;

  try {
    RegistryObj = await getRegistry(userId);

    const { event_registry } = RegistryObj;
    const { job_registry } = RegistryObj;

    console.log("event registry query result: ");
    console.log(event_registry);

    console.log("job registry query result: ");
    console.log(job_registry);

    let event_id_registered = [];
    let job_id_registered = [];

    //getting only the id from the array object
    event_registry.forEach((row) => {
      event_id_registered.push(row.event_id);
    });

    job_registry.forEach((row) => {
      job_id_registered.push(row.job_id);
    });

    NewRegistryObj = {
      event_registry: event_id_registered,
      job_registry: job_id_registered,
    };
  } catch (error) {
    throw error;
  }
  res.send(NewRegistryObj);
});

route.get("/ExtractRegistry/Object/:userId", async (req, res) => {
  const { userId } = req.params;

  let RegistryObject;

  try {
    RegistryObject = await getRegistryInnerJoinPost(userId);
  } catch (error) {
    throw error;
  }

  res.send(RegistryObject);
});

route.get("/Fetch/Dashboard", async (req, res) => {
  let gender = {
    male_count: 0,
    female_count: 0,

    MalePercentage: function () {
      return this.male_count / (this.male_count + this.female_count);
    },

    FemalePercentage: function () {
      return this.female_count / (this.male_count + this.female_count);
    },
  };

  let religion = {
    catholic: 0,
    others: 0,
  };

  let civil = {
    single: 0,
    married: 0,
  };

  let cities = {
    Caloocan: 0,
    "Las Piñas": 0,
    Makati: 0,
    Malabon: 0,
    Mandaluyong: 0,
    Manila: 0,
    Marikina: 0,
    Muntinlupa: 0,
    Navotas: 0,
    Parañaque: 0,
    Pasay: 0,
    Pasig: 0,
    "Quezon City": 0,
    "San Juan": 0,
    Taguig: 0,
    Valenzuela: 0,
    Pateros: 0,
  };

  let occupation = {
    employed: 0,
    unemployed: 0,
    others: 0,
  };

  let disability = {
    physical: 0,
    mental: 0,
    others: 0,
  };

  let status = {
    active: 0,
    former: 0,
  };

  try {
    const userAllData = await dashboardQuery();

    // console.log(userAllData);
    // console.log(`number of data: ${userAllData.length}`)

    // userAllData.forEach((rowdata) => {

    //   if(rowdata.gender.toLowerCase() == 'male'){
    //     gender.male_count += 1
    //   }else{
    //     gender.female_count += 1
    //   }

    // })

    // console.log(`gender male count = ${gender.male_count}`);
    // console.log(`gender female count = ${gender.female_count}`);
    // console.log(`male percent: ${gender.MalePercentage()}`);
    // console.log(`female percentage: ${gender.FemalePercentage()}`);

    let myDashboard = new Dashboard(userAllData);
    //initial executed
    //should log the initial method();

    //return the processed information

    // console.log('\nthis is the return of the processed information method\n');
    // console.log(myDashboard.ProcessedSelfInfo());

    res.send(myDashboard.ProcessedSelfInfo());

    // res.send(userAllData);
  } catch (error) {
    throw error;
  }
});

route.get("/Download/Fetch/Dashboard", async (req, res) => {
  try {
    const userAllData = await dashboardQuery();
    const csvWriter = createCsvWriter({
      path: "data.csv",
      header: Object.keys(userAllData[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(userAllData);
    const filePath = path.join(__dirname, "data.csv");
    res.download(filePath, "data.csv", (err) => {
      if (err) {
        console.error("Error downloading the file: ", err);
        res.status(500).send("Error downloading the file");
      } else {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting the file", err);
        });
      }
    });
  } catch (error) {
    console.log(`error on the server.js @ the route block '/Download/Fetch/Dashboard'`);
    res.status(500).send("Error processing the request");
  }
});

route.get(`/Fetch/Dashboard/:city`, async (req, res) => {
  const city = req.params.city;

  console.log(city);

  try {
    const userAllData = await filteredDashboardQuery(city);

    let myDashboard = new Dashboard(userAllData);

    res.send(myDashboard.ProcessedSelfInfo());
  } catch (error) {
    console.log(`error on server.js @ '/Fetch/Dashboard/:city' route `, error);
    throw error;
  }
});

route.get("/Download/Fetch/Dashboard/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const userAllData = await filteredDashboardQuery(city);
    const csvWriter = createCsvWriter({
      path: "data.csv",
      header: Object.keys(userAllData[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(userAllData);
    const filePath = path.join(__dirname, "data.csv");
    res.download(filePath, "data.csv", (err) => {
      if (err) {
        console.error("Error downloading the file: ", err);
        res.status(500).send("Error downloading the file");
      } else {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting the file", err);
        });
      }
    });
  } catch (error) {
    console.log(`error on the server.js @ the route block '/Download/Fetch/Dashboard'`);
    res.status(500).send("Error processing the request");
  }
});

route.get("/EventRegistered/:clientuserId", async (req, res) => {
  const userId = req.params.clientuserId;

  try {
    const EventRegistredArray = await getEventRegistry(userId);

    // res.send(EventRegistredArray);
    res.send(["data from EvenRegistered api"]);
  } catch (error) {
    throw error;
  }
});

route.post("/sendMail", EventUpload.array("files", 10), async (req, res) => {
  const { senderClientId, receiverAdminId, subject, message } = req.body;
  const files = req.files;

  // temporary list of modif file names on the req.
  let Filenames = [];
  let Imagenames = [];
  //populating the filenames
  files.forEach((file) => {
    if (
      file.filename.includes(".jpg") ||
      file.filename.includes(".jpeg") ||
      file.filename.includes(".png")
    ) {
      Imagenames.push(file.filename);
    } else if (
      file.filename.includes(".pdf") ||
      file.filename.includes(".doc") ||
      file.filename.includes(".docx") ||
      file.filename.includes(".txt")
    ) {
      Filenames.push(file.filename);
    }
  });

  const Filenames_String = Filenames.join(",");
  const Imagenames_String = Imagenames.join(",");

  // query function
  try {
    //constructing the MailObj what will be pass as the parameter on the query function

    const MailObj = {
      SenderId: senderClientId,
      AssignedAdmin: receiverAdminId,
      MailSubject: subject,
      MailBody: message,
      MailDocFile: Filenames_String,
      MailImageFile: Imagenames_String,
    };

    console.log(MailObj);

    await ClientMailInsert(MailObj);
    res.status(200).send("Mail Sent Successfully");
  } catch (error) {
    console.log(`error at /sendMail route @server.js file`, error);
    throw error;
  }

  // console.log(`senderClientId: ${senderClientId}`);
  // console.log(`receiverAdminid: ${receiverAdminId}`);
  // console.log(`subject: ${subject}`);
  // console.log(`message: ${message}`);

  files.forEach((file) => {
    console.log(file);
  });
});

route.post("/sendMail/Admin", EventUpload.array("files", 10), async (req, res) => {
  const { senderAdminId, receiverClientId, subject, message } = req.body;
  const files = req.files;

  let Filenames = [];
  let Imagenames = [];

  files.forEach((file) => {
    if (
      file.filename.includes(".jpg") ||
      file.filename.includes(".jpeg") ||
      file.filename.includes(".png")
    ) {
      Imagenames.push(file.filename);
    } else if (
      file.filename.includes(".pdf") ||
      file.filename.includes(".doc") ||
      file.filename.includes(".docx") ||
      file.filename.includes(".txt")
    ) {
      Filenames.push(file.filename);
    }
  });

  const Filenames_String = Filenames.join(",");
  const Imagenames_String = Imagenames.join(",");

  //passing the parameter to the query
  try {
    const MailObj = {
      SenderId: senderAdminId,
      AssignedClient: receiverClientId,
      MailSubject: subject,
      MailBody: message,
      MailDocFile: Filenames_String,
      MailImageFile: Imagenames_String,
    };

    console.log(MailObj);

    await AdminMailInsert(MailObj);
    res.status(200).send("Mail Sent Successfully");
  } catch (error) {
    console.log(`error from the "/sendMail/Admin @server.js file."`, error);
    throw error;
  }
});

route.post("/sendmail/dummy", async (req, res) => {
  const { senderAdminId, receiverClientId, subject, message } = req.body;

  const MailObj = {
    SenderId: senderAdminId,
    AssignedAdmin: receiverClientId,
    MailSubject: subject,
    MailBody: message,
  };

  console.log(MailObj);
});

route.post("/ticket/cancelation/event/:registration_id", async (req, res) => {
  const { registration_id } = req.params;

  try {
    console.log(registration_id);

    await TicketCancelationEvent(registration_id);

    res.send(true);
  } catch (error) {
    throw error;
  }
});

route.post(`/ticket/cancelation/job/:registration_id`, async (req, res) => {
  const { registration_id } = req.params;

  try {
    await TicketCancelationJob(registration_id);

    res.send(true);
  } catch (error) {
    throw error;
  }
});

route.get("/sample_res", (req, res) => {
  res.send("this is a response");
  res.end();
});

module.exports = route;
