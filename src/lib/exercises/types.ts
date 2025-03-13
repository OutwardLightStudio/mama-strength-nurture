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
}

/**
 * Common exercise benefits
 */
export enum ExerciseBenefit {
  PELVIC_FLOOR_STRENGTH = "Pelvic floor strength",
  CORE_ACTIVATION = "Core activation",
  LEG_STRENGTH = "Leg strength",
  POSTURE_SUPPORT = "Posture support",
  ABDOMINAL_HEALING = "Abdominal healing",
  CORE_STABILITY = "Core stability",
  BACK_PAIN_RELIEF = "Back pain relief",
  IMPROVED_POSTURE = "Improved posture",
  CORE_STRENGTH = "Core strength",
  UPPER_BODY_TONE = "Upper body tone",
  POSTURE_IMPROVEMENT = "Posture improvement",
  LOWER_BODY_STRENGTH = "Lower body strength",
  STRESS_RELIEF = "Stress relief",
  MINDFULNESS = "Mindfulness",
  FLEXIBILITY = "Flexibility",
  BALANCE = "Balance",
  RELAXATION = "Relaxation",
  STRENGTH = "Strength",
  ENDURANCE = "Endurance",
  FOCUS = "Focus",
  ENERGY = "Energy",
  CALM = "Calm",
  CONNECTION = "Connection",
}

/**
 * Duration ranges for filtering exercises
 */
export enum DurationRange {
  ALL = "All",
  UNDER_5_MIN = "Under 5 min",
  FIVE_TO_TEN_MIN = "5-10 min",
  OVER_10_MIN = "Over 10 min"
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
}

/**
 * Exercise filter options for the UI
 */
export interface ExerciseFilters {
  category: ExerciseCategory | "All";
  duration: DurationRange;
  requirement: ExerciseRequirement | "All";
  searchQuery?: string;
}