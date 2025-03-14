/**
 * Types and interfaces for the exercise data model
 */

/**
 * Exercise categories
 */
export enum ExerciseCategory {
  RECOVERY_BASICS = "Recovery Basics",
  FULL_BODY_STRENGTH = "Full Body Strength",
  SHORT_ROUTINES = "Short Routines",
  BABY_INCLUSIVE = "Baby-inclusive",
  CORE_STRENGTH = "Core Strength",
  UPPER_BODY_TONE = "Upper Body Tone",
  LOWER_BODY_STRENGTH = "Lower Body Strength",
  STRETCHING = "Stretching",
  CARDIO = "Cardio",
  YOGA = "Yoga",
  PELVIC_FLOOR = "Pelvic Floor",
  DIASTASIS_RECTI = "Diastasis Recti",
  GENTLE_MOBILITY = "Gentle Mobility",
  POSTURAL_ALIGNMENT = "Postural Alignment",
}

/**
 * Exercise requirement options
 */
export enum ExerciseRequirement {
  FLOOR_SPACE = "Floor space",
  STANDING = "Standing",
  CAN_DO_WHILE_NURSING = "Can do while nursing",
  BABY_CARRIER_OR_HOLD = "Baby carrier or hold",
  NO_EQUIPMENT = "No equipment",
  SUPPORT_PILLOW = "Support pillow",
  QUIET_ENVIRONMENT = "Quiet environment", 
  TUMMY_TIME = "Tummy time for baby",
  RESISTANCE_BAND = "Resistance band",
  CHAIR = "Chair for support",
  YOGA_MAT = "Yoga mat",
  SMALL_WEIGHTS = "Small weights",
  WALL_SPACE = "Wall space",
  WATER_BOTTLE = "Water bottle",
}

/**
 * Common exercise benefits
 */
export enum ExerciseBenefit {
  // Core & Pelvic Health
  PELVIC_FLOOR_STRENGTH = "Pelvic floor strength",
  PELVIC_STABILITY = "Pelvic stability",
  CORE_ACTIVATION = "Core activation",
  CORE_STABILITY = "Core stability",
  CORE_STRENGTH = "Core strength",
  ABDOMINAL_HEALING = "Abdominal healing",
  DIASTASIS_RECTI_RECOVERY = "Diastasis recti recovery",
  
  // Musculoskeletal Benefits
  POSTURE_SUPPORT = "Posture support", 
  IMPROVED_POSTURE = "Improved posture",
  POSTURE_IMPROVEMENT = "Posture improvement",
  BACK_PAIN_RELIEF = "Back pain relief",
  NECK_TENSION_RELIEF = "Neck tension relief",
  LEG_STRENGTH = "Leg strength",
  LOWER_BODY_STRENGTH = "Lower body strength",
  UPPER_BODY_TONE = "Upper body tone",
  UPPER_BODY_STRENGTH = "Upper body strength",
  JOINT_MOBILITY = "Joint mobility",
  FLEXIBILITY = "Flexibility",
  BALANCE = "Balance",
  STRENGTH = "Strength",
  ENDURANCE = "Endurance",
  
  // Mental & Emotional Benefits
  STRESS_RELIEF = "Stress relief",
  MINDFULNESS = "Mindfulness",
  RELAXATION = "Relaxation",
  FOCUS = "Focus",
  ENERGY = "Energy",
  CALM = "Calm",
  MOOD_IMPROVEMENT = "Mood improvement",
  SLEEP_QUALITY = "Better sleep quality",
  
  // Functional Benefits
  IMPROVED_CARRYING_CAPACITY = "Improved carrying capacity",
  BETTER_NURSING_POSTURE = "Better nursing posture",
  REDUCED_FATIGUE = "Reduced fatigue",
  CONNECTION = "Connection with baby",
  IMPROVED_BODY_AWARENESS = "Improved body awareness",
  HORMONAL_BALANCE = "Hormonal balance support",
}

/**
 * Exercise contraindications - conditions when exercises should be avoided
 */
export enum ExerciseContraindication {
  // Postpartum Recovery Stages
  IMMEDIATE_POSTPARTUM = "Immediate postpartum (0-6 weeks)",
  CESAREAN_RECOVERY = "Cesarean recovery (0-8 weeks)",
  ACUTE_PERINEAL_TEAR = "Acute perineal tear healing",
  HEAVY_BLEEDING = "Heavy postpartum bleeding",
  
  // Pelvic and Abdominal Concerns
  SEVERE_DIASTASIS_RECTI = "Severe diastasis recti (>3 finger width)",
  PELVIC_ORGAN_PROLAPSE = "Pelvic organ prolapse symptoms",
  PELVIC_PAIN = "Pelvic pain or discomfort",
  URINARY_INCONTINENCE = "Active urinary incontinence",
  
  // Maternal Health Conditions
  UNCONTROLLED_BLOOD_PRESSURE = "Uncontrolled high blood pressure",
  PREECLAMPSIA = "Preeclampsia symptoms",
  ACTIVE_INFECTION = "Active infection or fever",
  EXCESSIVE_FATIGUE = "Excessive fatigue or exhaustion",
  DIZZINESS = "Dizziness or lightheadedness",

  // Pain and Discomfort
  BACK_PAIN = "Acute back pain",
  JOINT_PAIN = "Joint pain during exercise",
  HEADACHE = "Severe headache",
  MIGRAINE = "Active migraine",
  MUSCLE_STRAIN = "Muscle strain or injury",
  ABDOMINAL_PAIN = "Acute abdominal pain",
  SHOULDER_PAIN = "Shoulder pain",
  NECK_PAIN = "Neck pain",
  WRIST_PAIN = "Wrist pain",
  KNEE_PAIN = "Knee pain",


  // General Exercise Considerations
  NO_MEDICAL_CLEARANCE = "No medical clearance for exercise",
  NOT_MEDICALLY_APPROVED = "Not medically approved for specific exercises",
  DEHYDRATION = "Dehydration",
  SLEEP_DEPRIVATION = "Severe sleep deprivation",
}

/**
 * Duration ranges for filtering exercises
 */
export enum DurationRange {
  ALL = "All",
  UNDER_5_MIN = "Under 5 min",
  FIVE_TO_TEN_MIN = "5-10 min",
}

/**
 * Exercise interface
 */
export interface Exercise {
  /** Unique identifier for the exercise */
  id: string;
  
  /** Title of the exercise */
  title: string;
  
  /** Category the exercise belongs to */
  category: ExerciseCategory;
  
  /** Duration of the exercise in minutes */
  duration: number;
  
  /** URL for the exercise image */
  image: string;
  
  /** List of requirements for performing the exercise */
  requirements: ExerciseRequirement[];
  
  /** List of benefits provided by the exercise */
  benefits: ExerciseBenefit[];
  
  /** Tips for maintaining connection with baby during the exercise */
  connectionTips: string[];
  
  /** Contraindications - conditions when this exercise should be avoided */
  contraindications?: ExerciseContraindication[];
  
  /** Recommended postpartum stage (e.g., "0-6 weeks", "6-12 weeks", "3-6 months", "6+ months") */
  recommendedStage?: string[];
  
  /** Brief description of the exercise */
  description?: string;
}

/**
 * Exercise filter options for the UI
 */
export interface ExerciseFilters {
  category: ExerciseCategory | "All";
  duration: DurationRange;
  requirement: ExerciseRequirement | "All";
  searchQuery?: string;
  postpartumStage?: string | "All";
}