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
  },
  {
    id: "7",
    title: "Diaphragmatic Breathing",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 3,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE, 
      ExerciseRequirement.NO_EQUIPMENT, 
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION, 
      ExerciseBenefit.STRESS_RELIEF, 
      ExerciseBenefit.RELAXATION, 
      ExerciseBenefit.IMPROVED_BODY_AWARENESS
    ],
    connectionTips: ["Practice while baby is nursing or sleeping on your chest to create a calming rhythm for both of you"]
  },
  {
    id: "8",
    title: "Pelvic Floor Activation",
    category: ExerciseCategory.PELVIC_FLOOR,
    duration: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.PELVIC_STABILITY,
      ExerciseBenefit.CORE_ACTIVATION
    ],
    connectionTips: ["Use nursing sessions as a reminder to perform pelvic floor exercises - contract when baby latches, hold, then release"]
  },
  {
    id: "9",
    title: "Cat-Cow Exercise",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.BACK_PAIN_RELIEF,
      ExerciseBenefit.JOINT_MOBILITY,
      ExerciseBenefit.ABDOMINAL_HEALING
    ],
    connectionTips: ["Position baby for tummy time in front of you, making eye contact and talking to them as you move through the positions"]
  },
  {
    id: "10",
    title: "Single Leg Extension",
    category: ExerciseCategory.DIASTASIS_RECTI,
    duration: 4,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_STABILITY,
      ExerciseBenefit.DIASTASIS_RECTI_RECOVERY,
      ExerciseBenefit.CORE_STRENGTH
    ],
    connectionTips: ["Sing a nursery rhyme as you count through your repetitions to entertain baby watching nearby"]
  },
  {
    id: "11",
    title: "Clam Exercise",
    category: ExerciseCategory.PELVIC_FLOOR,
    duration: 3,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.PELVIC_STABILITY,
      ExerciseBenefit.LOWER_BODY_STRENGTH
    ],
    connectionTips: ["Position baby safely within view and use funny facial expressions between reps to keep them engaged"]
  },
  {
    id: "12",
    title: "Gentle Wall Push-Ups",
    category: ExerciseCategory.UPPER_BODY_TONE,
    duration: 2,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.WALL_SPACE,
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.UPPER_BODY_STRENGTH,
      ExerciseBenefit.POSTURE_SUPPORT,
      ExerciseBenefit.IMPROVED_CARRYING_CAPACITY
    ],
    connectionTips: ["Place baby in bouncer or on playmat facing you, counting out loud or singing as you complete repetitions"]
  },
  {
    id: "13",
    title: "Seated Pelvic Tilts",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 2,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.CHAIR,
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.PELVIC_STABILITY,
      ExerciseBenefit.BACK_PAIN_RELIEF
    ],
    connectionTips: ["Perfect for practicing during nursing sessions to improve posture and reduce back strain"]
  },
  {
    id: "14",
    title: "Baby-Weight Torso Rotations",
    category: ExerciseCategory.BABY_INCLUSIVE,
    duration: 3,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.BABY_CARRIER_OR_HOLD,
      ExerciseRequirement.STANDING
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.CONNECTION,
      ExerciseBenefit.IMPROVED_CARRYING_CAPACITY
    ],
    connectionTips: ["Make gentle 'swoosh' sounds as you rotate to entertain baby and stimulate their senses"]
  },
  {
    id: "15",
    title: "Modified Bridges",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.LOWER_BODY_STRENGTH
    ],
    connectionTips: ["Place baby on your shins for gentle motion while you bridge, making this a playful bonding exercise"]
  },
  {
    id: "16",
    title: "Shoulder Blade Squeezes",
    category: ExerciseCategory.POSTURAL_ALIGNMENT,
    duration: 2,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING,
      ExerciseRequirement.STANDING
    ],
    benefits: [
      ExerciseBenefit.POSTURE_IMPROVEMENT,
      ExerciseBenefit.UPPER_BODY_TONE,
      ExerciseBenefit.BETTER_NURSING_POSTURE
    ],
    connectionTips: ["Practice while nursing to improve your posture, which helps baby maintain a good latch"]
  },
  {
    id: "17",
    title: "Heel Slides",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.ABDOMINAL_HEALING,
      ExerciseBenefit.DIASTASIS_RECTI_RECOVERY
    ],
    connectionTips: ["Position baby on your chest for added weight and bonding time as you perform the slides"]
  },
  {
    id: "18",
    title: "Bird Dog",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_STABILITY,
      ExerciseBenefit.BALANCE,
      ExerciseBenefit.BACK_PAIN_RELIEF
    ],
    connectionTips: ["Position baby for tummy time under you, making funny noises each time you extend limbs"]
  },
  {
    id: "19",
    title: "Gentle Neck Stretches",
    category: ExerciseCategory.STRETCHING,
    duration: 2,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.NECK_TENSION_RELIEF,
      ExerciseBenefit.STRESS_RELIEF,
      ExerciseBenefit.BETTER_NURSING_POSTURE
    ],
    connectionTips: ["Practice during nursing sessions to reduce 'tech neck' and be more present with your baby"]
  },
  {
    id: "20",
    title: "Standing Hip Hinges",
    category: ExerciseCategory.LOWER_BODY_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.LOWER_BODY_STRENGTH,
      ExerciseBenefit.POSTURE_SUPPORT,
      ExerciseBenefit.CORE_ACTIVATION
    ],
    connectionTips: ["Practice when picking up toys or baby items to use everyday movements as exercise opportunities"]
  },
  {
    id: "21",
    title: "Chair Squats",
    category: ExerciseCategory.LOWER_BODY_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.CHAIR,
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.LOWER_BODY_STRENGTH,
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.IMPROVED_CARRYING_CAPACITY
    ],
    connectionTips: ["Hold baby securely against your chest for added resistance and face-to-face interaction"]
  },
  {
    id: "22",
    title: "Five-Minute Ab Circuit",
    category: ExerciseCategory.SHORT_ROUTINES,
    duration: 5,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_STRENGTH,
      ExerciseBenefit.DIASTASIS_RECTI_RECOVERY,
      ExerciseBenefit.ABDOMINAL_HEALING
    ],
    connectionTips: ["Position baby where they can see you, narrating what you're doing to keep them engaged"]
  },
  {
    id: "23",
    title: "Stroller Walking Intervals",
    category: ExerciseCategory.CARDIO,
    duration: 10,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.BABY_CARRIER_OR_HOLD
    ],
    benefits: [
      ExerciseBenefit.ENDURANCE,
      ExerciseBenefit.MOOD_IMPROVEMENT,
      ExerciseBenefit.ENERGY,
      ExerciseBenefit.LOWER_BODY_STRENGTH
    ],
    connectionTips: ["Point out interesting sights and sounds to baby during walks to stimulate their development"]
  },
  {
    id: "24",
    title: "Three-Minute Body Refresh",
    category: ExerciseCategory.SHORT_ROUTINES,
    duration: 3,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.WALL_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.ENERGY,
      ExerciseBenefit.POSTURE_IMPROVEMENT,
      ExerciseBenefit.STRENGTH
    ],
    connectionTips: ["Sing a favorite lullaby or children's song through the routine to entertain baby while you move"]
  },
  {
    id: "25",
    title: "Seated Spinal Rotations",
    category: ExerciseCategory.GENTLE_MOBILITY,
    duration: 2,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.CHAIR,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.BACK_PAIN_RELIEF,
      ExerciseBenefit.FLEXIBILITY,
      ExerciseBenefit.CORE_ACTIVATION
    ],
    connectionTips: ["Practice during nursing sessions to keep your spine mobile and reduce stiffness from prolonged sitting"]
  },
  {
    id: "26",
    title: "Progressive Pelvic Floor",
    category: ExerciseCategory.PELVIC_FLOOR,
    duration: 1,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.CORE_STABILITY,
      ExerciseBenefit.IMPROVED_BODY_AWARENESS
    ],
    connectionTips: ["Integrate pelvic floor contractions into daily routines like diaper changes to build consistency"]
  },
  {
    id: "27",
    title: "Modified Planks",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 2,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_STABILITY,
      ExerciseBenefit.UPPER_BODY_STRENGTH,
      ExerciseBenefit.POSTURE_SUPPORT
    ],
    connectionTips: ["Position baby under you for eye contact and make silly faces during each plank hold"]
  },
  {
    id: "28",
    title: "Deep Squat Holds",
    category: ExerciseCategory.LOWER_BODY_STRENGTH,
    duration: 3,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.CHAIR
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH,
      ExerciseBenefit.LOWER_BODY_STRENGTH,
      ExerciseBenefit.JOINT_MOBILITY
    ],
    connectionTips: ["Hold baby securely during squat holds for added weight and face-to-face interaction"]
  },
  {
    id: "29",
    title: "Kneeling Pelvic Tilts",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.PELVIC_STABILITY,
      ExerciseBenefit.BACK_PAIN_RELIEF
    ],
    connectionTips: ["Position baby for tummy time in front of you, maintaining eye contact as you move"]
  },
  {
    id: "30",
    title: "Standing Side Bends",
    category: ExerciseCategory.CORE_STRENGTH,
    duration: 2,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION,
      ExerciseBenefit.FLEXIBILITY,
      ExerciseBenefit.STRESS_RELIEF
    ],
    connectionTips: ["Hold baby secure against your chest, gently swaying them side to side as you perform the movement"]
  },
  {
    id: "31",
    title: "Baby-Weight Shoulder Raises",
    category: ExerciseCategory.BABY_INCLUSIVE,
    duration: 3,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800&auto=format&fit=crop",
    requirements: [
      ExerciseRequirement.BABY_CARRIER_OR_HOLD,
      ExerciseRequirement.STANDING
    ],
    benefits: [
      ExerciseBenefit.UPPER_BODY_STRENGTH,
      ExerciseBenefit.CONNECTION,
      ExerciseBenefit.IMPROVED_CARRYING_CAPACITY
    ],
    connectionTips: ["Make a 'whoosh' sound as you raise baby slightly, creating a fun game they'll look forward to"]
  }
];