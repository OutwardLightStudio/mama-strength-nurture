import { Exercise, ExerciseCategory, ExerciseRequirement, ExerciseBenefit } from './types';

/**
 * Collection of all exercises in the application
 */
export const exercises: Exercise[] = [
  {
    id: "1",
    title: "Gentle Pelvic Floor Recovery",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH, 
      ExerciseBenefit.CORE_ACTIVATION
    ],
    connectionTips: ["Maintain eye contact with baby and smile while breathing through the exercises"]
  },
  {
    id: "2",
    title: "Standing Baby Cuddle Squats",
    category: ExerciseCategory.BABY_INCLUSIVE,
    duration: 8,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.BABY_CARRIER_OR_HOLD
    ],
    benefits: [
      ExerciseBenefit.LEG_STRENGTH,
      ExerciseBenefit.POSTURE_SUPPORT
    ],
    connectionTips: ["Sing a gentle song to baby with each squat, creating a rhythm"]
  },
  {
    id: "3",
    title: "Diastasis Recti Healing",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 10,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.QUIET_ENVIRONMENT
    ],
    benefits: [
      ExerciseBenefit.ABDOMINAL_HEALING,
      ExerciseBenefit.CORE_STABILITY
    ],
    connectionTips: ["Place baby where they can see you, talk softly about what you're doing"]
  },
  {
    id: "4",
    title: "Gentle Back Stretch Series",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 7,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.SUPPORT_PILLOW
    ],
    benefits: [
      ExerciseBenefit.BACK_PAIN_RELIEF,
      ExerciseBenefit.IMPROVED_POSTURE
    ],
    connectionTips: ["Position baby nearby where you can make faces at each other during holds"]
  },
  {
    id: "5",
    title: "Playful Tummy Time Exercises",
    category: ExerciseCategory.BABY_INCLUSIVE,
    duration: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.TUMMY_TIME
    ],
    benefits: [
      ExerciseBenefit.CORE_STRENGTH,
      ExerciseBenefit.UPPER_BODY_TONE
    ],
    connectionTips: ["Do your exercises facing baby during their tummy time, creating a mirroring effect"]
  },
  {
    id: "6",
    title: "Quick Standing Core Activation",
    category: ExerciseCategory.SHORT_ROUTINES,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.POSTURE_IMPROVEMENT
    ],
    connectionTips: ["Hold baby while doing gentle standing exercises, maintaining eye contact"]
  }
];