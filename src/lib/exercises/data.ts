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
    connectionTips: ["Make eye contact with your baby and speak softly while breathing through the exercises. This promotes secure attachment while you focus on healing."]
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
    connectionTips: ["Sing a gentle song or count aloud with each squat, creating a consistent rhythm that soothes your baby while also helping you maintain proper form."]
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
    connectionTips: ["Position your baby where they can see your face, and narrate what you're doing in a calm voice. This models focused attention and helps you maintain proper breathing patterns."]
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
    connectionTips: ["Position baby nearby at eye level where you can make gentle eye contact during holds, which supports both emotional bonding and helps you hold stretches for the proper duration."]
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
    connectionTips: ["Do your exercises facing your baby during their tummy time, creating a mirroring effect that encourages baby's development while you strengthen your core."]
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
    connectionTips: ["If holding your baby, maintain proper alignment and engage your core to support your spine. Use this time to narrate your day or surroundings to stimulate language development."]
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
    connectionTips: ["Practice deep breathing while nursing or with baby resting on your chest. Your calm, rhythmic breathing can help regulate your baby's own breathing patterns and promote relaxation for both of you."]
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
    connectionTips: ["Associate pelvic floor exercises with routine activities like nursing or diaper changes. Remember to fully release after each contraction, which is just as important as the contraction itself."]
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
    connectionTips: ["Place your baby for supervised tummy time in front of you, maintaining eye contact and gently describing your movements which helps develop your baby's language skills and body awareness."]
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
    connectionTips: ["Place your baby where they can see you and recite a simple nursery rhyme as you count through repetitions, creating a consistent and calm environment for both of you."]
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
    connectionTips: ["Position baby safely within view on a supportive surface. Maintain eye contact and use gentle expressions to engage them, helping you stay present and mindful during the exercise."]
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
    connectionTips: ["Place baby safely in a bouncer or on a playmat facing you. Count out loud or sing during repetitions, which helps your baby develop number recognition while supporting your exercise rhythm."]
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
    connectionTips: ["Practice during nursing sessions, focusing on your posture and core engagement to reduce back strain. This helps develop healthy nursing habits while supporting your recovery."]
  },
  {
    id: "14",
    title: "Gentle Torso Rotations with Baby",
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
    connectionTips: ["Hold your baby securely against your chest and make gentle, predictable movements. Use soft sounds or narration to help your baby anticipate the movement, which develops their vestibular system and sense of security."]
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
    connectionTips: ["Position your baby nearby where you can maintain eye contact during the exercise. The face-to-face position during your bridge holds promotes bonding while you focus on proper form."]
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
    connectionTips: ["Practice during nursing to improve your posture and reduce shoulder tension. Good posture during nursing helps baby maintain a proper latch and can prevent feeding difficulties."]
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
    connectionTips: ["If your baby enjoys being close, place them on your chest while performing heel slides. Focus on gentle core engagement and proper breathing - exhale as you extend your leg."]
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
    connectionTips: ["Position your baby safely on a mat in front of you for supervised tummy time. Make gentle eye contact and use soft encouraging words as you extend your limbs, keeping them engaged with your movements."]
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
    connectionTips: ["Practice mindful neck stretches during nursing, focusing on your baby rather than looking down at your phone. This promotes better posture and deeper connection with your baby."]
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
    connectionTips: ["Practice proper hip hinge form when picking up your baby or toys from the floor, keeping your back straight and bending from the hips. This protects your back while modeling healthy movement."]
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
    connectionTips: ["If your baby is calm in a nearby seat or bouncer, maintain eye contact and talk to them about what you're doing. This provides language enrichment while you strengthen your legs for everyday parenting activities."]
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
    connectionTips: ["Position your baby where they can safely observe you. Narrate your movements with descriptive language, which helps develop their vocabulary while keeping you focused on proper form."]
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
    connectionTips: ["Narrate what you see on your walks, describing colors, objects, and sounds to stimulate your baby's sensory development. Start with shorter intervals and gradually increase as your stamina builds."]
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
    connectionTips: ["If your baby is with you, maintain eye contact and use a soothing, rhythmic voice as you move. This consistency helps babies develop a sense of security even during your brief exercise breaks."]
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
    connectionTips: ["Incorporate gentle spinal rotations during nursing sessions to ease back tension. Move slowly and with control, focusing on your breathing and maintaining proper support for your baby."]
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
    connectionTips: ["Link pelvic floor exercises to daily activities like diaper changes or feeding times to build consistency. Remember to fully relax between contractions for optimal recovery and function."]
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
    connectionTips: ["Position your baby safely where you can make eye contact during modified plank holds. Use gentle expressions and talk to them about what you're doing to keep both of you engaged."]
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
    connectionTips: ["Position your baby where you can make eye contact during your squat holds. Sing a gentle song or count aloud, ensuring proper alignment with knees tracking over toes. Focus on breathing deeply and creating a calm environment."]
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
    connectionTips: ["Position your baby for supervised tummy time in front of you to encourage their development. Maintain eye contact while focusing on your breathing and proper core engagement."]
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
    connectionTips: ["If holding your baby, keep them secure against your chest with proper support. Move slowly and gently to one side and then the other, using your breath to guide the movement and maintain stability."]
  },
  {
    id: "31",
    title: "Gentle Upper Body Stretches with Baby",
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
    connectionTips: ["Always support your baby's head and neck completely while holding them close. Use gentle vocal cues before making small movements to help your baby feel secure and connected throughout the stretching routine."]
  }
];