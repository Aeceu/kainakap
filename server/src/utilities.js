require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class StringManipulate {
    
    //static method to used in the backend logic and procedures

    static RemoveSqrBrac(str){

        const charToRemove = /\[|\]/g;
        let newstring = str.replace(charToRemove, "");

        return newstring;

    }
    
    static RemoveQuotation(str){

        const charToRemove = /\"|\"/g

        return str.replace(charToRemove, ''); 

    }

}



class DashBoardTools {
    static greet() {
        return 'hellow world';
    }
}

const DisabilityJSON = {
    SensoryDisabilities: [
      'Visual Impairment (Blindness)',
      'Hearing Impairment (Deafness)',
      'Sensory Processing Disorder (SPD)'
    ],
  
    PhysicalDisabilities: [
      'Amputation',
      'Cerebral Palsy',
      'Spinal Cord Injury',
      'Muscular Dystrophy',
      'Multiple Sclerosis',
      'Spina Bifida',
      'Arthritis',
      'Osteogenesis Imperfecta',
      'Poliomyelitis (Polio)',
      'Stroke',
      'Traumatic Brain Injury (TBI)',
      'Dwarfism',
      'Chronic Pain',
      'Fibromyalgia',
      'Lou Gehrig\'s Disease (ALS)',
      'Parkinson\'s Disease',
      'Myasthenia Gravis',
      'Guillain-Barré Syndrome',
      'Chronic Fatigue Syndrome',
      'Scoliosis',
      'Cerebrovascular Disease',
      'Peripheral Neuropathy',
      'Complex Regional Pain Syndrome (CRPS)',
      'Ehlers-Danlos Syndrome',
      'Ankylosing Spondylitis',
      'Rheumatoid Arthritis',
      'Lupus',
      'Chronic Obstructive Pulmonary Disease (COPD)',
      'Cystic Fibrosis',
      'Hemiplegia',
      'Paraplegia',
      'Quadriplegia',
      'Osteoporosis',
      'Marfan Syndrome',
      'Charcot-Marie-Tooth Disease',
      'Huntington\'s Disease',
      'Tuberous Sclerosis'
    ],
  
    MentalHealthDisabilities: [
      'Schizophrenia',
      'Bipolar Disorder',
      'Major Depressive Disorder',
      'Anxiety Disorders',
      'Obsessive-Compulsive Disorder (OCD)',
      'Post-Traumatic Stress Disorder (PTSD)',
      'Borderline Personality Disorder',
      'Antisocial Personality Disorder',
      'Schizoaffective Disorder',
      'Psychotic Disorders',
      'Oppositional Defiant Disorder (ODD)',
      'Conduct Disorder',
      'Selective Mutism',
      'Reactive Attachment Disorder',
      'Disinhibited Social Engagement Disorder',
      'Intermittent Explosive Disorder'
    ],
  
    IntellectualDisabilities: [
      'Down Syndrome',
      'Intellectual Disability',
      'Fragile X Syndrome',
      'Fetal Alcohol Spectrum Disorders (FASD)',
      'Prader-Willi Syndrome',
      'Williams Syndrome',
      'Rett Syndrome',
      'Angelman Syndrome',
      'Tourette Syndrome',
      'Global Developmental Delay',
      'Nonverbal Learning Disorder (NLD)',
      'Klinefelter Syndrome',
      'Turner Syndrome',
      'Phenylketonuria (PKU) with cognitive impairments'
    ],
  
    LearningDisabilities: [
      'Autism Spectrum Disorder (ASD)',
      'Attention Deficit Hyperactivity Disorder (ADHD)',
      'Dyslexia',
      'Dyscalculia',
      'Dysgraphia',
      'Specific Learning Disabilities (SLD)',
      'Developmental Coordination Disorder (DCD)',
      'Pervasive Developmental Disorders (PDD)',
      'Communication Disorders',
      'Social (Pragmatic) Communication Disorder',
      'Speech and Language Disorders'
    ],
  
    InvisibleDisabilities: [
      'Chronic Fatigue Syndrome',
      'Epilepsy',
      'Neurocognitive Disorders (e.g., Dementia, Alzheimer\'s Disease)',
      'Traumatic Brain Injury (TBI) with cognitive impairments',
      'Huntington\'s Disease with cognitive impairments',
      'Parkinson\'s Disease with cognitive impairments',
      'Multiple Sclerosis with cognitive impairments',
      'Epilepsy with cognitive impairments',
      'Chronic Traumatic Encephalopathy (CTE)'
    ]
  
  };


module.exports = {
    StringManipulate,
    cloudinary,
    DisabilityJSON
};