export const statInfo = [
  { title: "Patients", value: 2 },
  { title: "Sessions", value: 12 },
  { title: "Active", value: 3 },
  { title: "Completed", value: 8 },
];
// Mock patient data
export const mockPatients = [
  {
    id: 1,
    name: "Maria Rodriguez",
    age: 35,
    language: "Spanish",
    lastVisit: "2024-01-15",
    status: "Active",
    phone: "+1 (555) 123-4567",
    condition: "Diabetes",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    age: 42,
    language: "Arabic",
    lastVisit: "2024-01-12",
    status: "Active",
    phone: "+1 (555) 987-6543",
    condition: "Hypertension",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Wei Chen",
    age: 28,
    language: "Chinese",
    lastVisit: "2024-01-10",
    status: "Inactive",
    phone: "+1 (555) 456-7890",
    condition: "Allergies",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Jean Pierre",
    age: 55,
    language: "French",
    lastVisit: "2024-01-08",
    status: "Active",
    phone: "+1 (555) 321-0987",
    condition: "Arthritis",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Rosa Silva",
    age: 31,
    language: "Portuguese",
    lastVisit: "2024-01-05",
    status: "Active",
    phone: "+1 (555) 654-3210",
    condition: "Migraine",
    isFavorite: true,
  },
];

export const todayStats = {
  totalPatients: 12,
  translationSessions: 8,
  activeTranslations: 2,
  completedSessions: 6,
};

export const quickActions = [
  {
    id: 1,
    title: "Patient List",
    subtitle: "View all patients",
    icon: "people",
    color: "#4CAF50",
    route: "/patients/list",
    badge: todayStats.totalPatients,
  },
  {
    id: 2,
    title: "Add Patient",
    subtitle: "Register new patient",
    icon: "person-add",
    color: "#2196F3",
    route: "/patients/add-patient",
  },
  {
    id: 3,
    title: "Start Translation",
    subtitle: "Begin live session",
    icon: "language",
    color: "#FF9800",
    route: "/patients/list",
  },
  {
    id: 4,
    title: "Translation History",
    subtitle: "View past sessions",
    icon: "time",
    color: "#9C27B0",
    route: "/translation/history",
    badge: todayStats.translationSessions,
  },
];

export const recentActivity = [
  {
    id: 1,
    patient: "Maria Rodriguez",
    language: "Spanish",
    time: "2:30 PM",
    duration: "15 min",
    status: "completed",
  },
  {
    id: 2,
    patient: "Chen Wei",
    language: "Mandarin",
    time: "1:45 PM",
    duration: "12 min",
    status: "completed",
  },
  {
    id: 3,
    patient: "Ahmed Hassan",
    language: "Arabic",
    time: "11:20 AM",
    duration: "8 min",
    status: "completed",
  },
];

export const languages = [
  "English",
  "Bangla",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
];

export const genders = ["Male", "Female", "Other", "Prefer not to say"];
export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
